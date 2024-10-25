import type { Marker, MarkerOptions } from 'leaflet';
import { capitalize, type PickOptionByType } from './utils.js';

// const L = globalThis.window.L;

export function updateMarkerProps(instance: Marker, options: MarkerOptions) {
	if (!options) return;
	for (const [key, value] of Object.entries(options)) {
		// skip if the option value is unchanged
		if (instance.options[key as keyof MarkerOptions] === value) continue;
		// update the option value :
		// - needed for future comparison (CF above)
		// - handles simple cases (bubblingMouseEvents)
		instance.options[key as keyof MarkerOptions] = value;
		// debugger;
		switch (key) {
			// setter cases
			case 'opacity':
			case 'zIndexOffset': {
				const setterName = `set${capitalize(key)}` as const;
				const setter = instance[setterName].bind(instance);
				setter(value);
				break;
			}
			// complex cases
			case 'draggable':
				// option and handler are named differently
				if (value) instance.dragging?.enable();
				else instance.dragging?.disable();
				break;

			// TODO : move check of unsupported options before the unchanged check
			case 'interactive':
			case 'keyboard':
			case 'riseOnHover':
			case 'autoPan':
			case 'autoPanOnFocus':
				throw new Error(`mutation of ${key} option is not supported`);
		}
	}
}

// TODO : other options to handle
type rest = Exclude<
	keyof MarkerOptions,
	PickOptionByType<MarkerOptions, number> | PickOptionByType<MarkerOptions, boolean>
>;
