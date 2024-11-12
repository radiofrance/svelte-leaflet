<script lang="ts">
	import { getContext, onMount, type Snippet } from 'svelte';
	import type { ControlPosition, Map as LeafletMap, LocateOptions } from 'leaflet';
	import { MAP } from './contexts.js';
	import GeolocationButton from './private/GeolocationButton.svelte';
	import { getFirstNonCommentChild } from './utils.js';

	type Props = {
		instance?: L.Control;
		children?: Snippet;
		position?: ControlPosition;
		options?: LocateOptions;
	};

	let { instance = $bindable(), children, position = 'topleft', options }: Props = $props();
	let locateButtonContainer: HTMLDivElement;

	const getMap = getContext<() => LeafletMap>(MAP);

	onMount(() => {
		const map = getMap();
		const control = window.L.Control.extend({
			position,
			onAdd: createLocateOnAdd(map, locateButtonContainer, options),
		});
		instance = new control({ position });
		map.addControl(instance);
	});

	function createLocateOnAdd(
		mapInstance: LeafletMap,
		locateButtonContainer: HTMLElement,
		locateControlOptions: L.LocateOptions = {},
	) {
		return () => {
			const locateButtonElement = getFirstNonCommentChild(locateButtonContainer);
			if (!locateButtonElement) return;
			// prevent zoom on locate button double click
			locateButtonElement.addEventListener('dblclick', (e: MouseEvent) => {
				e.preventDefault();
				e.stopPropagation();
			});
			locateButtonElement.addEventListener('click', () => {
				mapInstance?.locate(locateControlOptions);
			});
			return locateButtonElement;
		};
	}
</script>

<div bind:this={locateButtonContainer}>
	{#if children}
		{@render children()}
	{:else}
		<GeolocationButton />
	{/if}
</div>
