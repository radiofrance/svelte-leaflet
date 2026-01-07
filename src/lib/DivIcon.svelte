<script lang="ts">
	import type { Marker as LeafletMarker, DivIcon as LeafletDivIcon, DivIconOptions } from 'leaflet';

	import { getContext, onDestroy, onMount, type Snippet } from 'svelte';
	import { MARKER } from './contexts.js';

	type Props = { children: Snippet; instance?: LeafletDivIcon; options?: DivIconOptions };

	let { children, instance = $bindable(), options = {} }: Props = $props();
	let iconContainer: HTMLDivElement | undefined = $state();

	const getMarker = getContext<() => LeafletMarker>(MARKER);

	onMount(() => {
		const marker = getMarker?.();
		if (marker) {
			instance = window.L.divIcon({
				html: iconContainer,
				className: '',
				...options,
			});
			marker.setIcon(instance);
		}
	});

	onDestroy(() => {
		if (instance) {
			instance.remove?.();
		}
	});
</script>

<div class="container">
	<div class="DivIcon" bind:this={iconContainer}>
		{@render children()}
	</div>
</div>

<!-- 
  @component
	Renders a custom HTML icon for a marker.
	
	## Usage
	**It should only be used as a child of a `Marker` component.**

	```svelte
	...
		<DivIcon {options}>
			<div class="my-custom-icon">🤓</div>
		</DivIcon>
	...
	```

	## Reactivity
	**None of the options are reactive.**
	
	If you need to update the icon, you should create a new `DivIcon` component with the new options.
-->

<style>
	.container {
		display: none;
	}
</style>
