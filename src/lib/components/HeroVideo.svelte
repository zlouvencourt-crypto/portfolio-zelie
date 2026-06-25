<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$utils/motion';
	import { ensureGsap, ScrollTrigger } from '$utils/gsap';

	let video = $state<HTMLVideoElement | null>(null);

	onMount(() => {
		const el = video;
		if (!el) return;

		const reduce = prefersReducedMotion();
		const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
			?.saveData;

		// Parallaxe : la vidéo descend doucement quand la page défile.
		let st: ScrollTrigger | undefined;
		if (!reduce) {
			const gsap = ensureGsap();
			const section = el.closest('.hero') ?? el.parentElement;
			st = ScrollTrigger.create({
				trigger: section as Element,
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				animation: gsap.fromTo(el, { yPercent: 0 }, { yPercent: 10, ease: 'none' })
			});
		}

		// Lecture seulement quand visible (et jamais en éco. données / animations réduites).
		let io: IntersectionObserver | undefined;
		if (!reduce && !saveData) {
			let loaded = false;
			const load = () => {
				if (loaded) return;
				loaded = true;
				const mobile = window.matchMedia('(max-width: 767px)').matches;
				const webm = mobile ? '/videos/hero-mobile.webm' : '/videos/hero.webm';
				const mp4 = mobile ? '/videos/hero-mobile.mp4' : '/videos/hero.mp4';
				const s1 = document.createElement('source');
				s1.src = webm;
				s1.type = 'video/webm';
				const s2 = document.createElement('source');
				s2.src = mp4;
				s2.type = 'video/mp4';
				el.append(s1, s2);
				el.load();
			};
			io = new IntersectionObserver(
				(entries) => {
					for (const e of entries) {
						if (e.isIntersecting) {
							load();
							el.play().catch(() => {});
						} else {
							el.pause();
						}
					}
				},
				{ threshold: 0.1 }
			);
			io.observe(el);
		}

		return () => {
			io?.disconnect();
			st?.kill();
		};
	});
</script>

<video
	bind:this={video}
	class="absolute left-0 top-[-16%] h-[132%] w-full object-cover brightness-[0.8]"
	muted
	loop
	playsinline
	preload="none"
	poster="/videos/hero-poster.jpg"
	aria-hidden="true"
></video>
