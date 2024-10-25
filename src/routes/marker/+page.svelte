<script lang="ts">
	import type { MarkerOptions } from '$lib/index.js';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import type { PickOptionByType } from '$lib/utils.js';
	import Controls from '../../components/Controls.svelte';
	import Details from '../../components/Details.svelte';

	let options: MarkerOptions = $state({
		// boolean options
		draggable: false,
		keyboard: true,
		riseOnHover: true,
		autoPan: true,
		autoPanOnFocus: true,
		interactive: true,
		bubblingMouseEvents: true,

		// number options
		zIndexOffset: 0,
		opacity: 1,
		riseOffset: 250,
		autoPanSpeed: 10, // untested

		// string options
		title: 'marker',
	});

	// svelte-ignore state_referenced_locally
	const booleanOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'boolean',
	) as PickOptionByType<MarkerOptions, boolean>[];

	// svelte-ignore state_referenced_locally
	const numberOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'number',
	) as PickOptionByType<MarkerOptions, number>[];
</script>

<Map
	locateControl={{
		position: 'topleft',
	}}
	oncontextmenu={() => console.log('contextmenu from map')}
>
	<!-- <Marker
		bind:options
		latlng={[46.788094, 1.703562]}
		onclick={(e) => {
			window.alert('You clicked the marker!');
		}}
	>
		<DivIcon>
			<CustomMarker />
		</DivIcon>
	</Marker> -->

	<Marker
		bind:options
		latlng={[46.788094, 1.803562]}
		oncontextmenu={() => console.log('contextmenu from marker')}
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
</Controls>
