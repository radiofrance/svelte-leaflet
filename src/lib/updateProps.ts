import type { Map, Marker, Popup } from 'leaflet';

function getUpdateProps({ handlers, setters, others, errors }) {}
export function updateProps<T extends Map | Marker | Popup>(instance: T) {}

declare module 'leaflet' {
	interface Handler {
		// private apis are not documented
		_setPanDelta(delta: number): void;
	}
}
