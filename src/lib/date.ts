import dayjs from 'dayjs/esm';
import LocalizedFormat from 'dayjs/esm/plugin/localizedFormat';
import RelativeTime from 'dayjs/esm/plugin/relativeTime';

dayjs.extend(RelativeTime);
dayjs.extend(LocalizedFormat);

const relativeDateMap = ['today', 'yesterday', 'day before yesterday'];

export const getDaysPassedCount = (date: string) =>
	dayjs(date).diff(new Date(), 'days');

export const getRelativeDate = (date: string) => {
	const daysPassed = Math.abs(getDaysPassedCount(date));

	return relativeDateMap?.[daysPassed] ?? `${daysPassed} days ago`;
};

export const getFormattedDate = (date: string) => dayjs(date).format('ll');
