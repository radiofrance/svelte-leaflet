<script lang="ts">
	import type { LatLngLiteral } from 'leaflet';
	import DivIcon from '$lib/DivIcon.svelte';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import MarkerClusterGroup from '$lib/MarkerClusterGroup.svelte';
	import CustomMarker from '$components/CustomMarker.svelte';
	import Popup from '$lib/Popup.svelte';
	import type { LeafletMap } from '$lib/index.js';
	import Controls from '$components/Controls.svelte';
	import Details from '$components/Details.svelte';
	import CustomClusterMarker from '$components/CustomClusterMarker.svelte';

	let stations = $state<Station[]>([]);
	let map: LeafletMap | undefined = $state();

	type BBox = [LatLngLiteral, LatLngLiteral];

	interface StationsResult {
		contents: Station[];
	}

	interface Station {
		id: number;
		latitude: string;
		longitude: string;
		adresse: string;
		ville: string;
	}

	const BaseURLPetrolPrince =
		'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records';

	function getBboxValue(bBox: BBox): string {
		const [point1, point2] = bBox;
		return `in_bbox(geom,${point1.lat},${point1.lng},${point2.lat},${point2.lng})`;
	}

	async function fetchPetrolStations(bBox: BBox) {
		const url = new URL(BaseURLPetrolPrince);
		url.searchParams.set('where', getBboxValue(bBox));
		url.searchParams.set('limit', '100');

		try {
			const response = await fetch(url);
			if (response.ok) {
				return { contents: (await response.json()).results ?? [] } as StationsResult;
			}
			return null;
		} catch (e) {
			console.error(`Could not load ${url.toString()}`, e);
			return null;
		}
	}
</script>

<Map
	options={{
		center: {
			lat: 47.212,
			lng: 2.153,
		},
		zoom: 6,
	}}
	onload={async (e) => {
		const bounds = e.sourceTarget.getBounds();
		const point1 = bounds.getSouthWest();
		const point2 = bounds.getNorthEast();
		const bBox: BBox = [point1, point2];
		const stationsResult = await fetchPetrolStations(bBox);
		if (stationsResult) {
			stations = stationsResult.contents;
		}
	}}
	bind:instance={map}
>
	<MarkerClusterGroup icon={CustomClusterMarker}>
		{#each stations as station (station.id)}
			<Marker latlng={[+station.latitude / 100000, +station.longitude / 100000]}>
				<DivIcon>
					<CustomMarker />
				</DivIcon>
				<Popup options={{ offset: [0, -40] }}>
					<h1>{station.ville}</h1>
					<p>{station.adresse}</p>
				</Popup>
			</Marker>
		{/each}
	</MarkerClusterGroup>
</Map>

<Controls>
	<Details title="test">
		<p>test</p>
	</Details>
</Controls>
