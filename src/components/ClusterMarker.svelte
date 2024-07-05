<script lang="ts">
	export let count: number;
	let color = 'white';

	$: if (count < 5) color = 'lightgreen';
	else if (count < 8) color = 'lightsalmon';
	else color = 'lightcoral';
</script>

<div style="--marker-cluster-color: {color};">
	{count}
</div>

<style>
	div {
		display: grid;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border: 5px solid white;
		background-color: var(--marker-cluster-color);
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
