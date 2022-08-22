<script lang="ts">
	import { goto } from '$app/navigation';

	import TitleBar from '$components/learn/TitleBar.svelte';
	import { importReviews } from '$db/queries';
	import { exportReviewsAsJson, validateReviewJson } from '$lib/import-export';
	import { isJsonString } from '$lib/utils';
	import toast from 'svelte-french-toast';

	const handleImportFile = (event: Event) => {
		const { files } = event.target as HTMLInputElement;

		if (files === null || files.length < 0) {
			return;
		}

		const importedFile = files[0];

		var reader = new FileReader();
		reader.onload = async function () {
			const { result } = reader;
			if (!isJsonString(result)) {
				toast.error('File content corrupted.');
				return;
			}

			const fileContent = JSON.parse(result);

			if (!validateReviewJson(fileContent)) {
				toast.error(
					'File content incorrect. Does not matched with the exported file JSON schema'
				);
				return;
			}

			await importReviews(fileContent);
			toast.success('Imported reviews from JSON file');
			goto('/');
		};

		reader.readAsText(importedFile);
	};
</script>

<TitleBar title="Settings" withActions={false} />

<!-- Export Import Reset all progress -->

<div class="flex flex-col gap-8 p-2">
	<div class="flex flex-nowrap items-center gap-4">
		<span class="basis-1/4">Export Progress :</span>
		<button type="button" class="btn btn-xs" on:click={exportReviewsAsJson}>
			Download as JSON
		</button>
	</div>
	<div class="flex flex-nowrap items-center gap-4">
		<span class="basis-1/4">Restore Progress :</span>
		<input
			class="hidden"
			id="import-reviews"
			type="file"
			accept="application/json"
			on:change={handleImportFile}
		/>
		<label for="import-reviews" type="button" class="btn btn-xs"
			>Upload JSON</label
		>
	</div>
</div>

<div class="flex mt-12 items-end">
	<div class="flex flex-nowrap items-center gap-4">
		<button type="button" class="btn btn-error btn-sm btn-outline uppercase">
			Reset all Progress
		</button>
	</div>
</div>
