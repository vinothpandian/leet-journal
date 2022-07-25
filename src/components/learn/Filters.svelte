<script lang="ts">
	import { browser } from '$app/env';
	import db from '$db/db';
	import Clear from '$icons/Clear.svelte';
	import type { QuestionHardness } from '$lib/types';
	import { liveQuery } from 'dexie';

	export let filterDifficulty: QuestionHardness | '' = '';
	export let filterTag: QuestionHardness | '' = '';

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

<div class="flex justify-between items-center flex-wrap md:flex-nowrap">
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
		class="btn btn-link btn-xs btn-square rounded"
		on:click={() => {
			filterDifficulty = '';
			filterTag = '';
		}}
		class:hidden={filterDifficulty === '' && filterTag === ''}
	>
		<Clear />
	</button>
</div>
