<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: Props = $props();

	type Props = {
		children?: Snippet;
	};
</script>

<div class="controls">
	{@render children?.()}
</div>

<style>
	.controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		box-sizing: border-box;
		max-height: 100vh;
		width: 320px;
		overflow-y: auto;
		color: black;
		font-size: 12px;
		border: 1px solid grey;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1000;
		background: white;
		padding: 1rem;
	}
</style>
