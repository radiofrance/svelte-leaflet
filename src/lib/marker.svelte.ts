import type { Marker, MarkerOptions } from 'leaflet';

// const L = globalThis.window.L;

export function updateMarkerProps(instance: Marker, options: MarkerOptions) {
	if (!options) return;
	for (const [key, value] of Object.entries(options)) {
		// skip if the option value is unchanged
		if (instance.options[key as keyof MarkerOptions] === value) continue;
		instance.options[key as keyof MarkerOptions] = value;
		debugger;
		switch (key) {
			case 'interactive':
				break;

			// complex cases
			case 'draggable':
				// option and handler are named differently
				if (value) instance.dragging?.enable();
				else instance.dragging?.disable();
				break;

			// TODO : move check of unsupported options before the unchanged check
			case 'keyboard':
			case 'riseOnHover':
			case 'autoPan':
			case 'autoPanOnFocus':
				throw new Error(`mutation of ${key} option is not supported`);
		}
	}
}
