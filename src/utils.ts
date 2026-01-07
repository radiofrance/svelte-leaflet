import type { HLJSApi } from 'highlight.js';

export function toggleDarkMode() {
	const element = document.documentElement;
	element.classList.toggle('dark');

	const isDark = element.classList.contains('dark');
	localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
}

/*
Language: Svelte.js
Requires: xml.js, javascript.js, css.js
Author: Alexey Schebelev
Description: Components of Svelte Framework
Source: https://github.com/bennymi/svhighlight/blob/main/src/lib/code/svelte-highlight.ts
Notes: replaced javascript highlighting by typescript
*/

export function hljsDefineSvelte(hljs: HLJSApi) {
	return {
		subLanguage: 'xml',
		contains: [
			hljs.COMMENT('<!--', '-->', {
				relevance: 10,
			}),
			{
				begin: /^(\s*)(<script(\s*context="module")?>)/gm,
				end: /^(\s*)(<\/script>)/gm,
				subLanguage: 'typescript',
				excludeBegin: true,
				excludeEnd: true,
				contains: [
					{
						begin: /^(\s*)(\$:)/gm,
						end: /(\s*)/gm,
						className: 'keyword',
					},
				],
			},
			{
				begin: /^(\s*)(<style.*>)/gm,
				end: /^(\s*)(<\/style>)/gm,
				subLanguage: 'css',
				excludeBegin: true,
				excludeEnd: true,
			},
			{
				begin: /\{/gm,
				end: /\}/gm,
				subLanguage: 'typescript',
				contains: [
					{
						begin: /[\{]/,
						end: /[\}]/,
						skip: true,
					},
					{
						begin: /([#:\/@])(if|else|each|await|then|catch|debug|html)/gm,
						className: 'keyword',
						relevance: 10,
					},
				],
			},
		],
	};
}
