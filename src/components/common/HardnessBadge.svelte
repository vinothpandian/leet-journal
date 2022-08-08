<script lang="ts">
	import type { Hardness } from '$lib/types';

	export let hardness: Hardness;
</script>

<span
	class="badge badge-xs badge-outline text-[9px] rounded"
	class:badge-success={hardness === 'easy'}
	class:badge-warning={hardness === 'medium'}
	class:badge-error={hardness === 'hard'}
>
	{hardness}
</span>
