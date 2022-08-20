import {
	fetchRetentionStats,
	fetchStats,
	hydrateDashboard,
} from '$store/dashboard';

export const load = async () => {
	await fetchStats();

	await fetchRetentionStats();

	await hydrateDashboard();
};
