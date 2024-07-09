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

<p class="note">
	The <code>Map</code> component will take the full width and height of its parent container.
	<br />
	By itself on a blank page, a <code>&lt;Map/&gt;</code> won't probably be visible.
	<br />
	Give the body a height or wrap the <code>Map</code> component in a container with a height to make
	it visible.
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

<style>
	.note {
		font-size: 1.25rem;
		border: 1px solid var(--color-primary);
		max-width: 50ch;
		padding: 1rem;
		border-radius: 0.25rem;

		&::before {
			content: 'Note';
			display: block;
			font-weight: bold;
			margin-bottom: 0.5rem;
		}
	}
</style>
