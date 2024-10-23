<script>
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
</script>

<Map
	locateControl={{
		position: 'topleft'
	}}
>
	<Marker latlng={[46.6188459, 1.7262114]} />
</Map>
