<script lang="ts">
	import Logo from '../components/Logo.svelte';
	import Map from '$lib/Map.svelte';
	import SunMoon from 'lucide-svelte/icons/sun-moon';
</script>

<div class="hero relative h-96 overflow-hidden">
	<Map
		options={{
			center: [46.92025531537454, 2.04],
			zoom: 5.5,
			zoomSnap: 0.5,
			zoomControl: false,
			attributionControl: false,
		}}
	/>

	<div
		class="overlay absolute top-0 h-full w-full border-b-2 border-solid border-surface-500 bg-surface-950/70 pt-10 text-center"
	>
		<Logo width={'200'} />
		<h1 class="text-[clamp(1.3rem,5vw,2.5rem)] text-primary-200">@radiofrance/svelte-leaflet</h1>
		<p class="text-surface-50">Create Leaflet maps the Svelte way</p>
	</div>

	<button
		class="absolute right-0 top-0 m-4 rounded-full p-2 bg-surface-50-950 hover:bg-surface-950-50 hover:text-surface-50-950"
		onclick={() => {
			const element = document.documentElement;
			element.classList.toggle('dark');

			const isDark = element.classList.contains('dark');
			localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
		}}
	>
		<SunMoon />
	</button>
</div>

<main class="relative h-[calc(100%-24rem)] p-5">
	<div class="mt-5 flex flex-col justify-center gap-4 sm:flex-row">
		<a href="docs/getting-started" class="btn preset-filled-surface-700-300"> Getting started </a>
		<a href="docs/documentation" class="btn preset-filled-surface-700-300">Documentation</a>
	</div>

	<div class="mt-5">
		<ul class="ml-5 list-disc">
			<li>Written with Svelte 5</li>
			<li>Fully typed props/events</li>
			<li>Subscribe to Leaflet events</li>
			<li>Markers clustering</li>
			<li>Customize markers, clusters and popups with Svelte components</li>
			<li>SSR compatible</li>
		</ul>
	</div>

	<nav class="absolute bottom-4">
		<ul>
			<li><a href="/map">Map</a></li>
			<li><a href="/marker">Marker</a></li>
			<li><a href="/popup">Popup</a></li>
			<li><a href="/cluster">Cluster</a></li>
			<li><a href="/polygon">Polygon</a></li>
			<li><a href="/list">List</a></li>
			<li><a href="/tooltip">Tooltip</a></li>
			<li><a href="/attribution-prefix">Attribution prefix</a></li>
			<li><a href="/tilelayer">TileLayer</a></li>
		</ul>
	</nav>
</main>
