import type { Difficulty } from '$lib/types';

export interface QuestionState {
	questionId: string;
	checked: boolean;
}

export interface ReviewInfo {
	difficulty: Difficulty;
	reviewDate: number;
}
