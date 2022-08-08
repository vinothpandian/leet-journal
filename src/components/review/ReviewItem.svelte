<script lang="ts">
	import { getRetention } from '$lib/retention';

	import type { Hardness, Review } from '$lib/types';
	import dayjs from 'dayjs/esm';

	export let title: string;
	export let hardness: Hardness;
	export let lastReview: Review;
</script>

<div>
	<div class="flex justify-between">
		<span>{title}</span>
		<span>{hardness}</span>
	</div>
	<div class="flex justify-between">
		<span>Reviewed {dayjs(lastReview.reviewDate).fromNow()}</span>
		<span>Retention: {getRetention(lastReview)}%</span>
	</div>
</div>
