import type { Popup as LeafletPopup, PopupOptions } from 'leaflet';

export function updatePopupProps(instance: LeafletPopup, options: PopupOptions) {
	if (!options) return;
	for (const [key, value] of Object.entries(options)) {
		// skip if the option value is unchanged
		if (instance.options[key as keyof PopupOptions] === value) continue;
		// update the option value :
		// - needed for future comparison (CF above)
		// - handles simple cases
		//     bubblingMouseEvents	riseOffset	autoPanPadding
		//     autoPanSpeed
		instance.options[key as keyof PopupOptions] = value;

		switch (key) {
			// unhandled
			case 'className':
			case 'interactive':
			case 'closeButton':
			case 'pane':
				throw new Error(`mutation of ${key} option is not supported`);
			// needs to reopen the popup
			case 'keepInView':
			case 'autoPan':
			case 'autoClose':
			case 'closeOnClick':
			case 'closeOnEscapeKey':
			case 'maxWidth':
			case 'minWidth':
			case 'maxHeight':
			case 'offset':
				if (instance.isOpen()) {
					const source = instance._source;
					source.closePopup();
					source.openPopup();
				}
				break;

			case 'content':
				instance.setContent(value);
				break;
		}
	}
}

declare module 'leaflet' {
	interface Popup {
		// private apis are not documented
		_source: Layer;
	}
}
