import type { Map as LeafletMap, MapOptions } from 'leaflet';
import type L from 'leaflet';
import { capitalize } from './utils.js';

// stores the function bound to the event listener so it can be removed later
let boundInvalidateMapSize: null | (() => void) = null;

function invalidateMapSize(map: LeafletMap) {
	map.invalidateSize({
		// TODO : add a way to customize these default values
		debounceMoveend: true,
		pan: true
	});
}

export function updateMapProps(L: typeof import('leaflet'), map: LeafletMap, newProps: MapOptions) {
	if (!newProps) return;
	for (const [key, value] of Object.entries(newProps)) {
		// skip if the option value is unchanged
		if (map.options[key as keyof MapOptions] === value) continue;
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
				map.options[key] = value;
				const setterName = `set${capitalize(key)}` as const;
				const setter = map[setterName].bind(map);
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
				map.options[key] = value;
				if (value) map[key]?.enable();
				else map[key]?.disable();
				break;

			// simple cases
			case 'closePopupOnClick': // untested
			case 'markerZoomAnimation': // untested
			case 'tapTolerance': // untested
			case 'worldCopyJump': // untested
			case 'bounceAtZoomLimits':
			case 'easeLinearity':
			case 'inertia':
			case 'inertiaDeceleration':
			case 'inertiaMaxSpeed':
			case 'maxBoundsViscosity':
			case 'preferCanvas':
			case 'transform3DLimit':
			case 'wheelDebounceTime':
			case 'zoomAnimationThreshold':
			case 'zoomDelta':
			case 'zoomSnap':
				map.options[key] = value;
				break;

			// Control cases
			case 'zoomControl':
				if (value) {
					map.zoomControl = map.zoomControl || L.control.zoom();
					map.zoomControl.addTo(map);
				} else map.zoomControl?.remove();
				break;
			case 'attributionControl':
				if (value) {
					map.attributionControl = map.attributionControl || L.control.attribution();
					map.attributionControl.addTo(map);
				} else map.attributionControl?.remove();
				break;

			//complex cases
			case 'center':
				map.options.center = value;
				map.setView(value, map.getZoom());
				break;
			case 'keyboardPanDelta':
				// seems fine despite using a private method
				map.keyboard._setPanDelta(value);
				break;
			case 'trackResize':
				map.options.trackResize = value;
				if (boundInvalidateMapSize === null)
					boundInvalidateMapSize = invalidateMapSize.bind(null, map);
				window.removeEventListener('resize', boundInvalidateMapSize);
				if (value) {
					window.addEventListener('resize', boundInvalidateMapSize);
					invalidateMapSize(map);
				}
				break;
		}
	}
}

export function createLocateOnAdd(
	mapInstance: LeafletMap,
	locateButtonContainer: HTMLElement,
	locateControlOptions: L.LocateOptions = {}
) {
	return () => {
		const locateButtonElement = getFirstNonCommentChild(locateButtonContainer);
		if (!locateButtonElement) return;
		// prevent zoom on locate button double click
		locateButtonElement.addEventListener('dblclick', (e: MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
		});
		locateButtonElement.addEventListener('click', () => {
			mapInstance?.locate(locateControlOptions);
		});
		return locateButtonElement;
	};
}

function getFirstNonCommentChild(element: HTMLElement) {
	let child = element.firstChild;
	while (child && child.nodeType !== Node.ELEMENT_NODE) {
		child = child.nextSibling;
	}
	return child as HTMLElement | null;
}
