import Dexie from 'dexie';
import type { Question, QuestionHardness, RawQuestion } from '../lib/types';

export class LeetJournalDb extends Dexie {
	questions!: Dexie.Table<Question, number>;

	constructor() {
		super('LeetJournalDb');
		this.version(1).stores({
			questions:
				'&id, &title, hardness, topicTags, reviewDate, reviewFrequency, difficulty',
		});

		this.on('ready', () => this.ready());
	}

	async ready() {
		const questionsCount = await this.questions.count();

		if (questionsCount > 0) {
			// eslint-disable-next-line no-console
			console.info('Already populated questions');
			return;
		}

		const data = await fetch(`${window.location.origin}/questions.json`);
		const rawQuestions: RawQuestion[] = await data.json();

		const questions: Question[] = rawQuestions.map((rawQuestion, index) => ({
			id: index,
			questionId: rawQuestion.questionId,
			categoryTitle: rawQuestion.categoryTitle,
			hardness: rawQuestion.difficulty.toLowerCase() as QuestionHardness,
			title: rawQuestion.title,
			titleSlug: rawQuestion.titleSlug,
			topicTags: rawQuestion.topicTags
				.split(';')
				.filter((question) => question),
			difficulty: 3,
			reviewDate: 0,
			reviewFrequency: 0,
			history: {},
			notes: '',
		}));

		this.questions.bulkAdd(questions);
	}
}

const db = new LeetJournalDb();

export default db;
