<script lang="ts">
	import type { Map, MarkerClusterGroup, MarkerClusterGroupOptions } from 'leaflet';

	import { getContext, onMount, setContext } from 'svelte';

	export let options: MarkerClusterGroupOptions = {};

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

<slot />
