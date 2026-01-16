<script lang="ts">
	import type { LeafletMap, LatLngTuple, LatLngBoundsLiteral, MapOptions } from '$lib/index.js';
	import Map from '$lib/Map.svelte';
	import type { PickOptionByType } from '$lib/utils.js';
	import Controls from '$components/Controls.svelte';
	import Details from '$components/Details.svelte';
	import MaplibreGL from '$lib/MaplibreGL.svelte';

	let map: LeafletMap | undefined = $state();
	const initialView: LatLngTuple = [44.0488244,4.6556238];
	let options = $state({
		// boolean options
		preferCanvas: false,
		attributionControl: true,
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
	});

	function changeCenter(event: Event) {
		const target = event.target as HTMLInputElement;
		const center = JSON.parse(target.value);
		options.center = center;
	}

	function changeMaxBounds(event: Event) {
		const target = event.target as HTMLInputElement;
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
	onload={(e) => {
		console.log(e.sourceTarget);
	}}
	focusable={false}
	bind:options
	bind:instance={map}
	oncontextmenu={() => console.log('contextmenu')}
>
<MaplibreGL
		options={{
			style: 'https://demotiles.maplibre.org/style.json',
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
			<button class="btn preset-filled-primary-500" onclick={() => (options[key] = !options[key])}
				>{key}: {options[key]}</button
			>
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
