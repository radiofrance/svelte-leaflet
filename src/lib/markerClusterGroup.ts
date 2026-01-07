import { markerEvents, type MarkerEvents } from './marker.js';
import type { CreateSvelteEventsMap } from './utils.js';

type ClusterifyMarkerEvent<E> = E extends `on${infer N}` ? `oncluster${N}` : never;

const clusteredMarkerEvents = markerEvents.map((event) => `cluster${event}` as const);
const clusterSpecificEvents = ['animationend', 'spiderfied', 'unspiderfied'] as const;

export const markerClusterGroupEvents = [
	...clusteredMarkerEvents,
	...clusterSpecificEvents,
] as const;

export type MarkerClusterGroupEvents = {
	[K in keyof MarkerEvents as ClusterifyMarkerEvent<K>]: MarkerEvents[K];
} & CreateSvelteEventsMap<typeof clusterSpecificEvents>;
