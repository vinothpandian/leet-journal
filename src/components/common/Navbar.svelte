<script>
	import Help from '$icons/Help.svelte';
	import { isModalOpen, modalInfo } from '$store/modal';

	function handleOpenModal() {
		modalInfo.set({
			title: 'Info',
			message:
				'<a class="link" href="https://en.wikipedia.org/wiki/Spaced_repetition" target="_blank" rel="noopener noreferrer">Spaced repetition</a> is an evidence-based learning technique that incorporates increasing intervals of time between subsequent review of previously learned material in order to exploit the psychological spacing effect.',
		});
		isModalOpen.set(true);
	}
</script>

<div class="navbar bg-base-100 drop-shadow-sm flex flex-nowrap justify-between">
	<a href="/" class="btn btn-ghost normal-case text-xl">Leet Journal</a>

	<button
		type="button"
		class="btn btn-link btn-xs btn-square rounded text-gray-800"
		on:click={handleOpenModal}
	>
		<Help />
	</button>
</div>
