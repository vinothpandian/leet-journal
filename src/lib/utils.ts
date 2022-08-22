export const range = (length?: number, start = 0) =>
	[...Array(length).keys()].map((i) => start + i);

export const isJsonString = (str: unknown): str is string => {
	try {
		JSON.parse(str as string);
	} catch (e) {
		return false;
	}
	return true;
};
