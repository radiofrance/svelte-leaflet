import { writable, type Writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import type { Control } from 'leaflet';

export const MAP = Symbol('map');
export const LAYERGROUP = Symbol('layerGroup');
export const MARKER = Symbol('marker');
export const FOCUSABLE = Symbol('focusable');

const BASELAYERS = Symbol('baseLayers');
const OVERLAYS = Symbol('overlays');

type Context = Writable<Control.LayersObject>;

export function initBaseLayersStore() {
	const baseLayers = writable<Control.LayersObject>({});
	setContext(BASELAYERS, baseLayers);
}

export function getBaseLayersStore() {
	return getContext<Context>(BASELAYERS);
}

export function initOverlaysStore() {
	const baseLayers = writable<Control.LayersObject>({});
	setContext(OVERLAYS, baseLayers);
}

export function getOverlaysStore() {
	return getContext<Context>(OVERLAYS);
}
