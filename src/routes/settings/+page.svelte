<script lang="ts">
	import { goto, invalidate } from '$app/navigation';

	import TitleBar from '$components/learn/TitleBar.svelte';
	import db from '$db/db';
	import { importReviews } from '$db/queries';
	import { exportReviewsAsJson, validateReviewJson } from '$lib/import-export';
	import { isJsonString } from '$lib/utils';
	import { isModalOpen, modalAction, modalInfo } from '$store/modal';
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
			await invalidate();
			toast.success('Imported reviews from JSON file');
			goto('/');
		};

		reader.readAsText(importedFile);
	};

	function handleResetProgressClick() {
		modalInfo.set({
			title: 'Are you sure?! This is irrevocable!',
			message:
				'This will reset all the existing reviews and you will <b>lose all your the current progress</b> in your review journal. If you wish to backup your progress, close this dialog and export your current progress in Settings menu before resetting.',
		});

		modalAction.set({
			text: 'Reset Everything!',
			callback: async () => {
				await db.reset();
				await invalidate();
				goto('/learn');
			},
		});

		isModalOpen.set(true);
	}
</script>

<svelte:head>
	<title>Leet Journal - Settings</title>
</svelte:head>

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
		<button
			type="button"
			class="btn btn-error btn-sm btn-outline uppercase"
			on:click={handleResetProgressClick}
		>
			Reset all Progress
		</button>
	</div>
</div>
