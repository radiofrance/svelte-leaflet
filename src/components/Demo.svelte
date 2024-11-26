<script lang="ts">
	type Props = { route: string };
	let { route }: Props = $props();
</script>

{#await import(`../routes/${route}/+page.svelte?raw`) then { default: svelteFile }}
	<code>
		<pre>{svelteFile}</pre>
	</code>
	<iframe src={`${route}`} title="demo" frameborder="0"></iframe>
{/await}
