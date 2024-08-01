<script lang="ts">
	import type { Polygon as LeafletPolygon, PolylineOptions, LatLngExpression, Map } from 'leaflet';
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte';
	import { bindEvents, polygonEvents, type LeafletEventsRecord } from './index.js';

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: LeafletPolygon | undefined = undefined;

	let map: Map = getContext<() => Map>('map')();
	const dispatch = createEventDispatcher<LeafletEventsRecord<typeof polygonEvents>>();

	$: update(latlngs, options);

	function update(latlngs: LatLngExpression[], options: PolylineOptions) {
		if (instance) {
			instance.setLatLngs(latlngs);
			instance.setStyle(options);
		}
	}

	onMount(async () => {
		const L = window.L;
		instance = new L.Polygon(latlngs, options);
		bindEvents(instance, dispatch, polygonEvents);
		instance.addTo(map);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>

<slot />
