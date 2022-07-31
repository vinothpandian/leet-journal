import type { Difficulty, Problem, ReviewDate } from '$lib/types';
import db from './db';
import type { FilterParams } from './types';

export const fetchProblems = async ({
	tag,
	hardness,
	searchTerm,
	page,
	pageSize = 25,
}: FilterParams) =>
	db.transaction('r', db.problems, async () => {
		const offset = page * pageSize;

		const query = db.problems
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
