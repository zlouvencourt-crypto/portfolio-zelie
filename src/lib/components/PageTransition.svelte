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
			tl.set(overlay, { yPercent: 100, display: 'block' })
				.to(overlay, { yPercent: 0, duration: 0.7, ease: 'expo.inOut' })
				.to(overlay, { yPercent: -100, duration: 0.7, ease: 'expo.inOut', delay: 0.1 })
				.set(overlay, { display: 'none', yPercent: 100 });
		}
	});
</script>

<div
	bind:this={overlay}
	class="pointer-events-none fixed inset-0 z-[90] hidden bg-[color:var(--color-wine)]"
	aria-hidden="true"
></div>
