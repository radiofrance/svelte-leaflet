<script lang="ts">
	import { Accordion, AppBar, Nav as Navigation } from '@skeletonlabs/skeleton-svelte';
	// Icons
	import SunMoon from 'lucide-svelte/icons/sun-moon';
	import Paperclip from 'lucide-svelte/icons/paperclip';
	import Calendar from 'lucide-svelte/icons/calendar';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import { toggleDarkMode } from '../../../utils.js';
	import Logo from '../../../components/Logo.svelte';

	let navOpen = $state(false);
	let { children } = $props();
</script>

<div class="min-h-screen whitespace-nowrap bg-surface-50-950 xl:px-40">
	<AppBar background="bg-surface-50-950">
		{#snippet lead()}
			<Menu size={20} class="xl:hidden" />
			<Logo width="50" />
		{/snippet}
		{#snippet trail()}
			<div class="hidden space-x-4 p-2 sm:flex">
				<Paperclip size={20} />
				<Calendar size={20} />
				<CircleUser size={20} />
			</div>
			<div>
				<button
					class="rounded-full p-2 hover:bg-surface-950-50 hover:text-surface-50-950"
					onclick={toggleDarkMode}
				>
					<SunMoon />
				</button>
			</div>
		{/snippet}
		<h1 class="text-2xl">@radiofrance/svelte-leaflet</h1>
	</AppBar>

	<div class="flex">
		<nav
			class="sticky top-0 hidden max-h-screen w-max self-start overflow-y-auto pb-96 bg-surface-50-950 xl:block xl:px-0"
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
		<div class="max-w-full px-8 bg-surface-50-950">
			{@render children()}
		</div>
	</div>
</div>
