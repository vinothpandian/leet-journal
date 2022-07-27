<script lang="ts">
	import IntersectionObserver from '$lib/IntersectionObserver.svelte';
	import type { Question } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import ReviewItem from './ReviewItem.svelte';
	import type { QuestionState } from './types';

	export let questions: Question[];

	export let hasMore: boolean = true;

	const dispatch = createEventDispatcher<{
		change: QuestionState;
		loadMore: void;
	}>();

	const dispatchChange = (questionId: number, checked: boolean) => {
		dispatch('change', {
			questionId,
			checked,
		});
	};

	const dispatchLoadMore = () => {
		dispatch('loadMore');
	};

	$: lastQuestionId = questions.slice(-1)[0]?.questionId ?? 0;
</script>

<ul class="flex-grow overflow-auto pb-4">
	{#if questions}
		{#each questions as { id, title, hardness, reviewFrequency }}
			<ReviewItem
				{title}
				{hardness}
				{reviewFrequency}
				on:change={(event) => {
					dispatchChange(id, event.detail.checked);
				}}
			/>
		{/each}
		{#if hasMore}
			{#key lastQuestionId}
				<IntersectionObserver on:intersect={dispatchLoadMore}>
					<li class="animate-pulse text-sm text-gray-500 pt-2">Loading...</li>
				</IntersectionObserver>
			{/key}
		{:else}
			<div class="flex flex-col justify-center items-center gap-4 p-8">
				<h1 class="text-lg text-gray-400">No leet code questions found</h1>
				<p class="text-sm text-gray-500">
					Clear filters or change your search...
				</p>
			</div>
		{/if}
	{:else}
		<span class="animate-pulse text-sm text-gray-500 pt-2">Loading...</span>
	{/if}
</ul>
