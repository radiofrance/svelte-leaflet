<script lang="ts">
	import type { LeafletMap, LatLngTuple, LatLngBoundsLiteral, MapOptions } from '$lib/index.js';
	import LocateControl from '$lib/LocateControl.svelte';
	import Map from '$lib/Map.svelte';
	import type { PickOptionByType } from '$lib/utils.js';
	import Controls from '../../components/Controls.svelte';
	import Details from '../../components/Details.svelte';

	let map: LeafletMap | undefined = $state();
	const initialView: LatLngTuple = [48.86750658335676, 2.3638381549875467];
	let options = $state({
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
			[52.37559917665913, 9.843750000000002],
		] as LatLngBoundsLiteral,
	});

	function changeCenter(event: Event) {
		const target = event.target as HTMLInputElement;
		const center = JSON.parse(target.value);
		options.center = center;
	}

	function changeMaxBounds(event: Event) {
		const target = event.target as HTMLInputElement;
		const bounds = JSON.parse(target.value);
		options.maxBounds = bounds;
	}

	// svelte-ignore state_referenced_locally
	const booleanOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'boolean',
	) as PickOptionByType<MapOptions, boolean>[];

	// svelte-ignore state_referenced_locally
	const numberOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'number',
	) as PickOptionByType<MapOptions, number>[];
</script>

<Map
	onload={(e) => console.log('map loaded', e)}
	focusable={false}
	bind:options
	bind:instance={map}
	oncontextmenu={() => console.log('contextmenu')}
>
	<LocateControl
		position="topleft"
		options={{
			enableHighAccuracy: true,
			setView: true,
		}}
	/>
</Map>

<Controls>
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
	<label>
		center
		<input type="text" onchange={changeCenter} value={JSON.stringify(initialView)} />
	</label>
	<label>
		maxBounds
		<input type="text" onchange={changeMaxBounds} value={JSON.stringify(options.maxBounds)} />
	</label>
</Controls>
