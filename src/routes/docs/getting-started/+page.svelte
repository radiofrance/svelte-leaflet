<script lang="ts">
	import CodeSnippet from '../../../components/CodeSnippet.svelte';
</script>

<h1>Getting started</h1>

<h2>Install</h2>
<CodeSnippet>npm i -D @radiofrance/svelte-leaflet</CodeSnippet>

<h2>Usage</h2>
<p>
	Import the <code>Map</code> component and use it in your Svelte pages/components.
</p>

<p>
	The <code>Map</code> component will take the full width and height of its parent container. By
	itself on a blank page, the <code>Map</code> won't probably be visible. Give the body a height or
	wrap the <code>Map</code> in a container with a height to make it visible.
</p>

<p>
	Here's a minimal SvelteKit <code>+page.svelte</code>
</p>

<CodeSnippet>
	{'<' +
		`script>
	import { Map } from '@radiofrance/svelte-leaflet';
</script>

<Map />

<` +
		`style>
	:global(body) {
		height: 100vh;
		margin: 0;
	}
</style>
`}
</CodeSnippet>
