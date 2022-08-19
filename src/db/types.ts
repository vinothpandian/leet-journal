import type { Hardness } from '$lib/types';

export interface FilterParams {
	tag: string;
	hardness: Hardness | '';
	searchTerm: string;
	page: number;
	pageSize?: number;
}

export interface Stats {
	totalProblems: number;
	totalReviewed: number;
	percentReviewed: string;
	remaining: number;
	percentRemaining: string;
}

export interface RetentionData {
	title: string;
	retention: number;
}
