import type { Difficulty } from '$lib/types';

export interface ProblemState {
	problemId: number;
	checked: boolean;
}

export interface ReviewInfo {
	difficulty: Difficulty;
	reviewDate: number;
}
