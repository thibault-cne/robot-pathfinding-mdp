<script>
	import Game from '$lib/components/Game.svelte';

	let gameComponent;
</script>

<div>
	<Game gamma={0.4} epsilon={0.01} width={5} height={5} bind:this={gameComponent} />
	<button on:click={gameComponent.handleFlip}>flip</button>
</div>
