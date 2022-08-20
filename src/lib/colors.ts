const colors = [
	'#b91c1c',
	'#c2410c',
	'#ef4444',
	'#f97316',
	'#f59e0b',
	'#eab308',
	'#84cc16',
	'#22c55e',
	'#4d7c0f',
	'#15803d',
];
export const getColorForPercentage = (percentage: number) =>
	colors?.[Math.floor(percentage / 10)] ?? '#000000';
