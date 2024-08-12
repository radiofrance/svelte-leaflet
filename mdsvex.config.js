import { join, resolve } from 'node:path';
import highlighter from './src/lib/private/utilities/codeHighlighter.js';

const __dirname = resolve();

const config = {
	extensions: ['.svelte.md'],
	highlight: {
		highlighter
	},
	layout: join(__dirname, './src/components/MarkdownLayout.svelte')
};

export default config;
