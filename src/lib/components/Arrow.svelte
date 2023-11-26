<script>
	export let angle;

	let rotation = 0;
	$: {
		switch (angle) {
			case 1:
				rotation = 0;
				break;
			case 2:
				rotation = 90;
				break;
			case 3:
				rotation = 180;
				break;
			case 4:
				rotation = 270;
				break;
		}
	}
</script>

<slot />
<!-- up arrow svg -->
<div class={$$restProps.class || ''} style={$$restProps.style || ''}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 30 30"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="feather feather-arrow-up"
		style="transform: rotate({rotation}deg); color: #000;"
	>
		<line x1="12" y1="50" x2="12" y2="5"></line>
		<polyline points="5 12 12 5 19 12"></polyline>
	</svg>
</div>
