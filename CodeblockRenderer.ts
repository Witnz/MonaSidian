import { App, MarkdownPostProcessorContext } from "obsidian";
import hljs from "highlight.js/lib/core";
import type MonacoPrettierPlugin from "./main";
import type { MonacoPrettierSettings } from "./settings";
import {
	LANGUAGE_REGISTRY,
	LANGUAGE_ALIASES,
	HLJS_THEMES,
	getEnabledLanguageSet,
} from "./CodeblockLanguages";

// Plaintext / no-op language identifiers — apply .hljs class but skip highlighting
const PLAINTEXT_LANGS = new Set(["plain", "text", "plaintext", "nohighlight", "no-highlight"]);

// Max code block size (chars) before falling back to native rendering
const MAX_CODEBLOCK_SIZE = 500_000;

// ID for the injected theme <style> element
const THEME_STYLE_ID = "monasidian-hljs-theme";

export class CodeblockRenderer {
	private app: App;
	private plugin: MonacoPrettierPlugin;
	/** Tracks the injected <style> element per Document (for pop-out windows). */
	private themeStylesByDoc: WeakMap<Document, HTMLStyleElement> = new WeakMap();
	/** The currently active (processed) theme CSS, cached for late-joining pop-out windows. */
	private currentThemeCss: string | null = null;

	constructor(app: App, plugin: MonacoPrettierPlugin) {
		this.app = app;
		this.plugin = plugin;
	}

	get settings(): MonacoPrettierSettings {
		return this.plugin.settings;
	}

	/**
	 * Initialize: register enabled languages and inject the theme CSS.
	 * Call this once during plugin load (and again when toggled on).
	 */
	async initialize(): Promise<void> {
		if (!this.settings.enablePrettyCodeblocks) return;
		this.registerEnabledLanguages(this.settings.enabledLanguageGroups);
		await this.applyTheme(this.settings.codeblockTheme);
	}

	/**
	 * Register all languages belonging to enabled groups with the hljs runtime.
	 */
	registerEnabledLanguages(groups: Record<string, boolean>): void {
		const enabled = getEnabledLanguageSet({ ...this.settings, enabledLanguageGroups: groups });
		for (const name of enabled) {
			const grammar = LANGUAGE_REGISTRY[name];
			if (!grammar) continue;
			// Avoid re-registering languages; some Highlight.js builds throw on duplicates.
			if (!hljs.getLanguage(name)) {
				hljs.registerLanguage(name, grammar);
			}
		}
	}

	/**
	 * Inject (or replace) the hljs theme CSS into document.head.
	 */
	async applyTheme(themeName: string): Promise<void> {
		let css = await this.loadThemeCss(themeName);
		if (!css) {
			console.warn(`MonaSidian: theme "${themeName}" not found, falling back to default`);
			css = await this.loadThemeCss("github-dark");
			if (!css) {
				console.warn("MonaSidian: fallback theme 'github-dark' also not found, skipping theme injection");
				return;
			}
		}

		if (!this.settings.codeblockAllowThemeBackground) {
			// Strip only background declarations to prevent hljs dark backgrounds from clashing
			// with the Obsidian theme without removing unrelated CSS (handles minified themes).
			css = this.stripThemeBackgroundDeclarations(css);
		}

		this.currentThemeCss = css;
		this.injectThemeCss(css);
	}

	/**
	 * Remove background/background-color declarations while preserving other
	 * declarations on the same line (for example in minified themes).
	 */
	private stripThemeBackgroundDeclarations(css: string): string {
		return css.replace(
			/(^|[;{]\s*)background(?:-color)?\s*:\s*[^;{}]+;?/gim,
			(_match: string, prefix: string) => prefix
		);
	}

	/**
	 * Read a theme CSS file from the vendored highlight/styles directory.
	 * Theme name is validated against the HLJS_THEMES allowlist to prevent path traversal.
	 */
	private async loadThemeCss(themeName: string): Promise<string | null> {
		// Validate against the allowlist before constructing the path
		if (!HLJS_THEMES.includes(themeName)) {
			console.warn(`MonaSidian: unknown theme "${themeName}", refusing to load`);
			return null;
		}
		try {
			// Use plugin id to build a vault-relative path, avoiding raw manifest.dir
			const cssPath = `.obsidian/plugins/${this.plugin.manifest.id}/highlight/styles/${themeName}.css`;
			const css = await this.app.vault.adapter.read(cssPath);
			return css;
		} catch {
			return null;
		}
	}

	/**
	 * Insert or replace the <style id="monasidian-hljs-theme"> element in the
	 * given document (or document.head for backwards compat). Called for every
	 * document that owns a highlighted element so pop-out windows are styled too.
	 */
	private injectThemeCssIntoDoc(css: string, doc: Document): void {
		let styleEl = this.themeStylesByDoc.get(doc);
		if (!styleEl) {
			styleEl = doc.createElement("style");
			styleEl.id = THEME_STYLE_ID;
			doc.head.appendChild(styleEl);
			this.themeStylesByDoc.set(doc, styleEl);
		}
		styleEl.textContent = css;
	}

	/**
	 * Inject or update the theme CSS in every open document (main window + pop-outs).
	 * Falls back to `document` when the workspace API is unavailable.
	 */
	private injectThemeCss(css: string): void {
		// Collect all unique Documents currently open in the workspace
		const docs = new Set<Document>();
		docs.add(document);
		if (this.app?.workspace) {
			this.app.workspace.iterateAllLeaves((leaf) => {
				const doc = (leaf.view?.containerEl?.ownerDocument) as Document | null;
				if (doc) docs.add(doc);
			});
		}
		docs.forEach((doc) => this.injectThemeCssIntoDoc(css, doc));
	}

	/**
	 * Markdown post-processor: called by Obsidian for every rendered section.
	 * Finds all `pre > code` blocks and applies hljs highlighting where applicable.
	 * Also ensures the theme CSS is present in the element's owning document (pop-out
	 * windows have a different Document than the main window).
	 */
	processCodeblock(el: HTMLElement, _ctx: MarkdownPostProcessorContext): void {
		if (!this.settings.enablePrettyCodeblocks) return;

		// Ensure this document has the theme CSS (handles pop-out windows)
		const doc = el.ownerDocument;
		if (doc && this.currentThemeCss && !this.themeStylesByDoc.has(doc)) {
			this.injectThemeCssIntoDoc(this.currentThemeCss, doc);
		}

		const codeEls = el.querySelectorAll<HTMLElement>("pre > code");
		for (let i = 0; i < codeEls.length; i++) {
			this.highlightCodeElement(codeEls[i]);
		}
	}

	/**
	 * Apply hljs highlighting to a single <code> element.
	 */
	private highlightCodeElement(codeEl: HTMLElement): void {
		// Double-process guard
		if (codeEl.dataset.monasidianHljs) return;

		// Extract language from class list (e.g. "language-javascript")
		let originalLang: string | null = null;
		const { classList } = codeEl;
		for (let ci = 0; ci < classList.length; ci++) {
			const match = classList.item(ci)!.match(/^language-(.+)$/);
			if (match) {
				originalLang = match[1].toLowerCase();
				break;
			}
		}

		// No language annotation — let Obsidian's native renderer handle it
		if (originalLang === null) return;

		// Resolve alias: user aliases first, then built-in aliases
		const resolvedLang =
			this.settings.languageAliases[originalLang] ??
			LANGUAGE_ALIASES[originalLang] ??
			originalLang;

		// Plaintext guard — add .hljs class but do not inject spans
		if (PLAINTEXT_LANGS.has(resolvedLang)) {
			codeEl.classList.add("hljs");
			codeEl.dataset.monasidianHljs = resolvedLang;
			return;
		}

		// Scope guard — language not registered means it's not in any enabled group
		if (hljs.getLanguage(resolvedLang) === undefined) return;

		// Size guard — prevent UI freeze on huge or malformed blocks
		const code = codeEl.textContent ?? "";
		if (code.length > MAX_CODEBLOCK_SIZE) return;

		// Highlight
		let result;
		try {
			result = hljs.highlight(code, { language: resolvedLang });
		} catch {
			// Any hljs error → native fallback, no error surfaced to user
			return;
		}

		// Apply highlighted HTML (hljs always HTML-escapes content before wrapping in <span>)
		codeEl.innerHTML = result.value;

		// Update classes
		codeEl.classList.add("hljs");
		if (originalLang !== resolvedLang) {
			codeEl.classList.remove(`language-${originalLang}`);
			codeEl.classList.add(`language-${resolvedLang}`);
		}

		// Mark as processed
		codeEl.dataset.monasidianHljs = resolvedLang;
	}

	/**
	 * React to settings changes. Call this whenever relevant settings are modified.
	 */
	async onSettingsChanged(
		newSettings: MonacoPrettierSettings,
		oldSettings: MonacoPrettierSettings
	): Promise<void> {
		const wasEnabled = oldSettings.enablePrettyCodeblocks;
		const isEnabled = newSettings.enablePrettyCodeblocks;

		if (wasEnabled && !isEnabled) {
			// Feature toggled off
			this.cleanup();
			this.rerenderAllMarkdownViews();
			return;
		}

		if (!wasEnabled && isEnabled) {
			// Feature toggled on
			await this.initialize();
			this.rerenderAllMarkdownViews();
			return;
		}

		if (!isEnabled) return;

		// Theme or background setting changed
		if (
			newSettings.codeblockTheme !== oldSettings.codeblockTheme ||
			newSettings.codeblockAllowThemeBackground !== oldSettings.codeblockAllowThemeBackground
		) {
			await this.applyTheme(newSettings.codeblockTheme);
		}

		// Language groups changed — compare key-by-key to avoid JSON.stringify key-order sensitivity
		const allGroupKeys = new Set([
			...Object.keys(newSettings.enabledLanguageGroups),
			...Object.keys(oldSettings.enabledLanguageGroups),
		]);
		let groupsChanged = false;
		const groupKeyArr = Array.from(allGroupKeys);
		for (let ki = 0; ki < groupKeyArr.length; ki++) {
			const key = groupKeyArr[ki];
			if (!!newSettings.enabledLanguageGroups[key] !== !!oldSettings.enabledLanguageGroups[key]) {
				groupsChanged = true;
				break;
			}
		}

		if (groupsChanged) {
			// Determine groups newly disabled
			const oldEnabled = getEnabledLanguageSet(oldSettings);
			const newEnabled = getEnabledLanguageSet(newSettings);

			// Unregister languages that are no longer in any enabled group
			for (const lang of oldEnabled) {
				if (!newEnabled.has(lang)) {
					try {
						hljs.unregisterLanguage(lang);
					} catch {
						// Ignore — unregisterLanguage may not exist in older hljs versions
					}
				}
			}

			// Register newly enabled languages
			this.registerEnabledLanguages(newSettings.enabledLanguageGroups);
			this.rerenderAllMarkdownViews();
		}
	}

	/**
	 * Force re-render of all open markdown preview leaves.
	 */
	rerenderAllMarkdownViews(): void {
		this.plugin.app.workspace.iterateAllLeaves((leaf) => {
			const view = leaf.view as any;
			if (view.previewMode?.rerender) {
				view.previewMode.rerender(true);
			}
		});
	}

	/**
	 * Remove injected theme CSS from all Documents. Called on plugin unload or when feature is disabled.
	 */
	cleanup(): void {
		// Remove from every document that had CSS injected
		const docs = new Set<Document>();
		docs.add(document);
		if (this.app?.workspace) {
			this.app.workspace.iterateAllLeaves((leaf) => {
				const doc = (leaf.view?.containerEl?.ownerDocument) as Document | null;
				if (doc) docs.add(doc);
			});
		}
		docs.forEach((doc) => {
			this.themeStylesByDoc.get(doc)?.remove();
		});
		this.currentThemeCss = null;
	}
}
