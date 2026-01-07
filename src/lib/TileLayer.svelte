<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { TileLayer as LeafletTileLayer, TileLayerOptions, Map as LeafletMap } from 'leaflet';
	import { getBaseLayersStore, MAP } from './contexts.js';
	import { getRandomString } from './utils.js';

	type Props = {
		url: string;
		name?: string;
		options?: TileLayerOptions;
		instance?: LeafletTileLayer;
	};

	let {
		url,
		name = `layer-${getRandomString(5)}`,
		options = {},
		instance = $bindable(),
	}: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const baseLayersStore = getBaseLayersStore();

	onMount(() => {
		const map = getMap();
		instance = window.L.tileLayer(url, options);
		$baseLayersStore[name] = instance;
		instance.addTo(map);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>
