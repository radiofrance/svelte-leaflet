<script lang="ts">
  import { getContext, onDestroy, onMount, setContext } from 'svelte';
  import type { LayerGroup } from 'leaflet';
  import type { GeoJSON as LeafletGeoJSON, GeoJSONOptions } from 'leaflet';
  import { bindEvents } from './index.js';
  import { MAP, LAYERGROUP } from './contexts.js';
  import { geoJsonEvents, updateGeoJsonStyle, type GeoJSONEvents } from './geojson.js';

  type Props = {
    data: import('geojson').GeoJSON;
    options?: GeoJSONOptions;
    instance?: LeafletGeoJSON;
  } & GeoJSONEvents;

  let { data, options = $bindable(), instance = $bindable(), ...restProps }: Props = $props();

  const getMap = getContext<() => L.Map>(MAP);
  const getLayerGroup = getContext<() => LayerGroup>(LAYERGROUP);

  // Expose this group as a layer group context so children can add to it
  setContext(LAYERGROUP, () => instance);

  onMount(() => {
    const context = getLayerGroup?.() || getMap?.();
    instance = window.L.geoJSON(data, options);
    context?.addLayer(instance);
    bindEvents(instance, restProps, geoJsonEvents);
  });

  onDestroy(() => {
    instance?.clearLayers();
    instance?.remove();
  });

  $effect(() => {
    if (instance && data) {
      instance.clearLayers();
      instance.addData(data as any);
    }
  });

  $effect(() => {
    if (instance && options) {
      updateGeoJsonStyle(instance, options);
    }
  });
</script>
