<script lang="ts">
	import LayersControl from '$lib/LayersControl.svelte';
	import Map from '$lib/Map.svelte';
	import TileLayer from '$lib/TileLayer.svelte';
</script>

<Map>
	<LayersControl />
	<TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
	<TileLayer
		url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
		options={{
			attribution:
				'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
		}}
	/>
</Map>
