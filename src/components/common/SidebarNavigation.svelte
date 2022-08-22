<script lang="ts">
	import { page } from '$app/stores';
	import GoBack from '$icons/GoBack.svelte';
	import Settings from '../../icons/Settings.svelte';
	let path: string;

	$: path = $page.url.pathname;
</script>

<div
	class="flex justify-between items-center p-4 w-full border-b border-gray-100"
>
	<div class="flex flex-grow items-center">
		{#if path.startsWith('/review/')}
			<a href="/" class="btn btn-link btn-xs btn-square rounded">
				<GoBack />
			</a>
		{/if}
		<div class="tabs bg-base-100">
			<a
				href="/"
				class="tab"
				class:tab-active={path === '/' || path.startsWith('/review')}>Review</a
			>
			<a href="/learn" class="tab" class:tab-active={path === '/learn'}>Learn</a
			>
		</div>
	</div>
	<a href="/settings" class="btn btn-link btn-xs btn-square rounded">
		<Settings />
	</a>
</div>
