import type { Marker as LeafletMarker, MarkerOptions } from 'leaflet';
import { capitalize } from './utils.js';

// const L = globalThis.window.L;

export function updateMarkerProps(instance: LeafletMarker, options: MarkerOptions) {
	if (!options) return;
	for (const [key, value] of Object.entries(options)) {
		// skip if the option value is unchanged
		if (instance.options[key as keyof MarkerOptions] === value) continue;
		// update the option value :
		// - needed for future comparison (CF above)
		// - handles simple cases
		//     bubblingMouseEvents	riseOffset	autoPanPadding
		//     autoPanSpeed
		instance.options[key as keyof MarkerOptions] = value;
		switch (key) {
			// setter cases
			case 'icon': // untested
			case 'zIndexOffset':
			case 'opacity': {
				const setterName = `set${capitalize(key)}` as const;
				const setter = instance[setterName].bind(instance);
				setter(value);
				break;
			}
			// complex cases
			case 'title':
				instance.getElement()?.setAttribute('title', value);
				break;
			case 'alt':
				instance.getElement()?.setAttribute('alt', value);
				break;
			case 'draggable':
				// option and handler are named differently
				if (value) instance.dragging?.enable();
				else instance.dragging?.disable();
				break;

			// TODO : move check of unsupported options before the unchanged check
			case 'keyboard':
			case 'riseOnHover':
			case 'shadowPane':
			case 'autoPan':
			case 'autoPanOnFocus':
			case 'interactive':
			case 'pane':
			case 'attribution':
				throw new Error(`mutation of ${key} option is not supported`);
		}
	}
}
