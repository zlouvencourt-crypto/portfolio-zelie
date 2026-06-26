<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import { ensureGsap, ScrollTrigger } from '$utils/gsap';
	import { prefersReducedMotion } from '$utils/motion';

	let { children } = $props();

	onMount(() => {
		if (prefersReducedMotion()) return;
		const gsap = ensureGsap();
		const lenis = new Lenis({
			duration: 1.15,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			wheelMultiplier: 0.9,
			touchMultiplier: 1.4
		});

		lenis.on('scroll', ScrollTrigger.update);
		const raf = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		// défilement fluide vers les ancres (#section)
		const onClick = (e: MouseEvent) => {
			const a = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
			if (!a) return;
			const id = a.getAttribute('href');
			if (!id || id === '#') return;
			const target = document.querySelector(id);
			if (target) {
				e.preventDefault();
				lenis.scrollTo(target as HTMLElement, { offset: -40 });
			}
		};
		document.addEventListener('click', onClick);

		ScrollTrigger.refresh();
		// recalcule les positions une fois les polices chargées (évite des décalages)
		if (typeof document !== 'undefined' && document.fonts) {
			document.fonts.ready.then(() => ScrollTrigger.refresh());
		}

		return () => {
			document.removeEventListener('click', onClick);
			gsap.ticker.remove(raf);
			lenis.destroy();
		};
	});
</script>

{@render children()}
