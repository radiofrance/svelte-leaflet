<script lang="ts">
	import '../global.css';
	import type { LeafletMap, LatLngExpression, MapOptions } from '$lib/index.js';
	import Map from '$lib/Map.svelte';
	import type { BooleanMapOption } from '$lib/updateProps.js';

	let map: LeafletMap | undefined = $state();
	const initialView: LatLngExpression = [48.86750658335676, 2.3638381549875467];
	let options: MapOptions = $state({
		preferCanvas: false,
		attributionControl: false,
		zoomControl: true,
		closePopupOnClick: true,
		trackResize: true,
		boxZoom: true,
		doubleClickZoom: true,
		dragging: true,
		fadeAnimation: true,
		markerZoomAnimation: true,
		zoomAnimation: true,
		inertia: true,
		worldCopyJump: false,
		keyboard: true,
		scrollWheelZoom: true,
		tapHold: true,
		touchZoom: true,
		bounceAtZoomLimits: true,

		center: initialView,
		zoom: 18
	});

	const booleanOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'boolean'
	) as BooleanMapOption[];
</script>

<Map
	focusable={false}
	{options}
	bind:instance={map}
	oncontextmenu={() => console.log('contextmenu')}
/>

<div class="controls">
	{#each booleanOptions as key}
		<button onclick={() => (options[key] = !options[key])}>{key}: {options[key]}</button>
	{/each}
</div>

<style>
	.controls {
		border: 1px solid grey;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1000;
		background: white;
		padding: 0.5em;
	}
</style>
