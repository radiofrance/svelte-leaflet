<script lang="ts">
	import type { Polygon as LeafletPolygon, PolylineOptions, LatLngExpression, Map } from 'leaflet';
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte';
	import { bindEvents, polygonEvents, type Latlngs, type LeafletEventsRecord } from './index.js';

	export let latlngs: Latlngs;
	export let options: PolylineOptions = {};
	export let instance: LeafletPolygon | undefined = undefined;

	let map: Map = getContext<() => Map>('map')();
	const dispatch = createEventDispatcher<LeafletEventsRecord<typeof polygonEvents>>();

	$: update(latlngs, options);

	function update(latlngs: Latlngs, options: PolylineOptions) {
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
