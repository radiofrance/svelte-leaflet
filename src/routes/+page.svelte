<script lang="ts">
	import '../global.css';
	import type { LeafletMap, LatLngExpression, MapOptions } from '$lib/index.js';
	import Map from '$lib/Map.svelte';
	import type { BooleanMapOption, NumberMapOption } from '$lib/updateProps.js';
	import Details from '../components/Details.svelte';

	let map: LeafletMap | undefined = $state();
	const initialView: LatLngExpression = [48.86750658335676, 2.3638381549875467];
	let options: MapOptions = $state({
		// boolean options
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

		// number options
		zoomSnap: 1,
		zoomDelta: 1,
		zoom: 13,
		minZoom: 1,
		maxZoom: 18,
		transform3DLimit: Math.pow(2, 23),
		zoomAnimationThreshold: 4,
		inertiaDeceleration: 3000,
		inertiaMaxSpeed: Number.MAX_SAFE_INTEGER,
		easeLinearity: 0.25,
		maxBoundsViscosity: 0.5,
		keyboardPanDelta: 80,
		wheelDebounceTime: 40,
		wheelPxPerZoomLevel: 60,
		tapTolerance: 15,

		center: initialView,

		maxBounds: [
			[41.22824901518532, -6.525878906250001],
			[52.37559917665913, 9.843750000000002]
		]
	});

	const booleanOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'boolean'
	) as BooleanMapOption[];

	const numberOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'number'
	) as NumberMapOption[];
</script>

<Map
	focusable={false}
	{options}
	bind:instance={map}
	oncontextmenu={() => console.log('contextmenu')}
/>

<div class="controls">
	<Details title="Number">
		{#each numberOptions as key}
			<label>
				{key}
				<input type="number" bind:value={options[key]} />
			</label>
		{/each}
	</Details>
	<Details title="Boolean">
		{#each booleanOptions as key}
			<button onclick={() => (options[key] = !options[key])}>{key}: {options[key]}</button>
		{/each}
	</Details>
</div>

<style>
	input[type='number'] {
		width: 100px;
	}
	.controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		box-sizing: border-box;
		max-height: 100vh;
		width: 320px;
		overflow-y: auto;
		color: black;
		font-size: 12px;
		border: 1px solid grey;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1000;
		background: white;
		padding: 1rem;
	}

	label {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
	}
</style>
