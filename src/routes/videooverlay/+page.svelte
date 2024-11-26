<script lang="ts">
	import VideoOverlay from '$lib/VideoOverlay.svelte';
	import Map from '$lib/Map.svelte';
	import type { VideoOverlay as LeafletVideoOverlay } from 'leaflet';
	import LayersControl from '$lib/LayersControl.svelte';
</script>

<Map
	options={{
		center: [21, -115],
		zoom: 5,
	}}
>
	<LayersControl />
	<VideoOverlay
		url="https://www.mapbox.com/bites/00188/patricia_nasa.webm"
		bounds={[
			[32, -130],
			[13, -100],
		]}
		options={{ opacity: 0.5, autoplay: true }}
	/>
</Map>

<style>
	:global(video) {
		max-width: initial;
	}
</style>
