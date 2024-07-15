import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), preprocess()],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

		alias: {
			'$components/*': 'src/components/*',
			'@radiofrance/svelte-leaflet': 'src/lib/index.ts'
		}
	},

	vitePlugin: {
		// set to true for defaults or customize with object
		inspector: {
			// toggleKeyCombo: 'meta-shift',
			showToggleButton: 'always',
			toggleButtonPos: 'bottom-right'
		}
	}
};

export default config;
