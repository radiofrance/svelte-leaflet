<script lang="ts">
	import { Nav as Navigation } from '@skeletonlabs/skeleton-svelte';
	// Icons
	import IconMenu from 'lucide-svelte/icons/menu';
	import IconFolder from 'lucide-svelte/icons/folder';
	import IconImage from 'lucide-svelte/icons/image';
	import IconMusic from 'lucide-svelte/icons/music';
	import IconVideo from 'lucide-svelte/icons/video';
	import IconSettings from 'lucide-svelte/icons/settings';

	let navOpen = $state(false);

	let hrefExample = '#';
</script>

<div class="card grid h-[640px] w-full grid-cols-[auto_1fr] border-[1px] border-surface-100-900">
	<!-- Component -->
	<Navigation.Rail expanded={navOpen} class="bg-secondary">
		{#snippet header()}
			<Navigation.Tile title="Menu" id="menu" onclick={() => (navOpen = !navOpen)}
				><IconMenu /></Navigation.Tile
			>
		{/snippet}
		{#snippet tiles()}
			<Navigation.Tile id="0" label="Files" href={hrefExample}>
				<IconFolder />
			</Navigation.Tile>
			<Navigation.Tile id="1" label="Images" href={hrefExample}>
				<IconImage />
			</Navigation.Tile>
			<Navigation.Tile id="2" label="Music" href={hrefExample}>
				<IconMusic />
			</Navigation.Tile>
			<Navigation.Tile id="3" label="Videos" href={hrefExample}>
				<IconVideo />
			</Navigation.Tile>
		{/snippet}
		{#snippet footer()}
			<Navigation.Tile labelExpanded="Settings" href="/settings" title="settings"
				><IconSettings /></Navigation.Tile
			>
		{/snippet}
	</Navigation.Rail>
	<!-- Content -->
	<div class="flex items-center justify-center">
		<p class="opacity-20">(Content)</p>
	</div>
</div>
