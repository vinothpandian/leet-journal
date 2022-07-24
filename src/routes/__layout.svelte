<script>
	import Navbar from '$components/Navbar.svelte';

	import MediaQuery from '$lib/MediaQuery.svelte';

	import '../app.css';
</script>

<main class="min-h-screen overflow-hidden">
	<MediaQuery query="(min-width: 768px)" let:matches>
		{#if matches}
			<div class="grid gap-2 grid-cols-8 grid-rows-1 h-screen divide-x">
				<section class="col-span-5 h-screen">
					<Navbar />
				</section>
				<aside class="col-span-3 min-h-full border-solid">
					<slot>Loading...</slot>
				</aside>
			</div>
		{:else}
			<Navbar />
			<slot>Loading...</slot>
		{/if}
	</MediaQuery>
</main>
