<script lang="ts">
	import Search from '$icons/Search.svelte';

	export let searchTerm: string = '';
</script>

<div class="form-control">
	<div class="flex input-group">
		<input
			type="text"
			placeholder="Search…"
			class="input input-bordered flex-grow"
			bind:value={searchTerm}
		/>
		<button class="btn btn-square">
			<Search />
		</button>
	</div>
</div>
