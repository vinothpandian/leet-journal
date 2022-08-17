import type { Difficulty } from './types';

const difficultyMap: Record<Difficulty, string> = {
	1: 'Very easy',
	2: 'Easy',
	3: 'Medium',
	4: 'Hard',
	5: 'Very hard',
};

export const getDifficultyText = (difficulty: Difficulty) =>
	difficultyMap[difficulty];
