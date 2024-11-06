<script lang="ts">
	import DivIcon from '$lib/DivIcon.svelte';
	import Icon from '$lib/Icon.svelte';
	import type { LatLngExpression, MarkerOptions } from '$lib/index.js';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import type { PickOptionByType } from '$lib/utils.js';
	import Controls from '../../components/Controls.svelte';
	import CustomMarker from '../../components/CustomMarker.svelte';
	import Details from '../../components/Details.svelte';
	import eiffelPng from './eiffel.png';

	let latlng: LatLngExpression = $state([49.86750658335676, 2.3638381549875467]);
	let options: MarkerOptions & { autoPanPadding: [number, number] } = $state({
		// boolean options
		draggable: false,
		keyboard: true,
		riseOnHover: true,
		autoPan: true,
		autoPanOnFocus: true,
		interactive: true,
		bubblingMouseEvents: false,

		// number options
		zIndexOffset: 0,
		opacity: 1,
		riseOffset: 250,
		autoPanSpeed: 10,

		// string options
		title: 'marker',
		alt: 'marker',
		attribution: 'attribution',

		// other
		autoPanPadding: [50, 50],
	});

	function changeAutoPanPadding(x: number, y: number) {
		options.autoPanPadding = [x, y];
	}

	function changeLatlng(event: Event) {
		const target = event.target as HTMLInputElement;
		latlng = JSON.parse(target.value);
	}

	// svelte-ignore state_referenced_locally
	const booleanOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'boolean',
	) as PickOptionByType<MarkerOptions, boolean>[];

	// svelte-ignore state_referenced_locally
	const numberOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'number',
	) as PickOptionByType<MarkerOptions, number>[];

	// svelte-ignore state_referenced_locally
	const stringOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'string',
	) as PickOptionByType<MarkerOptions, string>[];
</script>

<Map
	options={{ zoom: 7 }}
	locateControl={{
		position: 'topleft',
	}}
	oncontextmenu={() => console.log('contextmenu from map')}
>
	<Marker bind:options {latlng} onclick={() => window.alert('onclick from marker')}>
		<DivIcon>
			<CustomMarker />
		</DivIcon>
	</Marker>

	<Marker
		latlng={[46.788094, 1.803562]}
		oncontextmenu={() => console.log('contextmenu from marker')}
	/>

	<Marker latlng={[48.85827416790019, 2.2945229891990397]}>
		<Icon
			options={{
				iconUrl: eiffelPng,
				// the image is 363x671px and I want it to appear 5 times smaller
				iconSize: [363 / 5, 671 / 5],
				// [180, 550] is the coordinate on the image I want to pin to the map
				// I need to divide it by 5 because of the resizing
				iconAnchor: [180 / 5, 550 / 5],
			}}
		/>
	</Marker>
</Map>

<Controls>
	<label>
		latlng
		<input type="text" value={JSON.stringify(latlng)} oninput={changeLatlng} />
	</label>
	<Details title="Number">
		{#each numberOptions as key}
			<label>
				{key}
				<input type="number" bind:value={options[key]} />
			</label>
		{/each}
		{#if options.autoPanPadding}
			<label>
				autoPanPadding
				<span>
					<input
						type="number"
						onchange={() => {
							if (options.autoPanPadding) {
								changeAutoPanPadding(options.autoPanPadding[0], options.autoPanPadding[1]);
							}
						}}
						value={options.autoPanPadding[0]}
						style="width:45px;"
					/>
					<input type="number" bind:value={options.autoPanPadding[1]} style="width:45px;" />
				</span>
			</label>
		{/if}
	</Details>
	<Details title="Boolean">
		{#each booleanOptions as key}
			<button onclick={() => (options[key] = !options[key])}>{key}: {options[key]}</button>
		{/each}
	</Details>
	<Details title="String">
		{#each stringOptions as key}
			<label>
				{key}
				<input type="text" bind:value={options[key]} />
			</label>
		{/each}
	</Details>
</Controls>

<style>
	input[type='number'] {
		width: 100px;
	}

	label {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
	}
</style>
