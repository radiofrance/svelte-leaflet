<script lang="ts">
	import CopyIcon from './CopyIcon.svelte';

	function copyToClipboard(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) {
		const previousSibling = event.currentTarget.previousElementSibling;
		if (!previousSibling) return;
		const text = previousSibling.textContent || '';
		navigator.clipboard
			.writeText(text)
			.then(() => {
				previousSibling.animate(
					[
						{ backgroundColor: 'lightgray' },
						{ backgroundColor: 'var(--color-primary)' },
						{ backgroundColor: 'lightgray' }
					],
					{
						delay: 100,
						duration: 400,
						iterations: 1
					}
				);
			})
			.catch((error) => {
				console.error('Error copying text to clipboard:', error);
			});
	}
</script>

<div class="CodeSnippet">
	<pre><slot /></pre>
	<button on:click={copyToClipboard}><CopyIcon width="16" /></button>
</div>

<style>
	.CodeSnippet {
		position: relative;
		max-width: max-content;

		button {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 5px;
			background-color: lightgray;
			border: 2px outset var(--color-primary);
			border-radius: 0.25rem;
			padding: 0.25rem;
			cursor: pointer;

			&:active {
				border-style: inset;
			}
		}
	}
	pre {
		tab-size: 2;
		background-color: lightgray;
		color: black;
		align-items: center;
		padding: 1rem;
		padding-right: 3rem;
		border-radius: 0.25rem;
		overflow: auto;
	}
</style>
