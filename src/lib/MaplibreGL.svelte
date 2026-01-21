<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { Map as LeafletMap, MaplibreGL, LeafletMaplibreGLOptions } from 'leaflet';
	import { getBaseLayersStore, MAP } from './contexts.js';
	import { getRandomString } from './utils.js';
	import type { MaplibreMap } from './index.js';

	type Props = {
		name?: string;
		options: LeafletMaplibreGLOptions;
		instance?: MaplibreGL;
		maplibreMapInstance?: MaplibreMap;
	};

	let {
		name = `maplibregl-layer-${getRandomString(5)}`,
		options = {},
		instance = $bindable(),
		maplibreMapInstance = $bindable(),
	}: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const baseLayersStore = getBaseLayersStore();

	onMount(() => {
		const map = getMap();
		instance = window.L.maplibreGL(options);
		instance.addTo(map);
		maplibreMapInstance= instance.getMaplibreMap()
		$baseLayersStore[name] = instance;
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>
