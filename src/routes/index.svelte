<script lang="ts">
	import { browser } from '$app/env';
	import db from '$db/db';
	import { fly } from 'svelte/transition';

	import Search from '$icons/Search.svelte';
	import type { Question, QuestionHardness } from '$lib/types';

	import { liveQuery, type Observable } from 'dexie';

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

	$: questionTypes = liveQuery(async () => {
		if (!browser) {
			return [];
		}

		console.log('Ran again');

		return db.questions.toArray((qns) =>
			[...new Set(qns.map((qn) => qn.topicTags).flat())].sort()
		);
	});
</script>

<div class="flex flex-col gap-8 p-8 content">
	<div class="form-control">
		<div class="flex input-group">
			<input
				type="text"
				placeholder="Search…"
				class="input input-bordered flex-grow"
				bind:value={searchTerm}
			/>
			<button class="btn btn-square">
				<Search />
			</button>
		</div>
	</div>
	<div class="flex justify-between items-center flex-wrap gap-4">
		<select
			bind:value={filterDifficulty}
			class="select select-xs min-w-full md:min-w-min"
		>
			<option value="" selected>Select Difficulty</option>
			<option value="easy" class="text-success">Easy</option>
			<option value="medium" class="text-warning">Medium</option>
			<option value="hard" class="text-error">Hard</option>
		</select>
		<select
			bind:value={filterTag}
			class="select select-xs min-w-full md:min-w-min"
		>
			<option value="" selected>Select Tags</option>
			{#if $questionTypes}
				{#each $questionTypes as questionType}
					<option value={questionType}>{questionType}</option>
				{/each}
			{/if}
		</select>
		<button
			type="button"
			class="btn btn-xs"
			on:click={() => {
				checkedQuestions = {};
			}}
			disabled={!someQuestionSelected}>Clear Selection</button
		>
		<button
			type="button"
			class="btn btn-xs"
			on:click={() => {
				filterDifficulty = '';
				filterTag = '';
			}}
			disabled={filterDifficulty === '' && filterTag === ''}
			>Clear Filters</button
		>
	</div>
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
