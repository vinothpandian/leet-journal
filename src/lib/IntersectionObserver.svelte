<script lang="ts">
	import { browser } from '$app/env';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	const dispatch = createEventDispatcher<{ intersect: void }>();

	let container: HTMLElement;
	let observer: IntersectionObserver;

	onMount(() => {
		if (browser) {
			const handleIntersect: IntersectionObserverCallback = (
				entries,
				observer
			) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						dispatch('intersect');
					}
				});
			};

			observer = new IntersectionObserver(handleIntersect, {
				threshold: 1,
			});
			observer.observe(container);
		}
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<div bind:this={container}>
	<slot />
</div>
