import type { Tooltip as LeafletTooltip, TooltipOptions } from 'leaflet';
import type { CreateSvelteEventsMap } from './utils.js';
import { interactiveLayerEvents, layerEvents, tooltipSpecificEvents } from './events.js';

export function updateTooltipProps(instance: LeafletTooltip, options: TooltipOptions) {
	if (!options) return;
	for (const [key, value] of Object.entries(options)) {
		if (instance.options[key as keyof TooltipOptions] === value) continue;
		instance.options[key as keyof TooltipOptions] = value;

		switch (key) {
			case 'className':
			case 'interactive':
			case 'pane':
				throw new Error(`mutation of ${key} option is not supported`);
			case 'direction':
			case 'permanent':
			case 'sticky':
			case 'opacity':
				if (instance.isOpen()) {
					const source = instance._source;
					source.closeTooltip();
					source.openTooltip();
				}
				break;
			case 'content':
				instance.setContent(value);
				break;
		}
	}
}

export const tooltipEvents = [
	...interactiveLayerEvents,
	...layerEvents,
	...tooltipSpecificEvents,
] as const;

export type TooltipEvents = CreateSvelteEventsMap<typeof tooltipEvents, LeafletTooltip>;

declare module 'leaflet' {
	interface Tooltip {
		_source: Layer;
	}
}
