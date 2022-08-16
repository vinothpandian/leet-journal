import dayjs from 'dayjs/esm';
import type { Review } from './types';

export const getRetention = ({ reviewDate, difficulty }: Review) => {
	const lastReviewedDay = dayjs(reviewDate).diff(dayjs(), 'day');

	const calculatedDifficulty = Math.abs(difficulty - 6);

	const retention = Math.exp(lastReviewedDay / calculatedDifficulty) * 100;

	return Math.trunc(retention);
};
