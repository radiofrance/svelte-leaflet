<script lang="ts">
	import type {
		LatLngExpression,
		PopupOptions,
		LayerGroup,
		Popup as LeafletPopup,
		Map as LeafletMap,
		Marker as LeafletMarker,
	} from 'leaflet';
	import { getContext, onDestroy, onMount, tick, type Snippet } from 'svelte';
	import { bindEvents, popupEvents, type PopupEvents } from './index.js';
	import { updatePopupProps } from './popup.svelte.js';

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

	const getMap = getContext<() => LeafletMap>('map');
	const getLayerGroup = getContext<() => LayerGroup>('layerGroup');
	const getMarker = getContext<() => LeafletMarker>('marker');

	onMount(async () => {
		// wait for parent contexts to have been set
		await tick();
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
		if (children && popupContent) instance.setContent(popupContent);
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

<div bind:this={popupContent}>
	{@render children?.()}
</div>
