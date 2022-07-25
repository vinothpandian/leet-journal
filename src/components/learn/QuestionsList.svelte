<script lang="ts">
	import QuestionItem from '$components/learn/QuestionItem.svelte';
	import type { Question } from '$lib/types';
	import type { Observable } from 'dexie';
	import { createEventDispatcher } from 'svelte';

	export let questions: Observable<Question[]>;

	export let selectedQuestions: Record<string, boolean>;

	const dispatch = createEventDispatcher<{
		change: {
			questionId: string;
			checked: boolean;
		};
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
		{#each $questions as question (question.id)}
			<QuestionItem
				{question}
				isQuestionChecked={selectedQuestions?.[question.questionId] ?? false}
				on:change={(event) => {
					dispatchChange(question.questionId, event.detail.checked);
				}}
			/>
		{/each}
		{#if $questions.length === 0}
			No such leet code question found. Clear filters or change your search...
		{/if}
	{:else}
		Loading...
	{/if}
</ul>
