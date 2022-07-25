<script lang="ts">
	import { browser } from '$app/env';
	import db from '$db/db';

	import Search from '$icons/Search.svelte';
	import type { Question } from '$lib/types';

	import { liveQuery, type Observable } from 'dexie';

	let searchTerm: string = '';
	let questions: Observable<Question[]>;

	$: questions = liveQuery(() => {
		if (!browser) {
			return [];
		}

		return db.questions
			.filter((q) => q.title.toLowerCase().includes(searchTerm.toLowerCase()))
			.toArray();
	});
</script>

<div class="flex flex-col gap-8 p-8 content">
	<div class="form-control">
		<div class="flex input-group">
			<input
				type="text"
				placeholder="Search…"
				class="input input-bordered flex-grow"
				bind:value={searchTerm}
			/>
			<button class="btn btn-square">
				<Search />
			</button>
		</div>
	</div>
	<ul class="flex-grow overflow-auto">
		{#if $questions}
			{#each $questions as question (question.id)}
				<li>
					{question.title}
				</li>
			{/each}
		{:else}
			Loading...
		{/if}
	</ul>
</div>

<style>
	.content {
		height: calc(100vh - 64px);
	}
</style>
