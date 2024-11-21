<script>
	import Map from '$lib/Map.svelte';
	import TileLayer from '$lib/TileLayer.svelte';
	import TileLayerWms from '$lib/TileLayerWMS.svelte';
</script>

<Map>
	<TileLayer
		url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
		options={{
			attribution:
				'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
		}}
	/>
	<TileLayerWms
		url="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi"
		params={{ layers: 'nexrad-n0r-900913', format: 'image/png', transparent: true }}
		options={{
			attribution: 'Weather data © 2012 IEM Nexrad',
		}}
	/>
</Map>
