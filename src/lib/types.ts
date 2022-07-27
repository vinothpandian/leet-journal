export type WithTarget<Event, Target> = Event & { currentTarget: Target };
export type ChangeEvent = WithTarget<Event, HTMLInputElement>;

export interface RawQuestion {
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

export type QuestionHardness = 'easy' | 'medium' | 'hard';
export type ReviewDate = number;
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface Question {
	id: number;
	questionId: string;
	categoryTitle: string;
	hardness: QuestionHardness;
	title: string;
	titleSlug: string;
	topicTags: string[];
	reviewDate: ReviewDate; // Ecmascript epoch
	reviewFrequency: number;
	difficulty: Difficulty; // 1 -> very easy to 5 -> very difficult
	notes: string;
	history: Record<ReviewDate, Difficulty>;
}
