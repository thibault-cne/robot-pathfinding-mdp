<script>
	import Game from '$lib/components/Game.svelte';

	let gameComponent;

	let width = 5;
	let height = 5;
	let gamma = 0.75;
	let start = {
		x: 1,
		y: 4
	};
	let end = {
		x: 3,
		y: 0
	};
	let reward = [-1, 0, 5];
</script>

<!-- Center -->
<div class="flex flex-row justify-around">
	<div class="flex flex-col items-center justify-center h-screen">
		<Game
			gamma={0.75}
			epsilon={0.01}
			{width}
			{height}
			{start}
			{end}
			{reward}
			bind:this={gameComponent}
		/>
		<button class="mt-5 p-4 bg-green-200 rounded-lg text-black" on:click={gameComponent.handleFlip}
			>Résultats</button
		>
	</div>
	<div class="flex flex-col items-center justify-center h-screen gap-2">
		<div>
			<div>Gamma: {gamma}</div>
			<input type="range" bind:value={gamma} max="0" min="1" step="0.1" />
		</div>
		<div class="flex flex-row gap-2">
			<div>
				<div>Height: {height}</div>
				<input type="range" bind:value={height} max="10" min="4" />
			</div>
			<div>
				<div>Width: {width}</div>
				<input type="range" bind:value={width} max="10" min="4" />
			</div>
		</div>
		<div>
			<div>Start</div>
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
			<div>End</div>
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
		<div>
			<div>Récompenses</div>
			<div class="flex flex-col gap-2 max-w-[200px]">
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim w-[100px]">Marécage</div>
					<input type="number" bind:value={reward[0]} />
				</div>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim w-[100px]">Herbe</div>
					<input type="number" bind:value={reward[1]} />
				</div>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim w-[100px]">Objectif</div>
					<input type="number" bind:value={reward[2]} />
				</div>
			</div>
		</div>
		<button
			class="mt-5 p-4 bg-green-200 rounded-lg text-black"
			on:click={gameComponent.generateGrid}>Générer la grille</button
		>
	</div>
</div>
