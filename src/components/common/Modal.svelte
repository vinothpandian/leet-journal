<script lang="ts">
	import Clear from '$icons/Clear.svelte';

	import {
		closeModal,
		isModalOpen,
		modalAction,
		modalId,
		modalInfo,
	} from '$store/modal';

	const handleModalAction = () => {
		$modalAction.callback();
		closeModal();
	};
</script>

<input type="checkbox" id={$modalId} class="modal-toggle" />

<div
	class="modal modal-bottom sm:modal-middle cursor-pointer"
	class:modal-open={$isModalOpen}
	on:click|self={closeModal}
>
	<label
		class="modal-box relative"
		for={$modalId}
		on:click|stopPropagation|preventDefault
	>
		<button
			type="button"
			class="btn btn-link btn-xs btn-square rounded absolute right-4 top-4"
			on:click|stopPropagation|preventDefault={closeModal}
		>
			<Clear />
		</button>

		<h3 class="text-lg font-bold">{$modalInfo.title}</h3>
		<p class="py-4">
			{@html $modalInfo.message}
		</p>

		{#if $modalAction.text !== ''}
			<div class="modal-action">
				<button
					type="button"
					class="btn btn-error text-white bg-red-500"
					on:click|stopPropagation|preventDefault={handleModalAction}
				>
					{$modalAction.text}
				</button>
			</div>
		{/if}
	</label>
</div>
