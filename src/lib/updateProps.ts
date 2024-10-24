import type { Map, Marker } from 'leaflet';
import { capitalize } from './utils.js';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLeafletInstance = { [key: string]: any };

declare module 'leaflet' {
	interface Handler {
		_setPanDelta(delta: number): void;
	}
}
