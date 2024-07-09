<script lang="ts">
	import '../../global.css';
	import Header from '../../components/Header.svelte';
</script>

<Header />
<main>
	<nav>
		<ul>
			<li><a href="/docs/getting-started"><h3>Getting started</h3></a></li>
			<li><h3>Components</h3></li>
			<li><a href="/docs/map">Map</a></li>
			<li><a href="/docs/marker">Marker</a></li>
		</ul>
	</nav>
	<div class="content">
		<slot />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
	}

	nav {
		box-sizing: border-box;
		border-right: 1px solid var(--color-primary);
		height: calc(100vh - 2rem);
		width: 300px;
		padding: 1rem;

		a {
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.content {
		flex: 1;
		padding: 1rem;
	}

	main :global(code) {
		font-size: 1rem;
		border: 1px solid var(--color-primary);
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
	}

	main :global(p) {
		margin-top: 2rem;
		font-size: 1.125rem;
	}
</style>
