<script lang="ts">
	import { getContext, onMount, type Snippet } from 'svelte';
	import type { Map as LeafletMap, Marker as LeafletMarker, LayerGroup } from 'leaflet';
	import type { LatLngExpression } from './index.js';

	type Props = {
		latlng: LatLngExpression;
		children?: Snippet;
		icon?: Snippet;
		instance?: LeafletMarker;
	};

	let { latlng, children, icon, instance = $bindable() }: Props = $props();
	// svelte-ignore non_reactive_update
	let iconContainer: HTMLDivElement;

	const L = globalThis.window.L;
	const getMap = getContext<() => LeafletMap>('map');
	const getLayerGroup = getContext<() => LayerGroup>('layerGroup');

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const mapOrLayerGroup = layerGroup || map;
		if (icon) {
			console.log({ iconContainer });
			const innerHTML = iconContainer.innerHTML;
			const icon = L.divIcon({ html: innerHTML });
			instance = L.marker(latlng, { icon });
			instance.addTo(mapOrLayerGroup);

			debugger;
		} else {
			instance = L.marker(latlng);
			instance.addTo(mapOrLayerGroup);
		}
	});
</script>

{#if icon}
	<div class="icon-container" bind:this={iconContainer}>
		{@render icon()}
	</div>
{/if}

<style>
	.icon-container {
		display: none;
	}
</style>
