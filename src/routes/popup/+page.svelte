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
</script>

<Map oncontextmenu={() => console.log('contextmenu from map')}>
	<Marker latlng={[48.8566, 2.3522]}>
		<Popup {options} />
		<DivIcon>
			<CustomMarker />
		</DivIcon>
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
