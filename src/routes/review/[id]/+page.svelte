<script lang="ts">
	import { browser } from '$app/env';

	import { goto, invalidate } from '$app/navigation';

	import HardnessBadge from '$components/common/HardnessBadge.svelte';
	import LeetCodeLink from '$components/common/LeetCodeLink.svelte';
	import { updateProblemNotes } from '$db/queries';
	import Delete from '$icons/Delete.svelte';

	import { getColorForPercentage } from '$lib/colors';
	import { getFormattedDate, getRelativeDate } from '$lib/date';
	import { getDifficultyText } from '$lib/difficulty';

	import { removeReview } from '$db/queries';
	import { getRetention } from '$lib/retention';
	import { getLastReview } from '$lib/review';
	import type { Problem } from '$lib/types';
	import { isModalOpen, modalAction, modalInfo } from '$store/modal';
	import { onDestroy } from 'svelte';
	import toast from 'svelte-french-toast';

	export let data: { problem: Problem };

	const { problem } = data;

	let notes: string = problem?.notes ?? '';

	const handleNotesChange = async () => {
		await updateProblemNotes(problem.id, notes);
	};

	const handleDeleteClick = () => {
		modalInfo.set({
			title: 'Are you sure?!',
			message: `You are deleting the review of <b>${problem.title}</b> problem. This is
				irreversible and you'll lose the data of last
				<b>${problem.reviews.length}</b> reviews.`,
		});

		modalAction.set({
			text: 'Delete',
			callback: handleRemoveReview,
		});

		isModalOpen.set(true);
	};

	async function handleRemoveReview() {
		await removeReview(problem.id);
		toast.success(`Removed ${problem.title} review`);
		goto('/');
	}

	onDestroy(() => {
		if (browser) {
			invalidate();
		}
	});

	$: lastReview = getLastReview(problem?.reviews) ?? {
		reviewDate: new Date(),
		difficulty: 2,
	};
	$: retention = getRetention(lastReview);
	$: retentionColor = getColorForPercentage(retention - 1);
</script>

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
				<div class="flex flex-col gap-2">
					<span>{problem.title}</span>
					<span class="text-slate-400 font-light text-xs">
						Reviewed {getRelativeDate(problem.reviews[0].reviewDate)}
					</span>
				</div>
				<div class="flex flex-col items-end gap-4">
					<span class="inline-flex gap-2">
						<HardnessBadge hardness={problem.hardness} />
						<LeetCodeLink titleSlug={problem.titleSlug} />
					</span>
					<button
						type="button"
						class="btn btn-xs btn-outline rounded text-red-500 modal-button"
						on:click={handleDeleteClick}
					>
						<Delete />
						<span class="ml-2 hidden md:inline-block capitalize">Delete</span>
					</button>
				</div>
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
	<ul class="steps steps-vertical	overflow-auto text-sm text-gray-700">
		{#each problem.reviews as { reviewDate, difficulty }}
			<li data-content="" class={`step step-${difficulty}`}>
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
