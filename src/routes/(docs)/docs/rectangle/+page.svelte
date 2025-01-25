<script lang="ts">
	import Rectangle from '$lib/Rectangle.svelte';
	import Map from '$lib/Map.svelte';
	import Controls from '$components/Controls.svelte';
	import Details from '$components/Details.svelte';
	import type { LatLngBoundsExpression, PolylineOptions } from 'leaflet';

	let bounds: LatLngBoundsExpression = $state([
		[51, -0.1],
		[51.5, 0.1],
	]);
	let options: PolylineOptions = $state({
		color: '#ff0000',
		weight: 2,
	});

	function changeBounds(event: Event) {
		const target = event.target as HTMLInputElement;
		bounds = JSON.parse(target.value);
	}
</script>

<Map>
	<Rectangle {bounds} {options} />
</Map>

<Controls>
	<label>
		bounds
		<input type="text" oninput={changeBounds} value={JSON.stringify(bounds)} />
	</label>
	<Details title="Options">
		<label>
			color
			<input type="color" bind:value={options.color} />
		</label>
		<label>
			weight
			<input type="number" bind:value={options.weight} />
		</label>
	</Details>
</Controls>
