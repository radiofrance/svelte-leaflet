<script>
	import Map from '$lib/Map.svelte';
	import ZoomControl from '$lib/ZoomControl.svelte';
</script>

<Map options={{ zoomControl: false }}>
	<ZoomControl options={{ position: 'topright', zoomInText: '🔍', zoomOutText: '🦕' }} />
</Map>
