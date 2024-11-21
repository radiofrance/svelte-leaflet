<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { TileLayer as LeafletTileLayer, TileLayerOptions, Map as LeafletMap } from 'leaflet';
	import { MAP } from './contexts.js';

	type Props = {
		url: string;
		options?: TileLayerOptions;
		instance?: LeafletTileLayer;
	};

	let { url, options = {}, instance = $bindable() }: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);

	onMount(() => {
		const map = getMap();
		instance = window.L.tileLayer(url, options);
		instance.addTo(map);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>
