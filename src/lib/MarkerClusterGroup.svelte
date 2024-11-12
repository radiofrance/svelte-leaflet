<script lang="ts">
	import { getContext, onDestroy, onMount, setContext, type Snippet } from 'svelte';
	import type {
		MarkerClusterGroup as LeafletMarkerClusterGroup,
		LayerGroup as LeafletLayerGroup,
		MarkerClusterGroupOptions,
		LeafletEventHandlerFnMap,
	} from 'leaflet';
	import { LAYERGROUP, MAP } from './contexts.js';
	import {
		markerClusterGroupEvents,
		type MarkerClusterGroupEvents,
	} from './markerClusterGroup.svelte.js';
	import { bindEvents } from './index.js';

	type Props = {
		instance?: LeafletMarkerClusterGroup;
		options?: MarkerClusterGroupOptions;
		children?: Snippet;
	} & MarkerClusterGroupEvents;

	let { instance = $bindable(), options, children, ...restProps }: Props = $props();

	const getMap = getContext<() => L.Map>(MAP);
	const getLayerGroup = getContext<() => LeafletLayerGroup>(LAYERGROUP);

	setContext(LAYERGROUP, () => instance);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;

		instance = window.L.markerClusterGroup(options);
		context.addLayer(instance);
		bindEvents(
			instance,
			restProps,
			// TODO : find
			markerClusterGroupEvents as unknown as readonly (keyof LeafletEventHandlerFnMap)[],
		);
	});

	onDestroy(() => {
		instance?.clearLayers();
	});
</script>

{#if instance && children}
	{@render children()}
{/if}
