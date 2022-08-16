<script lang="ts">
	import Clear from '$icons/Clear.svelte';
	import type { Difficulty } from '$lib/types';
	import dayjs from 'dayjs/esm';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { ReviewInfo } from './types';

	export let difficulty: Difficulty = 3;
	export let reviewDate = dayjs().format('YYYY-MM-DD');

	const dispatch = createEventDispatcher<{
		save: ReviewInfo;
		close: void;
	}>();

	function handleSave() {
		dispatch('save', {
			difficulty,
			reviewDate: dayjs(reviewDate).toISOString(),
		});
	}

	function handleClose() {
		dispatch('close');
	}
</script>

<div
	in:fly={{ y: 200, duration: 500 }}
	out:fly={{ y: 200, duration: 200 }}
	class="min-h-[11rem] h-44 border-t border-gray-300 flex flex-col gap-4 p-4"
>
	<div class="flex justify-between">
		<h1 class="text-md font-bold">Add to review</h1>
		<button
			class="btn btn-link btn-xs btn-square rounded"
			on:click={handleClose}
		>
			<Clear />
		</button>
	</div>
	<div class="flex gap-2 items-center">
		<span>Completed on: </span>
		<input type="date" bind:value={reviewDate} />
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
					checked={value === difficulty}
				/>
			{/each}
		</div>
	</div>

	<div class="flex justify-end gap-4">
		<button class="btn btn-sm" on:click={handleSave}>Save</button>
	</div>
</div>
