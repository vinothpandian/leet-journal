<script lang="ts">
	import IntersectionObserver from '$lib/IntersectionObserver.svelte';
	import type { Problem } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import ReviewItem from './ReviewItem.svelte';

	export let problems: Problem[];

	export let hasMore: boolean;

	const dispatch = createEventDispatcher<{
		loadMore: void;
	}>();

	const dispatchLoadMore = () => {
		dispatch('loadMore');
	};

	$: lastProblemId = problems.slice(-1)[0]?.id ?? 0;
</script>

<ul class="menu menu-compact">
	{#if problems.length !== 0}
		{#each problems as { id, title, titleSlug, hardness, reviews } (id)}
			<ReviewItem {id} {title} {titleSlug} {hardness} lastReview={reviews[0]} />
		{/each}
		{#if hasMore}
			{#key lastProblemId}
				<IntersectionObserver on:intersect={dispatchLoadMore}>
					<li class="animate-pulse text-sm text-gray-500 pt-2">Loading...</li>
				</IntersectionObserver>
			{/key}
		{/if}
	{:else if hasMore}
		<div class="animate-pulse text-sm text-gray-500 pt-2">Loading...</div>
	{:else}
		<div class="flex flex-col justify-center items-center gap-4 p-8">
			<h1 class="text-lg text-gray-400">No review found</h1>
			<p class="text-sm text-gray-500">
				Clear filters or change your search...
			</p>
		</div>
	{/if}
</ul>
