<script lang="ts">
	import { fetchRetentionStats, fetchStats, stats } from '$store/dashboard';

	import { onMount } from 'svelte';

	let chart: any;

	onMount(async () => {
		await fetchStats();

		await fetchRetentionStats();
	});
</script>

<div class="flex flex-col w-full">
	<div class="stats w-full p-12">
		<div class="stat w-52">
			<div class="stat-title">Problems</div>
			<div class="stat-value">{$stats.totalProblems}</div>
		</div>

		<div class="stat w-52">
			<div class="stat-title">Reviewed</div>
			<div class="stat-value">{$stats.totalReviewed}</div>
			<div class="stat-desc">
				{$stats.percentReviewed}%
			</div>
		</div>

		<div class="stat w-52">
			<div class="stat-title">Remaining</div>
			<div class="stat-value">{$stats.remaining}</div>
			<div class="stat-desc">{$stats.percentRemaining}%</div>
		</div>
	</div>

	<div class="flex flex-grow justify-center items-center">
		<div class="w-3/4">Chart here...</div>
	</div>
</div>
