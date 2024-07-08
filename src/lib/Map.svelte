<script lang="ts">
	import type { MapOptions, Marker, Map, LatLngTuple } from 'leaflet';
	import type Leaflet from 'leaflet';

	import 'leaflet/dist/leaflet.css';
	import 'leaflet.markercluster/dist/MarkerCluster.css';
	import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
	import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
	import markerIcon from 'leaflet/dist/images/marker-icon.png';
	import markerShadow from 'leaflet/dist/images/marker-shadow.png';

	import { createEventDispatcher, setContext, tick } from 'svelte';
	import {
		type LeafletEventsRecord,
		type LocateControlOptions,
		bindEvents,
		keyboardEvents,
		layerGroupEvents,
		layersControlEvents,
		leafletMouseEvents,
		locationEvents,
		mapStateChangeEvents,
		popupEvents,
		tooltipEvents
	} from './index.js';
	import GeolocationButton from './private/GeolocationButton.svelte';

	let L: typeof Leaflet;
	let locateButtonContainer: HTMLDivElement;
	const defaultOptions = { center: [46.6188459, 1.7262114] as LatLngTuple, zoom: 7, maxZoom: 18 };

	export let options: MapOptions = {};
	export let tilesUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
	export let attribution = `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>`;
	export let instance: Map = null as unknown as Map;
	export let locateControl: LocateControlOptions | undefined = undefined;

	const dispatch = createEventDispatcher<LeafletEventsRecord<typeof events>>();
	// consider exporting a reference to the markers instead of a getter
	export const getMarkers: () => Marker[] = () => {
		const markers: Marker[] = [];
		instance?.eachLayer((layer) => {
			if (layer instanceof L.Marker) {
				markers.push(layer);
			}
		});
		return markers;
	};

	// so the parent has access to the map
	// export const map = () => instance;
	setContext('map', () => instance);
	let container: HTMLElement;

	// Using Object.assign to avoid losing inherited prototype values
	$: if (instance) {
		instance.options = Object.assign(instance.options, options);
	}
	// $: if (thisMap) thisMap.options = options; // ERROR : this.options.crs is undefined
	// this doesnt work because a new options object is created and does not
	// contains default options values (inherited via prototype) required for the map to work properly
	// Spreading thisMap.options + options in a new object doesnt work either
	// as spreading only copies the object own enumerable properties (not the inherited ones)

	function resizeMap() {
		instance?.invalidateSize();
	}

	const events = [
		...keyboardEvents,
		...layerGroupEvents,
		...layersControlEvents,
		...leafletMouseEvents,
		...locationEvents,
		...mapStateChangeEvents,
		...popupEvents,
		...tooltipEvents,
		'autopanstart',
		'zoomanim'
	] as const;

	function onLoad() {
		L = window.L;
		// @ts-ignore
		delete L.Icon.Default.prototype._getIconUrl;
		L.Icon.Default.mergeOptions({
			iconRetinaUrl: markerIcon2x,
			iconUrl: markerIcon,
			shadowUrl: markerShadow
		});
		instance = L.map(container, { ...defaultOptions, ...options });

		bindEvents(instance, dispatch, events);

		// create component for the tile layer ?
		L.tileLayer(tilesUrl, {
			attribution
		}).addTo(instance);

		// TODO: find out why manually firing the load event is needed
		instance.whenReady(async () => {
			instance.fireEvent('load');
			await tick();
			if (locateControl) {
				const control = L.Control.extend({
					position: 'topleft',
					onAdd() {
						const button = locateButtonContainer.firstChild as HTMLElement;
						button.onclick = (e: MouseEvent) => {
							e.stopPropagation();
							instance.locate(locateControl?.options);
						};
						return button;
					}
				});
				instance.addControl(new control(locateControl));
			}
		});
	}

	function leafletLoader(_node: HTMLElement) {
		(async function () {
			await import('leaflet');
			await import('leaflet.markercluster');
			onLoad();
		})();
	}
</script>

<svelte:window on:resize={resizeMap} use:leafletLoader />

<div class="Map" bind:this={container} style="height: 100%; width: 100%">
	{#if instance}
		<slot map={instance} />
	{/if}
</div>
<div class="locate-button-container" bind:this={locateButtonContainer}>
	<slot name="locate-button">
		<GeolocationButton />
	</slot>
</div>

<style>
	.Map {
		z-index: 0;
	}

	.locate-button-container {
		display: none;
	}
</style>
