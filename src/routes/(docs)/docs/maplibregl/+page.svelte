<script lang="ts">
	import { type MapMouseEvent } from 'maplibre-gl';
	import type { LeafletMap, LatLngTuple, StyleSpecification, MaplibreMap } from '$lib/index.js';
	import Map from '$lib/Map.svelte';
	import MaplibreGL from '$lib/MaplibreGL.svelte';
	import style from './style.json' with { type: 'json' };

	let map: LeafletMap | undefined = $state();
	let maplibreMapInstance: MaplibreMap | undefined = $state();
	const initialView: LatLngTuple = [44.0488244,4.6556238];
	let options = $state({
		// boolean options
		preferCanvas: false,
		attributionControl: true,
		zoomControl: true,
		closePopupOnClick: true,
		trackResize: true,
		boxZoom: true,
		doubleClickZoom: true,
		dragging: true,
		fadeAnimation: true,
		markerZoomAnimation: true,
		zoomAnimation: true,
		inertia: true,
		worldCopyJump: false,
		keyboard: true,
		scrollWheelZoom: true,
		tapHold: true,
		touchZoom: true,
		bounceAtZoomLimits: true,

		// number options
		zoomSnap: 1,
		zoomDelta: 1,
		zoom: 13,
		minZoom: 1,
		maxZoom: 18,
		transform3DLimit: Math.pow(2, 23),
		zoomAnimationThreshold: 4,
		inertiaDeceleration: 3000,
		inertiaMaxSpeed: Number.MAX_SAFE_INTEGER,
		easeLinearity: 0.25,
		maxBoundsViscosity: 0.5,
		keyboardPanDelta: 80,
		wheelDebounceTime: 40,
		wheelPxPerZoomLevel: 60,
		tapTolerance: 15,

		center: initialView,
	});

		function handleMapClick(e: MapMouseEvent) {
		if (!map) return;

		// Vérifier s'il y a des features de la couche "cities" au point cliqué
		const features = 	maplibreMapInstance?.queryRenderedFeatures(e.point, {
			layers: ['cities']
		});

		if (features && features.length > 0) {
			const cityName = features[0].properties?.name;
			
			alert(`You clicked on city: ${cityName}`);
		}
	}
</script>

<Map
	onload={(e) => {
		console.log(e.sourceTarget);
	}}
	focusable={false}
	bind:options
	bind:instance={map}
	oncontextmenu={() => console.log('contextmenu')}
	onclick={handleMapClick}
>
<MaplibreGL
		options={{style: style as StyleSpecification}}
		bind:maplibreMapInstance={maplibreMapInstance}
	/>
</Map>
