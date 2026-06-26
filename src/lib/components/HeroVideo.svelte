<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion, isTouch } from '$utils/motion';
	import { ensureGsap, ScrollTrigger } from '$utils/gsap';

	let layer = $state<HTMLDivElement | null>(null);
	let video = $state<HTMLVideoElement | null>(null);

	onMount(() => {
		const vid = video;
		const lay = layer;
		if (!vid || !lay) return;

		// Animations réduites : on fige sur le poster.
		if (prefersReducedMotion()) {
			vid.removeAttribute('autoplay');
			vid.pause();
			return;
		}

		vid.play().catch(() => {});

		const gsap = ensureGsap();
		const section = lay.closest('.hero') ?? document.querySelector('.hero');

		// Au défilement : la vidéo (calque fixe) descend visiblement, puis s'efface
		// en fin de hero pour laisser place aux blocs (sans les recouvrir).
		let st: ScrollTrigger | undefined;
		if (section) {
			const tl = gsap.timeline();
			tl.to(vid, { yPercent: 14, ease: 'none', duration: 1 }, 0);
			tl.to(lay, { opacity: 0, ease: 'none', duration: 0.4 }, 0.62);
			st = ScrollTrigger.create({
				trigger: section,
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				animation: tl,
				onLeave: () => vid.pause(),
				onEnterBack: () => vid.play().catch(() => {})
			});
		}

		// La vidéo suit légèrement la souris.
		let cleanupMouse: (() => void) | undefined;
		if (!isTouch()) {
			const xTo = gsap.quickTo(vid, 'x', { duration: 0.7, ease: 'expo.out' });
			const yTo = gsap.quickTo(vid, 'y', { duration: 0.7, ease: 'expo.out' });
			const onMouse = (e: PointerEvent) => {
				const nx = (e.clientX / window.innerWidth - 0.5) * 2;
				const ny = (e.clientY / window.innerHeight - 0.5) * 2;
				xTo(nx * 22);
				yTo(ny * 12);
			};
			window.addEventListener('pointermove', onMouse, { passive: true });
			cleanupMouse = () => window.removeEventListener('pointermove', onMouse);
		}

		return () => {
			st?.kill();
			cleanupMouse?.();
		};
	});
</script>

<div bind:this={layer} class="hero-video" aria-hidden="true">
	<video
		bind:this={video}
		autoplay
		muted
		loop
		playsinline
		preload="auto"
		poster="/videos/hero-poster.jpg"
	>
		<source src="/videos/hero.webm" type="video/webm" />
		<source src="/videos/hero.mp4" type="video/mp4" />
	</video>
	<div class="hero-video-veil"></div>
</div>

<style>
	.hero-video {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}
	.hero-video video {
		position: absolute;
		left: -6%;
		top: -16%;
		width: 112%;
		height: 134%;
		object-fit: cover;
		filter: brightness(0.78);
	}
	.hero-video-veil {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(to top, var(--bg) 14%, transparent 58%),
			color-mix(in srgb, var(--accent) 12%, transparent),
			rgba(8, 7, 11, 0.62);
	}
</style>
