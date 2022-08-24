<script lang="ts">
	import { browser } from '$app/env';
	import db from '$db/db';
	import Ascending from '$icons/Ascending.svelte';
	import Clear from '$icons/Clear.svelte';
	import Descending from '$icons/Descending.svelte';
	import type { Hardness } from '$lib/types';
	import { sortReviewsByDescending, updateSortingOrder } from '$store/problems';
	import { liveQuery } from 'dexie';

	export let hardness: Hardness | '' = '';
	export let tag: string = '';

	$: problemTypes = liveQuery(async () => {
		if (!browser) {
			return [];
		}

		return db.problems.toArray((qns) =>
			[...new Set(qns.map((qn) => qn.topicTags).flat())].sort()
		);
	});

	function resetFilters() {
		hardness = '';
		tag = '';
	}

	$: showClearButton = hardness === '' && tag === '';
</script>

<form class="flex justify-between items-center flex-wrap md:flex-nowrap">
	<div class="flex flex-col md:flex-row gap-2">
		<span class="text-sm">Filter By</span>
		<select
			bind:value={hardness}
			class="select select-bordered font-normal select-xs min-w-full md:min-w-min"
		>
			<option value="" selected>Difficulty</option>
			<option value="easy" class="text-success">Easy</option>
			<option value="medium" class="text-warning">Medium</option>
			<option value="hard" class="text-error">Hard</option>
		</select>
		<select
			bind:value={tag}
			class="select select-bordered font-normal select-xs min-w-full md:min-w-min"
		>
			<option value="" selected>Tags</option>
			{#if $problemTypes}
				{#each $problemTypes as problemType}
					<option value={problemType}>{problemType}</option>
				{/each}
			{/if}
		</select>
	</div>

	<div class="flex gap-2">
		<button
			type="button"
			class="btn btn-link btn-xs btn-square rounded"
			on:click={updateSortingOrder}
		>
			{#if $sortReviewsByDescending}
				<Descending />
			{:else}
				<Ascending />
			{/if}
		</button>
		<button
			type="button"
			class="btn btn-link btn-xs btn-square rounded"
			on:click={resetFilters}
			class:hidden={showClearButton}
		>
			<Clear />
		</button>
	</div>
</form>
