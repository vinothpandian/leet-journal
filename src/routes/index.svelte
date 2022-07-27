<script lang="ts">
	import { browser } from '$app/env';
	import AddReviewForm from '$components/learn/AddReviewForm.svelte';
	import Filters from '$components/learn/Filters.svelte';
	import QuestionsList from '$components/learn/QuestionsList.svelte';
	import SearchBar from '$components/learn/SearchBar.svelte';
	import TitleBar from '$components/learn/TitleBar.svelte';
	import type { QuestionState, ReviewInfo } from '$components/learn/types';
	import { addReviews, fetchQuestions } from '$db/queries';
	import type { Question, QuestionHardness } from '$lib/types';

	let questions: Question[] = [];
	let selectedQuestions: Record<string, boolean> = {};

	let searchTerm: string = '';
	let hardness: QuestionHardness | '' = '';
	let tag: string = '';
	let page: number = -1;
	let pageSize: number = 25;

	let fetchedQuestions: Question[] = [];
	let hasMore = true;

	const fetchData = async () => {
		if (!browser || page === -1) {
			return null;
		}

		const { hasNext, questions } = await fetchQuestions({
			searchTerm,
			hardness,
			tag,
			page,
			pageSize,
		});

		hasMore = hasNext;
		fetchedQuestions = questions;
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

	async function handleAddReview(event: CustomEvent<ReviewInfo>) {
		const { difficulty, reviewDate } = event.detail;
		const questionIds = Object.keys(selectedQuestions);
		await addReviews(reviewDate, difficulty, questionIds);
	}

	function handleLoadMore() {
		page += 1;
	}

	function reset() {
		questions = [];
		fetchedQuestions = [];
		hasMore = true;
		page = -1;
	}

	$: questions = [...questions, ...fetchedQuestions];

	$: searchTerm, tag, hardness, reset();
	$: page, fetchData();
</script>

<div class="flex flex-col gap-6 p-6 wrapper">
	<TitleBar on:clearSelected={clearSelected} {someQuestionSelected} />
	<SearchBar bind:searchTerm />
	<Filters bind:hardness bind:tag />
	<QuestionsList
		{questions}
		{selectedQuestions}
		{hasMore}
		on:change={handleChange}
		on:loadMore={handleLoadMore}
	/>
	{#if someQuestionSelected}
		<AddReviewForm on:save={handleAddReview} />
	{/if}
</div>

<style>
	.wrapper {
		height: calc(100vh - 64px);
	}
</style>
