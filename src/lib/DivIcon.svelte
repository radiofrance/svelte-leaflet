<script lang="ts">
	import { getContext, onDestroy, onMount, tick, type Snippet } from 'svelte';
	import type { Marker as LeafletMarker, DivIcon as LeafletDivIcon, DivIconOptions } from 'leaflet';
	type Props = { children: Snippet; instance?: LeafletDivIcon; options?: DivIconOptions };

	let { children, instance = $bindable(), options = $bindable({}) }: Props = $props();
	let iconContainer: HTMLDivElement | undefined = $state();

	const getMarker = getContext<() => LeafletMarker>('marker');
	const L = globalThis.window.L;

	onMount(async () => {
		await tick(); // wait for parent context to be defined (loop tick ?)
		await tick();
		await tick();
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
