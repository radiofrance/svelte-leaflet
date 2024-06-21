// Reexport your entry components here
export { default as Map } from './Map.svelte';
export { default as Marker } from './Marker.svelte';
export { default as MarkerClusterGroup } from './MarkerClusterGroup.svelte';
export { default as Polyline } from './Polyline.svelte';
export { default as Popup } from './Popup.svelte';

export type { Marker as LeafletMarker } from './Marker.svelte';
export type {
	CircleOptions,
	LatLngExpression,
	LatLngLiteral,
	LatLngTuple,
	LeafletEvent,
	LeafletKeyboardEvent,
	LeafletMouseEvent,
	Map as LeafletMap,
	MarkerOptions,
	PathOptions
} from 'leaflet';
