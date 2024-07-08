<script lang="ts">
	import Header from '../../components/Header.svelte';
</script>

<Header />
<main>
	<nav>
		<ul>
			<li><a href="/docs/getting-started">Getting started</a></li>

			<li><a href="/docs/one">One</a></li>
			<li><a href="/docs/two">Two</a></li>
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
		padding: 1rem;
	}

	nav {
		box-sizing: border-box;
		border: 5px solid #284612;
		border-radius: 0.25rem;
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
</style>
