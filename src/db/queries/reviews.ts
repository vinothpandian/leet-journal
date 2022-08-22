import type { Difficulty, Problem, ReviewDate } from '$lib/types';
import db from '../db';

export const addReviews = async (
	reviewDate: ReviewDate,
	difficulty: Difficulty,
	problemIds: number[]
) =>
	db.transaction('rw', db.problems, async () => {
		const problems = await db.problems.bulkGet(problemIds);
		const problemsToUpdate: Problem[] = problems
			.filter((problem): problem is Problem => problem !== undefined)
			.map((problem) => ({
				...problem,
				reviews: [
					{
						reviewDate,
						difficulty,
					},
					...problem.reviews,
				],
			}));

		await db.problems.bulkPut(problemsToUpdate);
	});

export const removeReview = async (id: number) => {
	db.transaction('rw', db.problems, async () => {
		const problem = await db.problems.get(id);

		const problemToUpdate = { ...problem, reviews: [] } as Problem;

		await db.problems.put(problemToUpdate, id);
	});
};
