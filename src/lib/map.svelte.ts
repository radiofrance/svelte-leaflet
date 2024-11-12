import type { Map as LeafletMap, MapOptions } from 'leaflet';
import { capitalize, type CreateSvelteEventsMap } from './utils.js';
import {
	keyboardEvents,
	layerGroupEvents,
	layersControlEvents,
	leafletMouseEvents,
	locationEvents,
	mapStateChangeEvents,
	popupSpecificEvents,
	tooltipEvents,
} from './events.js';

// stores the function bound to the event listener so it can be removed later
let boundInvalidateMapSize: null | (() => void) = null;

function invalidateMapSize(map: LeafletMap) {
	map.invalidateSize({
		// TODO : add a way to customize these default values
		debounceMoveend: true,
		pan: true,
	});
}

export function updateMapProps(instance: LeafletMap, newProps: MapOptions) {
	if (!newProps) return;
	// any is the default type for the Object.entries values anyway
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	for (const [key, value] of Object.entries(newProps) as [keyof MapOptions, any][]) {
		// skip if the option value is unchanged
		if (instance.options[key] === value) continue;
		// update the option value :
		// - needed for future comparison (CF above)
		// - handles simple cases :
		//		untested :
		//		  closePopupOnClick	markerZoomAnimation	tapTolerance	worldCopyJump(untested)
		//		tested :
		//		  bounceAtZoomLimits	preferCanvas
		//		  easeLinearity				transform3DLimit
		//		  inertia							wheelDebounceTime
		//		  inertiaDeceleration	zoomAnimationThreshold
		//		  inertiaMaxSpeed			zoomDelta
		//		  maxBoundsViscosity	zoomSnap
		instance.options[key] = value;

		switch (key) {
			// TODO : move check of unsupported options before the unchanged check
			case 'fadeAnimation':
			case 'zoomAnimation':
			case 'wheelPxPerZoomLevel':
			case 'crs':
			case 'layers':
			case 'renderer':
				// animations could be hacked around by changing style attributes
				// not a priority
				throw new Error(`mutation of ${key} option is not supported`);

			// setters cases
			case 'maxBounds':
			case 'minZoom':
			case 'maxZoom':
			case 'zoom': {
				const setterName = `set${capitalize(key)}` as const;
				const setter = instance[setterName].bind(instance);
				setter(value);
				break;
			}

			// enable/disable cases (Handlers)
			case 'boxZoom':
			case 'scrollWheelZoom':
			case 'doubleClickZoom':
			case 'dragging':
			case 'keyboard':
			case 'tapHold':
			case 'touchZoom': // untested
				if (value) instance[key]?.enable();
				else instance[key]?.disable();
				break;

			// Control cases
			case 'zoomControl':
				if (value) {
					instance.zoomControl = instance.zoomControl || window.L.control.zoom();
					instance.zoomControl.addTo(instance);
				} else instance.zoomControl?.remove();
				break;
			case 'attributionControl':
				if (value) {
					instance.attributionControl =
						instance.attributionControl || window.L.control.attribution();
					instance.attributionControl.addTo(instance);
				} else instance.attributionControl?.remove();
				break;

			//complex cases
			case 'center':
				instance.setView(value, instance.getZoom());
				break;
			case 'keyboardPanDelta':
				// seems fine despite using a private method
				instance.keyboard._setPanDelta(value);
				break;
			case 'trackResize':
				if (boundInvalidateMapSize === null)
					boundInvalidateMapSize = invalidateMapSize.bind(null, instance);
				window.removeEventListener('resize', boundInvalidateMapSize);
				if (value) {
					window.addEventListener('resize', boundInvalidateMapSize);
					invalidateMapSize(instance);
				}
				break;
		}
	}
}

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

export type MapEvents = CreateSvelteEventsMap<typeof mapEvents, LeafletMap>;
