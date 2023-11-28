<script>
	import { fly, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { dynamicTransition } from '$lib/utils/transition.js';

	export let height;
	export let width;
	export let value = [];
	export let input = { x: 0, y: 0 };
	export let validation = () => true;

	let duration = 150;
	let transitions = true;
	let listTransitionIn = fly;
	let listTransitionInParams = { duration: 150, opacity: 0, y: -20 };
	let listTransitionOut = fly;
	let listTransitionOutParams = { duration: 150, opacity: 0, y: -20 };
	let chipTransitionIn = scale;
	let chipTransitionInParams = { duration: 150, opacity: 0 };
	let chipTransitionOut = scale;
	let chipTransitionOutParams = { duration: 150, opacity: 0 };
	let chipValues =
		value?.map((val) => {
			return { val: val, id: Math.random() };
		}) || [];

	let inputValid = true;

	function onInputHandler() {
		if (input.x < 0 || input.y < 0) {
			inputValid = false;
			return;
		}

		inputValid = true;
	}

	function validate() {
		if (!input) return false;
		// Check custom validation
		if (validation !== undefined && !validation(input)) return false;
		// Check minimum boundaries
		if (input.x < 0 || input.y < 0) return false;
		// Check maximum boundaries
		if (input.x >= width || input.y >= height) return false;
		// Check if already exists
		if (value.filter((val) => val.x == input.x && val.y == input.y).length > 0) return false;
		// Check if we reached the maximum number of chips
		if (value.length >= height * width - 2) return false;
		// State is valid
		return true;
	}

	function addChip(event) {
		event.preventDefault();
		// Validate
		inputValid = validate();
		// When the onInvalid hook is present
		if (inputValid === false) {
			return;
		}
		// Append value to array
		value.push(input);
		value = value;
		chipValues.push({ val: input, id: Math.random() });
		chipValues = chipValues;
		// Clear input value
		input = { x: 0, y: 0 };

		console.log(value);
	}

	function removeChip(event, chipIndex, chipValue) {
		// Remove value from array
		value.splice(chipIndex, 1);
		value = value;
		chipValues.splice(chipIndex, 1);
		chipValues = chipValues;
	}

	$: chipValues =
		value?.map((val, i) => {
			if (chipValues[i]?.val === val) return chipValues[i];
			return { id: Math.random(), val: val };
		}) || [];
</script>

<div>
	<div class="input-chip-wrapper">
		<!-- Input Field -->
		<form on:submit={addChip} class="flex flex-col justify-center items-center">
			<div class="flex flex-row gap-2 max-w-[200px]">
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim">x</div>
					<input
						type="number"
						bind:value={input.x}
						class="input-chip-field"
						on:input={onInputHandler}
						on:input
						on:focus
						on:blur
					/>
				</div>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim">y</div>
					<input
						type="number"
						bind:value={input.y}
						class="input-chip-field"
						on:input={onInputHandler}
						on:input
						on:focus
						on:blur
					/>
				</div>
			</div>
			<button type="submit" class="mt-5 p-2 bg-green-200 rounded-lg text-black"
				>Ajouter un marécage</button
			>
		</form>
		<!-- Chip List -->
		{#if chipValues.length}
			<div
				class="flex flex-row flex-wrap max-w-xs items-center justify-center mt-4 gap-2"
				in:dynamicTransition|local={{
					transition: listTransitionIn,
					params: listTransitionInParams,
					enabled: transitions
				}}
				out:dynamicTransition|local={{
					transition: listTransitionOut,
					params: listTransitionOutParams,
					enabled: transitions
				}}
			>
				{#each chipValues as { id, val }, i (id)}
					<!-- Wrapping div required for FLIP animation -->
					<div animate:flip={{ duration }}>
						<button
							type="button"
							class="chip variant-filled"
							on:click={(e) => {
								removeChip(e, i, val);
							}}
							on:click
							on:keypress
							on:keydown
							on:keyup
							in:dynamicTransition|local={{
								transition: chipTransitionIn,
								params: chipTransitionInParams,
								enabled: transitions
							}}
							out:dynamicTransition|local={{
								transition: chipTransitionOut,
								params: chipTransitionOutParams,
								enabled: transitions
							}}
						>
							<span>({val.x},{val.y})</span>
							<span>✕</span>
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
