<script lang="ts">
	import { chartTitle, datasets, stats } from '$store/dashboard';
	import Chart from './Chart.svelte';
</script>

<div class="flex flex-col w-full">
	<div class="stats w-full p-12">
		<div class="stat text-center">
			<div class="stat-title">Problems</div>
			<div class="stat-value">{$stats.totalProblems}</div>
		</div>

		<div class="stat text-center">
			<div class="stat-title">Reviewed</div>
			<div class="stat-value">{$stats.totalReviewed}</div>
			<div class="stat-desc">
				{$stats.percentReviewed}%
			</div>
		</div>

		<div class="stat text-center">
			<div class="stat-title">Remaining</div>
			<div class="stat-value">{$stats.remaining}</div>
			<div class="stat-desc">{$stats.percentRemaining}%</div>
		</div>
	</div>

	<Chart title={$chartTitle} datasets={$datasets} />
</div>
