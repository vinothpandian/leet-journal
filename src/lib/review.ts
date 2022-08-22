import { getDaysPassedCount } from './date';
import type { Review } from './types';

export const sortReviewsByDate = (
	reviews: Review[],
	order: 'asc' | 'desc' = 'desc'
) =>
	reviews.sort(
		({ reviewDate: firstReviewDate }, { reviewDate: secondReviewDate }) =>
			(order === 'asc' ? 1 : -1) *
			(getDaysPassedCount(firstReviewDate) -
				getDaysPassedCount(secondReviewDate))
	);

export const getLastReview = (reviews: Review[] = []) => reviews[0];
