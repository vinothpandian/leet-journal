<script lang="ts">
	import { browser } from '$app/env';
	import db from '$db/db';
	import Clear from '$icons/Clear.svelte';
	import type { Hardness } from '$lib/types';
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

<div class="flex justify-between items-center flex-wrap md:flex-nowrap">
	<div>
		<select
			bind:value={hardness}
			class="select select-xs min-w-full md:min-w-min"
		>
			<option value="" selected>Select Difficulty</option>
			<option value="easy" class="text-success">Easy</option>
			<option value="medium" class="text-warning">Medium</option>
			<option value="hard" class="text-error">Hard</option>
		</select>
		<select bind:value={tag} class="select select-xs min-w-full md:min-w-min">
			<option value="" selected>Select Tags</option>
			{#if $problemTypes}
				{#each $problemTypes as problemType}
					<option value={problemType}>{problemType}</option>
				{/each}
			{/if}
		</select>
	</div>

	<button
		type="button"
		class="btn btn-link btn-xs btn-square rounded"
		on:click={resetFilters}
		class:hidden={showClearButton}
	>
		<Clear />
	</button>
</div>
