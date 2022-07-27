<script lang="ts">
	import Link from '$icons/Link.svelte';
	import type { ChangeEvent, QuestionHardness } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let title: string = '';
	export let titleSlug: string = '';
	export let hardness: QuestionHardness;
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
				<span>{title}</span>
				<span class="flex flex-row gap-2 items-center">
					<span
						class="badge badge-xs badge-outline text-[9px] rounded"
						class:badge-success={hardness === 'easy'}
						class:badge-warning={hardness === 'medium'}
						class:badge-error={hardness === 'hard'}
					>
						{hardness}
					</span>
					<a
						class="text-blue-500"
						target="_blank"
						rel="noopener noreferrer"
						href={`https://leetcode.com/problems/${titleSlug}/`}
					>
						<Link />
					</a>
				</span>
			</span>
		</label>
	</div>
</li>
