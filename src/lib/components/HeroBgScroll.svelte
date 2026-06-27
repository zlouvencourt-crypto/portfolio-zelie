<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion, isTouch } from '$utils/motion';
	import { ensureGsap } from '$utils/gsap';

	let video = $state<HTMLVideoElement | null>(null);

	onMount(() => {
		const vid = video;
		if (!vid) return;

		// Animations réduites : on garde juste le poster.
		if (prefersReducedMotion()) return;

		// Amorce le décodage pour que les images s'affichent au scrubbing.
		vid
			.play()
			.then(() => vid.pause())
			.catch(() => {});

		let cur = 0;
		let raf = 0;
		const progress = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
		};
		const loop = () => {
			const d = vid.duration;
			if (d && !isNaN(d)) {
				const target = progress() * (d - 0.05);
				cur += (target - cur) * 0.12;
				if (Math.abs(target - cur) > 0.01) {
					try {
						vid.currentTime = cur;
					} catch {
						/* seek pas encore prêt */
					}
				}
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		// Léger suivi de la souris.
		let cleanupMouse: (() => void) | undefined;
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
			cleanupMouse = () => window.removeEventListener('pointermove', onMouse);
		}

		// Pause de la boucle quand l'onglet est en arrière-plan.
		const onVis = () => {
			cancelAnimationFrame(raf);
			if (!document.hidden) raf = requestAnimationFrame(loop);
		};
		document.addEventListener('visibilitychange', onVis);

		return () => {
			cancelAnimationFrame(raf);
			cleanupMouse?.();
			document.removeEventListener('visibilitychange', onVis);
		};
	});
</script>

<div class="hero-bg" aria-hidden="true">
	<video bind:this={video} muted playsinline preload="auto" poster="/videos/hero-poster.jpg">
		<source src="/videos/hero-scroll.mp4" type="video/mp4" />
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
		max-width: none;
		max-height: none;
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
