<script lang="ts">
	import '../global.css';
	import type { LeafletMap, LatLngExpression } from '$lib/index.js';
	import Map from '$lib/Map.svelte';

	let map: LeafletMap | undefined = $state();
	const initialView: LatLngExpression = [48.86750658335676, 2.3638381549875467];
	let draggable = $state(true);
</script>

<Map
	focusable={false}
	options={{ center: initialView, zoom: 18, dragging: draggable }}
	bind:instance={map}
	onmousemove={(e) => {
		console.log({ e });
	}}
/>
