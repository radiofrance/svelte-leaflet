import { layerGroupEvents, popupSpecificEvents, tooltipSpecificEvents } from './events.js';
import type { CreateSvelteEventsMap } from './utils.js';
import type { GeoJSON as LeafletGeoJSON, GeoJSONOptions } from 'leaflet';

export const geoJsonEvents = [
  ...layerGroupEvents,
  ...popupSpecificEvents,
  ...tooltipSpecificEvents,
] as const;

export type GeoJSONEvents = CreateSvelteEventsMap<typeof geoJsonEvents, LeafletGeoJSON>;

export function updateGeoJsonStyle(instance: LeafletGeoJSON, options?: GeoJSONOptions) {
  if (!options) return;
  // Only support style mutation; other option changes require full rebuild
  if (options.style) {
    instance.setStyle(options.style);
  }
}
