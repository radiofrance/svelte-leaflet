<script>
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import CustomMarker from '../../components/CustomMarker.svelte';
</script>

<Map
	locateControl={{
		position: 'topleft'
	}}
>
	<Marker latlng={[46.6188459, 1.7262114]}>
		{#snippet icon()}<CustomMarker />{/snippet}
	</Marker>
</Map>
