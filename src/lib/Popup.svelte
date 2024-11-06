<script lang="ts">
	import type {
		LatLngExpression,
		PopupOptions,
		LayerGroup,
		Popup as LeafletPopup,
		Map as LeafletMap,
		Marker as LeafletMarker,
	} from 'leaflet';
	import { getContext, onDestroy, onMount, type Snippet } from 'svelte';
	import { bindEvents, popupEvents, type PopupEvents } from './index.js';
	import { updatePopupProps } from './popup.svelte.js';
	import { LAYERGROUP, MAP, MARKER } from './contexts.js';

	const L = globalThis.window.L;

	type Props = {
		latlng?: LatLngExpression;
		options?: PopupOptions;
		instance?: LeafletPopup;
		children?: Snippet;
	} & PopupEvents;

	let {
		latlng,
		options = $bindable({}),
		instance = $bindable(),
		children,
		...restProps
	}: Props = $props();

	let popupContent: HTMLElement | undefined = $state();

	const getMap = getContext<() => LeafletMap>(MAP);
	const getLayerGroup = getContext<() => LayerGroup>(LAYERGROUP);
	const getMarker = getContext<() => LeafletMarker>(MARKER);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const marker = getMarker?.();
		const context = layerGroup || map;
		instance = L.popup(options);
		if (latlng) instance.setLatLng(latlng);
		bindEvents(instance, restProps, popupEvents);
		if (marker) marker.bindPopup(instance);
		else if (map) instance.openOn(map);
		else instance.addTo(context);
		if (popupContent) instance.setContent(popupContent);
	});

	onDestroy(() => {
		instance?.remove();
	});

	$effect(() => {
		if (instance && options) {
			updatePopupProps(instance, options);
		}
	});
</script>

<div class="container">
	{#if children}
		<div bind:this={popupContent} class="PopupChildrenContainer">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.container {
		display: none;
	}
</style>
