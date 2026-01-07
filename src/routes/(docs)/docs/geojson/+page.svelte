<script lang="ts">
  import Map from '$lib/Map.svelte';
  import GeoJSON from '$lib/GeoJSON.svelte';
  import type { GeoJSONOptions } from '$lib/index.js';
  import type { FeatureCollection } from 'geojson';
  import Controls from '$components/Controls.svelte';
  import Details from '$components/Details.svelte';

  // Simple FeatureCollection with a polygon and a point
  let data: FeatureCollection = $state({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: 'Zone' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [2.30, 48.87],
              [2.40, 48.87],
              [2.40, 48.92],
              [2.30, 48.92],
              [2.30, 48.87],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: { name: 'Point A' },
        geometry: { type: 'Point', coordinates: [2.355, 48.895] },
      },
    ],
  } as FeatureCollection);

  let options: GeoJSONOptions = $state({
    style: { color: '#1d4ed8', weight: 3, fillColor: '#93c5fd', fillOpacity: 0.4 },
    pointToLayer: (feature, latlng) => window.L.circleMarker(latlng, { radius: 8, color: '#ef4444' }),
    onEachFeature: (feature, layer) => {
      layer.on('click', () => console.log('feature click', feature.properties));
    },
  });

  function randomizePolygonColor() {
    const rand = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const color = `#${rand}`;
    options.style = { ...(options.style || {}), color, fillColor: color } as any;
  }

  let dataText: string = $state('');

  $effect(() => {
    // Keep text view in sync when data changes programmatically
    dataText = JSON.stringify(data, null, 2);
  });
</script>

<Map options={{ center: { lat: 48.895, lng: 2.355 }, zoom: 12 }}>
  <GeoJSON {data} {options} onlayeradd={(e) => console.log('layer added', e)} />
  <!-- Children can be added to this GeoJSON group via LAYERGROUP context if needed -->
</Map>

  

<Controls>
  <Details title="Actions">
    <button class="btn preset-filled-primary-500" onclick={randomizePolygonColor}>Randomize color</button>
  </Details>
  <Details title="Data">
    <label>
      FeatureCollection
      <textarea rows="10" bind:value={dataText} oninput={(e) => (data = JSON.parse(e.currentTarget.value))}></textarea>
    </label>
  </Details>
</Controls>
