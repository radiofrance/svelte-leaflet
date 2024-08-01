import type {
	ControlPosition,
	DragEndEvent,
	ErrorEvent,
	Evented,
	LayerEvent,
	LayersControlEvent,
	LeafletEvent,
	LeafletKeyboardEvent,
	LeafletMouseEvent,
	LocateOptions,
	LocationEvent,
	PopupEvent,
	ResizeEvent,
	TooltipEvent
} from 'leaflet';
import type { EventDispatcher } from 'svelte';

// Reexport your entry components here
export { default as Map } from './Map.svelte';
export { default as Marker } from './Marker.svelte';
export { default as MarkerClusterGroup } from './MarkerClusterGroup.svelte';
export { default as Polyline } from './Polyline.svelte';
export { default as Popup } from './Popup.svelte';
export { default as Circle } from './Circle.svelte';
export { default as Polygon } from './Polygon.svelte';

export type { Marker as LeafletMarker } from './Marker.svelte';
export type {
	Circle as LeafletCircle,
	CircleOptions,
	DragEndEvent,
	ErrorEvent,
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
	TooltipEvent
} from 'leaflet';

export function bindEvents(
	instance: Evented,
	dispatch: EventDispatcher<Record<string, unknown>>,
	events: readonly string[]
) {
	events.forEach((event) => {
		instance.on(event, (e) => dispatch(event, e));
	});
}

// export const leafletEvents = [
// 	'dragstart',
// 	'drag',
// 	'add',
// 	'remove',
// 	'loading',
// 	'error',
// 	'update',
// 	'down',
// 	'predrag'
// ] as const;
// export const resizeEvents = ['resize'] as const;
// export const zoomAnimEvents = ['zoomanim'] as const;
// export const tileEvents = ['tileunload', 'tileloadstart', 'tileload', 'tileabort'] as const;
// export const tileErrorEvents = ['tileerror'] as const;

export const interactiveLayerEvents = [
	'click',
	'dblclick',
	'mousedown',
	'mouseup',
	'mouseover',
	'mouseout',
	'contextmenu'
] as const;

export const keyboardEvents = ['keypress', 'keydown', 'keyup'] as const;

export const locationEvents = ['locationfound', 'locationerror'] as const;

export const leafletMouseEvents = [...interactiveLayerEvents, 'mousemove', 'preclick'] as const;

export const layerEvents = ['add', 'remove'] as const;

export const popupEvents = ['popupopen', 'popupclose'] as const;

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
	'zoomstart'
] as const;

export const mapStateChangeEvents = [...leafletEvents, 'resize'] as const;
export const polygonEvents = [
	...tooltipEvents,
	...layerEvents,
	...popupEvents,
	...interactiveLayerEvents
] as const;

type LeafletEventTypes = {
	resize: ResizeEvent;
	locationerror: ErrorEvent;
	locationfound: LocationEvent;
	add: LeafletEvent;
	remove: LeafletEvent;
	dragend: DragEndEvent;
} & LeafletEvents &
	LayersControlEvents &
	MouseEvents &
	PopupEvents &
	TooltipEvents &
	LayerGroupEvents &
	KeyboardEvents;

type LeafletEvents = {
	[K in (typeof leafletEvents)[number]]: LeafletEvent;
};

type LayersControlEvents = {
	[K in (typeof layersControlEvents)[number]]: LayersControlEvent;
};

type MouseEvents = {
	[K in (typeof leafletMouseEvents)[number]]: LeafletMouseEvent;
};

type PopupEvents = {
	[K in (typeof popupEvents)[number]]: PopupEvent;
};

type TooltipEvents = {
	[K in (typeof tooltipEvents)[number]]: TooltipEvent;
};

type LayerGroupEvents = {
	[K in (typeof layerGroupEvents)[number]]: LayerEvent;
};

type KeyboardEvents = {
	[K in (typeof keyboardEvents)[number]]: LeafletKeyboardEvent;
};

export type LeafletEventsRecord<T extends readonly string[]> = {
	[K in T[number]]: K extends keyof LeafletEventTypes ? LeafletEventTypes[K] : LeafletEvent;
};

export type LocateControlOptions = {
	position?: ControlPosition;
	options?: LocateOptions;
};
