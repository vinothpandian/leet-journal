<script lang="ts">
	import Filters from '$components/learn/Filters.svelte';
	import SearchBar from '$components/learn/SearchBar.svelte';
	import TitleBar from '$components/learn/TitleBar.svelte';
	import ReviewList from '$components/review/ReviewList.svelte';
	import type { Hardness } from '$lib/types';
	import {
		hasMoreProblems,
		loadNextPage,
		problems,
		updateFilters,
	} from '$store/problems';

	let searchTerm: string = '';
	let hardness: Hardness | '' = '';
	let tag: string = '';

	$: searchTerm,
		tag,
		hardness,
		updateFilters({ searchTerm, tag, hardness }, true);
</script>

<div class="flex flex-col gap-6 p-6 wrapper">
	<TitleBar title="To Review" withActions={false} />
	<SearchBar bind:searchTerm />
	<Filters bind:hardness bind:tag />
	<ReviewList
		problems={$problems}
		hasMore={$hasMoreProblems}
		on:loadMore={loadNextPage}
	/>
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
