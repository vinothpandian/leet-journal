<script lang="ts">
	import QuestionItem from '$components/learn/QuestionItem.svelte';
	import IntersectionObserver from '$lib/IntersectionObserver.svelte';
	import type { Question } from '$lib/types';
	import type { Observable } from 'dexie';
	import { createEventDispatcher } from 'svelte';
	import type { QuestionState } from './types';

	export let questions: Observable<Question[]>;

	export let selectedQuestions: Record<string, boolean>;

	const dispatch = createEventDispatcher<{
		change: QuestionState;
	}>();

	const dispatchChange = (questionId: string, checked: boolean) => {
		dispatch('change', {
			questionId,
			checked,
		});
	};
</script>

<ul class="flex-grow overflow-auto pb-4">
	{#if $questions}
		{#each $questions as { id, title, hardness, questionId } (id)}
			<QuestionItem
				{title}
				{hardness}
				isQuestionChecked={selectedQuestions?.[questionId] ?? false}
				on:change={(event) => {
					dispatchChange(questionId, event.detail.checked);
				}}
			/>
		{/each}
		<IntersectionObserver on:intersect={console.log}>
			<li class="animate-pulse text-sm text-gray-500 pt-2">Loading...</li>
		</IntersectionObserver>
		{#if $questions.length === 0}
			No such leet code question found. Clear filters or change your search...
		{/if}
	{:else}
		Loading...
	{/if}
</ul>
