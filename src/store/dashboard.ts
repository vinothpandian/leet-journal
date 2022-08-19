import { writable } from 'svelte/store';

import { browser } from '$app/env';
import { getRetentionStats, getStats } from '$db/queries';
import type { RetentionData, Stats } from '$db/types';

export const stats = writable<Stats>({
	totalProblems: -1,
	remaining: -1,
	totalReviewed: -1,
	percentReviewed: '',
	percentRemaining: '',
});

export const retentionStats = writable<RetentionData[]>([]);

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
