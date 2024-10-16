import type { Map, Marker } from 'leaflet';

export function updateProps(instance: Map | Marker, prevProps: SvelteAllProps) {
	const props = instance.options;

	// iterate through the previous props
	// if the prop is in the new props and the value is different
	// update the instance options using the instance setter
	for (const [key, value] of Object.entries(prevProps)) {
		if (key in props && props[key] !== value) {
			instance[`set${capitalize(key)}`](value);
		}
	}
}

function capitalize(str: string) {
	return str[0].toUpperCase() + str.slice(1);
}
