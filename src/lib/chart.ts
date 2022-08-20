import { Chart, registerables, type ChartDataset } from 'chart.js';

import type { ChartConfiguration, TooltipItem } from 'chart.js';
import dayjs from 'dayjs/esm';
import { getDifficultyColor, getDifficultyText } from './difficulty';
import { getRetention } from './retention';
import type { ChartDatasets, Difficulty, Review } from './types';
import { range } from './utils';

export const getChartConfiguration = (
	title: string,
	datasets: ChartDatasets = []
): ChartConfiguration<'line', number[], string> => ({
	type: 'line',
	data: {
		labels: range(12).map((i) => dayjs().add(i, 'days').format('MMM DD')),
		datasets,
	},
	options: {
		maintainAspectRatio: true,
		aspectRatio: 1.25,
		interaction: {
			mode: 'index',
		},
		elements: {
			line: {
				tension: 0.3,
				fill: false,
			},
		},
		plugins: {
			title: {
				display: true,
				text: `Retention projection ${title && `of ${title}`}`,
				align: 'start',
				font: {
					weight: '500',
					size: 18,
				},
			},
			subtitle: {
				display: true,
				align: 'start',
				text: 'Projected for next 12 days',
				padding: { top: 0, bottom: 48 },
			},
			tooltip: {
				bodyFont: {
					family: 'monospace',
				},
				callbacks: {
					label: (context: TooltipItem<'line'>) =>
						` ${context.dataset.label?.padEnd(12)}${context.parsed.y}%`,
				},
			},
			legend: {
				display: true,
				position: 'bottom',
				labels: { padding: 48 },
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Dates',
				},
			},
			y: {
				title: {
					display: true,
					text: 'Retention',
				},
				beginAtZero: true,
				max: 100,
			},
		},
	},
});

export const getChartDataset = (
	difficulty: Difficulty,
	reviewDate?: string
): ChartDataset<'line', number[]> => ({
	label: getDifficultyText(difficulty),
	borderColor: getDifficultyColor(difficulty),
	data: range(12)
		.map<Review>((days) => ({
			reviewDate: dayjs(reviewDate).subtract(days, 'days').toISOString(),
			difficulty,
		}))
		.map(getRetention),
});

export const DEFAULT_DATASETS: ChartDatasets = (
	range(5, 1) as Difficulty[]
).map((difficulty) => getChartDataset(difficulty));

export function chart(
	node: HTMLCanvasElement,
	{ title = '', datasets }: { title?: string; datasets: ChartDatasets }
) {
	const ctx = node.getContext('2d');

	if (ctx == null) {
		return;
	}

	Chart.register(...registerables);

	// eslint-disable-next-line no-new
	new Chart(ctx, getChartConfiguration(title, datasets));
}
