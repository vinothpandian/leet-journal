<script lang="ts">
	import HardnessBadge from '$components/common/HardnessBadge.svelte';
	import LeetCodeLink from '$components/common/LeetCodeLink.svelte';

	import type { ChangeEvent, Hardness } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let title: string = '';
	export let titleSlug: string = '';
	export let hardness: Hardness;
	export let isProblemChecked: boolean;
	const dispatch = createEventDispatcher<{ change: { checked: boolean } }>();

	function handleChange(event: ChangeEvent) {
		dispatch('change', {
			checked: event.currentTarget.checked,
		});
	}
</script>

<li>
	<div class="form-control">
		<label class="label cursor-pointer gap-2 justify-start">
			<input
				type="checkbox"
				checked={isProblemChecked}
				on:change={handleChange}
				class="checkbox checkbox-primary"
			/>
			<span
				class="label-text flex flex-grow gap-2 justify-between px-2 items-center"
			>
				<span>{title}</span>
				<span class="flex flex-row gap-2 items-center">
					<HardnessBadge {hardness} />
					<LeetCodeLink {titleSlug} />
				</span>
			</span>
		</label>
	</div>
</li>
