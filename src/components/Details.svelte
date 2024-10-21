<script lang="ts">
	import type { Snippet } from 'svelte';

	export let title: string;
	export let children: Snippet;
</script>

<details>
	<summary>{title}</summary>
	<div class="details-content">
		{@render children()}
	</div>
</details>

<style>
	summary {
		user-select: none;
		cursor: pointer;
		font-weight: bold;
	}
	.details-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1rem 0;
	}
</style>
