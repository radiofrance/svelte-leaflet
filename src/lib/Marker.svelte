<script context="module" lang="ts">
	type MarkerContext = {
		id?: string;
	};
	export type Marker = LeafletMarker & MarkerContext;
</script>

<script lang="ts">
	import type {
		LatLngExpression,
		LayerGroup,
		Map,
		Marker as LeafletMarker,
		MarkerOptions
	} from 'leaflet';

	import { createEventDispatcher, getContext, onDestroy, setContext, tick } from 'svelte';

	const dispatch = createEventDispatcher();
	const L = globalThis.window.L;

	export let size = 25;
	export let latlng: LatLngExpression;
	export let id: string = '';

	let markerElement: HTMLElement;
	let marker: Marker;

	const getMap = getContext<() => Map>('map');
	const getLayerGroup = getContext<() => LayerGroup>('layerGroup');
	setContext('layer', () => marker);

	$: recreateMarker(size, latlng, id);

	async function recreateMarker(size: number, latlng: LatLngExpression, id: string) {
		removeMarker();
		await tick();
		createMarker(size, latlng, id);
	}

	async function createMarker(size: number, latlng: LatLngExpression, id: string) {
		await tick(); // waits for next paint so layers and map are done rendering
		const layerGroup = getLayerGroup?.();
		const map = getMap();
		const mapOrLayerGroup = layerGroup || map;
		const markerOptions: MarkerOptions = {};
		marker = L.marker(latlng, markerOptions);
		marker.id = id;
		marker
			.on('click', (e) => dispatch('click', e))
			.on('dblclick', (e) => dispatch('dblclick', e))
			.on('contextmenu', (e) => dispatch('contextmenu', e));
		mapOrLayerGroup.addLayer(marker);
		const icon = marker.getIcon();
		// icon.options.iconSize = L.point(width, height);
		await tick(); // waits for next paint so marker is done rendering
		if (markerElement.childElementCount > 0) {
			// if the marker has children, use them as the marker icon
			marker.setIcon(
				L.divIcon({
					html: markerElement,
					className: 'map-marker',
					iconSize: L.point(size, size)
				})
			);
		}
	}

	function removeMarker() {
		if (!marker) return;
		const layerGroup = getLayerGroup?.();
		const map = getMap();
		const mapOrLayerGroup = layerGroup || map;
		mapOrLayerGroup.removeLayer(marker);
	}

	onDestroy(() => {
		removeMarker();
	});
</script>

<template>
	{#key marker}
		{#if marker}
			<div bind:this={markerElement} class="leaflet-marker">
				<slot name="icon" />
			</div>
			<slot />
		{/if}
	{/key}
</template>

<style>
	.leaflet-marker {
		display: none;
	}

	:global(.map-marker .leaflet-marker) {
		display: inherit;
	}
</style>
