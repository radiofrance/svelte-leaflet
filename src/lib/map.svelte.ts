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

export function updateMapProps(
	L: typeof import('leaflet'),
	instance: LeafletMap,
	newProps: MapOptions
) {
	if (!newProps) return;
	for (const [key, value] of Object.entries(newProps)) {
		// skip if the option value is unchanged
		if (instance.options[key as keyof MapOptions] === value) continue;
		// update the option value :
		// - is needed for future comparison (CF above)
		// - has actual effect for simple cases
		instance.options[key as keyof MapOptions] = value;
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
				instance.options[key] = value;
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
				instance.options[key] = value;
				if (value) instance[key]?.enable();
				else instance[key]?.disable();
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
				instance.options[key] = value;
				break;

			// Control cases
			case 'zoomControl':
				if (value) {
					instance.zoomControl = instance.zoomControl || L.control.zoom();
					instance.zoomControl.addTo(instance);
				} else instance.zoomControl?.remove();
				break;
			case 'attributionControl':
				if (value) {
					instance.attributionControl = instance.attributionControl || L.control.attribution();
					instance.attributionControl.addTo(instance);
				} else instance.attributionControl?.remove();
				break;

			//complex cases
			case 'center':
				instance.options.center = value;
				instance.setView(value, instance.getZoom());
				break;
			case 'keyboardPanDelta':
				// seems fine despite using a private method
				instance.keyboard._setPanDelta(value);
				break;
			case 'trackResize':
				instance.options.trackResize = value;
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
