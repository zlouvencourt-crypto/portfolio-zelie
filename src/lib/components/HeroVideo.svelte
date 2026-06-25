<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$utils/motion';

	let video = $state<HTMLVideoElement | null>(null);

	onMount(() => {
		const el = video;
		if (!el) return;

		// Économie de données ou animations réduites : on garde uniquement le poster.
		const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
			?.saveData;
		if (prefersReducedMotion() || saveData) return;

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

		// Lecture seulement quand le hero est à l'écran (sinon en pause = perf).
		const io = new IntersectionObserver(
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
		return () => io.disconnect();
	});
</script>

<video
	bind:this={video}
	class="absolute inset-0 h-full w-full object-cover brightness-[0.8]"
	muted
	loop
	playsinline
	preload="none"
	poster="/videos/hero-poster.jpg"
	aria-hidden="true"
></video>
