<script lang="ts">
	import VideoOverlay from '$lib/VideoOverlay.svelte';
	import Map from '$lib/Map.svelte';
	import type { VideoOverlay as LeafletVideoOverlay } from 'leaflet';

	let videoOverlay: LeafletVideoOverlay;
</script>

<Map
	options={{
		center: [21, -115],
		zoom: 5,
	}}
>
	<VideoOverlay
		bind:instance={videoOverlay}
		url="https://www.w3schools.com/html/mov_bbb.mp4"
		bounds={[
			[32, -130],
			[13, -100],
		]}
		options={{ opacity: 0.5 }}
	/>
</Map>

<style>
	:global(video) {
		max-width: initial;
	}
</style>
