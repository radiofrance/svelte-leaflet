# @radiofrance/svelte-leaflet

A library that wraps leaflet classes in domless/renderless svelte components.

## Compatibility

Version 1.0.0 and above are compatible with Svelte 5.

For svelte 3 and 4, use version 0.1.x (not actively maintained).

## Install

`npm i -D @radiofrance/svelte-leaflet`

## Components

### Map

Renders a map Leaflet Map. The Map will take up 100% of its container's height and width.

#### Attributes

| Attribute     | Type                                                          | Default                                            | Notes                                                                              |
| ------------- | ------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `options`     | [MapOptions](https://leafletjs.com/reference.html#map-option) | `{}`                                               | Map options                                                                        |
| `tilesUrl`    | string                                                        | `'https://tile.openstreetmap.org/{z}/{x}/{y}.png'` | more free tile services can be found at https://alexurquhart.github.io/free-tiles/ |
| `attribution` | string                                                        | `'©OpenStreetMap'` _(link to openstreetmap)_      |                                                                                    |

#### Events

All events are forwarded from the Map class, see the leaflet documentation for more information.

- https://leafletjs.com/reference.html#map-event

Example:

```svelte
<Map {options} onclick={(e) => console.log(e.detail.latlng)} />
```

### Marker

Add a marker to the map.

- Can be used as a child of `<Map>` or `<MarkerClusterGroup>`
- A `<Popup>` component can be passed as the Marker child to display a popup when the marker is clicked.
- To use a custom icon, pass a `Icon` or a `DivIcon` component as the marker child.

#### Attributes

| Name      | Type                                                                | Default    | Notes                                 |
| --------- | ------------------------------------------------------------------- | ---------- | ------------------------------------- |
| `latlng`  | [LatLng](https://leafletjs.com/reference.html#latlng)               | _required_ | position of the marker                |
| `options` | [MarkerOptions](https://leafletjs.com/reference.html#marker-option) | `{}`       | options to pass to the leaflet marker |

#### Events

All events are forwarded from the Marker class, see the leaflet documentation for more information.

- https://leafletjs.com/reference.html#marker-event

### Popup

`<Popup>` children will be displayed when the marker is clicked.

- Use as a `<Marker>` child.

#### Attributes

| Name      | Type                                                              | Default | Notes                                |
| --------- | ----------------------------------------------------------------- | ------- | ------------------------------------ |
| `options` | [PopupOptions](https://leafletjs.com/reference.html#popup-option) | `{}`    | options to pass to the leaflet popup |

### MarkerClusterGroup

Enables clustering of child markers

- Use as a `<Map>` child

#### Attributes

| Name      | Type                                                                                                                                   | Default | Notes                                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `options` | [MarkerClusterGroupOptions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/leaflet.markercluster/index.d.ts#L36) | `{}`    | [MarkerClusterGroup options](https://github.com/leaflet/Leaflet.markercluster?tab=readme-ov-file#defaults) |

### Polyline

Allows to draw lines on the map

#### Attributes

| Name      | Type                                                                    | Default    | Notes                                   |
| --------- | ----------------------------------------------------------------------- | ---------- | --------------------------------------- |
| `latlngs` | [LatLng[]](https://leafletjs.com/reference.html#latlng)                 | _required_ | array of points to draw the line        |
| `options` | [PolylineOptions](https://leafletjs.com/reference.html#polyline-option) | `{}`       | options to pass to the leaflet polyline |
