/* 
    Possible actions:
    0: Up
    1: Right
    2: Down
    3: Left
*/

class Mdp {
	constructor(gamma, epsilon, width, height) {
		this.gamma = gamma;
		this.epsilon = epsilon;
		this.width = width;
		this.height = height;
		this.grid = [];
		this.values = [];
	}

	// Create the grid layout with the given results, start, end and obstacles
	createGrid(rewards, start, end, obstacles) {
		// Create the grid with the given width and height

		for (let i = 0; i < this.height; i++) {
			let grid = [];
			let value = [];
			for (let j = 0; j < this.width; j++) {
				grid.push({ value: rewards[1], img: 'grass.png', bg: 'bg-lime-400' });
				value.push({ value: 0, action: 0 });
			}
			this.grid.push(grid);
			this.values.push(value);
		}

		// Set the rewards for each obstacle
		for (let i = 0; i < obstacles.length; i++) {
			this.grid[obstacles[i].x][obstacles[i].y] = {
				value: rewards[0],
				img: 'swamp.png',
				bg: 'bg-amber-400'
			};
		}

		// Set the rewards for the end
		this.grid[end.x][end.y] = { value: rewards[2], img: 'goal.png', bg: 'bg-blue-400' };

		// Set the image for the start
		this.grid[start.x][start.y] = { value: rewards[1], img: 'robot.png', bg: 'bg-slate-400' };
	}

	// Get the possible actions for the given state
	getPossibleActions(state) {
		let actions = [];
		if (state.y > 0) {
			actions.push(0);
		}
		if (state.x < this.width - 1) {
			actions.push(1);
		}
		if (state.y < this.height - 1) {
			actions.push(2);
		}
		if (state.x > 0) {
			actions.push(3);
		}
		return actions;
	}

	// Get the 3x3 grid of probabilities around the given state
	// The probabilities are as follows:
	// 0.8: The probability of the action succeeding
	// 0.1: The probability of the action failing and going left
	// 0.1: The probability of the action failing and going right
	//
	// If we are at the edge of the grid, the probability of going off the grid is 0 and we have :
	// 0.9: The probability of the action succeeding
	// 0.1: The probability of the action failing and going to the remaining direction
	getTransitionMatrix(state, action) {
		let matrix = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		];

		// On the left edge and going up or down
		if (state.x === 0 && (action === 0 || action === 2)) {
			if (action === 0) {
				matrix[0][1] = 0.9;
				matrix[0][2] = 0.1;
			} else {
				matrix[2][1] = 0.9;
				matrix[2][2] = 0.1;
			}
		}
		// On the right edge and going up or down
		else if (state.x === this.width - 1 && (action === 0 || action === 2)) {
			if (action === 0) {
				matrix[0][1] = 0.9;
				matrix[0][0] = 0.1;
			} else {
				matrix[2][1] = 0.9;
				matrix[2][0] = 0.1;
			}
		}

		// On the top edge and going left or right
		else if (state.y === 0 && (action === 1 || action === 3)) {
			if (action === 1) {
				matrix[1][2] = 0.9;
				matrix[2][2] = 0.1;
			} else {
				matrix[1][0] = 0.9;
				matrix[2][0] = 0.1;
			}
		}

		// On the bottom edge and going left or right
		else if (state.y === this.height - 1 && (action === 1 || action === 3)) {
			if (action === 1) {
				matrix[1][1] = 0.9;
				matrix[0][2] = 0.1;
			} else {
				matrix[1][0] = 0.9;
				matrix[0][0] = 0.1;
			}
		}

		// We asume we are not on the edge
		else {
			if (action === 0) {
				matrix[0][0] = 0.1;
				matrix[0][1] = 0.8;
				matrix[0][2] = 0.1;
			} else if (action === 1) {
				matrix[0][2] = 0.1;
				matrix[1][2] = 0.8;
				matrix[2][2] = 0.1;
			} else if (action === 2) {
				matrix[2][0] = 0.1;
				matrix[2][1] = 0.8;
				matrix[2][2] = 0.1;
			} else {
				matrix[0][0] = 0.1;
				matrix[1][0] = 0.8;
				matrix[2][0] = 0.1;
			}
		}

		return matrix;
	}

	// Calculate the value of the given state
	valueCalculation(state, action) {
		let valueSum = 0;
		let transitionMatrix = this.getTransitionMatrix(state, action);
		for (let i = 0; i < transitionMatrix.length; i++) {
			for (let j = 0; j < transitionMatrix[i].length; j++) {
				let next_state = { x: state.x + j - 1, y: state.y + i - 1 };
				if (transitionMatrix[i][j] == 0) {
					continue;
				}
				valueSum += transitionMatrix[i][j] * this.values[next_state.x][next_state.y].value;
			}
		}
		return this.grid[state.x][state.y].value + this.gamma * valueSum;
	}

	// Execute a step of the value iteration algorithm
	valueIterationStep() {
		let delta = 0;
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				let state = { x: j, y: i };
				let old_value = this.values[state.x][state.y].value;
				let actions = this.getPossibleActions(state);
				let values = {};
				for (let k = 0; k < actions.length; k++) {
					values[actions[k]] = this.valueCalculation(state, actions[k]);
				}
				let max_value = Math.max(...Object.values(values));
				let max_action = Object.keys(values).find((key) => values[key] === max_value);
				this.values[state.x][state.y] = { value: max_value, action: max_action };
				delta = Math.max(delta, Math.abs(old_value - max_value));
			}
		}
		return delta;
	}

	// Run the value iteration algorithm until convergence
	valueIteration() {
		let t = 1;
		let delta = this.valueIterationStep();
		while (delta > this.epsilon) {
			delta = this.valueIterationStep();
			t++;
		}

		return t;
	}
}

export default Mdp;
