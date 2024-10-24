<script lang="ts">
	import { getContext, onMount, type Snippet } from 'svelte';
	import type {
		Map as LeafletMap,
		Marker as LeafletMarker,
		MarkerOptions,
		LayerGroup
	} from 'leaflet';
	import { bindEvents, markerEvents, type LatLngExpression, type MarkerEvents } from './index.js';
	import { updateMarkerProps } from './marker.svelte.js';

	type Props = {
		latlng: LatLngExpression;
		options?: MarkerOptions;
		instance?: LeafletMarker;
		popup?: Snippet;
		icon?: Snippet;
	} & Partial<MarkerEvents>;

	let {
		latlng,
		options = $bindable(),
		instance = $bindable(),
		popup,
		icon,
		...restProps
	}: Props = $props();
	let iconContainer: HTMLDivElement | undefined = $state();

	const L = globalThis.window.L;
	const getMap = getContext<() => LeafletMap>('map');
	const getLayerGroup = getContext<() => LayerGroup>('layerGroup');

	$effect(() => {
		if (instance && options) {
			updateMarkerProps(instance, options);
		}
	});

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const mapOrLayerGroup = layerGroup || map;
		const markerOptions = { ...options };
		if (icon) {
			markerOptions.icon = L.divIcon({
				html: iconContainer,
				className: ''
			});
		}
		instance = L.marker(latlng, markerOptions);
		bindEvents(instance, restProps, markerEvents);
		instance.addTo(mapOrLayerGroup);
	});
</script>

{#if icon}
	<div class="icon-container" bind:this={iconContainer}>
		{@render icon()}
	</div>
{/if}
