<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<style>
	:global(body) {
		font-family: Verdana, Geneva, sans-serif;
		height: 100vh;
		margin: 0;
	}
</style>
