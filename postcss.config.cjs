/* eslint-disable @typescript-eslint/no-var-requires */
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const csso = require('postcss-csso');
// const postcssGlobalData = require('@csstools/postcss-global-data');

const config = {
	plugins: [
		// postcssGlobalData({
		// files: ['src/lib/styles/custom-media-queries.css']
		// }),
		postcssPresetEnv({
			stage: 3,
			features: {
				'nesting-rules': true,
				'custom-media-queries': true,
				'media-query-ranges': true
			}
		}),
		autoprefixer(),
		csso()
	]
};

module.exports = config;
