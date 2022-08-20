import type { ChartConfiguration, ChartDataset, TooltipItem } from 'chart.js';

export const getChartConfiguration = (
	labels: string[],
	datasets: ChartDataset<'line', number[]>[]
): ChartConfiguration<'line', number[], string> => ({
	type: 'line',
	data: {
		labels,
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
				text: 'Retention projection',
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
			},
		},
	},
});
