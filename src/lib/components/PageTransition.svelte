<script lang="ts">
	import { onMount } from 'svelte';
	import { navigating } from '$app/state';
	import { ensureGsap } from '$utils/gsap';
	import { prefersReducedMotion } from '$utils/motion';

	let overlay = $state<HTMLDivElement | null>(null);
	let enabled = $state(false);

	onMount(() => {
		enabled = !prefersReducedMotion();
	});

	$effect(() => {
		if (!enabled || !overlay) return;
		const gsap = ensureGsap();

		if (navigating.from && navigating.to && navigating.from.url.pathname !== navigating.to.url.pathname) {
			const tl = gsap.timeline();
			tl.set(overlay, { opacity: 0, display: 'block' })
				.to(overlay, { opacity: 1, duration: 0.45, ease: 'power2.inOut' })
				.to(overlay, { opacity: 0, duration: 0.45, ease: 'power2.inOut', delay: 0.1 })
				.set(overlay, { display: 'none' });
		}
	});
</script>

<div
	bind:this={overlay}
	class="pointer-events-none fixed inset-0 z-[90] hidden backdrop-blur-2xl"
	aria-hidden="true"
></div>
