import { getRetention } from '$lib/retention';
import { getLastReview } from '$lib/review';
import db from '../db';
import type { RetentionData, Stats } from '../types';

export const getStats = async (): Promise<Stats> => {
	const totalProblems = await db.problems.count();
	const totalReviewed = await db.problems
		.filter((p) => p.reviews.length > 0)
		.count();

	const remaining = totalProblems - totalReviewed;
	const percentReviewed = ((totalReviewed / totalProblems) * 100).toFixed(2);
	const percentRemaining = ((remaining / totalProblems) * 100).toFixed(2);

	return {
		totalProblems,
		totalReviewed,
		percentReviewed,
		remaining,
		percentRemaining,
	};
};

export const getRetentionStats = async (): Promise<RetentionData[]> =>
	(
		await db.problems.filter((problem) => problem.reviews.length > 0).toArray()
	).map((problem) => ({
		title: problem.title,
		retention: getRetention(getLastReview(problem.reviews)),
	}));
