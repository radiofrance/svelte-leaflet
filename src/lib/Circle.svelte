<script lang="ts">
	import type { Circle as LeafletCircle, CircleOptions, LatLngExpression, Map } from 'leaflet';
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte';
	import {
		bindEvents,
		interactiveLayerEvents,
		layerEvents,
		popupEvents,
		tooltipEvents,
		type LeafletEventsRecord
	} from './index.js';

	export let center: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };
	export let instance: LeafletCircle | undefined = undefined;
	const events = [
		'move',
		...interactiveLayerEvents,
		...layerEvents,
		...popupEvents,
		...tooltipEvents
	] as const;

	let map: Map = getContext<() => Map>('map')();
	const dispatch = createEventDispatcher<LeafletEventsRecord<typeof events>>();

	$: updateCircle(center, options);

	function updateCircle(center: LatLngExpression, options: CircleOptions) {
		if (instance) {
			instance.setLatLng(center);
			instance.setStyle(options);
			instance.setRadius(options.radius);
		}
	}

	onMount(async () => {
		const L = window.L;
		instance = new L.Circle(center, options);
		bindEvents(instance, dispatch, events);
		instance.addTo(map);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>

<slot />
