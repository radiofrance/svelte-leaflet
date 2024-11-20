export const interactiveLayerEvents = [
	'click',
	'dblclick',
	'mousedown',
	'mouseup',
	'mouseover',
	'mouseout',
	'contextmenu',
] as const;

export const draggingEvents = ['dragstart', 'movestart', 'drag', 'dragend', 'moveend'] as const;

export const keyboardEvents = ['keypress', 'keydown', 'keyup'] as const;

export const locationEvents = ['locationfound', 'locationerror'] as const;

export const leafletMouseEvents = [...interactiveLayerEvents, 'mousemove', 'preclick'] as const;

export const layerEvents = ['add', 'remove'] as const;

export const popupSpecificEvents = ['popupopen', 'popupclose'] as const;

export const tooltipSpecificEvents = ['tooltipopen', 'tooltipclose'] as const;

export const layerGroupEvents = ['layeradd', 'layerremove'] as const;

export const layersControlEvents = ['baselayerchange', 'overlayadd', 'overlayremove'] as const;

const leafletEvents = [
	'load',
	'move',
	'moveend',
	'movestart',
	'unload',
	'viewreset',
	'zoom',
	'zoomend',
	'zoomlevelschange',
	'zoomstart',
] as const;

export const mapStateChangeEvents = [...leafletEvents, 'resize'] as const;
