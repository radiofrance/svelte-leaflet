<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type {
		VideoOverlay as LeafletVideoOverlay,
		Map as LeafletMap,
		VideoOverlayOptions,
		LayerGroup,
		LatLngBoundsLiteral,
	} from 'leaflet';
	import {
		videoOverlayEvents,
		updateVideoOverlayProps,
		type VideoOverlayEvents,
	} from './videoOverlay.js';
	import { bindEvents } from './index.js';
	import { LAYERGROUP, MAP } from './contexts.js';

	type Props = {
		url: string | string[] | HTMLVideoElement;
		bounds: LatLngBoundsLiteral;
		options?: VideoOverlayOptions;
		instance?: LeafletVideoOverlay;
	} & VideoOverlayEvents;

	let { url, bounds, options = {}, instance = $bindable(), ...restProps }: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const getLayerGroup = getContext<() => LayerGroup>(LAYERGROUP);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;
		instance = window.L.videoOverlay(url, bounds, options);
		bindEvents(instance, restProps, videoOverlayEvents);
		instance.addTo(context);
	});

	onDestroy(() => {
		instance?.remove();
	});

	$effect(() => {
		if (instance && options) {
			updateVideoOverlayProps(instance, options);
		}
	});

	$effect(() => {
		if (instance && bounds) {
			const latlngBounds = window.L.latLngBounds(bounds);
			instance.setBounds(latlngBounds);
		}
	});
</script>
