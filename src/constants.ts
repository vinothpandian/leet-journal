import type { FilterParams } from '$db/types';

export const INITIAL_FILTER_PARAMS: FilterParams = {
	hardness: '',
	page: -1,
	searchTerm: '',
	tag: '',
};
