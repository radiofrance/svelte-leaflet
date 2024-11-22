import type { ImageOverlay as LeafletImageOverlay, ImageOverlayOptions } from 'leaflet';
import {
	interactiveLayerEvents,
	layerEvents,
	popupSpecificEvents,
	tooltipSpecificEvents,
} from './events.js';
import type { CreateSvelteEventsMap } from './utils.js';

export function updateImageOverlayProps(
	instance: LeafletImageOverlay,
	options: ImageOverlayOptions,
) {
	if (!options) return;
	for (const [key, value] of Object.entries(options)) {
		if (instance.options[key as keyof ImageOverlayOptions] === value) continue;
		instance.options[key as keyof ImageOverlayOptions] = value;

		switch (key) {
			case 'opacity':
			case 'alt':
				instance.setOpacity(value);
				break;
			case 'interactive':
			case 'attribution':
				throw new Error(`mutation of ${key} option is not supported`);
		}
	}
}

export const imageOverlayEvents = [
	...interactiveLayerEvents,
	...layerEvents,
	...popupSpecificEvents,
	...tooltipSpecificEvents,
] as const;

export type ImageOverlayEvents = CreateSvelteEventsMap<
	typeof imageOverlayEvents,
	LeafletImageOverlay
>;
