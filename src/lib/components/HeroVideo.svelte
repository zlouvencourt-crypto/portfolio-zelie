<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$utils/motion';
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

		// Parallaxe : la vidéo descend doucement au défilement, sans déborder du hero.
		const gsap = ensureGsap();
		const section = el.closest('.hero') ?? el.parentElement;
		const st = ScrollTrigger.create({
			trigger: section as Element,
			start: 'top top',
			end: 'bottom top',
			scrub: true,
			animation: gsap.fromTo(el, { yPercent: 0 }, { yPercent: 10, ease: 'none' })
		});

		return () => {
			io.disconnect();
			st.kill();
		};
	});
</script>

<video
	bind:this={video}
	class="absolute left-0 top-[-16%] h-[132%] w-full object-cover brightness-[0.8]"
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
