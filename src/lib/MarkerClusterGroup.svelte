<script lang="ts">
	import type { Map, MarkerClusterGroup, MarkerClusterGroupOptions } from 'leaflet';

	import { getContext, onMount, setContext } from 'svelte';

	export let options: MarkerClusterGroupOptions = {};

	let markerElement: HTMLElement;

	const L = globalThis.window.L;

	const getMap = getContext<() => Map>('map');
	let markers: MarkerClusterGroup;

	setContext('layerGroup', () => markers);
	onMount(async () => {
		const map = getMap();
		markers = L.markerClusterGroup(options);
		map.addLayer(markers);
	});
</script>

<template>
	<div bind:this={markerElement} class="leaflet-markercluster">
		<slot name="icon" />
	</div>
</template>

<style>
	.leaflet-markercluster {
		display: none;
	}

	:global(.map-marker .leaflet-markercluster) {
		display: inherit;
	}
</style>
