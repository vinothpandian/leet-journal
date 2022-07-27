<script lang="ts">
	import type { ChangeEvent, QuestionHardness } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let title: string = '';
	export let hardness: QuestionHardness;
	export let reviewFrequency: number = 0;
	const dispatch = createEventDispatcher<{ change: { checked: boolean } }>();

	function handleChange(event: ChangeEvent) {
		dispatch('change', {
			checked: event.currentTarget.checked,
		});
	}
</script>

<li>
	<div class="form-control">
		<div class="label cursor-pointer gap-2 justify-start">
			<span
				class="label-text flex flex-grow gap-2 justify-between px-2 items-center"
			>
				{title}
				<span
					class="badge badge-xs badge-outline text-[9px] rounded"
					class:badge-success={hardness === 'easy'}
					class:badge-warning={hardness === 'medium'}
					class:badge-error={hardness === 'hard'}
				>
					{hardness}
				</span>
				<span>
					{reviewFrequency}
				</span>
			</span>
		</div>
	</div>
</li>
