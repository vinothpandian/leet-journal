export const range = (length?: number, start = 0) =>
	[...Array(length).keys()].map((i) => start + i);
