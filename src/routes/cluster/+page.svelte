<script lang="ts">
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import MarkerCluster from '$lib/MarkerCluster.svelte';
</script>

<Map
	options={{
		center: [51.505, -0.09],
		zoom: 10,
	}}
>
	<MarkerCluster>
		<Marker latlng={[51.505, -0.09]} />
		<Marker latlng={[51.505, -0.08]} />
		<Marker latlng={[51.505, -0.07]} />
	</MarkerCluster>
</Map>
