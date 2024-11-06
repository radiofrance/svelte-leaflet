<script lang="ts">
	import { getContext, onDestroy, onMount, type Snippet } from 'svelte';
	import type { Marker as LeafletMarker, DivIcon as LeafletDivIcon, DivIconOptions } from 'leaflet';
	import { MARKER } from './contexts.js';
	import { updateDivIconProps } from './divIcon.svelte.js';
	type Props = { children: Snippet; instance?: LeafletDivIcon; options?: DivIconOptions };

	let { children, instance = $bindable(), options = $bindable({}) }: Props = $props();
	let iconContainer: HTMLDivElement | undefined = $state();

	const getMarker = getContext<() => LeafletMarker>(MARKER);
	const L = globalThis.window.L;

	onMount(() => {
		const marker = getMarker?.();
		if (marker) {
			instance = L.divIcon({
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

	$effect(() => {
		if (instance && options) {
			updateDivIconProps(instance, options);
		}
	});
</script>

<div class="container">
	<div class="DivIcon" bind:this={iconContainer}>
		{@render children()}
	</div>
</div>

<style>
	.container {
		display: none;
	}
</style>
