import { browser } from '$app/environment';
import { fetchProblem } from '$db/queries';
import { hydrateDashboard } from '$store/dashboard';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	if (!browser) {
		return {};
	}

	const problem = await fetchProblem(+params.id);
	await hydrateDashboard(problem);

	return { problem };
};
