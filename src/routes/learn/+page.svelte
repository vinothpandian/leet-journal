<script lang="ts">
	import AddReviewForm from '$components/learn/AddReviewForm.svelte';

	import Filters from '$components/learn/Filters.svelte';
	import ProblemsList from '$components/learn/ProblemsList.svelte';
	import SearchBar from '$components/learn/SearchBar.svelte';
	import TitleBar from '$components/learn/TitleBar.svelte';
	import type { ProblemState, ReviewInfo } from '$components/learn/types';
	import { addReviews } from '$db/queries';
	import type { Hardness } from '$lib/types';
	import {
		hasMoreProblems,
		loadNextPage,
		problems,
		updateFilters,
	} from '$store/problems';
	import toast from 'svelte-french-toast';

	let selectedProblems: Record<number, boolean> = {};

	let searchTerm: string = '';
	let hardness: Hardness | '' = '';
	let tag: string = '';

	let someProblemSelected = false;
	let showReviewPopup = false;

	function clearSelected() {
		selectedProblems = {};
		showReviewPopup = false;
	}

	function handleChange(event: CustomEvent<ProblemState>) {
		const { problemId, checked } = event.detail;
		selectedProblems[problemId] = checked;

		someProblemSelected = Object.values(selectedProblems).some(
			(checked) => checked
		);
		showReviewPopup = someProblemSelected;
	}

	function handleClose() {
		showReviewPopup = false;
	}

	async function handleAddReview(event: CustomEvent<ReviewInfo>) {
		const { difficulty, reviewDate } = event.detail;
		const problemIds = Object.keys(selectedProblems).map((id) => Number(id));
		showReviewPopup = false;
		await addReviews(reviewDate, difficulty, problemIds);
		toast.success('Reviews added..');
	}

	$: searchTerm, tag, hardness, updateFilters({ searchTerm, tag, hardness });
</script>

<div class="flex flex-col gap-6 p-6 wrapper">
	<TitleBar {someProblemSelected} on:clearSelected={clearSelected} />
	<SearchBar bind:searchTerm />
	<Filters bind:hardness bind:tag />
	<ProblemsList
		problems={$problems}
		{selectedProblems}
		hasMore={$hasMoreProblems}
		on:change={handleChange}
		on:loadMore={loadNextPage}
	/>
	{#if showReviewPopup}
		<AddReviewForm on:save={handleAddReview} on:close={handleClose} />
	{/if}
</div>

<style>
	.wrapper {
		height: calc(100vh - var(--navbar-height) - var(--sidenavbar-height));
		overflow: hidden;
	}

	@media (min-width: 768px) {
		.wrapper {
			height: calc(100vh - var(--navbar-height));
		}
	}
</style>