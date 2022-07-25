<script lang="ts">
	import type { Difficulty } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let rank: Difficulty = 3;

	const dispatch = createEventDispatcher();

	function handleCancel() {
		dispatch('cancel');
	}
</script>

<div
	in:fly={{ y: 200, duration: 500 }}
	class="min-h-[11rem] h-44 border-t border-gray-300 flex flex-col gap-4 p-4"
>
	<h1 class="text-md font-bold">Add to review</h1>
	<div class="flex gap-2 items-center">
		<span>Completed on: </span>
		<input type="date" id="updatedDate" />
	</div>

	<div class="flex gap-2 items-center">
		<span>Difficulty: </span>
		<div class="btn-group">
			{#each [1, 2, 3, 4, 5] as value}
				<input
					type="radio"
					{value}
					name="options"
					data-title={value}
					class="btn btn-xs"
					checked={value === rank}
				/>
			{/each}
		</div>
	</div>

	<div class="flex justify-end gap-4">
		<button class="btn btn-sm btn-outline btn-error" on:click={handleCancel}
			>Cancel</button
		>
		<button class="btn btn-sm">Save</button>
	</div>
</div>
