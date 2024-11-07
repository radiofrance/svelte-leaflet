<script lang="ts">
	import { onMount } from 'svelte';
	import type { LatLngExpression, Polygon as LeafletPolygon, PolylineOptions } from 'leaflet';

	// const L = globalThis.window.L;

	type Props = {
		latlngs: LatLngExpression[];
		instance?: LeafletPolygon;
		options?: PolylineOptions;
	};

	let { latlngs, instance = $bindable(), options }: Props = $props();

	onMount(() => {
		window.L.polygon(latlngs, options);
	});
</script>
