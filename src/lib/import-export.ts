import * as yup from 'yup';

import { fetchReviews } from '$db/queries';
import type { ExportedReviews } from './types';

const exportedReviewSchema = yup.array().of(
	yup
		.object()
		.shape({
			notes: yup.string(),
			reviews: yup.array().of(
				yup.object({
					reviewDate: yup.date(),
					difficulty: yup.number().min(1).max(5),
				})
			),
		})
		.noUnknown(true)
		.strict()
);

export const fetchReviewsToExport = async () => {
	const existingReviews = await fetchReviews();

	return existingReviews.reduce<ExportedReviews>(
		(currentReviews, { id, notes, reviews }) => ({
			...currentReviews,
			[id]: { notes, reviews },
		}),
		{}
	);
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

export const validateReviewJson = (
	content: object
): content is ExportedReviews =>
	!Array.isArray(content) &&
	exportedReviewSchema.isValidSync(Object.values(content));
