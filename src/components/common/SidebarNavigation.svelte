<script lang="ts">
	import { page } from '$app/stores';
	import Settings from '$icons/Settings.svelte';
	let path: string;

	$: path = $page.url.pathname;
</script>

<div
	class="flex justify-between items-center p-4 w-full border-b border-gray-100"
>
	<div class="tabs bg-base-100">
		<a href="/" class="tab" class:tab-active={path === '/'}>Review</a>
		<a href="/learn" class="tab" class:tab-active={path === '/learn'}>Learn</a>
	</div>
	<a href="/settings" class="btn btn-link btn-xs btn-square rounded">
		<Settings />
	</a>
</div>
