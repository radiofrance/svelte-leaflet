<script lang="ts">
	import type { LatLngExpression, Map, PathOptions, Polyline } from 'leaflet';

	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte';

	export let latlngs: LatLngExpression[];
	export let options: PathOptions = {};

	let line: Polyline;
	let map: Map = getContext<() => Map>('map')();

	const dispatch = createEventDispatcher();

	$: updateLine(latlngs, options);

	function updateLine(latLngs: LatLngExpression[], lineStyle: PathOptions) {
		if (line) {
			line.setLatLngs(latLngs);
			line.setStyle(lineStyle);
		}
	}

	onMount(async () => {
		const L = window.L;
		line = new L.Polyline(latlngs);
		line.on('click', (e) => dispatch('click', e));
		line.addTo(map);
	});

	onDestroy(() => {
		line?.remove();
	});
</script>

<slot />
