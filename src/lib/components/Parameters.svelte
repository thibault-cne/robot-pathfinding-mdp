<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	import InputChip from '$lib/components/InputChip.svelte';
	import { store } from '$lib/utils/store.js';

	const drawerStore = getDrawerStore();

	let width;
	let height;
	let gamma;
	let start;
	let end;
	let rewards;
	let epsilon;

	store.subscribe((value) => {
		gamma = value.gamma;
		epsilon = value.epsilon;
		width = value.width;
		height = value.height;
		start = value.start;
		end = value.end;
		rewards = value.rewards;
	});

	function save() {
		const params = {
			width,
			height,
			gamma,
			start,
			end,
			rewards,
			epsilon
		};
		store.updateParams(params);
		drawerStore.close();
	}
</script>

<div class="flex flex-col h-screen justify-center items-center">
	<div class="flex flex-row items-center justify-around gap-2">
		<div class="flex flex-col justify-center items-center">
			<div>
				<div>Gamma: {gamma}</div>
				<input type="range" bind:value={gamma} min="0.01" max="0.99" step="0.01" />
			</div>
			<div class="flex flex-row gap-2">
				<div>
					<div>Hauteur: {height}</div>
					<input type="range" bind:value={height} max="10" min="4" />
				</div>
				<div>
					<div>Largeur: {width}</div>
					<input type="range" bind:value={width} max="10" min="4" />
				</div>
			</div>
			<div>
				<div>Début</div>
				<div class="flex flex-row gap-2 max-w-[200px]">
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">x</div>
						<input title="Start x" type="number" bind:value={start.x} />
					</div>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">y</div>
						<input title="Start y" type="number" bind:value={start.y} />
					</div>
				</div>
			</div>
			<div>
				<div>Fin</div>
				<div class="flex flex-row gap-2 max-w-[200px]">
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">x</div>
						<input title="End x" type="number" bind:value={end.x} />
					</div>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">y</div>
						<input title="End y" type="number" bind:value={end.y} />
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col justify-center items-center">
			<div>
				<div>Récompenses</div>
				<div class="flex flex-col gap-2 max-w-[200px]">
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim w-[100px]">Marécage</div>
						<input type="number" bind:value={rewards[0]} />
					</div>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim w-[100px]">Herbe</div>
						<input type="number" bind:value={rewards[1]} />
					</div>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim w-[100px]">Objectif</div>
						<input type="number" bind:value={rewards[2]} />
					</div>
				</div>
			</div>
		</div>
	</div>
	<button class="absolute bottom-10 p-4 bg-green-200 rounded-lg text-black" on:click={save}
		>Sauvegarder la configuration</button
	>
</div>
