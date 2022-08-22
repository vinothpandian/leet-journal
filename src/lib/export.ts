import { fetchReviews } from '$db/queries';
import type { ExportedReview } from './types';

export const fetchReviewsToExport = async () => {
	const existingReviews = await fetchReviews();

	return existingReviews.map<ExportedReview>(({ id, notes, reviews }) => ({
		id,
		notes,
		reviews,
	}));
};

export const exportReviewsAsJson = async () => {
	const reviewsToExport = await fetchReviewsToExport();

	const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
		JSON.stringify(reviewsToExport, null, 2)
	)}`;

	const anchorElement = document.createElement('a');
	anchorElement.setAttribute('href', dataStr);
	anchorElement.setAttribute('download', 'reviews.json');
	anchorElement.click();
};
