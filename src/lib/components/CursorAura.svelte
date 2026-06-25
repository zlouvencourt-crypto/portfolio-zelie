<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion, isTouch } from '$utils/motion';

	let el = $state<HTMLDivElement | null>(null);

	onMount(() => {
		if (!el) return;

		// Position de départ : haut-centre.
		let tx = window.innerWidth / 2;
		let ty = window.innerHeight * 0.32;
		let cx = tx;
		let cy = ty;
		el.style.transform = `translate(${cx}px, ${cy}px)`;

		if (prefersReducedMotion() || isTouch()) {
			el.classList.add('is-visible');
			return; // aura fixe, sans suivi
		}

		const move = (e: PointerEvent) => {
			tx = e.clientX;
			ty = e.clientY;
		};
		window.addEventListener('pointermove', move, { passive: true });

		let raf = 0;
		const loop = () => {
			cx += (tx - cx) * 0.08;
			cy += (ty - cy) * 0.08;
			el!.style.transform = `translate(${cx}px, ${cy}px)`;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		// Apparition en douceur.
		requestAnimationFrame(() => el!.classList.add('is-visible'));

		// pause de la boucle quand l'onglet est en arrière-plan
		const onVis = () => {
			cancelAnimationFrame(raf);
			if (!document.hidden) raf = requestAnimationFrame(loop);
		};
		document.addEventListener('visibilitychange', onVis);

		return () => {
			window.removeEventListener('pointermove', move);
			document.removeEventListener('visibilitychange', onVis);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div bind:this={el} class="aura" aria-hidden="true"></div>

<style>
	.aura {
		position: fixed;
		top: 0;
		left: 0;
		width: 62vmax;
		height: 62vmax;
		margin: -31vmax 0 0 -31vmax;
		z-index: -1;
		pointer-events: none;
		border-radius: 9999px;
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--accent) 20%, transparent) 0%,
			color-mix(in srgb, var(--accent) 6%, transparent) 32%,
			transparent 62%
		);
		opacity: 0;
		transition: opacity 1.1s ease;
		will-change: transform;
	}
	.aura:global(.is-visible) {
		opacity: 1;
	}
	@media (pointer: coarse) {
		.aura {
			display: none;
		}
	}
</style>
