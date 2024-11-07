<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { Polygon as LeafletPolygon, PolylineOptions, LayerGroup } from 'leaflet';
	import { polygonEvents, updatePolygonProps, type PolygonEvents } from './polygon.svelte.js';
	import { bindEvents, type Latlngs, type LeafletMap } from './index.js';
	import { LAYERGROUP, MAP } from './contexts.js';

	// const L = globalThis.window.L;

	type Props = {
		latlngs: Latlngs;
		instance?: LeafletPolygon;
		options?: PolylineOptions;
	} & PolygonEvents;

	let { latlngs, instance = $bindable(), options, ...restProps }: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const getLayerGroup = getContext<() => LayerGroup>(LAYERGROUP);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;
		instance = window.L.polygon(latlngs, options);
		instance.addTo(context);
		bindEvents(instance, restProps, polygonEvents);
	});

	onDestroy(() => {
		instance?.remove();
	});

	$effect(() => {
		if (instance && latlngs) {
			instance.setLatLngs(latlngs);
		}
	});

	$effect(() => {
		if (instance && options) {
			updatePolygonProps(instance, options);
		}
	});
</script>
