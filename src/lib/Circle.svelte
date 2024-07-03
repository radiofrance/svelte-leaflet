<script lang="ts">
	import type { Circle, CircleOptions, LatLngExpression, Map } from 'leaflet';
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte';

	export let center: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };
	export let instance: Circle | undefined = undefined;

	let map: Map = getContext<() => Map>('map')();
	const dispatch = createEventDispatcher();

	$: updateCicle(center, options);

	function updateCicle(center: LatLngExpression, options: CircleOptions) {
		console.log('updateCicle', center, options);
		if (instance) {
			performance.mark('circle-update-start');
			instance.setLatLng(center);
			instance.setStyle(options);
			instance.setRadius(options.radius);
			performance.mark('circle-update-end');
			performance.measure('circle-update', 'circle-update-start', 'circle-update-end');
			console.log(performance.getEntriesByName('circle-update'));
		}
	}

	onMount(async () => {
		const L = window.L;
		instance = new L.Circle(center, options);
		instance.on('click', (e) => dispatch('click', e));
		instance.addTo(map);
	});

	onDestroy(() => {
		instance?.remove();
	});
</script>

<slot />
