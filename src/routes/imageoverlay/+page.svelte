<script lang="ts">
	import ImageOverlay from '$lib/ImageOverlay.svelte';
	import LayersControl from '$lib/LayersControl.svelte';
	import Map from '$lib/Map.svelte';
	import type { ImageOverlay as LeafletImageOverlay } from 'leaflet';

	let imageOverlay: LeafletImageOverlay;
</script>

<Map
	options={{
		center: [40.74, -74.17],
		zoom: 13,
	}}
>
	<LayersControl />
	<ImageOverlay
		bind:instance={imageOverlay}
		onadd={() => {
			console.log('Image overlay added');
		}}
		url="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
		bounds={[
			[40.712216, -74.22655],
			[40.773941, -74.12544],
		]}
		options={{
			opacity: 0.5,
		}}
	/>
</Map>
