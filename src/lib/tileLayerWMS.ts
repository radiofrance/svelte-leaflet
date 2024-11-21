import type { TileLayerOptions, WMSParams, TileLayer as LeafletTileLayerWMS } from 'leaflet';

export type TileLayerWMSProps = {
	url: string;
	params?: WMSParams;
	options?: TileLayerOptions;
	instance?: LeafletTileLayerWMS;
};
