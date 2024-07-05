<script lang="ts">
	import type { Map, MarkerClusterGroup, MarkerClusterGroupOptions } from 'leaflet';

	import { getContext, onMount, setContext, tick } from 'svelte';

	export let options: MarkerClusterGroupOptions = {};
	export let icon: any = null;

	let markerElement: HTMLElement;

	const L = globalThis.window.L;

	const getMap = getContext<() => Map>('map');
	let clusterGroup: MarkerClusterGroup;

	setContext('layerGroup', () => clusterGroup);
	onMount(async () => {
		const map = getMap();
		// using the "icon" prop API
		if (icon) {
			options.iconCreateFunction = function (cluster) {
				const html = document.createElement('div');
				new icon({ target: html, props: { count: cluster.getChildCount() } });
				return L.divIcon({ html });
			};
		}
		// using the "icon" slot API
		if (markerElement.childElementCount > 0) {
			options.iconCreateFunction = function (cluster) {
				const html = markerElement.innerHTML.replace('%count%', cluster.getChildCount().toString());
				return L.divIcon({ html });
			};
		}
		clusterGroup = L.markerClusterGroup(options);
		map.addLayer(clusterGroup);
	});
</script>

<slot />
<template>
	<div bind:this={markerElement} class="leaflet-markercluster">
		<slot name="icon" />
	</div>
</template>

<style>
	/* .leaflet-markercluster {
		display: none;
	}

	:global(.map-marker .leaflet-markercluster) {
		display: inherit;
	} */
</style>
