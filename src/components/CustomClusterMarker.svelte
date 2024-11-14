<script lang="ts">
	export let count: number;
</script>

<div>
	{count}
</div>

<style>
	div {
		font-size: 1rem;
		font-weight: 700;
		display: grid;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border: 5px solid white;
		background-color: #e5e7eb;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition: background-color 0.3s ease-in-out;

		&:hover {
			background-color: #9ca3af;
		}
	}
</style>
