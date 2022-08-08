import dayjs from 'dayjs/esm';
import type { Review } from './types';

export const getRetention = ({ reviewDate, difficulty }: Review): string => {
	const lastReviewedDay = dayjs(reviewDate).diff(dayjs(), 'day');

	const calculatedDifficulty = Math.abs(difficulty - 6);

	const retention = Math.exp(lastReviewedDay / calculatedDifficulty) * 100;

	return retention.toFixed(2);
};
