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
	MarkerClusterSpiderfyEvent,
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
import Polygon from './Polygon.svelte';
import LocateControl from './LocateControl.svelte';

export { DivIcon, Map, Marker, MarkerClusterGroup, Popup, Polygon, LocateControl };

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

export type LocateControlOptions = {
	position?: ControlPosition;
	options?: LocateOptions;
};
