import type { ChartDataset } from 'chart.js';
import { writable } from 'svelte/store';

import { browser } from '$app/env';

import { getRetentionStats, getStats } from '$db/queries';
import type { RetentionData, Stats } from '$db/types';
import { DEFAULT_DATASETS } from '$lib/chart';

export const stats = writable<Stats>({
	totalProblems: -1,
	remaining: -1,
	totalReviewed: -1,
	percentReviewed: '',
	percentRemaining: '',
});

export const retentionStats = writable<RetentionData[]>([]);

export const chartTitle = writable<string>('');
export const datasets = writable<ChartDataset<'line', number[]>[]>([]);

export const fetchStats = async () => {
	if (!browser) {
		return;
	}

	const currentStats = await getStats();
	stats.set(currentStats);
};

export const fetchRetentionStats = async () => {
	if (!browser) {
		return;
	}

	const currentRetentionStats = await getRetentionStats();
	retentionStats.set(currentRetentionStats);
};

export const hydrateDashboardWithDefault = () => {
	chartTitle.set('');
	datasets.set(DEFAULT_DATASETS);
};

export const hydrateDashboard = async (id?: number) => {
	if (!browser) {
		return;
	}

	if (id === undefined) {
		hydrateDashboardWithDefault();
		return;
	}

	chartTitle.set(id.toString());
	datasets.set([]);
};
