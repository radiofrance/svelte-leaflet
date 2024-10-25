<script module lang="ts">
	type MarkerContext = {
		id?: string;
	};
	export type Marker = LeafletMarker & MarkerContext;
</script>

<script lang="ts">
	import { run } from 'svelte/legacy';

	import type {
		LatLngExpression,
		LayerGroup,
		Map,
		Marker as LeafletMarker,
		MarkerOptions,
	} from 'leaflet';

	import { createEventDispatcher, getContext, onDestroy, setContext, tick } from 'svelte';

	const dispatch = createEventDispatcher();
	const L = globalThis.window.L;

	interface Props {
		size?: number;
		latlng: LatLngExpression;
		id?: string;
		options?: MarkerOptions;
		icon?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
	}

	let { size = 25, latlng, id = '', options = {}, icon, children }: Props = $props();

	let markerElement: HTMLElement | undefined = $state();
	let marker: Marker | undefined = $state();
	const tabindex = getContext('focusable');

	const getMap = getContext<() => Map>('map');
	const getLayerGroup = getContext<() => LayerGroup>('layerGroup');
	setContext('layer', () => marker);

	async function recreateMarker(
		size: number,
		latlng: LatLngExpression,
		id: string,
		options: MarkerOptions,
	) {
		removeMarker();
		await tick();
		createMarker(size, latlng, id, options);
	}

	async function createMarker(
		size: number,
		latlng: LatLngExpression,
		id: string,
		options: MarkerOptions,
	) {
		await tick(); // waits for next paint so layers and map are done rendering
		const layerGroup = getLayerGroup?.();
		const map = getMap();
		const mapOrLayerGroup = layerGroup || map;
		marker = L.marker(latlng, {
			...options,
			keyboard: tabindex === -1 ? false : true,
		});
		marker.id = id;
		marker
			.on('click', (e) => dispatch('click', e))
			.on('dblclick', (e) => dispatch('dblclick', e))
			.on('contextmenu', (e) => dispatch('contextmenu', e))
			.on('dragstart', (e) => dispatch('dragstart', e))
			.on('drag', (e) => dispatch('drag', e))
			.on('dragend', (e) => dispatch('dragend', e));
		mapOrLayerGroup.addLayer(marker);
		await tick(); // waits for next paint so marker is done rendering
		if (markerElement?.childElementCount || 0 > 0) {
			// if the marker has children, use them as the marker icon
			marker.setIcon(
				L.divIcon({
					html: markerElement,
					className: 'map-marker',
					iconSize: L.point(size, size),
				}),
			);
		}
	}

	function removeMarker() {
		if (!marker) return;
		const layerGroup = getLayerGroup?.();
		const map = getMap();
		const mapOrLayerGroup = layerGroup || map;
		mapOrLayerGroup.removeLayer(marker);
	}

	onDestroy(() => {
		removeMarker();
	});
	run(() => {
		recreateMarker(size, latlng, id, options);
	});
</script>

{#key marker}
	{#if marker}
		<div bind:this={markerElement} class="leaflet-marker">
			{@render icon?.()}
		</div>
		{@render children?.()}
	{/if}
{/key}

<style>
	.leaflet-marker {
		display: none;
	}

	:global(.map-marker .leaflet-marker) {
		display: inherit;
	}
</style>
