<script lang="ts">
	import type { Layer, Popup, PopupOptions } from 'leaflet';

	import { getContext, onDestroy, onMount, tick } from 'svelte';
	const L = globalThis.window.L;

	export let options: PopupOptions = {
		autoPan: false
	};

	let popup: Popup | undefined = undefined;

	let popupElement: HTMLElement;

	let showContents = false;
	let popupOpen = false;

	const getLayer = getContext<() => Layer>('layer');
	let layer: Layer;

	function removePopup() {
		if (!popup) return;
		layer.unbindPopup();
		popup.remove();
	}

	async function createPopup() {
		await tick();
		layer = getLayer();
		popup = L.popup().setContent(popupElement);
		layer.bindPopup(popup, options);
		layer.on('popupopen', () => {
			popupOpen = true;
			showContents = true;
		});
		layer.on('popupclose', () => {
			popupOpen = false;
			// change the state after the CSS transition
			setTimeout(() => {
				if (!popupOpen) {
					showContents = false;
				}
			}, 500);
		});
	}

	onMount(createPopup);

	onDestroy(() => {
		removePopup();
	});
</script>

<div bind:this={popupElement}>
	{#if showContents}
		<slot />
	{/if}
</div>
