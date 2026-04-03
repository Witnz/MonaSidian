import type { MonacoPrettierSettings } from "./settings";

// Static imports of all highlight.js language grammars
import _1c from "highlight.js/lib/languages/1c";
import _abnf from "highlight.js/lib/languages/abnf";
import _accesslog from "highlight.js/lib/languages/accesslog";
import _actionscript from "highlight.js/lib/languages/actionscript";
import _ada from "highlight.js/lib/languages/ada";
import _angelscript from "highlight.js/lib/languages/angelscript";
import _apache from "highlight.js/lib/languages/apache";
import _applescript from "highlight.js/lib/languages/applescript";
import _arcade from "highlight.js/lib/languages/arcade";
import _arduino from "highlight.js/lib/languages/arduino";
import _armasm from "highlight.js/lib/languages/armasm";
import _asciidoc from "highlight.js/lib/languages/asciidoc";
import _aspectj from "highlight.js/lib/languages/aspectj";
import _autohotkey from "highlight.js/lib/languages/autohotkey";
import _autoit from "highlight.js/lib/languages/autoit";
import _avrasm from "highlight.js/lib/languages/avrasm";
import _awk from "highlight.js/lib/languages/awk";
import _axapta from "highlight.js/lib/languages/axapta";
import _bash from "highlight.js/lib/languages/bash";
import _basic from "highlight.js/lib/languages/basic";
import _bnf from "highlight.js/lib/languages/bnf";
import _brainfuck from "highlight.js/lib/languages/brainfuck";
import _c from "highlight.js/lib/languages/c";
import _cal from "highlight.js/lib/languages/cal";
import _capnproto from "highlight.js/lib/languages/capnproto";
import _ceylon from "highlight.js/lib/languages/ceylon";
import _clean from "highlight.js/lib/languages/clean";
import _clojure from "highlight.js/lib/languages/clojure";
import _clojureRepl from "highlight.js/lib/languages/clojure-repl";
import _cmake from "highlight.js/lib/languages/cmake";
import _coffeescript from "highlight.js/lib/languages/coffeescript";
import _coq from "highlight.js/lib/languages/coq";
import _cos from "highlight.js/lib/languages/cos";
import _cpp from "highlight.js/lib/languages/cpp";
import _crmsh from "highlight.js/lib/languages/crmsh";
import _crystal from "highlight.js/lib/languages/crystal";
import _csharp from "highlight.js/lib/languages/csharp";
import _csp from "highlight.js/lib/languages/csp";
import _css from "highlight.js/lib/languages/css";
import _d from "highlight.js/lib/languages/d";
import _dart from "highlight.js/lib/languages/dart";
import _delphi from "highlight.js/lib/languages/delphi";
import _diff from "highlight.js/lib/languages/diff";
import _django from "highlight.js/lib/languages/django";
import _dns from "highlight.js/lib/languages/dns";
import _dockerfile from "highlight.js/lib/languages/dockerfile";
import _dos from "highlight.js/lib/languages/dos";
import _dsconfig from "highlight.js/lib/languages/dsconfig";
import _dts from "highlight.js/lib/languages/dts";
import _dust from "highlight.js/lib/languages/dust";
import _ebnf from "highlight.js/lib/languages/ebnf";
import _elixir from "highlight.js/lib/languages/elixir";
import _elm from "highlight.js/lib/languages/elm";
import _erb from "highlight.js/lib/languages/erb";
import _erlang from "highlight.js/lib/languages/erlang";
import _erlangRepl from "highlight.js/lib/languages/erlang-repl";
import _excel from "highlight.js/lib/languages/excel";
import _fix from "highlight.js/lib/languages/fix";
import _flix from "highlight.js/lib/languages/flix";
import _fortran from "highlight.js/lib/languages/fortran";
import _fsharp from "highlight.js/lib/languages/fsharp";
import _gams from "highlight.js/lib/languages/gams";
import _gauss from "highlight.js/lib/languages/gauss";
import _gcode from "highlight.js/lib/languages/gcode";
import _gherkin from "highlight.js/lib/languages/gherkin";
import _glsl from "highlight.js/lib/languages/glsl";
import _gml from "highlight.js/lib/languages/gml";
import _go from "highlight.js/lib/languages/go";
import _golo from "highlight.js/lib/languages/golo";
import _gradle from "highlight.js/lib/languages/gradle";
import _graphql from "highlight.js/lib/languages/graphql";
import _groovy from "highlight.js/lib/languages/groovy";
import _haml from "highlight.js/lib/languages/haml";
import _handlebars from "highlight.js/lib/languages/handlebars";
import _haskell from "highlight.js/lib/languages/haskell";
import _haxe from "highlight.js/lib/languages/haxe";
import _hsp from "highlight.js/lib/languages/hsp";
import _http from "highlight.js/lib/languages/http";
import _hy from "highlight.js/lib/languages/hy";
import _inform7 from "highlight.js/lib/languages/inform7";
import _ini from "highlight.js/lib/languages/ini";
import _irpf90 from "highlight.js/lib/languages/irpf90";
import _isbl from "highlight.js/lib/languages/isbl";
import _java from "highlight.js/lib/languages/java";
import _javascript from "highlight.js/lib/languages/javascript";
import _jbossCli from "highlight.js/lib/languages/jboss-cli";
import _json from "highlight.js/lib/languages/json";
import _julia from "highlight.js/lib/languages/julia";
import _juliaRepl from "highlight.js/lib/languages/julia-repl";
import _kotlin from "highlight.js/lib/languages/kotlin";
import _lasso from "highlight.js/lib/languages/lasso";
import _latex from "highlight.js/lib/languages/latex";
import _ldif from "highlight.js/lib/languages/ldif";
import _leaf from "highlight.js/lib/languages/leaf";
import _less from "highlight.js/lib/languages/less";
import _lisp from "highlight.js/lib/languages/lisp";
import _livecodeserver from "highlight.js/lib/languages/livecodeserver";
import _livescript from "highlight.js/lib/languages/livescript";
import _llvm from "highlight.js/lib/languages/llvm";
import _lsl from "highlight.js/lib/languages/lsl";
import _lua from "highlight.js/lib/languages/lua";
import _makefile from "highlight.js/lib/languages/makefile";
import _markdown from "highlight.js/lib/languages/markdown";
import _mathematica from "highlight.js/lib/languages/mathematica";
import _matlab from "highlight.js/lib/languages/matlab";
import _maxima from "highlight.js/lib/languages/maxima";
import _mel from "highlight.js/lib/languages/mel";
import _mercury from "highlight.js/lib/languages/mercury";
import _mipsasm from "highlight.js/lib/languages/mipsasm";
import _mizar from "highlight.js/lib/languages/mizar";
import _mojolicious from "highlight.js/lib/languages/mojolicious";
import _monkey from "highlight.js/lib/languages/monkey";
import _moonscript from "highlight.js/lib/languages/moonscript";
import _n1ql from "highlight.js/lib/languages/n1ql";
import _nestedtext from "highlight.js/lib/languages/nestedtext";
import _nginx from "highlight.js/lib/languages/nginx";
import _nim from "highlight.js/lib/languages/nim";
import _nix from "highlight.js/lib/languages/nix";
import _nodeRepl from "highlight.js/lib/languages/node-repl";
import _nsis from "highlight.js/lib/languages/nsis";
import _objectivec from "highlight.js/lib/languages/objectivec";
import _ocaml from "highlight.js/lib/languages/ocaml";
import _openscad from "highlight.js/lib/languages/openscad";
import _oxygene from "highlight.js/lib/languages/oxygene";
import _parser3 from "highlight.js/lib/languages/parser3";
import _perl from "highlight.js/lib/languages/perl";
import _pf from "highlight.js/lib/languages/pf";
import _pgsql from "highlight.js/lib/languages/pgsql";
import _php from "highlight.js/lib/languages/php";
import _phpTemplate from "highlight.js/lib/languages/php-template";
import _plaintext from "highlight.js/lib/languages/plaintext";
import _pony from "highlight.js/lib/languages/pony";
import _powershell from "highlight.js/lib/languages/powershell";
import _processing from "highlight.js/lib/languages/processing";
import _profile from "highlight.js/lib/languages/profile";
import _prolog from "highlight.js/lib/languages/prolog";
import _properties from "highlight.js/lib/languages/properties";
import _protobuf from "highlight.js/lib/languages/protobuf";
import _puppet from "highlight.js/lib/languages/puppet";
import _purebasic from "highlight.js/lib/languages/purebasic";
import _python from "highlight.js/lib/languages/python";
import _pythonRepl from "highlight.js/lib/languages/python-repl";
import _q from "highlight.js/lib/languages/q";
import _qml from "highlight.js/lib/languages/qml";
import _r from "highlight.js/lib/languages/r";
import _reasonml from "highlight.js/lib/languages/reasonml";
import _rib from "highlight.js/lib/languages/rib";
import _roboconf from "highlight.js/lib/languages/roboconf";
import _routeros from "highlight.js/lib/languages/routeros";
import _rsl from "highlight.js/lib/languages/rsl";
import _ruby from "highlight.js/lib/languages/ruby";
import _ruleslanguage from "highlight.js/lib/languages/ruleslanguage";
import _rust from "highlight.js/lib/languages/rust";
import _sas from "highlight.js/lib/languages/sas";
import _scala from "highlight.js/lib/languages/scala";
import _scheme from "highlight.js/lib/languages/scheme";
import _scilab from "highlight.js/lib/languages/scilab";
import _scss from "highlight.js/lib/languages/scss";
import _shell from "highlight.js/lib/languages/shell";
import _smali from "highlight.js/lib/languages/smali";
import _smalltalk from "highlight.js/lib/languages/smalltalk";
import _sml from "highlight.js/lib/languages/sml";
import _sqf from "highlight.js/lib/languages/sqf";
import _sql from "highlight.js/lib/languages/sql";
import _stan from "highlight.js/lib/languages/stan";
import _stata from "highlight.js/lib/languages/stata";
import _step21 from "highlight.js/lib/languages/step21";
import _stylus from "highlight.js/lib/languages/stylus";
import _subunit from "highlight.js/lib/languages/subunit";
import _swift from "highlight.js/lib/languages/swift";
import _taggerscript from "highlight.js/lib/languages/taggerscript";
import _tap from "highlight.js/lib/languages/tap";
import _tcl from "highlight.js/lib/languages/tcl";
import _thrift from "highlight.js/lib/languages/thrift";
import _tp from "highlight.js/lib/languages/tp";
import _twig from "highlight.js/lib/languages/twig";
import _typescript from "highlight.js/lib/languages/typescript";
import _vala from "highlight.js/lib/languages/vala";
import _vbnet from "highlight.js/lib/languages/vbnet";
import _vbscript from "highlight.js/lib/languages/vbscript";
import _vbscriptHtml from "highlight.js/lib/languages/vbscript-html";
import _verilog from "highlight.js/lib/languages/verilog";
import _vhdl from "highlight.js/lib/languages/vhdl";
import _vim from "highlight.js/lib/languages/vim";
import _wasm from "highlight.js/lib/languages/wasm";
import _wren from "highlight.js/lib/languages/wren";
import _x86asm from "highlight.js/lib/languages/x86asm";
import _xl from "highlight.js/lib/languages/xl";
import _xml from "highlight.js/lib/languages/xml";
import _xquery from "highlight.js/lib/languages/xquery";
import _yaml from "highlight.js/lib/languages/yaml";
import _zephir from "highlight.js/lib/languages/zephir";

// Language groups from the MonaSidian implementation spec
export const LANGUAGE_GROUPS: Record<string, string[]> = {
	Assembler: ["armasm", "avrasm", "llvm", "mipsasm", "smali", "x86asm"],
	"Build-system": ["cmake", "gradle", "makefile", "oxygene"],
	Common: [
		"bash", "c", "cpp", "csharp", "css", "diff", "go", "graphql", "ini",
		"java", "javascript", "json", "kotlin", "less", "lua", "makefile",
		"markdown", "objectivec", "perl", "php-template", "php", "plaintext",
		"python-repl", "python", "r", "ruby", "rust", "scss", "shell", "sql",
		"swift", "typescript", "vbnet", "wasm", "xml", "yaml",
	],
	Config: [
		"apache", "crmsh", "dns", "dockerfile", "dsconfig", "dts", "ini",
		"jboss-cli", "ldif", "nestedtext", "nginx", "pf", "properties",
		"puppet", "roboconf", "yaml",
	],
	Css: ["css", "less", "scss", "stylus"],
	Database: ["lasso", "n1ql", "pgsql", "q", "sql"],
	Enterprise: ["1c", "axapta", "cal", "cos", "dsconfig", "excel", "isbl", "java", "ldif", "livecodeserver", "q", "ruleslanguage"],
	Functional: [
		"clean", "coq", "elixir", "elm", "erlang-repl", "erlang", "flix",
		"fsharp", "haskell", "mercury", "ocaml", "prolog", "q", "reasonml",
		"scala", "sml", "xquery",
	],
	Gaming: ["inform7", "lua", "monkey"],
	Graphics: ["glsl", "mel", "processing", "rib", "rsl"],
	Hardware: ["gcode", "tp", "verilog", "vhdl"],
	Lisp: ["clojure-repl", "clojure", "hy", "lisp", "scheme"],
	Logs: ["accesslog"],
	Markup: ["asciidoc", "latex", "markdown"],
	Miscellaneous: ["ada", "brainfuck", "fix", "gherkin", "profile", "tap", "xl"],
	Protocols: ["capnproto", "http", "json", "protobuf", "subunit", "thrift"],
	Scientific: [
		"fortran", "gams", "gauss", "irpf90", "julia-repl", "julia",
		"mathematica", "matlab", "maxima", "mizar", "openscad", "r", "sas",
		"scilab", "stan", "stata",
	],
	Scripting: [
		"actionscript", "angelscript", "applescript", "arcade", "autohotkey",
		"autoit", "awk", "bash", "coffeescript", "cos", "dart", "dos", "gml",
		"hsp", "javascript", "livescript", "lsl", "lua", "moonscript",
		"node-repl", "nsis", "powershell", "qml", "routeros", "ruby", "sqf",
		"taggerscript", "tcl", "typescript", "vbscript-html", "vbscript", "vim",
		"wren",
	],
	Syntax: ["abnf", "bnf", "ebnf", "step21"],
	System: [
		"arduino", "aspectj", "basic", "c", "ceylon", "cpp", "crystal", "d",
		"delphi", "go", "golo", "groovy", "haxe", "nim", "nix", "pony",
		"purebasic", "rust", "smalltalk", "swift", "vala",
	],
	Template: ["django", "dust", "erb", "haml", "handlebars", "leaf", "mojolicious", "parser3", "twig"],
	Web: [
		"accesslog", "apache", "csp", "css", "graphql", "http", "javascript",
		"json", "lasso", "less", "nginx", "scss", "stylus", "wasm", "xml",
		"zephir",
	],
};

// Built-in aliases: non-standard fence names → canonical hljs language name
export const LANGUAGE_ALIASES: Record<string, string> = {
	golang: "go",
	py: "python",
	py3: "python",
	pwsh: "powershell",
	ps1: "powershell",
	sh: "bash",
	zsh: "bash",
	"c++": "cpp",
	"c#": "csharp",
	rb: "ruby",
	nodejs: "javascript",
	node: "javascript",
	ts: "typescript",
	yml: "yaml",
	js: "javascript",
	jsx: "javascript",
	tsx: "typescript",
	htm: "xml",
	svg: "xml",
	dockerfile: "dockerfile",
	docker: "dockerfile",
	kt: "kotlin",
	kts: "kotlin",
};

// Transitive grammar dependencies: registering these languages also requires their deps
export const LANGUAGE_DEPENDENCIES: Record<string, string[]> = {
	"php-template": ["php", "xml", "css", "javascript"],
	erb: ["ruby", "xml"],
	django: ["xml"],
	haml: ["ruby"],
	dust: ["xml"],
	handlebars: ["xml"],
	mojolicious: ["xml"],
	"vbscript-html": ["vbscript", "xml"],
};

// Static registry mapping language name → hljs grammar function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LANGUAGE_REGISTRY: Record<string, (hljs: any) => any> = {
	"1c": _1c,
	abnf: _abnf,
	accesslog: _accesslog,
	actionscript: _actionscript,
	ada: _ada,
	angelscript: _angelscript,
	apache: _apache,
	applescript: _applescript,
	arcade: _arcade,
	arduino: _arduino,
	armasm: _armasm,
	asciidoc: _asciidoc,
	aspectj: _aspectj,
	autohotkey: _autohotkey,
	autoit: _autoit,
	avrasm: _avrasm,
	awk: _awk,
	axapta: _axapta,
	bash: _bash,
	basic: _basic,
	bnf: _bnf,
	brainfuck: _brainfuck,
	c: _c,
	cal: _cal,
	capnproto: _capnproto,
	ceylon: _ceylon,
	clean: _clean,
	clojure: _clojure,
	"clojure-repl": _clojureRepl,
	cmake: _cmake,
	coffeescript: _coffeescript,
	coq: _coq,
	cos: _cos,
	cpp: _cpp,
	crmsh: _crmsh,
	crystal: _crystal,
	csharp: _csharp,
	csp: _csp,
	css: _css,
	d: _d,
	dart: _dart,
	delphi: _delphi,
	diff: _diff,
	django: _django,
	dns: _dns,
	dockerfile: _dockerfile,
	dos: _dos,
	dsconfig: _dsconfig,
	dts: _dts,
	dust: _dust,
	ebnf: _ebnf,
	elixir: _elixir,
	elm: _elm,
	erb: _erb,
	erlang: _erlang,
	"erlang-repl": _erlangRepl,
	excel: _excel,
	fix: _fix,
	flix: _flix,
	fortran: _fortran,
	fsharp: _fsharp,
	gams: _gams,
	gauss: _gauss,
	gcode: _gcode,
	gherkin: _gherkin,
	glsl: _glsl,
	gml: _gml,
	go: _go,
	golo: _golo,
	gradle: _gradle,
	graphql: _graphql,
	groovy: _groovy,
	haml: _haml,
	handlebars: _handlebars,
	haskell: _haskell,
	haxe: _haxe,
	hsp: _hsp,
	http: _http,
	hy: _hy,
	inform7: _inform7,
	ini: _ini,
	irpf90: _irpf90,
	isbl: _isbl,
	java: _java,
	javascript: _javascript,
	"jboss-cli": _jbossCli,
	json: _json,
	julia: _julia,
	"julia-repl": _juliaRepl,
	kotlin: _kotlin,
	lasso: _lasso,
	latex: _latex,
	ldif: _ldif,
	leaf: _leaf,
	less: _less,
	lisp: _lisp,
	livecodeserver: _livecodeserver,
	livescript: _livescript,
	llvm: _llvm,
	lsl: _lsl,
	lua: _lua,
	makefile: _makefile,
	markdown: _markdown,
	mathematica: _mathematica,
	matlab: _matlab,
	maxima: _maxima,
	mel: _mel,
	mercury: _mercury,
	mipsasm: _mipsasm,
	mizar: _mizar,
	mojolicious: _mojolicious,
	monkey: _monkey,
	moonscript: _moonscript,
	n1ql: _n1ql,
	nestedtext: _nestedtext,
	nginx: _nginx,
	nim: _nim,
	nix: _nix,
	"node-repl": _nodeRepl,
	nsis: _nsis,
	objectivec: _objectivec,
	ocaml: _ocaml,
	openscad: _openscad,
	oxygene: _oxygene,
	parser3: _parser3,
	perl: _perl,
	pf: _pf,
	pgsql: _pgsql,
	php: _php,
	"php-template": _phpTemplate,
	plaintext: _plaintext,
	pony: _pony,
	powershell: _powershell,
	processing: _processing,
	profile: _profile,
	prolog: _prolog,
	properties: _properties,
	protobuf: _protobuf,
	puppet: _puppet,
	purebasic: _purebasic,
	python: _python,
	"python-repl": _pythonRepl,
	q: _q,
	qml: _qml,
	r: _r,
	reasonml: _reasonml,
	rib: _rib,
	roboconf: _roboconf,
	routeros: _routeros,
	rsl: _rsl,
	ruby: _ruby,
	ruleslanguage: _ruleslanguage,
	rust: _rust,
	sas: _sas,
	scala: _scala,
	scheme: _scheme,
	scilab: _scilab,
	scss: _scss,
	shell: _shell,
	smali: _smali,
	smalltalk: _smalltalk,
	sml: _sml,
	sqf: _sqf,
	sql: _sql,
	stan: _stan,
	stata: _stata,
	step21: _step21,
	stylus: _stylus,
	subunit: _subunit,
	swift: _swift,
	taggerscript: _taggerscript,
	tap: _tap,
	tcl: _tcl,
	thrift: _thrift,
	tp: _tp,
	twig: _twig,
	typescript: _typescript,
	vala: _vala,
	vbnet: _vbnet,
	vbscript: _vbscript,
	"vbscript-html": _vbscriptHtml,
	verilog: _verilog,
	vhdl: _vhdl,
	vim: _vim,
	wasm: _wasm,
	wren: _wren,
	x86asm: _x86asm,
	xl: _xl,
	xml: _xml,
	xquery: _xquery,
	yaml: _yaml,
	zephir: _zephir,
};

// All available hljs theme names (non-minified, no extension; image-based themes excluded)
export const HLJS_THEMES: string[] = [
	"a11y-dark", "a11y-light", "agate", "an-old-hope", "androidstudio",
	"arduino-light", "arta", "ascetic", "atom-one-dark-reasonable",
	"atom-one-dark", "atom-one-light",
	// base16 themes
	"base16/3024", "base16/apathy", "base16/apprentice", "base16/ashes",
	"base16/atelier-cave-light", "base16/atelier-cave",
	"base16/atelier-dune-light", "base16/atelier-dune",
	"base16/atelier-estuary-light", "base16/atelier-estuary",
	"base16/atelier-forest-light", "base16/atelier-forest",
	"base16/atelier-heath-light", "base16/atelier-heath",
	"base16/atelier-lakeside-light", "base16/atelier-lakeside",
	"base16/atelier-plateau-light", "base16/atelier-plateau",
	"base16/atelier-savanna-light", "base16/atelier-savanna",
	"base16/atelier-seaside-light", "base16/atelier-seaside",
	"base16/atelier-sulphurpool-light", "base16/atelier-sulphurpool",
	"base16/atlas", "base16/bespin", "base16/black-metal-bathory",
	"base16/black-metal-burzum", "base16/black-metal-dark-funeral",
	"base16/black-metal-gorgoroth", "base16/black-metal-immortal",
	"base16/black-metal-khold", "base16/black-metal-marduk",
	"base16/black-metal-mayhem", "base16/black-metal-nile",
	"base16/black-metal-venom", "base16/black-metal",
	"base16/brewer", "base16/bright", "base16/brogrammer",
	"base16/brush-trees-dark", "base16/brush-trees", "base16/chalk",
	"base16/circus", "base16/classic-dark", "base16/classic-light",
	"base16/codeschool", "base16/colors", "base16/cupcake",
	"base16/cupertino", "base16/danqing", "base16/darcula",
	"base16/dark-violet", "base16/darkmoss", "base16/darktooth",
	"base16/decaf", "base16/default-dark", "base16/default-light",
	"base16/dirtysea", "base16/dracula", "base16/edge-dark",
	"base16/edge-light", "base16/eighties", "base16/embers",
	"base16/equilibrium-dark", "base16/equilibrium-gray-dark",
	"base16/equilibrium-gray-light", "base16/equilibrium-light",
	"base16/espresso", "base16/eva-dim", "base16/eva", "base16/flat",
	"base16/framer", "base16/fruit-soda", "base16/gigavolt",
	"base16/github", "base16/google-dark", "base16/google-light",
	"base16/grayscale-dark", "base16/grayscale-light",
	"base16/green-screen", "base16/gruvbox-dark-hard",
	"base16/gruvbox-dark-medium", "base16/gruvbox-dark-pale",
	"base16/gruvbox-dark-soft", "base16/gruvbox-light-hard",
	"base16/gruvbox-light-medium", "base16/gruvbox-light-soft",
	"base16/hardcore", "base16/harmonic16-dark", "base16/harmonic16-light",
	"base16/heetch-dark", "base16/heetch-light", "base16/helios",
	"base16/hopscotch", "base16/horizon-dark", "base16/horizon-light",
	"base16/humanoid-dark", "base16/humanoid-light",
	"base16/ia-dark", "base16/ia-light", "base16/icy-dark",
	"base16/ir-black", "base16/isotope", "base16/kimber",
	"base16/london-tube", "base16/macintosh", "base16/marrakesh",
	"base16/materia", "base16/material-darker", "base16/material-lighter",
	"base16/material-palenight", "base16/material-vivid", "base16/material",
	"base16/mellow-purple", "base16/mexico-light", "base16/mocha",
	"base16/monokai", "base16/nebula", "base16/nord", "base16/nova",
	"base16/ocean", "base16/oceanicnext", "base16/one-light",
	"base16/onedark", "base16/outrun-dark", "base16/papercolor-dark",
	"base16/papercolor-light", "base16/paraiso", "base16/pasque",
	"base16/phd", "base16/pico", "base16/pop", "base16/porple",
	"base16/qualia", "base16/railscasts", "base16/rebecca",
	"base16/ros-pine-dawn", "base16/ros-pine-moon", "base16/ros-pine",
	"base16/sagelight", "base16/sandcastle", "base16/seti-ui",
	"base16/shapeshifter", "base16/silk-dark", "base16/silk-light",
	"base16/snazzy", "base16/solar-flare-light", "base16/solar-flare",
	"base16/solarized-dark", "base16/solarized-light", "base16/spacemacs",
	"base16/summercamp", "base16/summerfruit-dark",
	"base16/summerfruit-light", "base16/synth-midnight-terminal-dark",
	"base16/synth-midnight-terminal-light", "base16/tango", "base16/tender",
	"base16/tomorrow-night", "base16/tomorrow", "base16/twilight",
	"base16/unikitty-dark", "base16/unikitty-light", "base16/vulcan",
	"base16/windows-10-light", "base16/windows-10",
	"base16/windows-95-light", "base16/windows-95",
	"base16/windows-high-contrast-light", "base16/windows-high-contrast",
	"base16/windows-nt-light", "base16/windows-nt", "base16/woodland",
	"base16/xcode-dusk", "base16/zenburn",
	// regular themes continued
	"codepen-embed", "color-brewer",
	"cybertopia-cherry", "cybertopia-dimmer", "cybertopia-icecap",
	"cybertopia-saturated", "dark", "default", "devibeans", "docco",
	"far", "felipec", "foundation", "github-dark-dimmed", "github-dark",
	"github", "gml", "googlecode", "gradient-dark", "gradient-light",
	"grayscale", "hybrid", "idea", "intellij-light", "ir-black",
	"isbl-editor-dark", "isbl-editor-light", "kimbie-dark", "kimbie-light",
	"lightfair", "lioshi", "magula", "mono-blue", "monokai-sublime",
	"monokai", "night-owl", "nnfx-dark", "nnfx-light", "nord", "obsidian",
	"panda-syntax-dark", "panda-syntax-light", "paraiso-dark",
	"paraiso-light", "purebasic", "qtcreator-dark", "qtcreator-light",
	"rainbow", "rose-pine-dawn", "rose-pine-moon", "rose-pine", "routeros",
	"school-book", "shades-of-purple", "srcery", "stackoverflow-dark",
	"stackoverflow-light", "sunburst", "tokyo-night-dark",
	"tokyo-night-light", "tomorrow-night-blue", "tomorrow-night-bright",
	"vs", "vs2015", "xcode", "xt256",
];

/**
 * Returns the set of enabled language names, including transitive dependencies,
 * based on the current settings.
 */
export function getEnabledLanguageSet(settings: MonacoPrettierSettings): Set<string> {
	const result = new Set<string>();

	for (const [group, enabled] of Object.entries(settings.enabledLanguageGroups)) {
		if (!enabled) continue;
		const members = LANGUAGE_GROUPS[group];
		if (!members) continue;
		for (const lang of members) {
			result.add(lang);
		}
	}

	// Add transitive dependencies
	const toProcess = [...result];
	for (const lang of toProcess) {
		const deps = LANGUAGE_DEPENDENCIES[lang];
		if (deps) {
			for (const dep of deps) {
				result.add(dep);
			}
		}
	}

	return result;
}

/**
 * Map an hljs language name to the equivalent Monaco editor language ID.
 */
export function hljs2monaco(lang: string): string {
	const MAP: Record<string, string> = {
		bash: "shell",
		sh: "shell",
		zsh: "shell",
		csharp: "csharp",
		"c++": "cpp",
		objectivec: "objective-c",
		"php-template": "php",
		"python-repl": "python",
		"julia-repl": "julia",
		"erlang-repl": "erlang",
		"node-repl": "javascript",
		"clojure-repl": "clojure",
		"vbscript-html": "html",
		xml: "xml",
		htm: "html",
		markdown: "markdown",
	};
	return MAP[lang] ?? lang;
}
