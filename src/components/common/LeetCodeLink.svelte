<script lang="ts">
	import Link from '$icons/Link.svelte';

	export let titleSlug: string;
</script>

<a
	class="text-blue-500"
	target="_blank"
	rel="noopener noreferrer"
	href={`https://leetcode.com/problems/${titleSlug}/`}
	on:click|stopPropagation
>
	<Link />
</a>
