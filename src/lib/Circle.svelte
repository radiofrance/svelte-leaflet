<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type {
		Circle as LeafletCircle,
		LatLngExpression,
		CircleMarkerOptions,
		LayerGroup,
	} from 'leaflet';
	import { polygonEvents, updatePolylineProps, type PolygonEvents } from './polyline.js';
	import { bindEvents, type LeafletMap } from './index.js';
	import { LAYERGROUP, MAP } from './contexts.js';
	import { circleMarkerEvents, type CircleMarkerEvents } from './circleMarker.js';

	type Props = {
		latlng: LatLngExpression;
		instance?: LeafletCircle;
		options?: CircleMarkerOptions;
	} & CircleMarkerEvents;

	let { latlng, instance = $bindable(), options = { radius: 50 }, ...restProps }: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const getLayerGroup = getContext<() => LayerGroup>(LAYERGROUP);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;
		instance = window.L.circle(latlng, { ...options });
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
</script>
