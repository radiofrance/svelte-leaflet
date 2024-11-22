<script lang="ts">
	import CircleMarker from '$lib/CircleMarker.svelte';
	import Map from '$lib/Map.svelte';
	import Controls from '../../components/Controls.svelte';
	import Details from '../../components/Details.svelte';
	import type { LatLngExpression, CircleMarkerOptions } from 'leaflet';

	let latlng: LatLngExpression = $state([51, -0.1]);
	let options: CircleMarkerOptions = $state({
		radius: 10,
		color: '#0000ff',
		weight: 2,
		// TODO : handle all options
	});

	function changeLatlng(event: Event) {
		const target = event.target as HTMLInputElement;
		latlng = JSON.parse(target.value);
	}
</script>

<Map options={{ center: latlng }}>
	<CircleMarker {latlng} {options} />
</Map>

<Controls>
	<label>
		latlng
		<input type="text" oninput={changeLatlng} value={JSON.stringify(latlng)} />
	</label>
	<label>
		radius
		<input type="number" bind:value={options.radius} />
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
