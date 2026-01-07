import type { VideoOverlay as LeafletVideoOverlay, VideoOverlayOptions } from 'leaflet';
import {
	interactiveLayerEvents,
	layerEvents,
	popupSpecificEvents,
	tooltipSpecificEvents,
} from './events.js';
import type { CreateSvelteEventsMap } from './utils.js';

export function updateVideoOverlayProps(
	instance: LeafletVideoOverlay,
	options: VideoOverlayOptions,
) {
	if (!options) return;
	for (const [key, value] of Object.entries(options)) {
		if (instance.options[key as keyof VideoOverlayOptions] === value) continue;
		instance.options[key as keyof VideoOverlayOptions] = value;

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

export const videoOverlayEvents = [
	...interactiveLayerEvents,
	...layerEvents,
	...popupSpecificEvents,
	...tooltipSpecificEvents,
] as const;

export type VideoOverlayEvents = CreateSvelteEventsMap<
	typeof videoOverlayEvents,
	LeafletVideoOverlay
>;
