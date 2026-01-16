<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { Map as LeafletMap, MaplibreGL, LeafletMaplibreGLOptions } from 'leaflet';
	import { getBaseLayersStore, MAP } from './contexts.js';
	import { getRandomString } from './utils.js';

	type Props = {
		name?: string;
		options: LeafletMaplibreGLOptions;
		instance?: MaplibreGL;
	};

	let {
		name = `maplibregl-layer-${getRandomString(5)}`,
		options = {},
		instance = $bindable(),
	}: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const baseLayersStore = getBaseLayersStore();

	onMount(() => {
		const map = getMap();
		instance = window.L.maplibreGL(options);
		$baseLayersStore[name] = instance;
		instance.addTo(map);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>
