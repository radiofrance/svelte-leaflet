<script lang="ts">
	import Logo from '$components/Logo.svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import SunMoon from 'lucide-svelte/icons/sun-moon';
	import { toggleDarkMode } from '../../../utils.js';

	let navOpen = $state(false);
	let { children } = $props();
</script>

<div class="min-h-screen whitespace-nowrap bg-surface-50-950 xl:px-40">
	<AppBar background="bg-surface-50-950">
		{#snippet lead()}
			<a href="/">
				<Logo width="50" />
			</a>
		{/snippet}
		<a href="/">
			<h1 class="text-2xl">@radiofrance/svelte-leaflet</h1>
		</a>
		{#snippet trail()}
			<div>
				<button
					class="rounded-full p-2 hover:bg-surface-950-50 hover:text-surface-50-950"
					onclick={toggleDarkMode}
				>
					<SunMoon />
				</button>
			</div>
		{/snippet}
	</AppBar>

	<div class="flex">
		<nav
			class="sticky top-0 max-h-screen w-max self-start overflow-y-auto overflow-x-hidden pb-96 bg-surface-50-950 xl:block xl:px-0"
			class:open={navOpen}
		>
			<h3 class="text-xl text-surface-700-300">Examples</h3>
			<ul>
				<li><a href="map">Map</a></li>
				<li><a href="marker">Marker</a></li>
				<li><a href="popup">Popup</a></li>
				<li><a href="cluster">Cluster</a></li>
				<li><a href="polygon">Polygon</a></li>
				<li><a href="list">List</a></li>
				<li><a href="tooltip">Tooltip</a></li>
				<li><a href="attribution-prefix">Attribution prefix</a></li>
				<li><a href="tilelayer">TileLayer</a></li>
				<li><a href="imageoverlay">ImageOverlay</a></li>
				<li><a href="videooverlay">VideoOPverlay</a></li>
				<li><a href="circle">Circle</a></li>
				<li><a href="circlemarker">CircleMarker</a></li>
				<li><a href="rectangle">Rectangle</a></li>
				<li><a href="svgoverlay">SVGOverlay</a></li>
			</ul>
		</nav>
		<!-- Content -->
		<div class="w-full px-8 bg-surface-50-950">
			{@render children()}
		</div>
	</div>
</div>
