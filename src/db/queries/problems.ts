import db from '../db';
import type { FilterParams } from '../types';

export const fetchProblem = async (id: number) => db.problems.get(id);

export const updateProblemNotes = async (id: number, notes: string) =>
	db.problems.update(id, { notes });

export const fetchProblems = async (
	{ tag, hardness, searchTerm, page, pageSize = 25 }: FilterParams,
	onlyReviewed = false,
	sortReviewsByDescending = false
) =>
	db.transaction('r', db.problems, async () => {
		const offset = page * pageSize;

		let query = db.problems.orderBy(onlyReviewed ? 'lastReviewDate' : 'id');

		if (onlyReviewed) {
			if (sortReviewsByDescending) {
				query = query.reverse();
			}

			query = query.filter((p) => p.reviews.length > 0);
		}

		query = query
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

export const fetchReviews = async () =>
	db.problems.filter((problem) => problem.reviews.length > 0).toArray();
