<script lang="ts">
	import Map from '$lib/Map.svelte';
	import Logo from '../components/Logo.svelte';
	import CopyIcon from '../components/CopyIcon.svelte';
	import TsIcon from '../components/TSIcon.svelte';
	import EventsIcon from '../components/EventsIcon.svelte';
	import ClusterIcon from '../components/ClusterIcon.svelte';
	import CustomizeIcon from '../components/CustomizeIcon.svelte';
	import SsrIcon from '../components/SSRIcon.svelte';

	function copyToClipboard(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) {
		const text = event.currentTarget.previousElementSibling?.textContent || '';
		navigator.clipboard.writeText(text).catch((error) => {
			console.error('Error copying text to clipboard:', error);
		});
	}
</script>

<div class="hero">
	<Map
		options={{
			center: [46.92025531537454, 2.04],
			zoom: 5.5,
			zoomSnap: 0.5,
			zoomControl: false,
			dragging: false,
			scrollWheelZoom: false,
			attributionControl: false
		}}
	/>
	<div class="overlay">
		<Logo width={'200'} />
		<h1>@radiofrance/svelte-leaflet</h1>
		<p class="baseline">Create Leaflet maps the Svelte way</p>
	</div>
</div>

<main>
	<div class="action-buttons">
		<a href="/docs/getting-started" class="getting-started">Getting started</a>
		<a href="/docs" class="documentation">Documentation</a>
	</div>
	<ul>
		<li><TsIcon /> Fully typed components</li>
		<li>
			<EventsIcon /> <span>Subscribe to all Leaflet events using <code>on:event_name</code></span>
		</li>
		<li><ClusterIcon /> Markers clustering</li>
		<li><CustomizeIcon /> Customize markers and clusters with Svelte components</li>
		<li><SsrIcon /> Compatible with SvelteKit SSR projects/pages</li>
	</ul>
	<h2>Installation</h2>
	<pre>
    <code>npm i -D @radiofrance/svelte-leaflet</code>
    <button on:click={copyToClipboard}><CopyIcon width="16" /></button>
  </pre>
</main>

<style>
	.hero {
		position: relative;
		height: 400px;
		overflow: hidden;
	}

	.overlay {
		position: absolute;
		width: calc(100% + 2px);
		height: 100%;
		left: calc(50% - 1px);
		transform: translateX(-50%);
		background-color: rgba(0, 0, 0, 0.6);
		text-align: center;
		top: 0;
		padding-top: 2rem;
	}
	h1 {
		color: white;
		font-size: 2rem;
		font-size: clamp(1rem, 5vw, 2rem);
		margin-bottom: 0.25em;
	}

	.baseline {
		font-size: 1.5em;
		font-size: clamp(1rem, 5vw, 1.5rem);
		color: rgb(137, 196, 66);
		text-shadow: 0 0 3px #000000;
	}

	pre {
		background-color: lightgray;
		color: black;
		display: inline-flex;
		gap: 0.5rem;
		align-items: center;
		padding: 0.25rem;
		border-radius: 0.25rem;
		/* border: 5px double gray; */
		margin: 1rem;
	}

	pre button {
		background: none;
		border: 2px outset gray;
		/* border-radius: 0.25rem; */
		padding: 0.25rem;
		cursor: pointer;
	}

	pre button:active {
		border-style: inset;
	}

	main {
		padding: 1rem;
	}

	main ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	main li {
		font-size: 1.25rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	main li :global(svg) {
		flex-shrink: 0;
	}

	code {
		background-color: lightgray;
		color: black;
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
	}

	.action-buttons {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.getting-started,
	.documentation {
		background-color: rgb(137, 196, 66);
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		cursor: pointer;
	}
</style>
