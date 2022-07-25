<script lang="ts">
	import { browser } from '$app/env';
	import AddReviewForm from '$components/learn/AddReviewForm.svelte';
	import Filters from '$components/learn/Filters.svelte';
	import QuestionsList from '$components/learn/QuestionsList.svelte';
	import SearchBar from '$components/learn/SearchBar.svelte';
	import TitleBar from '$components/learn/TitleBar.svelte';
	import type { QuestionState, ReviewInfo } from '$components/learn/types';
	import { fetchQuestions } from '$db/queries';
	import type { QuestionFilterParams } from '$db/types';
	import type { Question } from '$lib/types';

	let questions: Question[] = [];
	let selectedQuestions: Record<string, boolean> = {};

	let filterParams: QuestionFilterParams = {
		searchTerm: '',
		hardness: '',
		tag: '',
	};

	let page = 0;
	const pageSize = 25;
	let fetchedQuestions: Question[] = [];
	let hasMore = true;

	const fetchData = async () => {
		if (!browser) {
			return null;
		}

		const { hasNext, questions } = await fetchQuestions(
			filterParams,
			page,
			pageSize
		);

		hasMore = hasNext;
		fetchedQuestions = questions;
		page += Number(hasNext);
	};

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

	$: questions = [...questions, ...fetchedQuestions];
</script>

<div class="flex flex-col gap-6 p-6 wrapper">
	<TitleBar on:clearSelected={clearSelected} {someQuestionSelected} />
	<SearchBar bind:searchTerm={filterParams.searchTerm} />
	<Filters bind:hardness={filterParams.hardness} bind:tag={filterParams.tag} />
	<QuestionsList
		{questions}
		{selectedQuestions}
		{hasMore}
		on:change={handleChange}
		on:loadMore={fetchData}
	/>
	{#if someQuestionSelected}
		<AddReviewForm on:save={handleAddReview} on:cancel={clearSelected} />
	{/if}
</div>

<style>
	.wrapper {
		height: calc(100vh - 64px);
	}
</style>
