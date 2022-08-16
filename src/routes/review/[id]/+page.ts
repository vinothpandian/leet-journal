import { browser } from '$app/env';
import { fetchProblem } from '$db/queries';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	if (!browser) {
		return {};
	}

	const problem = await fetchProblem(+params.id);

	return { problem };
};
