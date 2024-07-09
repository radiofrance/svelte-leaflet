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
				previousSibling.parentElement?.animate(
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

<pre>
  <code><slot /></code>
  <button on:click={copyToClipboard}><CopyIcon width="16" /></button>
</pre>

<style>
	pre {
		tab-size: 2;
		background-color: lightgray;
		color: black;
		display: inline-flex;
		gap: 0.5rem;
		align-items: center;
		padding: 0.25rem;
		border-radius: 0.25rem;
		/* border: 5px double gray; */
		margin: 1rem;

		code {
			border: none;
		}

		button {
			background: none;
			border: 2px outset var(--color-primary);
			border-radius: 0.25rem;
			padding: 0.25rem;
			cursor: pointer;

			&:active {
				border-style: inset;
			}
		}
	}
</style>
