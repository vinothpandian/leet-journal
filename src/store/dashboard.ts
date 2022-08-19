import { writable } from 'svelte/store';

import { browser } from '$app/env';
import { getStats } from '$db/queries';
import type { Stats } from '$db/types';

export const stats = writable<Stats>({
	totalProblems: -1,
	remaining: -1,
	totalReviewed: -1,
	percentReviewed: '',
	percentRemaining: '',
});

export const fetchStats = async () => {
	if (!browser) {
		return;
	}

	const currentStats = await getStats();
	stats.set(currentStats);
};
