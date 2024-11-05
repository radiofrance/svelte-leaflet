<script lang="ts">
	import { getContext, onDestroy, onMount, setContext, type Snippet } from 'svelte';
	import type {
		MarkerClusterGroup as LeafletMarkerClusterGroup,
		LayerGroup as LeafletLayerGroup,
	} from 'leaflet';

	const L = globalThis.window.L;

	type Props = {
		instance?: LeafletMarkerClusterGroup;
		children?: Snippet;
	};

	let { instance = $bindable(), children }: Props = $props();

	const getMap = getContext<() => L.Map>('map');
	const getLayerGroup = getContext<() => LeafletLayerGroup>('layerGroup');

	setContext('layerGroup', () => instance);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;

		instance = L.markerClusterGroup();
		context.addLayer(instance);
	});

	onDestroy(() => {
		instance?.clearLayers();
	});
</script>

{#if instance && children}
	{@render children()}
{/if}
