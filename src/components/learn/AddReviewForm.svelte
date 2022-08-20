<script lang="ts">
	import Clear from '$icons/Clear.svelte';
	import { getDifficultyBorderColor, getDifficultyText } from '$lib/difficulty';
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

	const difficulties: Difficulty[] = [1, 2, 3, 4, 5];
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
			<span title="Completed on" class="md:basis-1/4 text-right truncate"
				>Completed on:
			</span>
			<input class="ml-2" type="date" bind:value={reviewDate} />
		</div>

		<div class="flex gap-2 items-center relative">
			<span title="Difficulty" class="md:basis-1/4 text-right "
				>Difficulty:
			</span>
			<div class="btn-group relative gap-4 ml-2 flex-nowrap">
				<span class="absolute text-2xs text-secondary top-8 left-0">
					Very Easy
				</span>
				{#each difficulties as value}
					<input
						title={getDifficultyText(value)}
						class={`btn btn-xs border-4 ${getDifficultyBorderColor(value)}`}
						type="radio"
						{value}
						name="difficulty"
						bind:group={difficulty}
						data-title={value}
					/>
				{/each}
				<span class="absolute text-2xs text-secondary top-8 right-0">
					Very hard
				</span>
			</div>
		</div>
	</div>

	<div class="flex justify-end gap-4">
		<button class="btn btn-sm" on:click={handleSave}>Save</button>
	</div>
</div>
