import type { CircleMarker as LeafletCircleMarker } from 'leaflet';
import type { CreateSvelteEventsMap } from './utils.js';
import {
	interactiveLayerEvents,
	layerEvents,
	popupSpecificEvents,
	tooltipSpecificEvents,
} from './events.js';

export const circleMarkerEvents = [
	'move',
	...interactiveLayerEvents,
	...layerEvents,
	...popupSpecificEvents,
	...tooltipSpecificEvents,
] as const;

export type CircleMarkerEvents = CreateSvelteEventsMap<
	typeof circleMarkerEvents,
	LeafletCircleMarker
>;
