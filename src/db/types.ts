import type { QuestionHardness } from '$lib/types';

export interface QuestionFilterParams {
	tag: string;
	hardness: QuestionHardness | '';
	searchTerm: string;
	page: number;
	pageSize?: number;
}
