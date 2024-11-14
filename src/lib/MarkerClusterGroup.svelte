<script lang="ts">
	import {
		getContext,
		mount,
		onDestroy,
		onMount,
		setContext,
		type Component,
		type Snippet,
	} from 'svelte';
	import type {
		MarkerClusterGroup as LeafletMarkerClusterGroup,
		LayerGroup as LeafletLayerGroup,
		MarkerClusterGroupOptions,
		LeafletEventHandlerFnMap,
		MarkerCluster,
	} from 'leaflet';
	import { LAYERGROUP, MAP } from './contexts.js';
	import {
		markerClusterGroupEvents,
		type MarkerClusterGroupEvents,
	} from './markerClusterGroup.svelte.js';
	import { bindEvents } from './index.js';

	type Props = {
		icon?: Component<{ count: number }>;
		instance?: LeafletMarkerClusterGroup;
		options?: MarkerClusterGroupOptions;
		children?: Snippet;
	} & MarkerClusterGroupEvents;

	let { instance = $bindable(), options, children, icon, ...restProps }: Props = $props();

	const getMap = getContext<() => L.Map>(MAP);
	const getLayerGroup = getContext<() => LeafletLayerGroup>(LAYERGROUP);

	setContext(LAYERGROUP, () => instance);

	onMount(() => {
		const map = getMap?.();
		const layerGroup = getLayerGroup?.();
		const context = layerGroup || map;

		const mergedOptions = { ...options };
		if (icon) {
			mergedOptions.iconCreateFunction = (cluster: MarkerCluster) => {
				const mountTarget = document.createElement('div');
				mountTarget.classList.add('MOUNTTARGET');
				mount(icon, {
					target: mountTarget,
					props: { count: cluster.getChildCount() },
				});
				const html = mountTarget.innerHTML;
				return window.L.divIcon({ html });
			};
		}

		instance = window.L.markerClusterGroup(mergedOptions);
		context.addLayer(instance);
		bindEvents(
			instance,
			restProps,
			// TODO : find a better way to type this
			markerClusterGroupEvents as unknown as readonly (keyof LeafletEventHandlerFnMap)[],
		);
	});

	onDestroy(() => {
		instance?.clearLayers();
	});
</script>

{#if instance && children}
	{@render children()}
{/if}
