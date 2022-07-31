import { get, writable } from 'svelte/store';

import { browser } from '$app/env';
import { INITIAL_FILTER_PARAMS } from '$constants';
import { fetchProblems } from '$db/queries';
import type { FilterParams } from '$db/types';
import type { Problem } from '$lib/types';

export const problems = writable<Problem[]>([]);
export const hasMoreProblems = writable<boolean>(true);
export const problemFilterParams = writable<FilterParams>(
	INITIAL_FILTER_PARAMS
);

export const loadNextPage = async () => {
	if (!browser) {
		return;
	}

	problemFilterParams.update((filterParams) => ({
		...filterParams,
		page: filterParams.page + 1,
	}));

	const filterParams = get(problemFilterParams);

	const { hasNext, problems: fetchedProblems } = await fetchProblems(
		filterParams
	);

	problems.update((currentProblems) => [
		...currentProblems,
		...fetchedProblems,
	]);

	hasMoreProblems.set(hasNext);
};

export const updateFilters = async ({
	searchTerm,
	tag,
	hardness,
}: Omit<FilterParams, 'page' | 'pageSize'>) => {
	if (!browser) {
		return;
	}
	problemFilterParams.update((filterParams) => ({
		...filterParams,
		searchTerm,
		tag,
		hardness,
		page: 0,
	}));

	const filterParams = get(problemFilterParams);

	const { hasNext, problems: fetchedProblems } = await fetchProblems(
		filterParams
	);

	problems.set(fetchedProblems);
	hasMoreProblems.set(hasNext);
};
