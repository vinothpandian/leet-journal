<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let someQuestionSelected = false;
	const dispatch = createEventDispatcher();

	function clearSelected() {
		dispatch('clearSelected');
	}
</script>

<div class="flex justify-between">
	<h6>Leetcode Questions</h6>
	<button
		type="button"
		class="btn btn-xs"
		on:click={clearSelected}
		disabled={!someQuestionSelected}
	>
		Clear Selected
	</button>
</div>
