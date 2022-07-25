import { browser } from '$app/env';
import db from './db';

export const getQuestionsList = () => {
	if (!browser) {
		return [];
	}

	return db.questions.toArray();
};
