<script lang="ts">
	import { getContext, onMount, tick, type Snippet } from 'svelte';
	import type { Marker as LeafletMarker, DivIcon as LeafletDivIcon, DivIconOptions } from 'leaflet';
	type Props = { children: Snippet; instance?: LeafletDivIcon; options?: DivIconOptions };

	let { children, instance = $bindable(), options = $bindable({}) }: Props = $props();
	let iconContainer: HTMLDivElement | undefined = $state();

	const getMarker = getContext<() => LeafletMarker>('marker');
	console.log('getMarker', getMarker);
	const L = globalThis.window.L;

	onMount(async () => {
		await tick(); // wait for parent context to be defined (loop tick ?)
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
</script>

<div class="DivIcon" bind:this={iconContainer}>
	{@render children()}
</div>
