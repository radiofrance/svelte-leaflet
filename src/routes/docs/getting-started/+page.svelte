<script lang="ts">
	import CodeSnippet from '../../../components/CodeSnippet.svelte';
	import minimalPage from '../../minimal/+page.svelte?raw';
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

<CodeSnippet>{minimalPage}</CodeSnippet>

<style>
</style>
