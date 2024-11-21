<script lang="ts">
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import Popup from '$lib/Popup.svelte';
	import Tooltip from '$lib/Tooltip.svelte';
	import type { TooltipOptions } from 'leaflet';
	import Controls from '../../components/Controls.svelte';
	import Details from '../../components/Details.svelte';
	import type { PickOptionByType } from '$lib/utils.js';

	const options: TooltipOptions = $state({
		permanent: false,
		sticky: false,
		interactive: true,
		className: '',
		content: '',
		direction: 'auto',
		pane: 'tooltipPane',
		opacity: 0.9,
		offset: [0, 0],
	});

	const booleanOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'boolean',
	) as PickOptionByType<TooltipOptions, boolean>[];

	const numberOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'number',
	) as PickOptionByType<TooltipOptions, number>[];

	const stringOptions = Object.keys(options).filter(
		(key) => typeof options[key as keyof typeof options] === 'string',
	) as PickOptionByType<TooltipOptions, string>[];

	const tupleOptions = Object.keys(options).filter((key) =>
		Array.isArray(options[key as keyof typeof options]),
	) as PickOptionByType<TooltipOptions, [number, number]>[];

	function changeTupleValue(
		key: PickOptionByType<TooltipOptions, [number, number]>,
		index: 0 | 1,
		value: number,
	) {
		if (!options[key] || !(options[key] instanceof Array)) return;
		options[key] = index === 0 ? [value, options[key][1]] : [options[key][0], value];
	}
</script>

<Map>
	<Marker latlng={[51.505, -0.09]}>
		<Tooltip {options}>
			<div>🤓 Hello</div>
		</Tooltip>
		<Popup>
			<div>👋 Hi</div>
		</Popup>
	</Marker>

	<Tooltip
		latlng={[40.4168, -3.7038]}
		options={{
			...options,
			className: 'custom-tooltip',
			permanent: true,
			opacity: 1,
		}}
	>
		<div>🇪🇸 Holà</div>
	</Tooltip>
</Map>

<Controls>
	<Details title="Boolean">
		{#each booleanOptions as key}
			<button
				type="button"
				class="btn preset-filled-primary-500"
				onclick={() => (options[key] = !options[key])}
			>
				<span>
					{key}: {options[key]}
				</span>
			</button>
		{/each}
	</Details>
	<Details title="Number">
		{#each numberOptions as key}
			<label class="label">
				{key}
				<input class="input p-1 text-center" type="number" bind:value={options[key]} />
			</label>
		{/each}
	</Details>
	<Details title="String">
		{#each stringOptions as key}
			<label>
				{key}
				<input class="input w-auto p-1 text-center" type="text" bind:value={options[key]} />
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
							class="input inline w-auto p-1 text-center"
							value={options[key][0]}
							oninput={(e) => changeTupleValue(key, 0, +e.currentTarget.value)}
						/>
						<input
							type="number"
							class="input inline w-auto p-1 text-center"
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
	:global(.custom-tooltip) {
		padding: 30px;
		border: 3px solid red;
		opacity: 1;
		border-radius: 25%;
	}
</style>
