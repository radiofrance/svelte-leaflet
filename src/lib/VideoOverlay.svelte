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
	import { getOverlaysStore, LAYERGROUP, MAP } from './contexts.js';
	import { getRandomString } from './utils.js';

	type Props = {
		name?: string;
		url: string | string[] | HTMLVideoElement;
		bounds: LatLngBoundsLiteral;
		options?: VideoOverlayOptions;
		instance?: LeafletVideoOverlay;
	} & VideoOverlayEvents;

	let {
		name = `overlay-${getRandomString(5)}`,
		url,
		bounds,
		options = {},
		instance = $bindable(),
		...restProps
	}: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);
	const getLayerGroup = getContext<() => LayerGroup>(LAYERGROUP);
	const overlaysStore = getOverlaysStore();

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;
		instance = window.L.videoOverlay(url, bounds, options);
		$overlaysStore[name] = instance;
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
