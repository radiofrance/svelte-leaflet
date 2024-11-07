<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.markercluster/dist/MarkerCluster.css';
	import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
	import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
	import markerIcon from 'leaflet/dist/images/marker-icon.png';
	import markerShadow from 'leaflet/dist/images/marker-shadow.png';

	import type { MapOptions, Marker, Map as LeafletMap, LatLngTuple } from 'leaflet';
	import { type LocateControlOptions, bindEvents } from './index.js';
	import { setContext, type Snippet } from 'svelte';
	import GeolocationButton from './private/GeolocationButton.svelte';
	import { createLocateOnAdd, mapEvents, updateMapProps, type MapEvents } from './map.svelte.js';
	import { FOCUSABLE, MAP } from './contexts.js';

	let locateButtonContainer: HTMLDivElement;

	type Props = {
		instance?: LeafletMap;
		options?: MapOptions;
		markers?: Marker[];
		tilesUrl?: string;
		attribution?: string;
		locateControl?: LocateControlOptions;
		focusable?: boolean;
		children?: Snippet;
		locateButton?: Snippet;
	} & MapEvents;

	let {
		instance = $bindable(),
		options = $bindable({}),
		markers = $bindable([]),
		tilesUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution = `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>`,
		locateControl = undefined,
		focusable = true,
		children,
		locateButton,
		...restProps
	}: Props = $props();

	const defaultOptions = {
		center: [48.852, 2.278] as LatLngTuple,
		trackResize: true,
		zoom: 3,
		maxZoom: 18,
		keyboard: options.keyboard === undefined ? focusable : options.keyboard,
	};
	// consider exporting a reference to the markers instead of a getter
	export const getMarkers: () => Marker[] = () => {
		const markers: Marker[] = [];
		instance?.eachLayer((layer) => {
			if (layer instanceof window.L.Marker) {
				markers.push(layer);
			}
		});
		return markers;
	};

	setContext(MAP, () => instance);
	setContext(FOCUSABLE, focusable ? null : -1);
	let container: HTMLElement | null = $state(null);

	$effect(() => {
		if (instance) {
			updateMapProps(instance, options);
		}
	});

	function onLoad() {
		if (!container) return;
		// @ts-ignore
		delete window.L.Icon.Default.prototype._getIconUrl;
		window.L.Icon.Default.mergeOptions({
			iconRetinaUrl: markerIcon2x,
			iconUrl: markerIcon,
			shadowUrl: markerShadow,
		});
		const mergedOptions = { ...defaultOptions, ...options };
		// trackResize is set to false else the resize callback couldn't be unbined (no reference)
		instance = window.L.map(container, { ...mergedOptions, trackResize: false });
		if (mergedOptions.trackResize) {
			// this triggers updateMapProps and binds the custom resize callback
			options.trackResize = true;
		}
		bindEvents(instance, restProps, mapEvents);

		// create component for the tile layer ?
		window.L.tileLayer(tilesUrl, {
			attribution,
		}).addTo(instance);

		instance.on('layeradd', (event) => {
			const layer = event.layer;
			if (layer instanceof window.L.Marker) {
				markers.push(layer);
			}
		});

		instance.on('layerremove', (event) => {
			const layer = event.layer;
			if (layer instanceof window.L.Marker) {
				const index = markers.indexOf(layer);
				if (index > -1) {
					markers.splice(index, 1);
				}
			}
		});

		instance.whenReady(() => {
			if (!instance) return;
			// TODO: find out why manually firing the load event is needed
			instance.fireEvent('load');
			if (!locateControl) return;
			const control = window.L.Control.extend({
				position: locateControl.position,
				onAdd: createLocateOnAdd(instance, locateButtonContainer, locateControl.options),
			});
			instance.addControl(new control(locateControl));
		});
	}

	function leafletLoader(_node: HTMLElement) {
		(async function () {
			await import('leaflet');
			// leaflet.markercluster is loaded by default. It's 34ko (12ko gzipped).
			// A single tile is around 30ko gzipped.
			// TODO: consider making it optional (handle loading in MarkerClusterGroup.svelte ?)
			await import('leaflet.markercluster');
			onLoad();
		})();
	}
</script>

<svelte:window use:leafletLoader />

<div class="Map" bind:this={container} style="height: 100%; width: 100%">
	{#if instance}
		{@render children?.()}
	{/if}
</div>

<div class="locate-button-container" bind:this={locateButtonContainer}>
	{#if locateButton}
		{@render locateButton()}
	{:else}
		<GeolocationButton />
	{/if}
</div>

<style>
	.Map {
		z-index: 0;
	}

	.locate-button-container {
		display: none;
	}
</style>
