<script lang="ts">
	import { invalidate } from '$app/navigation';

	import { chartTitle, datasets, stats } from '$store/dashboard';
	import Chart from './Chart.svelte';

	$: $stats.totalProblems === 0 && invalidate();
</script>

<div class="flex flex-col flex-grow w-full">
	<div class="stats w-full p-12 min-h-[230px] overflow-hidden">
		<div class="stat text-center">
			<div class="stat-title uppercase text-xs tracking-widest font-light mb-2">
				Total<br />Problems
			</div>
			<div class="stat-value font-semibold mb-1">{$stats.totalProblems}</div>
			<div class="stat-desc">&nbsp;</div>
		</div>

		<div class="stat text-center">
			<div class="stat-title uppercase text-xs tracking-widest font-light mb-2">
				Reviewed<br />Problems
			</div>
			<div class="stat-value font-semibold mb-1">{$stats.totalReviewed}</div>
			<div class="stat-desc">
				{$stats.percentReviewed}%
			</div>
		</div>

		<div class="stat text-center">
			<div class="stat-title uppercase text-xs tracking-widest font-light mb-2">
				Remaining<br />Problems
			</div>
			<div class="stat-value font-semibold mb-1">{$stats.remaining}</div>
			<div class="stat-desc">{$stats.percentRemaining}%</div>
		</div>
	</div>

	<Chart title={$chartTitle} datasets={$datasets} />
</div>
