<script lang="ts">
	import HardnessBadge from '$components/common/HardnessBadge.svelte';
	import LeetCodeLink from '$components/common/LeetCodeLink.svelte';

	import { getRetention } from '$lib/retention';

	import type { Hardness, Review } from '$lib/types';
	import dayjs from 'dayjs/esm';
	import RelativeTime from 'dayjs/esm/plugin/relativeTime';
	dayjs.extend(RelativeTime);

	export let id: number;
	export let title: string;
	export let titleSlug: string;
	export let hardness: Hardness;
	export let lastReview: Review;

	function getColor(value: number) {
		//value from 0 to 1
		var hue = (value * 120).toString(10);
		return ['hsl(', hue, ',84.2%,60.2%)'].join('');
	}

	$: retention = getRetention(lastReview);
	$: retentionColor = getColor(retention / 10);
</script>

<li class="border-b">
	<a class="flex gap-4 py-3" href={`/review/${id}`}>
		<div
			class="radial-progress text-2xs"
			style={`--value:${retention};--size: 3rem; color:${retentionColor};`}
		>
			{retention}%
		</div>
		<div class="grid flex-grow gap-2">
			<div class="inline-flex justify-between">
				<span>{title}</span>
				<span class="inline-flex gap-2">
					<HardnessBadge {hardness} />
					<LeetCodeLink {titleSlug} />
				</span>
			</div>
			<div class="inline-flex justify-between">
				<span class="text-slate-400 font-light text-xs"
					>Reviewed {dayjs(lastReview.reviewDate).fromNow()}</span
				>
			</div>
		</div>
	</a>
</li>
