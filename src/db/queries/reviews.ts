import dayjs from 'dayjs/esm';

import { sortReviewsByDate } from '$lib/review';
import type {
	Difficulty,
	ExportedReviews,
	Problem,
	ReviewDate,
} from '$lib/types';
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
			.map((problem) => {
				const { reviews } = problem;
				const sortedReviews = sortReviewsByDate([
					{ reviewDate, difficulty },
					...reviews,
				]);

				return {
					...problem,
					reviews: sortedReviews,
					lastReviewDate: dayjs(sortedReviews[0].reviewDate).unix(),
				};
			});

		await db.problems.bulkPut(problemsToUpdate);
	});

export const removeReview = async (id: number) => {
	db.transaction('rw', db.problems, async () => {
		const problem = await db.problems.get(id);

		const problemToUpdate = { ...problem, reviews: [] } as Problem;

		await db.problems.put(problemToUpdate, id);
	});
};

export const importReviews = async (exportedReviews: ExportedReviews) => {
	db.transaction('rw', db.problems, async () => {
		const problemIds = Object.keys(exportedReviews).map(Number);

		const problems = await db.problems.bulkGet(problemIds);

		const problemsToUpdate = problems
			.filter((problem): problem is Problem => problem !== undefined)
			.map((problem) => {
				const { notes, reviews } = exportedReviews[problem.id];

				const sortedReviews = sortReviewsByDate(reviews);
				return {
					...problem,
					notes,
					reviews: sortedReviews,
					lastReviewDate: dayjs(sortedReviews[0].reviewDate).unix(),
				};
			});

		await db.problems.bulkPut(problemsToUpdate);
	});
};
