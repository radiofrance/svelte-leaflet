<script lang="ts">
	import DivIcon from '$lib/DivIcon.svelte';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import CustomMarker from '../../components/CustomMarker.svelte';
	import { markers } from './cities.js';

	let selectedMarkerId: number | null = $state(null);

	function setSelection(i: number | null) {
		selectedMarkerId = i;
	}
</script>

<main>
	<div class="list">
		<h2>list ↔️ markers two-way binding</h2>
		<em> hover list items or marker </em>
		{#each markers as { title }, i}
			<div
				role="listitem"
				class="city"
				class:active={selectedMarkerId === i}
				onfocus={() => setSelection(i)}
				onmouseover={() => setSelection(i)}
				onblur={() => setSelection(null)}
				onmouseout={() => setSelection(null)}
			>
				{title}
			</div>
		{/each}
	</div>
	<Map options={{ center: { lat: 47.212, lng: 2.153 }, zoom: 6 }}>
		{#each markers as { latlng, title }, i (title)}
			<Marker
				{latlng}
				options={{ title }}
				onmouseover={() => setSelection(i)}
				onmouseout={() => setSelection(null)}
			>
				<DivIcon>
					<CustomMarker active={selectedMarkerId === i} />
				</DivIcon>
			</Marker>
		{/each}
	</Map>
</main>

<style>
	main {
		display: flex;
		gap: 1rem;
		justify-content: center;
		height: 100vh;
	}

	.list {
		height: 100%;
		width: 300px;
		padding: 1rem;
		box-sizing: border-box;
	}

	.list em {
		display: inline-block;
		margin-bottom: 1rem;
	}

	.city {
		padding: 0.5rem;
		border-bottom: 1px solid #f0f0f0;
	}

	.city.active {
		color: white;
		background-color: darkgray;
	}
</style>
