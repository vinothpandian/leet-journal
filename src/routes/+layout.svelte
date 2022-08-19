<script lang="ts">
	import Navbar from '$components/common/Navbar.svelte';
	import SidebarNavigation from '$components/common/SidebarNavigation.svelte';
	import { Toaster } from 'svelte-french-toast';

	import MediaQuery from '$lib/MediaQuery.svelte';

	import Dashboard from '$components/common/Dashboard.svelte';
	import '../app.css';
</script>

<main class="min-h-screen overflow-hidden">
	<MediaQuery query="(min-width: 768px)" let:matches>
		{#if matches}
			<div class="grid gap-2 grid-cols-8 grid-rows-1 h-screen divide-x">
				<section class="col-span-5 h-screen">
					<Navbar />
					<div class="flex flex-grow justify-center+">
						<Dashboard />
					</div>
				</section>
				<aside class="col-span-3 min-h-full border-solid">
					<SidebarNavigation />
					<slot>Loading...</slot>
				</aside>
			</div>
		{:else}
			<Navbar />
			<SidebarNavigation />
			<slot>Loading...</slot>
		{/if}
	</MediaQuery>
</main>
<Toaster
	toastOptions={{
		position: 'bottom-center',
		style: 'background: rgb(24, 26, 42); color: #fff;',
	}}
/>
