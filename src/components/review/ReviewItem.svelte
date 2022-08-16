<script lang="ts">
	import HardnessBadge from '$components/common/HardnessBadge.svelte';
	import LeetCodeLink from '$components/common/LeetCodeLink.svelte';
	import { getColorForPercentage } from '$lib/colors';
	import { getRelativeDate } from '$lib/date';

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

	$: retention = getRetention(lastReview);
	$: retentionColor = getColorForPercentage(retention - 1);
</script>

<li class="border-b">
	<a class="flex gap-4 py-3" href={`/review/${id}`}>
		<div
			class="radial-progress text-2xs min-w-[3rem] w-12"
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
				<span class="text-slate-400 font-light text-xs">
					Reviewed {getRelativeDate(lastReview.reviewDate)}
				</span>
			</div>
		</div>
	</a>
</li>
