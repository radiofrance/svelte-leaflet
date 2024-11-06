<script lang="ts">
	import type { Marker as LeafletMarker, Icon as LeafletIcon, IconOptions } from 'leaflet';

	import { getContext, onDestroy, onMount } from 'svelte';
	import { MARKER } from './contexts.js';

	type Props = { instance?: LeafletIcon; options: IconOptions };

	let { instance = $bindable(), options }: Props = $props();

	const getMarker = getContext<() => LeafletMarker>(MARKER);
	const L = globalThis.window.L;

	onMount(() => {
		const marker = getMarker?.();
		if (marker) {
			instance = L.icon(options);
			marker.setIcon(instance);
		}
	});

	onDestroy(() => {
		if (instance) {
			instance.remove?.();
		}
	});
</script>

<!-- 
  @component
	Renders a custom image icon for a marker.
	
	## Usage
	**It should only be used as a child of a `Marker` component.**
  
  `options.iconUrl` is required. The easiest way to use it is with data URL : import the image and pass it as the value.
  
  Absolute and relative URLs are also supported.
  
  ```svelte
  <script>
    import myPngIcon from './icon.png';
  </script>

  ...
    <Icon options={{iconUrl: myPngIcon}}/>
  ...
  ```

	## Reactivity
	**None of the options are reactive.**
  
  If you need to update the icon, you should create a new `DivIcon` component with the new options.



-->
