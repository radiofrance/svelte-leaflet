<script lang="ts">
	import type { PopupOptions } from 'leaflet';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import Popup from '$lib/Popup.svelte';
	import type { PickOptionByType } from '$lib/utils.js';
	import Controls from '../../components/Controls.svelte';
	import Details from '../../components/Details.svelte';
	import DivIcon from '$lib/DivIcon.svelte';
	import CustomMarker from '../../components/CustomMarker.svelte';

	const options: PopupOptions = $state({
		keepInView: false,
		closeButton: true,
		autoPan: true,
		autoClose: true,
		closeOnClick: true,
		closeOnEscapeKey: true,
		interactive: true,

		maxWidth: 300,
		minWidth: 50,
		maxHeight: 200,

		className: '',
		content: 'Hello, World!',

		offset: [0, -40],
		autoPanPaddingTopLeft: [50, 50],
		autoPanPaddingBottomRight: [50, 50],
		autoPanPadding: [50, 50],
	});

	const booleanOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'boolean',
	) as PickOptionByType<PopupOptions, boolean>[];

	const numberOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'number',
	) as PickOptionByType<PopupOptions, number>[];

	const stringOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'string',
	) as PickOptionByType<PopupOptions, string>[];

	const tupleOptions = Object.keys(options).filter((key) =>
		Array.isArray(options[key as keyof typeof options]),
	) as PickOptionByType<PopupOptions, [number, number]>[];

	function changeTupleValue(
		key: PickOptionByType<PopupOptions, [number, number]>,
		index: 0 | 1,
		value: number,
	) {
		if (!options[key] || !(options[key] instanceof Array)) return;
		options[key] = index === 0 ? [value, options[key][1]] : [options[key][0], value];
	}
</script>

<Map oncontextmenu={() => console.log('contextmenu from map')}>
	<Marker latlng={[48.8566, 2.3522]}>
		<Popup {options}>
			<DivIcon>
				<CustomMarker />
			</DivIcon>
			<h1>Paris</h1>
			<p>Capital of France</p>
		</Popup>
	</Marker>
	<Popup
		onclick={(e) => {}}
		latlng={[48.8566, 4.3522]}
		options={{
			closeOnClick: false,
			autoClose: false,
			closeButton: false,
			closeOnEscapeKey: false,
		}}
	>
		<span>I'm floating popup and you can't close me 😎</span>
	</Popup>
</Map>

<Controls>
	<Details title="Boolean">
		{#each booleanOptions as key}
			<button onclick={() => (options[key] = !options[key])}>{key}: {options[key]}</button>
		{/each}
	</Details>
	<Details title="Number">
		{#each numberOptions as key}
			<label>
				{key}
				<input type="number" bind:value={options[key]} />
			</label>
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
	<Details title="Tuple">
		{#each tupleOptions as key}
			<label>
				{key}
				{#if Array.isArray(options[key])}
					<span>
						<input
							type="number"
							value={options[key][0]}
							oninput={(e) => changeTupleValue(key, 0, +e.currentTarget.value)}
						/>
						<input
							type="number"
							value={options[key][1]}
							oninput={(e) => changeTupleValue(key, 1, +e.currentTarget.value)}
						/>
					</span>
				{/if}
			</label>
		{/each}
	</Details>
</Controls>

<style>
	input[type='number'] {
		width: 100px;
	}

	span input[type='number'] {
		width: 50px;
	}

	label {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
	}
</style>
