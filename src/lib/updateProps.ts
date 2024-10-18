import type { Map, MapOptions, Marker } from 'leaflet';

export function updateProps<T extends Map | Marker>(instance: T, newProps: AnyLeafletInstance) {
	const props = instance.options;

	// iterate through the new props
	// if the prop is in the old props and the value is different
	// update the instance options using the instance setter
	for (const [key, value] of Object.entries(newProps)) {
		if (key in props && (props as Record<string, unknown>)[key] !== value) {
			const setterName = `set${capitalize(key)}`;
			if (!(setterName in instance)) {
				console.error(`Invalid prop ${key}`);
				continue;
			}
			const setter = (instance as unknown as Record<string, (v: unknown) => unknown>)[setterName];
			setter(value);
		}
	}
}

function capitalize(str: string) {
	return str[0].toUpperCase() + str.slice(1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLeafletInstance = { [key: string]: any };

// stores the function bound to the event listener so it can be removed later
let boundInvalidateMapSize: null | (() => void) = null;
function invalidateMapSize(map: Map) {
	map.invalidateSize({
		// TODO : add a way to customize these default values
		debounceMoveend: true,
		pan: true
	});
}
export function updateMapProps(L: typeof import('leaflet'), map: Map, newProps: MapOptions) {
	if (!newProps) return;
	for (const [key, value] of Object.entries(newProps)) {
		// skip if the option value is unchanged
		if (map.options[key as keyof MapOptions] === value) continue;
		switch (key) {
			// TODO : move check of unsupported options before the unchanged check
			case 'fadeAnimation':
			case 'zoomAnimation':
				// some could be hacked around by changing style attributes
				// not a priority
				throw new Error(`mutation of ${key} option is not supported`);

			// enable/disable cases (handlers)
			case 'boxZoom':
			case 'scrollWheelZoom':
			case 'doubleClickZoom':
			case 'dragging':
			case 'keyboard':
			case 'tapHold':
			case 'touchZoom': // untested
				map.options[key as keyof MapOptions] = value;
				if (value) map[key].enable();
				else map[key].disable();
				break;

			// simple cases
			case 'inertia':
			case 'preferCanvas':
			case 'bounceAtZoomLimits':
			case 'markerZoomAnimation': // untested
			case 'worldCopyJump': // untested
			case 'closePopupOnClick': // untested
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
			case 'trackResize':
				if (!boundInvalidateMapSize) boundInvalidateMapSize = invalidateMapSize.bind(null, map);
				window.removeEventListener('resize', boundInvalidateMapSize);
				if (value) {
					window.addEventListener('resize', boundInvalidateMapSize);
					invalidateMapSize(map);
				}
				break;
		}
	}
}
export type BooleanMapOption = keyof {
	[K in keyof MapOptions as true extends UnionContainsBoolean<MapOptions[K]>
		? K
		: never]: MapOptions[K];
};

type UnionContainsBoolean<T> = T extends boolean ? true : never;

// TODO : remove when https://github.com/DefinitelyTyped/DefinitelyTyped/pull/70943 is merged and published
declare module 'leaflet' {
	interface MapOptions {
		tapHold?: boolean;
	}
	interface Map {
		tapHold: {
			enable(): void;
			disable(): void;
		};
	}
}
