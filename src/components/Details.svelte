<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();
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
