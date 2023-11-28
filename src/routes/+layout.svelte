<script>
	import '../app.postcss';
	import { Drawer, initializeStores } from '@skeletonlabs/skeleton';

	import Parameters from '$lib/components/Parameters.svelte';

	initializeStores();
</script>

<Drawer position="right">
	<Parameters />
</Drawer>

<slot />
