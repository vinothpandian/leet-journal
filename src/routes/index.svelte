<script lang="ts">
	import Filters from '$components/learn/Filters.svelte';

	import SearchBar from '$components/learn/SearchBar.svelte';

	import TitleBar from '$components/learn/TitleBar.svelte';
	import ReviewItem from '$components/review/ReviewItem.svelte';

	import type { Hardness, Problem } from '$lib/types';
	import dayjs from 'dayjs/esm';
	import relativeTime from 'dayjs/esm/plugin/relativeTime';
	dayjs.extend(relativeTime);

	let searchTerm: string = '';
	let hardness: Hardness | '' = '';
	let tag: string = '';

	const problem: Problem = {
		categoryTitle: 'Algorithms',
		hardness: 'medium',
		id: 4,
		leetCodeId: '5',
		notes: '',
		reviews: [{ difficulty: 3, reviewDate: '2022-08-07T04:00:00.000Z' }],
		title: 'Longest Palindromic Substring',
		titleSlug: 'longest-palindromic-substring',
		topicTags: ['String', 'Dynamic Programming'],
	};
</script>

<div class="flex flex-col gap-6 p-6 wrapper">
	<TitleBar title="To Review" withActions={false} />
	<SearchBar bind:searchTerm />
	<Filters bind:hardness bind:tag />
	<ReviewItem
		title={problem.title}
		hardness={problem.hardness}
		lastReview={problem.reviews[0]}
	/>
</div>

<style>
	.wrapper {
		height: calc(100vh - 64px);
	}
</style>
