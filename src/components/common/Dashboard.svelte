<script lang="ts">
	import { Chart, registerables } from 'chart.js';

	import { fetchRetentionStats, fetchStats, stats } from '$store/dashboard';

	import { getChartConfiguration } from '$lib/chart';
	import { getDifficultyColor, getDifficultyText } from '$lib/difficulty';
	import { getRetention } from '$lib/retention';
	import type { Difficulty, Review } from '$lib/types';
	import { range } from '$lib/utils';
	import dayjs from 'dayjs/esm';
	import { onMount } from 'svelte';

	let chart: any;

	onMount(async () => {
		await fetchStats();

		await fetchRetentionStats();

		const ctx = chart.getContext('2d');

		if (ctx == null) {
			return;
		}

		Chart.register(...registerables);

		const difficulties = range(5, 1) as Difficulty[];

		const labels = range(12).map((i) =>
			dayjs().add(i, 'days').format('MMM DD')
		);

		const datasets = difficulties.map((difficulty) => ({
			label: getDifficultyText(difficulty),
			borderColor: getDifficultyColor(difficulty),
			data: range(12)
				.map<Review>((days) => ({
					reviewDate: dayjs().subtract(days, 'days').toISOString(),
					difficulty,
				}))
				.map(getRetention),
		}));

		new Chart(ctx, getChartConfiguration(labels, datasets));
	});
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

	<div class="flex flex-grow justify-center items-center p-24">
		<div class="w-full">
			<canvas bind:this={chart} id="projectionChart" />
		</div>
	</div>
</div>
