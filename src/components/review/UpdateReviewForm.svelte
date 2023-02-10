<script lang="ts">
	import type { Difficulty } from '$lib/types';
	import dayjs from 'dayjs/esm';
	import { createEventDispatcher } from 'svelte';
	import type { ReviewInfo } from '$components/common/types';
	import DifficultyPicker from '$components/common/DifficultyPicker.svelte';

	export let difficulty: Difficulty;
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
</script>

<div
	class="min-h-[13rem] h-52 border-t border-b border-gray-300 flex flex-col gap-4 p-4"
>
	<div class="flex justify-between">
		<h1 class="text-md font-bold">Update review</h1>
	</div>
	<div class="flex flex-col flex-grow gap-4 pl-4">
		<div class="flex gap-2">
			<span title="Completed on" class="md:basis-1/4 text-right truncate">
				Reviewed on:
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
