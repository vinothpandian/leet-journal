<script lang="ts">
	import type { ChangeEvent, Question } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let question: Question;
	export let isQuestionChecked: boolean;
	const dispatch = createEventDispatcher<{ change: { checked: boolean } }>();

	function handleChange(event: ChangeEvent) {
		dispatch('change', {
			checked: event.currentTarget.checked,
		});
	}
</script>

<li>
	<div class="form-control">
		<label class="label cursor-pointer gap-2 justify-start">
			<input
				type="checkbox"
				checked={isQuestionChecked}
				on:change={handleChange}
				class="checkbox checkbox-primary"
			/>
			<span
				class="label-text flex flex-grow gap-2 justify-between px-2 items-center"
			>
				{question.title}
				<span
					class="badge badge-xs badge-outline text-[9px] rounded"
					class:badge-success={question.hardness === 'easy'}
					class:badge-warning={question.hardness === 'medium'}
					class:badge-error={question.hardness === 'hard'}
				>
					{question.hardness}
				</span>
			</span>
		</label>
	</div>
</li>
