<script lang="ts">
	import type { Polygon as LeafletPolygon, PolylineOptions, LatLngExpression, Map } from 'leaflet';
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte';
	import {
		bindEvents,
		interactiveLayerEvents,
		layerEvents,
		popupEvents,
		tooltipEvents,
		type LeafletEventsRecord
	} from './index.js';

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: LeafletPolygon | undefined = undefined;
	const events = [
		'move',
		...interactiveLayerEvents,
		...layerEvents,
		...popupEvents,
		...tooltipEvents
	] as const;

	let map: Map = getContext<() => Map>('map')();
	const dispatch = createEventDispatcher<LeafletEventsRecord<typeof events>>();

	$: updateCircle(latlngs, options);

	function updateCircle(center: LatLngExpression[], options: PolylineOptions) {
		if (instance) {
			instance.setLatLngs(center);
			instance.setStyle(options);
		}
	}

	onMount(async () => {
		const L = window.L;
		instance = new L.Polygon(latlngs, options);
		bindEvents(instance, dispatch, events);
		instance.addTo(map);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>

<slot />
