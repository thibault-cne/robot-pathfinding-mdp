<script>
	import Game from '$lib/components/Game.svelte';

	let gameComponent;
</script>

<!-- Center -->
<div class="flex flex-col items-center justify-center h-screen">
	<Game gamma={0.4} epsilon={0.01} width={5} height={5} bind:this={gameComponent} />
	<button class="mt-5 p-4 bg-green-200 rounded-lg text-black" on:click={gameComponent.handleFlip}
		>Résultats</button
	>
</div>
