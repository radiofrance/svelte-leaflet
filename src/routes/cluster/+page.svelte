<script lang="ts">
	import type { LatLngLiteral } from 'leaflet';
	import DivIcon from '$lib/DivIcon.svelte';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import MarkerClusterGroup from '$lib/MarkerClusterGroup.svelte';
	import CustomMarker from '../../components/CustomMarker.svelte';
	import Popup from '$lib/Popup.svelte';
	import type { LeafletMap } from '$lib/index.js';

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
		cp: string;
		pop: string;
		adresse: string;
		ville: string;
		services?: string;
		prix?: string;
		rupture?: string;
		horaires?: string;
		geom: Geom;
		gazole_maj?: string;
		gazole_prix?: number;
		sp95_maj?: string;
		sp95_prix?: number;
		e85_maj?: string;
		e85_prix?: number;
		gplc_maj?: string;
		gplc_prix?: number;
		e10_maj?: string;
		e10_prix?: number;
		sp98_maj?: string;
		sp98_prix?: number;
		e10_rupture_debut?: string;
		e10_rupture_type?: string;
		sp98_rupture_debut?: string;
		sp98_rupture_type?: string;
		sp95_rupture_debut?: string;
		sp95_rupture_type?: string;
		e85_rupture_debut?: string;
		e85_rupture_type?: string;
		gplc_rupture_debut?: string;
		gplc_rupture_type?: string;
		gazole_rupture_debut?: string;
		gazole_rupture_type?: string;
		carburants_disponibles?: string[];
		carburants_indisponibles?: string[];
		carburants_rupture_temporaire?: string;
		carburants_rupture_definitive?: string;
		horaires_automate_24_24: string;
		services_service?: string[];
		departement: string;
		code_departement: string;
		region: string;
		code_region: string;
		horaires_jour?: string;
	}

	interface Geom {
		lon: number;
		lat: number;
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
	<MarkerClusterGroup>
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
