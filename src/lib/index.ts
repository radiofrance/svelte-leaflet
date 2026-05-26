import type {
	ControlPosition,
	DragEndEvent,
	ErrorEvent,
	Evented,
	LatLngExpression,
	LayersControlEvent,
	LeafletEvent as OriginalLeafletEvent,
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
import Circle from './Circle.svelte';
import CircleMarker from './CircleMarker.svelte';
import DivIcon from './DivIcon.svelte';
import GeoJSON from './GeoJSON.svelte';
import Icon from './Icon.svelte';
import ImageOverlay from './ImageOverlay.svelte';
import LayersControl from './LayersControl.svelte';
import LocateControl from './LocateControl.svelte';
import Map from './Map.svelte';
import Marker from './Marker.svelte';
import MarkerClusterGroup from './MarkerClusterGroup.svelte';
import Polygon from './Polygon.svelte';
import Polyline from './Polyline.svelte';
import Popup from './Popup.svelte';
import Rectangle from './Rectangle.svelte';
import SVGOverlay from './SVGOverlay.svelte';
import TileLayer from './TileLayer.svelte';
import TileLayerWMS from './TileLayerWMS.svelte';
import Tooltip from './Tooltip.svelte';
import VideoOverlay from './VideoOverlay.svelte';
import ZoomControl from './ZoomControl.svelte';

export { Circle, CircleMarker, DivIcon, GeoJSON, Icon, ImageOverlay, LayersControl, LocateControl, Map, Marker, MarkerClusterGroup, Polygon, Polyline, Popup, Rectangle, SVGOverlay, TileLayer, TileLayerWMS, Tooltip, VideoOverlay, ZoomControl };

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
	LeafletKeyboardEvent,
	LeafletMouseEvent,
	LocationEvent,
	Map as LeafletMap,
	Marker as LeafletMarker,
	MapOptions,
	MarkerOptions,
	PathOptions,
	PopupEvent,
	PopupOptions,
	ResizeEvent,
	TooltipEvent,
	GeoJSONOptions
} from 'leaflet';

// TODO : use recursive approach to support 2D and 3D latlngs
export type Latlngs<D = 2> = 2 extends D
	? LatLngExpression[] | LatLngExpression[][]
	: 3 extends D
		? LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]
		: never;

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LeafletEvent<SourceTarget = any> = Omit<OriginalLeafletEvent, 'sourceTarget'> & {
	sourceTarget: SourceTarget;
};
