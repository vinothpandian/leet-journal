<script lang="ts">
	import Search from '$icons/Search.svelte';

	export let searchTerm: string = '';

	let value: string = searchTerm;

	$: {
		// Debounce
		setTimeout(() => {
			searchTerm = value;
		}, 500);
	}
</script>

<div class="form-control">
	<div class="flex input-group">
		<input
			type="search"
			placeholder="Search by question name…"
			class="input input-sm input-bordered flex-grow"
			bind:value
		/>
		<button class="btn btn-sm btn-square">
			<Search />
		</button>
	</div>
</div>
