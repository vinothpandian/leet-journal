<script>
	import { page } from '$app/stores';
	import Settings from '$icons/settings.svelte';
</script>

<div class="flex justify-between items-center p-2">
	<div class="tabs bg-base-100">
		<a href="/learn" class="tab" class:tab-active={$page.url.pathname === '/learn'}>Learn</a>
		<a href="/review" class="tab" class:tab-active={$page.url.pathname === '/review'}>Review</a>
	</div>
	<button class="btn btn-link btn-xs btn-square rounded">
		<Settings />
	</button>
</div>
