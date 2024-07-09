<script lang="ts">
	import GithubIcon from './GithubIcon.svelte';
	import Logo from './Logo.svelte';
</script>

<header>
	<a href="/" class="start">
		<Logo width={'50'} />
		<h1>@radiofrance/svelte-leaflet</h1>
	</a>
	<div class="end">
		<a href="https://github.com/radiofrance/svelte-leaflet" target="_blank">
			<GithubIcon />
		</a>
	</div>
</header>

<style>
	header {
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #222;
		border-bottom: 1px solid var(--color-primary);
	}

	.start {
		display: flex;
		align-items: center;
		gap: 1rem;

		h1 {
			margin: 0;
			font-size: 1.5rem;
		}
	}
</style>
