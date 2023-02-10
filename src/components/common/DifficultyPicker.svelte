<script lang="ts">
	import type { Difficulty } from '$lib/types';
	import { getDifficultyBorderColor, getDifficultyText } from '$lib/difficulty';

	export let difficulty: Difficulty;

	const difficulties: Difficulty[] = [1, 2, 3, 4, 5];
</script>

<div>
	<div class="flex gap-2 items-center relative">
		<span title="Difficulty" class="md:basis-1/4 text-right">
			Difficulty:
		</span>
		<div class="btn-group relative gap-4 ml-2 flex-nowrap">
			<span class="absolute text-2xs text-secondary top-8 left-0">
				Very Easy
			</span>
			{#each difficulties as value}
				<input
					title={getDifficultyText(value)}
					class={`btn btn-xs border-4 ${getDifficultyBorderColor(value)}`}
					type="radio"
					{value}
					name="difficulty"
					bind:group={difficulty}
					data-title={value}
				/>
			{/each}
			<span class="absolute text-2xs text-secondary top-8 right-0">
				Very hard
			</span>
		</div>
	</div>
</div>
