<script lang="ts">
	import { browser } from '$app/env';
	import Filters from '$components/learn/Filters.svelte';
	import SearchBar from '$components/learn/SearchBar.svelte';
	import db from '$db/db';
	import type { Question, QuestionHardness } from '$lib/types';
	import { liveQuery, type Observable } from 'dexie';
	import { fly } from 'svelte/transition';

	let searchTerm: string = '';
	let questions: Observable<Question[]>;

	let filterDifficulty: QuestionHardness | '' = '';
	let filterTag: QuestionHardness | '' = '';

	let checkedQuestions: Record<string, boolean> = {};

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

<div class="flex flex-col gap-8 p-8 content">
	<SearchBar bind:searchTerm />
	<Filters bind:filterDifficulty bind:filterTag />
	<button
		type="button"
		class="btn btn-xs"
		on:click={() => {
			checkedQuestions = {};
		}}
		disabled={!someQuestionSelected}>Clear Selection</button
	>
	<ul class="flex-grow overflow-auto pb-4">
		{#if $questions}
			{#each $questions as question (question.id)}
				<li>
					<div class="form-control">
						<label class="label cursor-pointer gap-2 justify-start">
							<input
								type="checkbox"
								checked={checkedQuestions?.[question.questionId] ?? false}
								on:change={(event) => {
									checkedQuestions[question.questionId] =
										event.currentTarget.checked;
								}}
								class="checkbox checkbox-primary"
							/>
							<span
								class="label-text flex flex-grow gap-2 justify-between px-2 items-center"
							>
								{question.title}
								<span
									class="badge badge-xs badge-outline text-[9px] rounded"
									class:badge-success={question.hardness === 'easy'}
									class:badge-warning={question.hardness === 'medium'}
									class:badge-error={question.hardness === 'hard'}
								>
									{question.hardness}
								</span>
							</span>
						</label>
					</div>
				</li>
			{/each}
		{:else}
			Loading...
		{/if}
	</ul>
	{#if !someQuestionSelected}
		<div
			in:fly={{ y: 200, duration: 500 }}
			class="min-h-[13rem] h-52 border-t border-gray-300"
		>
			<input type="date" id="start" />
		</div>
	{/if}
</div>

<style>
	.content {
		height: calc(100vh - 64px);
	}
</style>
