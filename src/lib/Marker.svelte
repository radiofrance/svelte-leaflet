<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Map as LeafletMap, LayerGroup } from 'leaflet';
	import type { LatLngExpression } from './index.js';

	type Props = {
		latlng: LatLngExpression;
	};

	let { latlng }: Props = $props();

	const L = globalThis.window.L;
	const getMap = getContext<() => LeafletMap>('map');
	const getLayerGroup = getContext<() => LayerGroup>('layerGroup');

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const mapOrLayerGroup = layerGroup || map;
		const marker = L.marker(latlng);

		marker.addTo(mapOrLayerGroup);
	});
</script>
