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
		const hasNext = page <= totalPages;

		return {
			totalPages,
			hasNext,
			questions,
		};
	});
