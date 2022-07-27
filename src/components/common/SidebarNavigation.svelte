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
		<a href="/" class="tab" class:tab-active={path === '/'}>Learn</a>
		<a href="/review" class="tab" class:tab-active={path === '/review'}
			>Review</a
		>
	</div>
	<a href="/settings" class="btn btn-link btn-xs btn-square rounded">
		<Settings />
	</a>
</div>
