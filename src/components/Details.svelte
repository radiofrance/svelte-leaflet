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

	:global(.details-content label) {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
	}

	:global(.details-content input[type='number']) {
		width: 100px;
	}

	:global(.details-content span input[type='number']) {
		width: 50px;
	}
</style>
