<script lang="ts">
	import ProblemItem from '$components/learn/ProblemItem.svelte';
	import IntersectionObserver from '$lib/IntersectionObserver.svelte';
	import type { Problem } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import type { ProblemState } from './types';

	export let problems: Problem[];

	export let selectedProblems: Record<string, boolean>;

	export let hasMore: boolean;

	const dispatch = createEventDispatcher<{
		change: ProblemState;
		loadMore: void;
	}>();

	const dispatchChange = (problemId: number, checked: boolean) => {
		dispatch('change', {
			problemId,
			checked,
		});
	};

	const dispatchLoadMore = () => {
		dispatch('loadMore');
	};

	$: lastProblemId = problems.slice(-1)[0]?.id ?? 0;
</script>

<ul class="flex-grow overflow-auto pb-4">
	{#if problems}
		{#each problems as { id, title, titleSlug, hardness }}
			<ProblemItem
				{title}
				{hardness}
				{titleSlug}
				isProblemChecked={selectedProblems?.[id] ?? false}
				on:change={(event) => {
					dispatchChange(id, event.detail.checked);
				}}
			/>
		{/each}
		{#if hasMore}
			{#key lastProblemId}
				<IntersectionObserver on:intersect={dispatchLoadMore}>
					<li class="animate-pulse text-sm text-gray-500 pt-2">Loading...</li>
				</IntersectionObserver>
			{/key}
		{/if}
	{:else}
		<span class="animate-pulse text-sm text-gray-500 pt-2">Loading...</span>
	{/if}
</ul>
