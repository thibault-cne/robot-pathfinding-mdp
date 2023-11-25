<script>
	import Mdp from '$lib/utils/mdp.js';
	import { Motion } from 'svelte-motion';

	export let gamma;
	export let epsilon;
	export let width;
	export let height;

	let arrows = ['up_arrow.png', 'right_arrow.png', 'down_arrow.png', 'left_arrow.png'];
	let mdp = new Mdp(gamma, epsilon, width, height);

	let start = {
		x: 1,
		y: 4
	};
	let end = {
		x: 3,
		y: 0
	};
	let obstacles = [
		{
			x: 1,
			y: 1
		},
		{
			x: 2,
			y: 1
		},
		{
			x: 3,
			y: 1
		},
		{
			x: 3,
			y: 2
		},
		{
			x: 3,
			y: 3
		}
	];

	mdp.createGrid([-1, 0, 5], start, end, obstacles);
	mdp.valueIteration();

	function setIsAnimating(value) {
		isAnimating = value;
	}

	export function handleFlip() {
		if (!isAnimating) {
			isFlipped = !isFlipped;
			setIsAnimating(true);
		}
	}

	$: isFlipped = false;
	$: isAnimating = false;
</script>

<div>
	<!-- Create a grid layout with width and heigth -->
	<div
		class="grid"
		style="grid-template-columns: repeat({width}, 75px); grid-template-rows: repeat({height}, 75px);"
	>
		<!-- Create a cell for each state -->
		{#each Array(width) as _, i}
			{#each Array(height) as _, j}
				<div class="flip-card" style="grid-column: {i + 1}; grid-row: {j + 1};">
					<Motion
						let:motion
						initial={false}
						animate={{ rotateY: isFlipped ? 180 : 360 }}
						transition={{ duration: 0.6, animationDirection: 'normal' }}
						onAnimationComplete={() => setIsAnimating(false)}
					>
						<div
							class="flip-card-inner border-black border-solid border-[1px] p-2 w-full h-full flex justify-center items-center {mdp
								.grid[i][j].bg}"
							use:motion
						>
							<!-- Display the img of the cell in mdp.grid[i][j].img -->
							<div class="flip-card-front p-2">
								<img alt="img-front" src={mdp.grid[i][j].img} />
							</div>
							<div class="flip-card-back p-5">
								<img alt="img-back" src={arrows[mdp.values[i][j].action]} />
							</div>
						</div>
					</Motion>
				</div>
			{/each}
		{/each}
	</div>
</div>

<style>
	.flip-card {
		perspective: 1000px;
	}

	.flip-card-inner {
		transition: transform 0.6s;
		transform-style: preserve-3d;
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		backface-visibility: hidden;
	}

	.flip-card-back {
		transform: rotateY(180deg);
	}

	@keyframes rotateGradient {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 100% 100%;
		}
	}
</style>
