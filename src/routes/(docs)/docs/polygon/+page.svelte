<script lang="ts">
	import type { PolylineOptions } from 'leaflet';
	import Map from '$lib/Map.svelte';
	import Polygon from '$lib/Polygon.svelte';
	import Controls from '$components/Controls.svelte';
	import type { PickOptionByType } from '$lib/utils.js';
	import type { Latlngs } from '$lib/index.js';
	import Details from '$components/Details.svelte';

	let latlngs: Latlngs = $state([
		[51, 2],
		[49, 8],
		[44, 8],
		[42, 3],
		[43, -2],
		[48, -4],
	]);
	let options: PolylineOptions = $state({
		// color options
		color: '#0000ff',
		fillColor: '#0000ff',
		// string options
		dashArray: '5 10',
		dashOffset: '5',
		className: 'polygon',

		fillOpacity: 0.5,
		weight: 3,
	});

	const colorOptions = ['color', 'fillColor'] as const;
	const stringOptions = Object.keys(options).filter((key) => {
		return (
			typeof options[key as keyof typeof options] === 'string' && !colorOptions.includes(key as any)
		);
	}) as Exclude<PickOptionByType<PolylineOptions, string>, (typeof colorOptions)[number]>[];

	function changeLatlngs(event: Event) {
		const target = event.target as HTMLInputElement;
		latlngs = JSON.parse(target.value);
	}
</script>

<Map>
	<Polygon
		{latlngs}
		{options}
		onclick={(e) => console.log('clicked', e.sourceTarget.setStyle({ color: 'red' }))}
	/>
</Map>

<Controls>
	<Details title="Colors">
		{#each colorOptions as option}
			<label>
				{option}
				<input
					type="color"
					value={options[option]}
					onchange={(e) => (options[option] = e.currentTarget.value)}
				/>
			</label>
		{/each}
	</Details>
	<Details title="Strings">
		{#each stringOptions as option}
			<label>
				{option}
				<input
					type="text"
					value={options[option]}
					oninput={(e) => (options[option] = e.currentTarget.value as any)}
				/>
			</label>
		{/each}
	</Details>

	<label>
		latlngs
		<input type="text" oninput={changeLatlngs} value={JSON.stringify(latlngs)} />
	</label>
</Controls>
