<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type {
		ImageOverlay as LeafletImageOverlay,
		Map as LeafletMap,
		ImageOverlayOptions,
		LayerGroup,
		LatLngBoundsLiteral,
	} from 'leaflet';
	import {
		imageOverlayEvents,
		updateImageOverlayProps,
		type ImageOverlayEvents,
	} from './imageOverlay.js';
	import { bindEvents } from './index.js';
	import { LAYERGROUP, MAP } from './contexts.js';

	type Props = {
		url: string;
		bounds: LatLngBoundsLiteral;
		options?: ImageOverlayOptions;
		instance?: LeafletImageOverlay;
	} & ImageOverlayEvents;

	let { url, bounds, options = {}, instance = $bindable(), ...restProps }: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const getLayerGroup = getContext<() => LayerGroup>(LAYERGROUP);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;
		instance = window.L.imageOverlay(url, bounds, options);
		bindEvents(instance, restProps, imageOverlayEvents);
		instance.addTo(context);
	});

	onDestroy(() => {
		instance?.remove();
	});

	$effect(() => {
		if (instance && options) {
			updateImageOverlayProps(instance, options);
		}
	});

	$effect(() => {
		if (instance && bounds) {
			const latlngBounds = window.L.latLngBounds(bounds);
			instance.setBounds(latlngBounds);
		}
	});
</script>
