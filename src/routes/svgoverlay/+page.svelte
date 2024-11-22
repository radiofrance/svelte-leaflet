<script lang="ts">
	import SVGOverlay from '$lib/SVGOverlay.svelte';
	import Map from '$lib/Map.svelte';
	import Controls from '../../components/Controls.svelte';
	import type { LatLngBoundsLiteral } from 'leaflet';
	import Logo from '../../components/Logo.svelte';
	import LayersControl from '$lib/LayersControl.svelte';

	let bounds: LatLngBoundsLiteral = $state([
		[-51, -10.1],
		[51.5, 10.1],
	]);
	function changeBounds(event: Event) {
		const target = event.target as HTMLInputElement;
		bounds = JSON.parse(target.value);
	}
</script>

<Map>
	<LayersControl />
	<SVGOverlay {bounds}>
		<Logo />
	</SVGOverlay>
</Map>

<Controls>
	<label>
		bounds
		<input type="text" oninput={changeBounds} value={JSON.stringify(bounds)} />
	</label>
</Controls>
