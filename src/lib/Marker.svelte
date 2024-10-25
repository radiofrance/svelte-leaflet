<script lang="ts">
	import { getContext, onMount, setContext, type Snippet } from 'svelte';
	import type {
		Map as LeafletMap,
		Marker as LeafletMarker,
		MarkerOptions,
		LayerGroup,
	} from 'leaflet';
	import { bindEvents, markerEvents, type LatLngExpression, type MarkerEvents } from './index.js';
	import { updateMarkerProps } from './marker.svelte.js';

	type Props = {
		latlng: LatLngExpression;
		options?: MarkerOptions;
		instance?: LeafletMarker;
		children?: Snippet;
	} & Partial<MarkerEvents>;

	let {
		latlng,
		options = $bindable(),
		instance = $bindable(),
		children,
		...restProps
	}: Props = $props();

	const L = globalThis.window.L;
	setContext('marker', () => instance);
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
		instance = L.marker(latlng, markerOptions);
		bindEvents(instance, restProps, markerEvents);
		instance.addTo(mapOrLayerGroup);
	});
</script>

{@render children?.()}
