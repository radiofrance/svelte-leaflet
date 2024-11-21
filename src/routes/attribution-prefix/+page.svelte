<script>
	import Map from '$lib/Map.svelte';
</script>

<Map onload={(e) => e.sourceTarget.attributionControl.setPrefix('🥳')} attribution="🎉" />
