import { getRetention } from '$lib/retention';
import { getLastReview } from '$lib/review';
import type { Difficulty, Problem, ReviewDate } from '$lib/types';
import db from './db';
import type { FilterParams, RetentionData, Stats } from './types';

export const fetchProblem = async (id: number) => db.problems.get(id);

export const updateProblemNotes = async (id: number, notes: string) =>
	db.problems.update(id, { notes });

export const fetchProblems = async (
	{ tag, hardness, searchTerm, page, pageSize = 25 }: FilterParams,
	onlyReviewed = false
) =>
	db.transaction('r', db.problems, async () => {
		const offset = page * pageSize;

		const query = db.problems
			.filter((p) => !onlyReviewed || p.reviews.length > 0)
			.filter((p) => tag === '' || p.topicTags.includes(tag))
			.filter((p) => hardness === '' || p.hardness === hardness)
			.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

		const count = await query.count();
		const problems = await query.offset(offset).limit(pageSize).toArray();

		const totalPages = Math.floor(count / pageSize);
		const hasNext = count !== 0 && page < totalPages;

		return {
			totalPages,
			hasNext,
			problems,
		};
	});

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
