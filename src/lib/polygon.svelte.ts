import {
	interactiveLayerEvents,
	layerEvents,
	popupSpecificEvents,
	tooltipEvents,
} from './events.js';
import type { CreateSvelteEventsMap } from './utils.js';
import type { Polygon as LeafletPolygon, PolylineOptions } from 'leaflet';

export function updatePolygonProps(instance: LeafletPolygon, options: PolylineOptions) {
	if (!options) return;
	for (const [key, value] of Object.entries(options)) {
		// skip if the option value is unchanged
		const oldValue = instance.options[key as keyof PolylineOptions];
		if (oldValue === value) continue;
		// update the option value :
		// - needed for future comparison (CF above)
		// - handles simple cases
		//     bubblingMouseEvents	riseOffset	autoPanPadding
		//     autoPanSpeed
		instance.options[key as keyof PolylineOptions] = value;

		switch (key) {
			case 'smoothFactor':
			case 'nonderer':
			case 'interactive':
			case 'bubblingMouseEvents':
			case 'pane':
			case 'attribution':
				throw new Error(`mutation of ${key} option is not supported`);

			case 'className':
				if (value === '') instance.getElement()?.classList.remove(oldValue as string);
				else if (oldValue === '') instance.getElement()?.classList.add(value);
				else instance.getElement()?.classList.replace(oldValue as string, value);
				break;

			// setStyle case
			case 'stroke':
			case 'color':
			case 'weight':
			case 'opacity':
			case 'lineCap':
			case 'lineJoin':
			case 'dashArray':
			case 'dashOffset':
			case 'fill':
			case 'fillColor':
			case 'fillOpacity':
			case 'fillRule':
				instance.setStyle(options);
				break;
		}
	}
}

export const polygonEvents = [
	...interactiveLayerEvents,
	...layerEvents,
	...popupSpecificEvents,
	...tooltipEvents,
] as const;

export type PolygonEvents = CreateSvelteEventsMap<typeof polygonEvents, LeafletPolygon>;
