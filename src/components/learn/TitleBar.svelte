<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let someProblemSelected = false;
	const dispatch = createEventDispatcher();

	function clearSelected() {
		dispatch('clearSelected');
	}
</script>

<div class="flex justify-between">
	<h6 class="font-bold">Problems</h6>
	<button
		type="button"
		class="btn btn-xs"
		on:click={clearSelected}
		disabled={!someProblemSelected}
	>
		Clear Selected
	</button>
</div>
