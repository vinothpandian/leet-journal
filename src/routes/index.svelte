<script lang="ts">
	import { browser } from '$app/env';
	import AddReviewForm from '$components/learn/AddReviewForm.svelte';
	import Filters from '$components/learn/Filters.svelte';
	import QuestionsList from '$components/learn/QuestionsList.svelte';
	import SearchBar from '$components/learn/SearchBar.svelte';
	import TitleBar from '$components/learn/TitleBar.svelte';
	import type { QuestionState, ReviewInfo } from '$components/learn/types';
	import db from '$db/db';
	import type { QuestionHardness } from '$lib/types';
	import { liveQuery } from 'dexie';

	let searchTerm: string = '';

	let filterDifficulty: QuestionHardness | '' = '';
	let filterTag: QuestionHardness | '' = '';

	let selectedQuestions: Record<string, boolean> = {};

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

	$: someQuestionSelected = Object.values(selectedQuestions).some(
		(checked) => checked
	);

	function clearSelected() {
		selectedQuestions = {};
	}

	function handleChange(event: CustomEvent<QuestionState>) {
		const { questionId, checked } = event.detail;
		selectedQuestions[questionId] = checked;
	}

	function handleAddReview(event: CustomEvent<ReviewInfo>) {
		const { difficulty, reviewDate } = event.detail;
		console.log(event.detail);
	}
</script>

<div class="flex flex-col gap-6 p-6 wrapper">
	<TitleBar on:clearSelected={clearSelected} {someQuestionSelected} />
	<SearchBar bind:searchTerm />
	<Filters bind:filterDifficulty bind:filterTag />
	<QuestionsList {questions} {selectedQuestions} on:change={handleChange} />
	{#if someQuestionSelected}
		<AddReviewForm on:save={handleAddReview} on:cancel={clearSelected} />
	{/if}
</div>

<style>
	.wrapper {
		height: calc(100vh - 64px);
	}
</style>
