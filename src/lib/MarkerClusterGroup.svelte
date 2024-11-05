<script lang="ts">
	import { getContext, onDestroy, onMount, setContext, tick, type Snippet } from 'svelte';
	import type { MarkerClusterGroup, LayerGroup } from 'leaflet';

	const L = globalThis.window.L;

	type Props = {
		instance?: MarkerClusterGroup;
		children?: Snippet;
	};

	let { instance = $bindable(), children }: Props = $props();

	const getMap = getContext<() => L.Map>('map');
	const getLayerGroup = getContext<() => LayerGroup>('layerGroup');

	setContext('layerGroup', () => instance);

	onMount(async () => {
		await tick(); // Attendre que le contexte soit défini
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

{#if children}
	{@render children()}
{/if}
