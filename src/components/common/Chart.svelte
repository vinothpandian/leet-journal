<script lang="ts">
	import { chart } from '$lib/chart';
	import type { ChartDatasets } from '$lib/types';

	export let title = '';
	export let datasets: ChartDatasets;
</script>

{#key title}
	<div class="flex flex-grow justify-center">
		<div class="w-9/12">
			<canvas use:chart={{ title, datasets }} id="projectionChart" />
		</div>
	</div>
{/key}
