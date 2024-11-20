<script lang="ts">
	import { getContext, onMount, type Snippet } from 'svelte';
	import type { Control, Map as LeafletMap } from 'leaflet';
	import { MAP } from './contexts.js';

	type Props = {
		instance?: L.Control;
		children?: Snippet;
		options?: Control.ZoomOptions;
	};

	let { instance = $bindable(), options }: Props = $props();

	const getMap = getContext<() => LeafletMap>(MAP);

	onMount(() => {
		const map = getMap();
		instance = window.L.control.zoom(options);
		instance.addTo(map);
	});
</script>
