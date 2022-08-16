import dayjs from 'dayjs/esm';

const relativeDateMap = ['today', 'yesterday', 'day before yesterday'];

export const getRelativeDate = (date: string) => {
	const dayDifference = dayjs(date).diff(new Date(), 'days');

	return relativeDateMap?.[dayDifference] ?? `${dayDifference} days ago`;
};
