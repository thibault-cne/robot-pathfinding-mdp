import { writable } from 'svelte/store';

function createStore() {
	const { subscribe, set, update } = writable({
		game_component: null,
		width: 5,
		height: 7,
		gamma: 0.75,
		epsilon: 0.01,
		start: { x: 1, y: 4 },
		end: { x: 3, y: 0 },
		rewards: [-1, 0, 5],
		swamps: [
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
		]
	});

	const updateGameComponent = (gameComponent) => {
		update((state) => {
			state.game_component = gameComponent;
			return state;
		});
	};

	const updateHeight = (height) => {
		console.log('updateHeight', height);
		update((state) => {
			state.height = height;
			return state;
		});
	};

	const updateWidth = (width) => {
		update((state) => {
			state.width = width;
			return state;
		});
	};

	const updateGamma = (gamma) => {
		update((state) => {
			state.gamma = gamma;
			return state;
		});
	};

	const updateEpsilon = (epsilon) => {
		update((state) => {
			state.epsilon = epsilon;
			return state;
		});
	};

	const updateStart = (start) => {
		update((state) => {
			state.start = start;
			return state;
		});
	};

	const updateEnd = (end) => {
		update((state) => {
			state.end = end;
			return state;
		});
	};

	const updateRewards = (rewards) => {
		update((state) => {
			state.rewards = rewards;
			return state;
		});
	};

	const updateSwamps = (swamps) => {
		update((state) => {
			state.swamps = swamps;
			return state;
		});
	};

	const updateParams = (params) => {
		update((state) => {
			state.width = params.width;
			state.height = params.height;
			state.gamma = params.gamma;
			state.epsilon = params.epsilon;
			state.start = params.start;
			state.end = params.end;
			state.rewards = params.rewards;
			state.swamps = params.swamps;
			return state;
		});
	};

	return {
		subscribe,
		updateGameComponent,
		updateHeight,
		updateWidth,
		updateGamma,
		updateEpsilon,
		updateStart,
		updateEnd,
		updateRewards,
		updateSwamps,
		updateParams
	};
}

export const store = createStore();
