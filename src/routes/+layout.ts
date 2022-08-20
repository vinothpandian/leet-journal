import {
	fetchRetentionStats,
	fetchStats,
	hydrateDashboard,
} from '$store/dashboard';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	await fetchStats();

	await fetchRetentionStats();

	if (params?.id === undefined) {
		await hydrateDashboard();
	}
};
