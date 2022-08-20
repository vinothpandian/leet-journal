import type { Difficulty } from './types';

const difficultyMap: Record<
	Difficulty,
	{ label: string; color: string; borderColor: string }
> = {
	1: { label: 'Very easy', color: '#15803d', borderColor: 'border-green-700' },
	2: { label: 'Easy', color: '#22c55e', borderColor: 'border-green-500' },
	3: { label: 'Medium', color: '#f59e0b', borderColor: 'border-amber-500' },
	4: { label: 'Hard', color: '#ef4444', borderColor: 'border-red-500' },
	5: { label: 'Very hard', color: '#b91c1c', borderColor: 'border-red-700' },
};

export const getDifficultyText = (difficulty: Difficulty) =>
	difficultyMap[difficulty].label;

export const getDifficultyColor = (difficulty: Difficulty) =>
	difficultyMap[difficulty].color;

export const getDifficultyBorderColor = (difficulty: Difficulty) =>
	difficultyMap[difficulty].borderColor;
