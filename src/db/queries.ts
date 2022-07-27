import type { Difficulty, Question, ReviewDate } from '$lib/types';
import db from './db';
import type { QuestionFilterParams } from './types';

export const fetchQuestions = async ({
	tag,
	hardness,
	searchTerm,
	page,
	pageSize = 25,
}: QuestionFilterParams) =>
	db.transaction('r', db.questions, async () => {
		const offset = page * pageSize;

		const query = db.questions
			.filter((q) => tag === '' || q.topicTags.includes(tag))
			.filter((q) => hardness === '' || q.hardness === hardness)
			.filter((q) => q.title.toLowerCase().includes(searchTerm.toLowerCase()));

		const count = await query.count();
		const questions = await query.offset(offset).limit(pageSize).toArray();

		const totalPages = Math.floor(count / pageSize);
		const hasNext = count !== 0 && page < totalPages;

		return {
			totalPages,
			hasNext,
			questions,
		};
	});

export const fetchReviews = async ({
	tag,
	hardness,
	searchTerm,
	page,
	pageSize = 25,
}: QuestionFilterParams) =>
	db.transaction('r', db.questions, async () => {
		const offset = page * pageSize;

		const query = db.questions
			.where('reviewFrequency')
			.above(0)
			.filter((q) => tag === '' || q.topicTags.includes(tag))
			.filter((q) => hardness === '' || q.hardness === hardness)
			.filter((q) => q.title.toLowerCase().includes(searchTerm.toLowerCase()));

		const count = await query.count();
		const questions = await query.offset(offset).limit(pageSize).toArray();

		const totalPages = Math.floor(count / pageSize);
		const hasNext = count !== 0 && page < totalPages;

		return {
			totalPages,
			hasNext,
			questions,
		};
	});

export const addReviews = async (
	reviewDate: ReviewDate,
	difficulty: Difficulty,
	questionIds: number[]
) =>
	db.transaction('rw', db.questions, async () => {
		const questions = await db.questions.bulkGet(questionIds);
		const questionsToUpdate: Question[] = questions
			.filter((question): question is Question => question !== undefined)
			.map((question) => ({
				...question,
				reviewFrequency: question.reviewFrequency + 1,
				history: {
					...question.history,
					[question.reviewDate]: question.difficulty,
				},
				reviewDate,
				difficulty,
			}));

		await db.questions.bulkPut(questionsToUpdate);
	});
