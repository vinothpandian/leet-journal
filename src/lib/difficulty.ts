import type { Difficulty } from './types';

const difficultyMap: Record<
	Difficulty,
	{ label: string; borderColor: string }
> = {
	1: { label: 'Very easy', borderColor: 'border-green-700' },
	2: { label: 'Easy', borderColor: 'border-lime-700' },
	3: { label: 'Medium', borderColor: 'border-amber-700' },
	4: { label: 'Hard', borderColor: 'border-orange-700' },
	5: { label: 'Very hard', borderColor: 'border-red-700' },
};

export const getDifficultyText = (difficulty: Difficulty) =>
	difficultyMap[difficulty].label;

export const getDifficultyBorderColor = (difficulty: Difficulty) =>
	difficultyMap[difficulty].borderColor;
