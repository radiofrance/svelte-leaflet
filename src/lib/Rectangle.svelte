<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type {
		Rectangle as LeafletRectangle,
		LatLngBoundsExpression,
		PolylineOptions,
		LayerGroup,
	} from 'leaflet';
	import { polygonEvents, updatePolylineProps, type PolygonEvents } from './polyline.js';
	import { bindEvents, type LeafletMap } from './index.js';
	import { LAYERGROUP, MAP } from './contexts.js';

	type Props = {
		bounds: LatLngBoundsExpression;
		instance?: LeafletRectangle;
		options?: PolylineOptions;
	} & PolygonEvents;

	let { bounds, instance = $bindable(), options = {}, ...restProps }: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const getLayerGroup = getContext<() => LayerGroup>(LAYERGROUP);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;
		instance = window.L.rectangle(bounds, options);
		instance.addTo(context);
		bindEvents(instance, restProps, polygonEvents);
	});

	onDestroy(() => {
		instance?.remove();
	});

	$effect(() => {
		if (instance && bounds) {
			instance.setBounds(bounds);
		}
	});

	$effect(() => {
		if (instance && options) {
			updatePolylineProps(instance, options);
		}
	});
</script>
