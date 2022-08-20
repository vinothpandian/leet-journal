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

	function handleLoadNextPage() {
		loadNextPage(true);
	}

	$: searchTerm,
		tag,
		hardness,
		updateFilters({ searchTerm, tag, hardness }, true);
</script>

<TitleBar title="To Review" withActions={false} />
<SearchBar bind:searchTerm />
<Filters bind:hardness bind:tag />
<ReviewList
	problems={$problems}
	hasMore={$hasMoreProblems}
	on:loadMore={handleLoadNextPage}
/>
