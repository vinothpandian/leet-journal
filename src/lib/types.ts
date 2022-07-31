export type WithTarget<Event, Target> = Event & { currentTarget: Target };
export type ChangeEvent = WithTarget<Event, HTMLInputElement>;

export interface RawProblem {
	questionId: string;
	title: string;
	titleSlug: string;
	isPaidOnly: boolean;
	difficulty: string;
	likes: number;
	dislikes: number;
	categoryTitle: string;
	acRate: string;
	frontendQuestionId: string;
	paidOnly: boolean;
	topicTags: string;
	hasSolution: boolean;
	hasVideoSolution: boolean;
	acRateRaw: number;
	totalAccepted: number;
	totalSubmission: number;
}

export type Hardness = 'easy' | 'medium' | 'hard';
export type ReviewDate = string;
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface Review {
	reviewDate: ReviewDate; // ISO string
	difficulty: Difficulty;
}

export interface Problem {
	id: number;
	leetCodeId: string;
	categoryTitle: string;
	hardness: Hardness;
	title: string;
	titleSlug: string;
	topicTags: string[];
	notes: string;
	reviews: Review[];
}
