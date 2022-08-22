<script lang="ts">
	import TitleBar from '$components/learn/TitleBar.svelte';
</script>

<TitleBar title="Settings" withActions={false} />

<!-- Export Import Reset all progress -->

<div class="flex flex-col gap-8 p-2">
	<div class="flex flex-nowrap items-center gap-4">
		<span class="basis-1/4">Export Progress :</span>
		<button type="button" class="btn btn-xs">Download as JSON</button>
	</div>
	<div class="flex flex-nowrap items-center gap-4">
		<span class="basis-1/4">Restore Progress :</span>
		<button type="button" class="btn btn-xs">Upload JSON</button>
	</div>
</div>

<div class="flex mt-12 items-end">
	<div class="flex flex-nowrap items-center gap-4">
		<button type="button" class="btn btn-error btn-sm btn-outline uppercase">
			Reset all Progress
		</button>
	</div>
</div>
