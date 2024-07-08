<main>
	<nav>
		<ul>
			<li><a href="/docs/getting-started">Getting started</a></li>

			<li><a href="/docs/one">One</a></li>
			<li><a href="/docs/two">Two</a></li>
		</ul>
	</nav>

	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}

	nav {
		box-sizing: border-box;
		border: 1px solid lightgray;
		border-radius: 0.25rem;
		height: calc(100vh - 2rem);
		width: 300px;
		padding: 1rem;
	}

	nav a {
		text-decoration: none;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
