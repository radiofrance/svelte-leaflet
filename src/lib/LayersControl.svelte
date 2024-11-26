<script lang="ts">
	import { getContext, onMount, tick } from 'svelte';
	import { getBaseLayersStore, getOverlaysStore, MAP } from './contexts.js';
	import type { Control, Map as LeafletMap } from 'leaflet';

	type Props = {
		instance?: Control;
		options?: Control.LayersOptions;
	};
	let { instance = $bindable(), options }: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const baseLayersStore = getBaseLayersStore();
	const overlaysStore = getOverlaysStore();

	onMount(async () => {
		const map = getMap();
		// wait for layers to be initialized
		await tick();
		instance = window.L.control.layers($baseLayersStore, $overlaysStore, options);
		instance.addTo(map);
	});
</script>
