<script lang="ts">
	import HardnessBadge from '$components/common/HardnessBadge.svelte';
	import LeetCodeLink from '$components/common/LeetCodeLink.svelte';
	import { updateProblemNotes } from '$db/queries';

	import { getColorForPercentage } from '$lib/colors';
	import {
		getFormattedDate,
		getRelativeDate,
		sortReviewsByDate,
	} from '$lib/date';
	import { getDifficultyText } from '$lib/difficulty';

	import { getRetention } from '$lib/retention';
	import type { Problem } from '$lib/types';
	import dayjs from 'dayjs/esm';
	import LocalizedFormat from 'dayjs/esm/plugin/localizedFormat';
	dayjs.extend(LocalizedFormat);

	export let data: { problem: Problem };

	const { problem } = data;

	let notes: string = problem?.notes ?? '';

	const handleNotesChange = async () => {
		await updateProblemNotes(problem.id, notes);
	};

	$: lastReview = problem?.reviews?.[0] ?? {
		reviewDate: new Date(),
		difficulty: 2,
	};
	$: retention = getRetention(lastReview);
	$: retentionColor = getColorForPercentage(retention - 1);
</script>

<div class="flex flex-col gap-6 p-6 wrapper">
	{#if problem}
		<div class="flex gap-4">
			<div
				class="radial-progress text-2xs"
				style={`--value:${retention};--size: 3rem; color:${retentionColor};`}
			>
				{retention}%
			</div>
			<div class="grid flex-grow gap-2">
				<div class="inline-flex justify-between">
					<span>{problem.title}</span>
					<span class="inline-flex gap-2">
						<HardnessBadge hardness={problem.hardness} />
						<LeetCodeLink titleSlug={problem.titleSlug} />
					</span>
				</div>
				<div class="inline-flex justify-between">
					<span class="text-slate-400 font-light text-xs">
						Reviewed {getRelativeDate(problem.reviews[0].reviewDate)}
					</span>
				</div>
			</div>
		</div>
		<textarea
			class="textarea textarea-bordered w-full mt-6"
			placeholder="Notes.."
			rows="10"
			bind:value={notes}
			on:change={handleNotesChange}
		/>
		<div class="flex flex-col md:flex-row w-full">
			<div class="stat place-items-center">
				<div class="stat-title text-sm">Recent Review Date</div>
				<div class="stat-value text-2xl">
					{getFormattedDate(lastReview.reviewDate)}
				</div>
			</div>
			<div class="stat place-items-center">
				<div class="stat-title text-sm">Recent Review Difficulty</div>
				<div class="stat-value text-2xl">
					{getDifficultyText(lastReview.difficulty)}
				</div>
			</div>
		</div>
		<ul class="steps steps-vertical	flex-grow overflow-auto">
			{#each sortReviewsByDate(problem.reviews) as { reviewDate, difficulty }}
				<li data-content="" class="step">
					<div>
						<span>Marked as </span>
						<span class={`difficulty-${difficulty}`}>
							{getDifficultyText(difficulty)}
						</span>
						<span>on {getFormattedDate(reviewDate)}</span>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.wrapper {
		height: calc(100vh - var(--navbar-height) - var(--sidenavbar-height));
		overflow: hidden;
	}

	@media (min-width: 768px) {
		.wrapper {
			height: calc(100vh - var(--navbar-height));
		}
	}
</style>
