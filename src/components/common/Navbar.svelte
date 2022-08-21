<script>
	import Help from '$icons/Help.svelte';
</script>

<div class="navbar bg-base-100 drop-shadow-sm flex flex-nowrap justify-between">
	<a href="/" class="btn btn-ghost normal-case text-xl">Leet Journal</a>
	<div
		class="tooltip tooltip-bottom"
		data-tip="Spaced repetition is an evidence-based learning technique that incorporates increasing intervals of time between subsequent review of previously learned material in order to exploit the psychological spacing effect."
	>
		<div class="btn btn-link btn-xs btn-square rounded text-gray-800">
			<Help />
		</div>
	</div>
</div>
