<script lang="ts">
	import hljs from 'highlight.js';
	// import 'highlight.js/styles/default.min.css';
	import 'highlight.js/styles/atom-one-dark.min.css';
	import { hljsDefineSvelte } from '../utils.js';

	hljs.registerLanguage('svelte', hljsDefineSvelte);
	type Props = { route: string };
	let { route }: Props = $props();

	let showScript = $state(false);
	let showControls = $state(false);

	function trimCode(code: string, { showScript }: { showScript: boolean }) {
		let trimmedCode = code;
		if (!showScript) {
			trimmedCode = trimmedCode.replace(/<script.*?>[\s\S]*?<\/script>/g, '');
		}
		if (!showControls) {
			trimmedCode = trimmedCode.replace(/<Controls.*?>[\s\S]*?<\/Controls>/g, '');
		}
		return trimmedCode.trim();
	}

	function highlightCode(code: string) {
		const trimmedCode = trimCode(code, { showScript });
		return hljs.highlight(trimmedCode, { language: 'svelte' }).value;
	}

	async function importSvelteFile(route: string) {
		const svelteFile = await import(`../routes/${route}/+page.svelte?raw`);
		return svelteFile.default;
	}
</script>

{#await importSvelteFile(route) then svelteFile}
	<iframe src={`/${route}`} title="demo" frameborder="0" class="mb-4 aspect-video w-full"> </iframe>
	<button
		class="btn preset-filled-primary-950-50"
		class:preset-filled-primary-200-800={showScript}
		onclick={() => (showScript = !showScript)}
	>
		{showScript ? 'Hide' : 'Show'} script
	</button>
	<button
		class="btn preset-filled-primary-950-50"
		class:preset-filled-primary-200-800={showControls}
		onclick={() => (showControls = !showControls)}
	>
		{showControls ? 'Hide' : 'Show'} controls
	</button>
	<code>
		<pre class="mt-4">{@html highlightCode(svelteFile)}</pre>
	</code>
{/await}

<style>
	code {
		& pre {
			padding: 1rem;
			border-radius: 0.5rem;
			color: white;
			background-color: #2b303b;
			overflow-y: scroll;
			tab-size: 2;

			& :global(.hljs-comment) {
				color: #65737e;
			}
		}
	}
</style>
