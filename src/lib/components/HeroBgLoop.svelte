<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion, isTouch } from '$utils/motion';
	import { ensureGsap } from '$utils/gsap';

	let video = $state<HTMLVideoElement | null>(null);

	onMount(() => {
		const vid = video;
		if (!vid) return;

		if (prefersReducedMotion()) {
			vid.removeAttribute('autoplay');
			vid.pause();
			return;
		}

		vid.play().catch(() => {});

		// Léger suivi de la souris.
		let cleanup: (() => void) | undefined;
		if (!isTouch()) {
			const gsap = ensureGsap();
			const xTo = gsap.quickTo(vid, 'x', { duration: 0.7, ease: 'expo.out' });
			const yTo = gsap.quickTo(vid, 'y', { duration: 0.7, ease: 'expo.out' });
			const onMouse = (e: PointerEvent) => {
				const nx = (e.clientX / window.innerWidth - 0.5) * 2;
				const ny = (e.clientY / window.innerHeight - 0.5) * 2;
				xTo(nx * 20);
				yTo(ny * 12);
			};
			window.addEventListener('pointermove', onMouse, { passive: true });
			cleanup = () => window.removeEventListener('pointermove', onMouse);
		}

		// Pause quand l'onglet est en arrière-plan.
		const onVis = () => {
			if (document.hidden) vid.pause();
			else vid.play().catch(() => {});
		};
		document.addEventListener('visibilitychange', onVis);

		return () => {
			cleanup?.();
			document.removeEventListener('visibilitychange', onVis);
		};
	});
</script>

<div class="hero-bg" aria-hidden="true">
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
	<div class="hero-bg-veil"></div>
</div>

<style>
	.hero-bg {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}
	.hero-bg video {
		position: absolute;
		left: -5%;
		top: -5%;
		width: 110%;
		height: 110%;
		object-fit: cover;
		filter: brightness(0.78);
	}
	.hero-bg-veil {
		position: absolute;
		inset: 0;
		background:
			color-mix(in srgb, var(--accent) 10%, transparent),
			rgba(8, 7, 11, 0.68);
	}
</style>
