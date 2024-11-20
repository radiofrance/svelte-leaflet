<script lang="ts">
	import type {
		LatLngExpression,
		TooltipOptions,
		LayerGroup,
		Tooltip as LeafletTooltip,
		Map as LeafletMap,
		Marker as LeafletMarker,
	} from 'leaflet';
	import { getContext, onDestroy, onMount, type Snippet } from 'svelte';
	import { bindEvents } from './index.js';
	import { tooltipEvents, updateTooltipProps, type TooltipEvents } from './tooltip.js';
	import { LAYERGROUP, MAP, MARKER } from './contexts.js';

	type Props = {
		latlng?: LatLngExpression;
		options?: TooltipOptions;
		instance?: LeafletTooltip;
		children?: Snippet;
	} & TooltipEvents;

	let {
		latlng,
		options = $bindable({}),
		instance = $bindable(),
		children,
		...restProps
	}: Props = $props();

	let tooltipContent: HTMLElement | undefined = $state();

	const getMap = getContext<() => LeafletMap>(MAP);
	const getLayerGroup = getContext<() => LayerGroup>(LAYERGROUP);
	const getMarker = getContext<() => LeafletMarker>(MARKER);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const marker = getMarker?.();
		const context = layerGroup || map;
		instance = window.L.tooltip(options);
		if (latlng) instance.setLatLng(latlng);
		bindEvents(instance, restProps, tooltipEvents);
		if (marker) marker.bindTooltip(instance);
		else if (map) instance.openOn(map);
		else instance.addTo(context);
		if (tooltipContent) instance.setContent(tooltipContent);
	});

	onDestroy(() => {
		instance?.remove();
	});

	$effect(() => {
		if (instance && options) {
			updateTooltipProps(instance, options);
		}
	});
</script>

<div class="container">
	{#if children}
		<div bind:this={tooltipContent} class="TooltipChildrenContainer">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.container {
		display: none;
	}
</style>
