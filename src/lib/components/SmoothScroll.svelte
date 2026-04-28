<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { startLenis, stopLenis, getLenis } from '$utils/lenis';
	import { ensureGsap, ScrollTrigger } from '$utils/gsap';
	import { prefersReducedMotion } from '$utils/motion';

	let { children } = $props();

	onMount(() => {
		if (prefersReducedMotion()) return;
		ensureGsap();
		startLenis();
		return () => stopLenis();
	});

	$effect(() => {
		// Scroll top when route changes (after Lenis init, uses its method to stay smooth).
		// Touch page.url so effect reruns on navigation.
		page.url.pathname;
		queueMicrotask(() => {
			const lenis = getLenis();
			if (lenis) lenis.scrollTo(0, { immediate: true });
			else window.scrollTo(0, 0);
			ScrollTrigger.refresh();
		});
	});
</script>

{@render children()}
