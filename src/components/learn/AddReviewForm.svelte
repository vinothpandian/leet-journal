<script lang="ts">
	import Clear from '$icons/Clear.svelte';
	import type { Difficulty } from '$lib/types';
	import dayjs from 'dayjs/esm';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { ReviewInfo } from '$components/common/types';
	import DifficultyPicker from '$components/common/DifficultyPicker.svelte';

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
	class="min-h-[13rem] h-52 border-t border-gray-300 flex flex-col gap-4 p-4"
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
	<div class="flex flex-col flex-grow gap-4 pl-4">
		<div class="flex gap-2">
			<span title="Completed on" class="md:basis-1/4 text-right truncate">
				Completed on:
			</span>
			<input
				class="ml-2"
				type="date"
				max={dayjs().format('YYYY-MM-DD')}
				bind:value={reviewDate}
			/>
		</div>

		<DifficultyPicker bind:difficulty />
	</div>

	<div class="flex justify-end gap-4">
		<button class="btn btn-sm" on:click={handleSave}>Save</button>
	</div>
</div>
