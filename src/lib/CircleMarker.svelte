<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type {
		CircleMarker as LeafletCircleMarker,
		LatLngExpression,
		CircleMarkerOptions,
		LayerGroup,
	} from 'leaflet';
	import { bindEvents, type LeafletMap } from './index.js';
	import { LAYERGROUP, MAP } from './contexts.js';
	import { circleMarkerEvents, type CircleMarkerEvents } from './circleMarker.js';

	type Props = {
		latlng: LatLngExpression;
		instance?: LeafletCircleMarker;
		options?: CircleMarkerOptions;
	} & CircleMarkerEvents;

	let { latlng, instance = $bindable(), options = { radius: 50 }, ...restProps }: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const getLayerGroup = getContext<() => LayerGroup>(LAYERGROUP);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;
		instance = window.L.circleMarker(latlng, { ...options });
		instance.addTo(context);
		bindEvents(instance, restProps, circleMarkerEvents);
	});

	onDestroy(() => {
		instance?.remove();
	});

	$effect(() => {
		if (instance && latlng) {
			instance.setLatLng(latlng);
		}
	});

	// TODO : implement reactivity
	// $effect(() => {
	// 	if (instance && options) {
	// 		updatePolylineProps(instance, options);
	// 	}
	// });
</script>
