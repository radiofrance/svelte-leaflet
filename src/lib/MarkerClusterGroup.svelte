<script lang="ts">
	import { getContext, onDestroy, onMount, setContext, type Snippet } from 'svelte';
	import type {
		MarkerClusterGroup as LeafletMarkerClusterGroup,
		LayerGroup as LeafletLayerGroup,
		MarkerClusterGroupOptions,
	} from 'leaflet';
	import { LAYERGROUP, MAP } from './contexts.js';

	type Props = {
		instance?: LeafletMarkerClusterGroup;
		options?: MarkerClusterGroupOptions;
		children?: Snippet;
	};

	let { instance = $bindable(), options, children }: Props = $props();

	const getMap = getContext<() => L.Map>(MAP);
	const getLayerGroup = getContext<() => LeafletLayerGroup>(LAYERGROUP);

	setContext(LAYERGROUP, () => instance);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;

		instance = window.L.markerClusterGroup(options);
		context.addLayer(instance);
	});

	onDestroy(() => {
		instance?.clearLayers();
	});
</script>

{#if instance && children}
	{@render children()}
{/if}
