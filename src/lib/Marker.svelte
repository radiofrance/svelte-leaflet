<script lang="ts">
	import { getContext, onDestroy, onMount, setContext, type Snippet } from 'svelte';
	import type {
		Map as LeafletMap,
		Marker as LeafletMarker,
		MarkerOptions,
		LayerGroup,
		MarkerClusterGroup,
	} from 'leaflet';
	import { bindEvents, markerEvents, type LatLngExpression, type MarkerEvents } from './index.js';
	import { updateMarkerProps } from './marker.svelte.js';

	const L = globalThis.window.L;

	type Props = {
		latlng: LatLngExpression;
		options?: MarkerOptions;
		instance?: LeafletMarker;
		children?: Snippet;
	} & MarkerEvents;

	let {
		latlng,
		options = $bindable(),
		instance = $bindable(),
		children,
		...restProps
	}: Props = $props();

	const getMap = getContext<() => LeafletMap>('map');
	const getLayerGroup = getContext<() => LayerGroup | MarkerClusterGroup>('layerGroup');
	setContext('marker', () => instance);

	$effect(() => {
		if (instance && options) {
			updateMarkerProps(instance, options);
		}
	});

	$effect(() => {
		if (!instance?.getLatLng().equals(latlng)) {
			instance?.setLatLng(latlng);
		}
	});

	onMount(() => {
		const markerOptions = { ...options };
		instance = L.marker(latlng, markerOptions);
		bindEvents(instance, restProps, markerEvents);

		const map = getMap();
		const layerGroup = getLayerGroup?.();
		const mapOrLayerGroup = layerGroup || map;
		instance.addTo(mapOrLayerGroup);
		mapOrLayerGroup.remove;
	});

	onDestroy(() => {
		const layerGroup = getLayerGroup?.();
		const map = getMap();
		// debugger;
		if (instance) {
			// debugger;
			if (layerGroup) {
				layerGroup.removeLayer(instance);
			} else {
				map.removeLayer(instance);
			}
		}
	});
</script>

{#if instance && children}
	{@render children()}
{/if}
