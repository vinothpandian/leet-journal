import Dexie from 'dexie';
import type { Hardness, Problem, RawProblem } from '../lib/types';

export class LeetJournalDb extends Dexie {
	problems!: Dexie.Table<Problem, number>;

	constructor() {
		super('LeetJournalDb');
		this.version(1).stores({
			problems: '&id, &title, lastReviewDate, hardness, topicTags',
		});

		this.on('ready', () => this.ready());
	}

	async ready() {
		const problemsCount = await this.problems.count();

		if (problemsCount > 0) {
			return;
		}

		await this.initiateProblemsDb();
	}

	async initiateProblemsDb() {
		const data = await fetch(`${window.location.origin}/problems.json`);
		const rawProblems: RawProblem[] = await data.json();

		const problems: Problem[] = rawProblems.map((rawProblem, index) => ({
			id: index,
			leetCodeId: rawProblem.questionId,
			categoryTitle: rawProblem.categoryTitle,
			hardness: rawProblem.difficulty.toLowerCase() as Hardness,
			title: rawProblem.title,
			titleSlug: rawProblem.titleSlug,
			topicTags: rawProblem.topicTags.split(';').filter((tag) => tag),
			lastReviewDate: -1,
			notes: '',
			reviews: [],
		}));

		this.problems.bulkAdd(problems);
	}

	async reset() {
		await this.problems.clear();
		await this.initiateProblemsDb();
	}
}

const db = new LeetJournalDb();

export default db;
