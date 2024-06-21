<script lang="ts">
	import type { Circle, CircleOptions, LatLngExpression, Map } from 'leaflet';
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte';

	export let center: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };

	let circle: Circle;
	let map: Map = getContext<() => Map>('map')();
	const dispatch = createEventDispatcher();

	$: updateCicle(center, options);

	function updateCicle(center: LatLngExpression, options: CircleOptions) {
		if (circle) {
			circle.setLatLng(center);
			circle.options = options;
		}
	}

	onMount(async () => {
		const L = window.L;
		circle = new L.Circle(center, options);
		circle.on('click', (e) => dispatch('click', e));
		circle.addTo(map);
	});

	onDestroy(() => {
		circle?.remove();
	});
</script>

<slot />
