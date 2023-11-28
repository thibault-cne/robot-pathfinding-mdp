<script>
	import { onMount } from 'svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	import Game from '$lib/components/Game.svelte';
	import { store } from '$lib/utils/store.js';

	const drawerStore = getDrawerStore();

	let gameComponent;

	onMount(() => {
		store.updateGameComponent(gameComponent);
	});
</script>

<!-- Center -->
<div class="flex justify-center items-center">
	<div class="flex flex-col items-center justify-center h-screen">
		<Game bind:this={gameComponent} />
		<button class="mt-5 p-4 bg-green-200 rounded-lg text-black" on:click={gameComponent.handleFlip}
			>Résultats</button
		>
	</div>
	<button
		type="button"
		class="absolute top-10 right-0 drawer-btn bg-green-200 text-black p-4"
		on:click={drawerStore.open}
	>
		<svg
			class="w-4 h-4 rotate-180"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 14 10"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M1 5h12m0 0L9 1m4 4L9 9"
			/>
		</svg>
	</button>
</div>

<style>
	.drawer-btn {
		border-radius: 20px 0 0 20px;
	}
</style>
