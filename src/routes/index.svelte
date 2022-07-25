<script lang="ts">
	import { browser } from '$app/env';
	import Filters from '$components/learn/Filters.svelte';
	import QuestionItem from '$components/learn/QuestionItem.svelte';
	import SearchBar from '$components/learn/SearchBar.svelte';
	import db from '$db/db';
	import type { Difficulty, Question, QuestionHardness } from '$lib/types';
	import { liveQuery, type Observable } from 'dexie';
	import { fly } from 'svelte/transition';

	let searchTerm: string = '';
	let questions: Observable<Question[]>;

	let filterDifficulty: QuestionHardness | '' = '';
	let filterTag: QuestionHardness | '' = '';

	let checkedQuestions: Record<string, boolean> = {};

	let rank: Difficulty = 3;

	$: questions = liveQuery(() => {
		if (!browser) {
			return [];
		}

		return db.questions
			.filter((q) => filterTag === '' || q.topicTags.includes(filterTag))
			.filter((q) => filterDifficulty === '' || q.hardness === filterDifficulty)
			.filter((q) => q.title.toLowerCase().includes(searchTerm.toLowerCase()))
			.offset(0)
			.limit(100)
			.toArray();
	});

	$: someQuestionSelected = Object.values(checkedQuestions).some(
		(checked) => checked
	);
</script>

<div class="flex flex-col gap-6 p-6 content">
	<div class="flex justify-between">
		<h6>Leetcode Questions</h6>
		<button
			type="button"
			class="btn btn-xs"
			on:click={() => {
				checkedQuestions = {};
			}}
			disabled={!someQuestionSelected}
		>
			Clear Selected
		</button>
	</div>
	<SearchBar bind:searchTerm />
	<Filters bind:filterDifficulty bind:filterTag />
	<ul class="flex-grow overflow-auto pb-4">
		{#if $questions}
			{#each $questions as question (question.id)}
				<QuestionItem
					{question}
					isQuestionChecked={checkedQuestions?.[question.questionId] ?? false}
					on:change={(event) => {
						checkedQuestions[question.questionId] = event.detail.checked;
					}}
				/>
			{/each}
		{:else}
			Loading...
		{/if}
	</ul>
	{#if someQuestionSelected}
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
				<button
					class="btn btn-sm btn-outline btn-error"
					on:click={() => {
						checkedQuestions = {};
					}}>Cancel</button
				>
				<button class="btn btn-sm">Save</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.content {
		height: calc(100vh - 64px);
	}
</style>
