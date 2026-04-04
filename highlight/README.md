# Highlight.js CDN Assets

[![install size](https://packagephobia.now.sh/badge?p=highlight.js)](https://packagephobia.now.sh/result?p=highlight.js)

**This package contains only the prebuilt Highlight.js assets required by this plugin, not the full upstream CDN release set.**

It is intended for plugin use cases that need a small, curated subset of client-side Highlight.js assets. If you're wanting to use highlight.js mainly on the server-side you likely want the [highlight.js][1] package instead.

Only include the language grammars and theme CSS files that are actually supported by the renderer, and add new assets selectively rather than vendoring the complete CDN distribution.

**If you need additional languages or themes, generate or copy only the specific assets required by your supported configuration instead of mirroring the full CDN build.**

---

## Highlight.js

Highlight.js is a syntax highlighter written in JavaScript. It works in
the browser as well as on the server. It works with pretty much any
markup, doesn’t depend on any framework, and has automatic language
detection.

If you'd like to read the full README:<br>
<https://github.com/highlightjs/highlight.js/blob/main/README.md>

## License

Highlight.js is released under the BSD License. See [LICENSE][7] file
for details.

## Links

The official site for the library is at <https://highlightjs.org/>.

The Github project may be found at: <https://github.com/highlightjs/highlight.js>

Further in-depth documentation for the API and other topics is at
<http://highlightjs.readthedocs.io/>.

A list of the Core Team and contributors can be found in the [CONTRIBUTORS.md][8] file.

[1]: https://www.npmjs.com/package/highlight.js
[7]: https://github.com/highlightjs/highlight.js/blob/main/LICENSE
[8]: https://github.com/highlightjs/highlight.js/blob/main/CONTRIBUTORS.md
