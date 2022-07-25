<script lang="ts" context="module">
	import { browser } from '$app/env';
	import db from '$lib/db';
	import { liveQuery } from 'dexie';

	let questions = liveQuery(() => {
		if (!browser) {
			return [];
		}

		return db.questions.toArray();
	});
</script>

<div>
	<div>Questions</div>
	<ul class="overflow-scroll content">
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
