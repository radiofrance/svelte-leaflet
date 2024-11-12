<script lang="ts">
	import Logo from '../components/Logo.svelte';
	import Map from '$lib/Map.svelte';
	import SunMoon from 'lucide-svelte/icons/sun-moon';
</script>

<div class="hero">
	<Map
		options={{
			center: [46.92025531537454, 2.04],
			zoom: 5.5,
			zoomSnap: 0.5,
			zoomControl: false,
			attributionControl: false,
		}}
	/>
	<div class="overlay">
		<Logo width={'200'} />
		<h1>@radiofrance/svelte-leaflet</h1>
		<p class="baseline">Create Leaflet maps the Svelte way</p>
	</div>
</div>
<button
	onclick={() => {
		const element = document.documentElement;
		element.classList.toggle('dark');

		const isDark = element.classList.contains('dark');
		localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
	}}
>
	<SunMoon />
</button>
<nav class="list-nav">
	<ul>
		<li><a href="/map">Map</a></li>
		<li><a href="/marker">Marker</a></li>
		<li><a href="/popup">Popup</a></li>
		<li><a href="/cluster">Cluster</a></li>
		<li><a href="/polygon">Polygon</a></li>
		<li><a href="/list">List</a></li>
	</ul>
</nav>

<style lang="postcss">
	.hero {
		position: relative;
		height: 400px;
		overflow: hidden;
		border-bottom: 2px solid var(--color-primary);

		& .overlay {
			position: absolute;
			width: calc(100% + 2px);
			height: 100%;
			left: calc(50% - 1px);
			transform: translateX(-50%);
			color: white;
			background-color: rgba(0, 0, 0, 0.6);
			text-align: center;
			top: 0;
			padding-top: 2rem;
		}
		& h1 {
			font-size: 2rem;
			font-size: clamp(1rem, 5vw, 2rem);
			margin-bottom: 0.25em;
		}
	}
</style>
