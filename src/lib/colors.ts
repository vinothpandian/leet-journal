const colors = [
	'#E03131',
	'#E8590C',
	'#FD7E14',
	'#F08C00',
	'#FCC419',
	'#A9E34B',
	'#82C91E',
	'#66A80F',
	'#40C057',
	'#2B8A3E',
];
export const getColorForPercentage = (percentage: number) =>
	colors?.[Math.floor(percentage / 10)] ?? '#000000';
