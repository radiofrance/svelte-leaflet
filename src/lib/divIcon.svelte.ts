import type { DivIcon as LeafletDivIcon, DivIconOptions } from 'leaflet';

export function updateDivIconProps(instance: LeafletDivIcon, options: DivIconOptions) {
	if (!options) return;
	for (const [key, value] of Object.entries(options)) {
		// skip if the option value is unchanged
		if (instance.options[key as keyof DivIconOptions] === value) continue;
		// update the option value :
		// - needed for future comparison (CF above)
		// - handles simple cases
		//     bubblingMouseEvents	riseOffset	autoPanPadding
		//     autoPanSpeed
		instance.options[key as keyof DivIconOptions] = value;
		// switch (key) {
		// }
	}
}
