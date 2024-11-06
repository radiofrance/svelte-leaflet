<script>
	import { getContext } from 'svelte';
	import GeolocationIcon from './GeolocationIcon.svelte';
	// import { FOCUSABLE } from '../contexts.js';

	const tabindex = getContext('FOCUSABLE');
</script>

<div>
	<button {tabindex}>
		<GeolocationIcon width="1rem" />
	</button>
</div>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		background-color: white;
		cursor: pointer;
		border: none;
		border-radius: 2px;
	}

	button:hover {
		background-color: #f4f4f4;
	}

	div {
		border-radius: 4px;
		border: 2px solid rgba(0, 0, 0, 0.2);
	}
</style>
