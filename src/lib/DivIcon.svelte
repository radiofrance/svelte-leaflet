<script lang="ts">
	import { getContext, onMount, tick, type Snippet } from 'svelte';
	import type { Marker as LeafletMarker } from 'leaflet';
	type Props = { children: Snippet };

	let { children }: Props = $props();
	let iconContainer: HTMLDivElement | undefined = $state();

	const getMarker = getContext<() => LeafletMarker>('marker');
	const L = globalThis.window.L;

	onMount(async () => {
		await tick();
		const marker = getMarker?.();
		if (marker) {
			const divIcon = L.divIcon({
				html: iconContainer,
				className: '',
			});
			marker.setIcon(divIcon);
		}
	});
</script>

<div class="DivIcon" bind:this={iconContainer}>
	{@render children()}
</div>
