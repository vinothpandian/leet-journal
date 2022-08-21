<script lang="ts">
	import Navbar from '$components/common/Navbar.svelte';
	import SidebarNavigation from '$components/common/SidebarNavigation.svelte';
	import { Toaster } from 'svelte-french-toast';

	import MediaQuery from '$lib/MediaQuery.svelte';

	import Dashboard from '$components/common/Dashboard.svelte';
	import Modal from '$components/common/Modal.svelte';
	import '../app.css';
</script>

<main class="min-h-screen overflow-hidden">
	<MediaQuery query="(min-width: 768px)" let:matches>
		{#if matches}
			<div class="grid gap-2 grid-cols-8 grid-rows-1 h-screen divide-x">
				<section class="col-span-5 h-screen">
					<Navbar />
					<div class="flex justify-center dashboard-wrapper">
						<Dashboard />
					</div>
				</section>
				<aside class="col-span-3 min-h-full border-solid">
					<SidebarNavigation />
					<div class="flex flex-col gap-6 p-6 wrapper">
						<slot>Loading...</slot>
					</div>
				</aside>
			</div>
		{:else}
			<Navbar />
			<SidebarNavigation />
			<section class="flex flex-col gap-6 p-6 mobile-wrapper">
				<slot>Loading...</slot>
			</section>
		{/if}
	</MediaQuery>
</main>
<Toaster
	toastOptions={{
		position: 'bottom-center',
		style: 'background: rgb(24, 26, 42); color: #fff;',
	}}
/>
<Modal />

<style>
	.dashboard-wrapper {
		height: calc(100vh - var(--navbar-height));
	}

	.mobile-wrapper {
		height: calc(100vh - var(--navbar-height) - var(--sidenavbar-height));
		overflow: hidden;
	}

	.wrapper {
		height: calc(100vh - var(--navbar-height));
	}
</style>
