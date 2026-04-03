import * as monaco from "monaco-editor";
import type { TreeSitterLanguageParser } from "./settings";

/**
 * Store for inline error decorations per editor
 */
const treeSitterInlineDecorations = new WeakMap<monaco.editor.IStandaloneCodeEditor, monaco.editor.IContentWidget[]>();

// Type definitions for tree-sitter
type TreeSitterParser = any;
type SyntaxNode = any;
type Tree = any;
type ParserModule = any;

/**
 * Tree-sitter integration for advanced syntax parsing and validation
 * Provides professional-grade parsing for multiple languages
 */

export interface TreeSitterError {
	line: number;
	column: number;
	endLine: number;
	endColumn: number;
	message: string;
	severity: "error" | "warning";
}

export class TreeSitterManager {
	private static initialized = false;
	private static parsers: Map<string, TreeSitterParser> = new Map();
	private static Parser: ParserModule = null;
	private static Language: any = null;
	private static settings: Record<string, TreeSitterLanguageParser> | null = null;
	
	// Language mappings
	private static languageMap: Record<string, string> = {
		'javascript': 'javascript',
		'javascriptreact': 'javascript',
		'typescript': 'typescript',
		'typescriptreact': 'tsx',
		'tsx': 'tsx',
		'python': 'python',
		'json': 'json',
		'css': 'css',
		'scss': 'css',
		'less': 'css',
		'go': 'go',
		'rust': 'rust',
		'java': 'java',
		'cpp': 'cpp',
		'c': 'cpp',
		'sh': 'bash',
		'bash': 'bash',
		'shell': 'bash',
		'zsh': 'bash',
	};

	/**
	 * Set parser settings for checking installation status
	 */
	static setSettings(parsers: Record<string, TreeSitterLanguageParser>): void {
		this.settings = parsers;
	}
	
	/**
	 * Initialize tree-sitter with WASM
	 */
	static async initialize(): Promise<void> {
		if (this.initialized) {
			return;
		}
		
		try {
			const module: any = await import('web-tree-sitter');
			
			// Get the Parser and Language classes from named exports
			this.Parser = module.Parser;
			this.Language = module.Language;
			
			// In Obsidian plugin context, load WASM from plugin directory
			const pluginDir = (window as any).app?.vault?.adapter?.basePath;
			
			// Load WASM file using Obsidian's adapter
			let wasmBuffer: ArrayBuffer;
			if (pluginDir) {
				const adapter = (window as any).app?.vault?.adapter;
				const wasmPath = `.obsidian/plugins/monaco-prettier-editor/wasm/tree-sitter.wasm`;
				
				try {
					const wasmData = await adapter.readBinary(wasmPath);
					
					// readBinary returns ArrayBuffer directly
					if (wasmData instanceof ArrayBuffer) {
						wasmBuffer = wasmData;
					} else if (wasmData?.buffer instanceof ArrayBuffer) {
						wasmBuffer = wasmData.buffer;
					} else {
						throw new Error('Unexpected WASM data format');
					}
				} catch (error) {
					throw new Error(`Could not load tree-sitter WASM file: ${(error as any).message}`);
				}
			} else {
				throw new Error('Could not determine plugin directory');
			}
			
			// Initialize with the loaded WASM buffer
			await this.Parser.init({
				wasmBinary: new Uint8Array(wasmBuffer),
				locateFile: () => '' // Dummy locateFile since we're providing wasmBinary
			});
			
			this.initialized = true;
		} catch (error) {
			console.error('Failed to initialize tree-sitter:', error);
			throw error;
		}
	}
	
	/**
	 * Get or create parser for a language
	 */
	private static async getParser(language: string): Promise<TreeSitterParser | null> {
		const treeSitterLang = this.languageMap[language];
		if (!treeSitterLang) {
			return null;
		}

		// Check if parser is installed in settings
		if (this.settings && this.settings[treeSitterLang] && !this.settings[treeSitterLang].installed) {
			return null;
		}
		
		// Return cached parser if available
		if (this.parsers.has(treeSitterLang)) {
			return this.parsers.get(treeSitterLang)!;
		}
		
		try {
			const parser = new this.Parser();
			
			// Get vault adapter for file access
			const adapter = (window as any).app?.vault?.adapter;
			if (!adapter) {
				throw new Error('Vault adapter not available');
			}

			// Construct local WASM file path
			const localPath = `.obsidian/plugins/monaco-prettier-editor/wasm/tree-sitter-${treeSitterLang}.wasm`;
			
			// Read WASM file from vault
			const wasmData = await adapter.readBinary(localPath);
			let wasmBuffer: ArrayBuffer;
			
			if (wasmData instanceof ArrayBuffer) {
				wasmBuffer = wasmData;
			} else if (wasmData.buffer instanceof ArrayBuffer) {
				wasmBuffer = wasmData.buffer;
			} else {
				throw new Error('WASM data is not an ArrayBuffer');
			}
			
			// Load the language using Language.load()
			const Lang = await this.Language.load(new Uint8Array(wasmBuffer));
			
			parser.setLanguage(Lang);
			this.parsers.set(treeSitterLang, parser);
			
			return parser;
			
		} catch (error) {
			console.error(`Failed to load tree-sitter parser for ${treeSitterLang}:`, error);
			return null;
		}
	}
	
	/**
	 * Parse code and detect syntax errors
	 */
	static async parse(language: string, code: string): Promise<TreeSitterError[]> {
		const errors: TreeSitterError[] = [];
		
		if (!this.initialized) {
			await this.initialize();
		}
		
		const parser = await this.getParser(language);
		if (!parser) {
			return errors;
		}
		
		try {
			const tree = parser.parse(code);
			const rootNode = tree.rootNode;
			
			// Find ERROR and MISSING nodes in the syntax tree
			this.findErrors(rootNode, errors, code);
		} catch (error) {
			console.error('Tree-sitter parsing error:', error);
		}
		
		return errors;
	}
	
	/**
	 * Recursively find error nodes in syntax tree
	 */
	private static findErrors(
		node: SyntaxNode,
		errors: TreeSitterError[],
		code: string
	): void {
		// Check if node is an error
		if (node.type === 'ERROR' || node.isMissing) {
			const startPos = node.startPosition;
			const endPos = node.endPosition;
			
			let message = node.isMissing 
				? `Missing ${node.type}`
				: 'Syntax error';
			
			// Try to provide more context
			if (node.parent) {
				message = `Unexpected ${node.type} in ${node.parent.type}`;
			}
			
			errors.push({
				line: startPos.row + 1,
				column: startPos.column + 1,
				endLine: endPos.row + 1,
				endColumn: endPos.column + 1,
				message,
				severity: 'error'
			});
		}
		
		// Check children
		for (let i = 0; i < node.childCount; i++) {
			const child = node.child(i);
			if (child) {
				this.findErrors(child, errors, code);
			}
		}
	}
	
	/**
	 * Get syntax tree for code analysis
	 */
	static async getSyntaxTree(language: string, code: string): Promise<Tree | null> {
		if (!this.initialized) {
			await this.initialize();
		}
		
		const parser = await this.getParser(language);
		if (!parser) return null;
		
		try {
			return parser.parse(code);
		} catch (error) {
			console.error('Failed to get syntax tree:', error);
			return null;
		}
	}
	
	/**
	 * Validate code and display markers in Monaco editor
	 */
	static async validateAndDisplayMarkers(
		editor: monaco.editor.IStandaloneCodeEditor,
		language: string,
		code: string,
		inlineFont?: string,
		inlineFontSize?: number
	): Promise<void> {
		const errors = await this.parse(language, code);
		
		const model = editor.getModel();
		if (!model) return;
		
		// Convert tree-sitter errors to Monaco markers
		const markers: monaco.editor.IMarkerData[] = errors.map(error => ({
			severity: error.severity === 'error' 
				? monaco.MarkerSeverity.Error 
				: monaco.MarkerSeverity.Warning,
			message: error.message,
			startLineNumber: error.line,
			startColumn: error.column,
			endLineNumber: error.endLine,
			endColumn: error.endColumn,
			source: 'Tree-sitter'
		}));
		
		monaco.editor.setModelMarkers(model, 'tree-sitter', markers);
		
		// Clear previous content widgets
		const oldWidgets = treeSitterInlineDecorations.get(editor) || [];
		oldWidgets.forEach(widget => editor.removeContentWidget(widget));
		
		// Create new content widgets for each error
		const widgets: monaco.editor.IContentWidget[] = [];
		errors.forEach((error, index) => {
			const lineContent = model.getLineContent(error.line);
			const isError = error.severity === "error";
			const widgetId = `tree-sitter-inline-${index}-${Date.now()}`;
			
			const widget: monaco.editor.IContentWidget = {
				getId: () => widgetId,
				getDomNode: () => {
					const node = document.createElement('span');
					node.className = isError ? 'monaco-inline-error' : 'monaco-inline-warning';
					node.textContent = ` ⚠️ ${error.message}`;
					node.style.opacity = '0.7';
					node.style.fontSize = inlineFontSize ? `${inlineFontSize}px` : '12px';
					node.style.fontFamily = inlineFont || "'Cascadia Code', 'Fira Code', Consolas, monospace";
					node.style.fontStyle = 'italic';
					node.style.paddingLeft = '0.75em';
					node.style.whiteSpace = 'nowrap';
					node.style.pointerEvents = 'none';
					node.style.userSelect = 'none';
					node.style.color = isError ? 'var(--text-error, #f48771)' : 'var(--text-warning, #ffa500)';
					return node;
				},
				getPosition: () => ({
					position: {
						lineNumber: error.line,
						column: lineContent.length + 1
					},
					preference: [monaco.editor.ContentWidgetPositionPreference.EXACT]
				})
			};
			
			editor.addContentWidget(widget);
			widgets.push(widget);
		});
		
		treeSitterInlineDecorations.set(editor, widgets);
	}
	
	/**
	 * Clean up resources
	 */
	static dispose(): void {
		this.parsers.clear();
		this.initialized = false;
	}
}
