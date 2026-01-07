<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { SVGOverlay as LeafletSVGOverlay, LayerGroup, LatLngBoundsLiteral } from 'leaflet';
	import { type LeafletMap } from './index.js';
	import { LAYERGROUP, MAP } from './contexts.js';

	type Props = {
		bounds: LatLngBoundsLiteral;
		instance?: LeafletSVGOverlay;
		options?: object;
		children?: any;
	};

	let { bounds, instance = $bindable(), options = {}, children, ...restProps }: Props = $props();
	let svgContainer: HTMLDivElement | null = $state(null);

	const getMap = getContext<() => LeafletMap>(MAP);
	const getLayerGroup = getContext<() => LayerGroup>(LAYERGROUP);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;
		const svg = svgContainer?.querySelector('svg');
		if (!svg) {
			throw new Error('SVGOverlay requires an SVG element as a child');
		}
		instance = window.L.svgOverlay(svg, bounds, options);
		instance.addTo(context);
		// bindEvents(instance, restProps);
	});

	onDestroy(() => {
		instance?.remove();
	});

	// $effect(() => {
	// 	if (instance && bounds) {
	// 		instance.setBounds(window.L.latLngBounds(bounds));
	// 	}
	// });
</script>

<div bind:this={svgContainer} class="svg-container">
	{@render children()}
</div>

<style>
	.svg-container {
		display: none;
	}
</style>
