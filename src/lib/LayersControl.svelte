<script lang="ts">
	import { getContext, onMount, tick } from 'svelte';
	import { MAP } from './contexts.js';
	import type { Map as LeafletMap } from 'leaflet';

	type Props = {
		baseLayers: string[];
		overlays: string[];
	};
	let { baseLayers, overlays }: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);

	onMount(async () => {
		const map = getMap();
		await tick();
		map.eachLayer((layer) => {
			console.log(layer);
			debugger;
		});
		// const layersControl = window.L.control.layers().addTo(map);
	});
</script>
