<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type {
		WMSOptions,
		WMSParams,
		TileLayer as LeafletTileLayer,
		Map as LeafletMap,
	} from 'leaflet';
	import { MAP } from './contexts.js';

	type Props = {
		url: string;
		params?: WMSParams;
		options?: WMSOptions;
		instance?: LeafletTileLayer;
	};

	let {
		url,
		params = { layers: 'wms-default-layer' },
		options = {},
		instance = $bindable(),
	}: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);

	onMount(() => {
		const map = getMap();
		instance = window.L.tileLayer.wms(url, { ...options, ...params });
		instance.addTo(map);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>
