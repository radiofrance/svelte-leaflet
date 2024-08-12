import { codeToHtml, getSingletonHighlighter } from 'shiki';
import { transformerMetaHighlight } from '@shikijs/transformers';
import { transformerTwoslash } from '@shikijs/twoslash';

const THEME = 'github-dark';

/**
 * @param {string} code
 * @param {string} lang
 * @param {string} meta
 */
async function highlighter(code, lang, meta) {
	await getSingletonHighlighter({
		langs: [lang],
		themes: [THEME]
	});
	const html = await codeToHtml(code, {
		theme: THEME,
		lang,
		meta: { __raw: meta },
		transformers: [transformerMetaHighlight(), transformerTwoslash()]
	});

	return escapeHtml(html);
}

/**
 * Returns code with curly braces and backticks replaced by HTML entity equivalents
 * @param {string} code - highlighted HTML
 * @returns {string} - escaped HTML
 */

function escapeHtml(code) {
	return code.replace(
		/[{}`]/g,
		(character) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' })[character] || ''
	);
}

export default highlighter;
