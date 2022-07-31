import type { Hardness } from '$lib/types';

export interface FilterParams {
	tag: string;
	hardness: Hardness | '';
	searchTerm: string;
	page: number;
	pageSize?: number;
}
