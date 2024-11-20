<script lang="ts">
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import Popup from '$lib/Popup.svelte';
	import Tooltip from '$lib/Tooltip.svelte';
	import type { TooltipOptions } from 'leaflet';

	const options: TooltipOptions = $state({
		className: '',
		content: '',
		direction: 'auto',
		offset: [0, 0],
		opacity: 0.9,
		permanent: true,
		sticky: true,
	});
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

<style>
	:global(.custom-tooltip) {
		padding: 30px;
		border: 3px solid red;
		opacity: 1;
	}
</style>
