<script lang="ts">
	import Map from '$lib/Map.svelte';
	import Logo from '../components/Logo.svelte';
	import TsIcon from '../components/TSIcon.svelte';
	import EventsIcon from '../components/EventsIcon.svelte';
	import ClusterIcon from '../components/ClusterIcon.svelte';
	import CustomizeIcon from '../components/CustomizeIcon.svelte';
	import SsrIcon from '../components/SSRIcon.svelte';
</script>

<div class="container">
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
		<div class="features">
			<ul>
				<li><TsIcon /> Fully typed components</li>
				<li>
					<EventsIcon />
					<span>Subscribe to all Leaflet events using <code>on:event_name</code></span>
				</li>
				<li><ClusterIcon /> Markers clustering</li>
				<li><CustomizeIcon /> Customize markers and clusters with Svelte components</li>
				<li><SsrIcon /> Compatible with SvelteKit SSR projects/pages</li>
			</ul>
		</div>
	</main>

	<footer>
		Made with 💚 by <a href="https://github.com/radiofrance" target="_blank">Radio France</a>
	</footer>
</div>

<style lang="postcss">
	.container {
		height: 100vh;
	}
	.hero {
		position: relative;
		height: 400px;
		overflow: hidden;
		border-bottom: 2px solid var(--color-primary);
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
		font-weight: bold;
		font-size: 1.5em;
		font-size: clamp(1rem, 5vw, 1.5rem);
		color: var(--color-primary);
		text-shadow: 0 0 3px #000000;
	}

	main {
		padding: 1rem;

		ul {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
		li {
			font-size: 1.25rem;
			display: flex;
			align-items: center;
			gap: 1rem;
			& :global(svg) {
				flex-shrink: 0;
				color: var(--color-primary);
			}
		}
	}

	.features {
		margin-top: 2rem;
		margin-bottom: 5rem;
		display: flex;
		justify-content: center;
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
		gap: 2rem;
		padding: 1rem;
		margin-top: 2rem;
	}

	.getting-started,
	.documentation {
		background-color: var(--color-primary);
		/* border: 2px solid green; */
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		cursor: pointer;

		a& {
			text-decoration: none;
			color: black;
		}
	}

	footer {
		background-color: #222;
		text-align: center;
		padding: 1rem;
		border-top: 2px solid var(--color-primary);
		color: white;
		font-size: 1.25rem;
		font-size: clamp(1rem, 5vw, 1.25rem);
		bottom: 0;
		position: fixed;
		width: 100%;
		box-sizing: border-box;
	}
</style>
