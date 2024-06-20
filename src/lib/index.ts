// Reexport your entry components here
export { default as Map } from './Map.svelte';
export { default as Marker } from './Marker.svelte';
export { default as MarkerClusterGroup } from './MarkerClusterGroup.svelte';
export { default as Polyline } from './Polyline.svelte';
export { default as Popup } from './Popup.svelte';

export type { Marker as LeafletMarker } from './Marker.svelte';
export type {
	Map as LeafletMap,
	LatLngTuple,
	LatLngExpression,
	LatLngLiteral,
	LeafletEvent,
	LeafletMouseEvent,
	LeafletKeyboardEvent
} from 'leaflet';
