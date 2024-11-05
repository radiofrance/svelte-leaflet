import type {
	ControlPosition,
	DragEndEvent,
	ErrorEvent,
	Evented,
	LatLngExpression,
	LayersControlEvent,
	LeafletEvent,
	LeafletEventHandlerFnMap,
	LeafletKeyboardEvent,
	LeafletMouseEvent,
	LocateOptions,
	LocationEvent,
	Map as LeafletMap,
	Marker as LeafletMarker,
	MarkerClusterSpiderfyEvent,
	Popup as LeafletPopup,
	ResizeEvent,
	TileErrorEvent,
	TileEvent,
	TooltipEvent,
	ZoomAnimEvent,
} from 'leaflet';

// Reexport your entry components here
import DivIcon from './DivIcon.svelte';
import Map from './Map.svelte';
import Marker from './Marker.svelte';
import MarkerClusterGroup from './MarkerClusterGroup.svelte';
import Popup from './Popup.svelte';

export { DivIcon, Map, Marker, MarkerClusterGroup, Popup };
// export { default as Marker } from './Marker.svelte';
// export { default as MarkerClusterGroup } from './MarkerClusterGroup.svelte';
// export { default as Polyline } from './Polyline.svelte';
// export { default as Popup } from './Popup.svelte';
// export { default as Circle } from './Circle.svelte';
// export { default as Polygon } from './Polygon.svelte';

// export type { Marker as LeafletMarker } from './Marker.svelte';

export type {
	Circle as LeafletCircle,
	CircleOptions,
	DragEndEvent,
	ErrorEvent,
	LatLngBoundsLiteral,
	LatLngExpression,
	LatLngLiteral,
	LatLngTuple,
	LayerEvent,
	LayersControlEvent,
	LeafletEvent,
	LeafletKeyboardEvent,
	LeafletMouseEvent,
	LocationEvent,
	Map as LeafletMap,
	MapOptions,
	MarkerOptions,
	PathOptions,
	PopupEvent,
	PopupOptions,
	ResizeEvent,
	TooltipEvent,
} from 'leaflet';

export type Latlngs = LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];

// type FuncType<T> = (e: T) => void;
type AllFuncTypes =
	| ((e: LeafletEvent) => void)
	| ((e: LeafletKeyboardEvent) => void)
	| ((e: LayersControlEvent) => void)
	| ((e: LeafletMouseEvent) => void)
	| ((e: LocationEvent) => void)
	| ((e: ErrorEvent) => void)
	| ((e: ResizeEvent) => void)
	| ((e: TooltipEvent) => void)
	| ((e: ZoomAnimEvent) => void)
	| ((e: DragEndEvent) => void)
	| ((e: TileEvent) => void)
	| ((e: TileErrorEvent) => void)
	| ((e: MarkerClusterSpiderfyEvent) => void);

type EventsParamsIntersection = UnionToIntersection<Parameters<AllFuncTypes>[0]>;
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
	k: infer I,
) => void
	? I
	: never;

export type PrefixedLeafletEventHandlerFnMap = {
	[K in keyof LeafletEventHandlerFnMap as `on${K}`]: LeafletEventHandlerFnMap[K];
};

export function bindEvents(
	instance: Evented,
	eventsProps: PrefixedLeafletEventHandlerFnMap,
	events: readonly (keyof LeafletEventHandlerFnMap)[],
) {
	events.forEach((event) => {
		const eventCallback = eventsProps[`on${event}`];
		if (typeof eventCallback !== 'function') return;
		instance.on(event, (e) => eventCallback(e as EventsParamsIntersection));
	});
}

export const interactiveLayerEvents = [
	'click',
	'dblclick',
	'mousedown',
	'mouseup',
	'mouseover',
	'mouseout',
	'contextmenu',
] as const;

export const draggingEvents = ['dragstart', 'movestart', 'drag', 'dragend', 'moveend'] as const;

export const keyboardEvents = ['keypress', 'keydown', 'keyup'] as const;

export const locationEvents = ['locationfound', 'locationerror'] as const;

export const leafletMouseEvents = [...interactiveLayerEvents, 'mousemove', 'preclick'] as const;

export const layerEvents = ['add', 'remove'] as const;

export const popupSpecificEvents = ['popupopen', 'popupclose'] as const;

export const tooltipEvents = ['tooltipopen', 'tooltipclose'] as const;

export const layerGroupEvents = ['layeradd', 'layerremove'] as const;

export const layersControlEvents = ['baselayerchange', 'overlayadd', 'overlayremove'] as const;

const leafletEvents = [
	'load',
	'move',
	'moveend',
	'movestart',
	'unload',
	'viewreset',
	'zoom',
	'zoomend',
	'zoomlevelschange',
	'zoomstart',
] as const;

export const mapStateChangeEvents = [...leafletEvents, 'resize'] as const;
export const polygonEvents = [
	...tooltipEvents,
	...layerEvents,
	...popupSpecificEvents,
	...interactiveLayerEvents,
] as const;

export type LocateControlOptions = {
	position?: ControlPosition;
	options?: LocateOptions;
};

export const mapEvents = [
	...keyboardEvents,
	...layerGroupEvents,
	...layersControlEvents,
	...leafletMouseEvents,
	...locationEvents,
	...mapStateChangeEvents,
	...popupSpecificEvents,
	...tooltipEvents,
	'autopanstart',
	'zoomanim',
] as const;

export const markerEvents = [
	'move',
	...draggingEvents,
	...interactiveLayerEvents,
	...layerEvents,
	...popupSpecificEvents,
	...tooltipEvents,
] as const;

export const popupEvents = [
	// 'contentupdate', // needs @types/leaflet PR ?
	...interactiveLayerEvents,
	...layerEvents,
	...popupSpecificEvents,
	...tooltipEvents,
] as const;

export type MapEvents = CreateSvelteEventsMap<typeof mapEvents, LeafletMap>;
export type MarkerEvents = CreateSvelteEventsMap<typeof markerEvents, LeafletMarker>;
export type PopupEvents = CreateSvelteEventsMap<typeof popupEvents, LeafletPopup>;

type CreateSvelteEventsMap<
	EventNames extends readonly (keyof LeafletEventHandlerFnMap)[],
	SourceTarget = null,
> = {
	[K in EventNames[number] as `on${K}`]?: SourceTarget extends null
		? LeafletEventHandlerFnMap[K]
		: (
				e: Omit<Parameters<Exclude<LeafletEventHandlerFnMap[K], undefined>>[0], 'sourceTarget'> & {
					sourceTarget: SourceTarget;
				},
			) => void;
};
