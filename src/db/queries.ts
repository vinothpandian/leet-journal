import type { Difficulty, Review, ReviewDate } from '$lib/types';
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

export const addReviews = async (
	reviewDate: ReviewDate,
	difficulty: Difficulty,
	questionIds: string[]
) =>
	db.transaction('rw', db.reviews, async () => {
		const existingReviews = await db.reviews
			.where('questionId')
			.anyOf(questionIds)
			.toArray();

		const questionidsToUpdateReviews = existingReviews.map(
			(review) => review.questionId
		);

		const questionIdsToCreateReviews = questionIds.filter(
			(id) => !questionidsToUpdateReviews.includes(id)
		);

		const reviewsToCreate: Review[] = questionIdsToCreateReviews.map(
			(questionId: string) => ({
				date: reviewDate,
				difficulty,
				history: {},
				notes: '',
				questionId,
			})
		);

		const reviewsToUpdate: Review[] = existingReviews.map((review) => ({
			...review,
			history: {
				...review.history,
				[review.date]: review.difficulty,
			},
			date: reviewDate,
			difficulty,
		}));

		db.reviews.bulkAdd(reviewsToCreate);
		db.reviews.bulkPut(reviewsToUpdate);
	});
