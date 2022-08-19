<script lang="ts">
	import { fetchStats, stats } from '$store/dashboard';

	import { onMount } from 'svelte';

	onMount(fetchStats);
</script>

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
