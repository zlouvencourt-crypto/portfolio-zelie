<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion, isTouch } from '$utils/motion';
	import { ensureGsap, ScrollTrigger } from '$utils/gsap';

	let video = $state<HTMLVideoElement | null>(null);

	onMount(() => {
		const el = video;
		if (!el) return;

		// Animations réduites : on fige sur le poster.
		if (prefersReducedMotion()) {
			el.removeAttribute('autoplay');
			el.pause();
			return;
		}

		el.play().catch(() => {});

		// Pause quand le hero n'est plus du tout à l'écran (perf), reprise au retour.
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) el.play().catch(() => {});
					else el.pause();
				}
			},
			{ threshold: 0 }
		);
		io.observe(el);

		const gsap = ensureGsap();

		// 1) Au défilement : la vidéo descend doucement (parallaxe), sans déborder du hero.
		const section = el.closest('.hero') ?? el.parentElement;
		const st = ScrollTrigger.create({
			trigger: section as Element,
			start: 'top top',
			end: 'bottom top',
			scrub: true,
			animation: gsap.fromTo(el, { yPercent: 0 }, { yPercent: 12, ease: 'none' })
		});

		// 2) La vidéo suit légèrement la souris.
		let cleanupMouse: (() => void) | undefined;
		if (!isTouch()) {
			const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'expo.out' });
			const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'expo.out' });
			const onMouse = (e: PointerEvent) => {
				const nx = (e.clientX / window.innerWidth - 0.5) * 2;
				const ny = (e.clientY / window.innerHeight - 0.5) * 2;
				xTo(nx * 24);
				yTo(ny * 16);
			};
			window.addEventListener('pointermove', onMouse, { passive: true });
			cleanupMouse = () => window.removeEventListener('pointermove', onMouse);
		}

		return () => {
			io.disconnect();
			st.kill();
			cleanupMouse?.();
		};
	});
</script>

<video
	bind:this={video}
	class="absolute left-[-4%] top-[-22%] h-[144%] w-[108%] object-cover brightness-[0.8]"
	autoplay
	muted
	loop
	playsinline
	preload="auto"
	poster="/videos/hero-poster.jpg"
	aria-hidden="true"
>
	<source src="/videos/hero.webm" type="video/webm" />
	<source src="/videos/hero.mp4" type="video/mp4" />
</video>
