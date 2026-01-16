<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { TileLayer as LeafletTileLayer, TileLayerOptions, Map as LeafletMap, Layer } from 'leaflet';
	import * as protomaps from 'protomaps-leaflet';
	import { getBaseLayersStore, MAP } from './contexts.js';
	import { getRandomString } from './utils.js';

	type Props = {
		url?: string;
		name?: string;
		options?: TileLayerOptions;
		instance?: ReturnType<typeof protomaps.leafletLayer>;
	};

	let {
		name = `layer-${getRandomString(5)}`,
		instance = $bindable(),
	}: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const baseLayersStore = getBaseLayersStore();

	onMount(() => {
		const map = getMap();
		instance = protomaps.leafletLayer({url:'https://api.protomaps.com/tiles/v4/{z}/{x}/{y}.mvt?key=1003762824b9687f', flavor: 'light', lang: 'en'});
		// as unknown as Layer is required because protomaps is typé avec les pieds
		$baseLayersStore[name] = instance as unknown as Layer;
		instance.addTo(map);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>
