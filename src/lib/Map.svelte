<script lang="ts">
	import type { LatLngExpression, Map, Marker } from 'leaflet';
	import type Leaflet from 'leaflet';

	import 'leaflet/dist/leaflet.css';
	import 'leaflet.markercluster/dist/MarkerCluster.css';
	import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

	import { createEventDispatcher, setContext } from 'svelte';

	let L: typeof Leaflet;

	export let center: LatLngExpression;
	export let zoom: number;
	export let tilesUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
	export let attribution = `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>`;

	const dispatch = createEventDispatcher();
	let thisMap: Map;
	// consider exporting a reference to the markers instead of a getter
	export const getMarkers: () => Leaflet.Marker[] = () => {
		const markers: Marker[] = [];
		thisMap?.eachLayer((layer) => {
			if (layer instanceof L.Marker) {
				markers.push(layer);
			}
		});
		return markers;
	};

	// so the parent has access to the map
	export const map = () => thisMap;
	//
	setContext('map', () => thisMap);
	let container: HTMLElement;

	// reset view whenever coords or zoom change
	$: thisMap?.setView(center, zoom);

	function resizeMap() {
		thisMap?.invalidateSize();
	}

	function onLoad() {
		L = window.L;
		thisMap = L.map(container)
			// Layer events
			.on('baselayerchange', (e) => dispatch('baselayerchange', e))
			.on('overlayadd', (e) => dispatch('overlayadd', e))
			.on('overlayremove', (e) => dispatch('overlayremove', e))
			.on('layeradd', (e) => dispatch('layeradd', e))
			.on('layerremove', (e) => dispatch('layerremove', e))
			// Map state change events
			.on('zoomlevelschange', (e) => dispatch('zoomlevelschange', e))
			.on('resize', (e) => dispatch('resize', e))
			.on('unload', (e) => dispatch('unload', e))
			.on('load', (e) => dispatch('load', e))
			.on('move', (e) => dispatch('move', e))
			.on('moveend', (e) => dispatch('moveend', e))
			.on('movestart', (e) => dispatch('movestart', e))
			.on('viewreset', (e) => dispatch('viewreset', e))
			.on('zoom', (e) => dispatch('zoom', e))
			.on('zoomend', (e) => dispatch('zoomend', e))
			.on('zoomstart', (e) => dispatch('zoomstart', e))
			// Popup events
			.on('autopanstart', (e) => dispatch('autopanstart', e))
			.on('popupclose', (e) => dispatch('popupclose', e))
			.on('popupopen', (e) => dispatch('popupopen', e))
			// Tooltip events
			.on('tooltipclose', (e) => dispatch('tooltipclose', e))
			.on('tooltipopen', (e) => dispatch('tooltipopen', e))
			// Location events
			.on('locationerror', (e) => dispatch('locationerror', e))
			.on('locationfound', (e) => dispatch('locationfound', e))
			// Interaction events
			.on('click', (e) => dispatch('click', e))
			.on('contextmenu', (e) => dispatch('contextmenu', e))
			.on('dblclick', (e) => dispatch('dblclick', e))
			.on('keydown', (e) => dispatch('keydown', e))
			.on('keypress', (e) => dispatch('keypress', e))
			.on('keyup', (e) => dispatch('keyup', e))
			.on('mousedown', (e) => dispatch('mousedown', e))
			.on('mousemove', (e) => dispatch('mousemove', e))
			.on('mouseout', (e) => dispatch('mouseout', e))
			.on('mouseover', (e) => dispatch('mouseover', e))
			.on('mouseup', (e) => dispatch('mouseup', e))
			.on('preclick', (e) => dispatch('preclick', e))
			// Other events
			.on('zoomanim', (e) => dispatch('zoomanim', e))
			// Non listed events
			// .on('add', (e) => dispatch('add', e))
			// .on('animationend', (e) => dispatch('animationend', e))
			// .on('down', (e) => dispatch('down', e))
			// .on('drag', (e) => dispatch('drag', e))
			// .on('dragend', (e) => dispatch('dragend', e))
			// .on('dragstart', (e) => dispatch('dragstart', e))
			// .on('error', (e) => dispatch('error', e))
			// .on('loading', (e) => dispatch('loading', e))
			// .on('predrag', (e) => dispatch('predrag', e))
			// .on('remove', (e) => dispatch('remove', e))
			// .on('spiderfied', (e) => dispatch('spiderfied', e))
			// .on('tileabort', (e) => dispatch('tileabort', e))
			// .on('tileerror', (e) => dispatch('tileerror', e))
			// .on('tileload', (e) => dispatch('tileload', e))
			// .on('tileloadstart', (e) => dispatch('tileloadstart', e))
			// .on('tileunload', (e) => dispatch('tileunload', e))
			// .on('unspiderfied', (e) => dispatch('unspiderfied', e))
			// .on('update', (e) => dispatch('update', e))
			.setView(center, zoom)
			.setMinZoom(5)
			.setMaxZoom(20);

		L.tileLayer(tilesUrl, {
			attribution,
			maxZoom: 20
		}).addTo(thisMap);
	}

	function leafletLoader(_node: HTMLElement) {
		import('leaflet').then(() => {
			import('leaflet.markercluster').then(onLoad);
		});
	}
</script>

<svelte:window on:resize={resizeMap} use:leafletLoader />

<div class="Map" bind:this={container} style="height: 100%; width: 100%">
	{#if thisMap}
		<slot map={thisMap} />
	{/if}
</div>
