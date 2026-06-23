<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion, isTouch } from '$utils/motion';

	let ring = $state<HTMLDivElement | null>(null);
	let dot = $state<HTMLDivElement | null>(null);

	onMount(() => {
		if (prefersReducedMotion() || isTouch() || !ring || !dot) return;

		let mx = window.innerWidth / 2;
		let my = window.innerHeight / 2;
		let rx = mx;
		let ry = my;

		const onMove = (e: PointerEvent) => {
			mx = e.clientX;
			my = e.clientY;
			dot!.style.transform = `translate(${mx}px, ${my}px)`;
		};
		window.addEventListener('pointermove', onMove);

		let raf = 0;
		const loop = () => {
			rx += (mx - rx) * 0.18;
			ry += (my - ry) * 0.18;
			ring!.style.transform = `translate(${rx}px, ${ry}px)`;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		const selector = 'a, button, [data-cursor], input, textarea, label';
		const over = (e: Event) => {
			if ((e.target as Element)?.closest(selector)) ring!.classList.add('is-hover');
		};
		const out = (e: Event) => {
			if ((e.target as Element)?.closest(selector)) ring!.classList.remove('is-hover');
		};
		document.addEventListener('pointerover', over);
		document.addEventListener('pointerout', out);

		document.documentElement.classList.add('has-cursor');

		return () => {
			window.removeEventListener('pointermove', onMove);
			document.removeEventListener('pointerover', over);
			document.removeEventListener('pointerout', out);
			document.documentElement.classList.remove('has-cursor');
			cancelAnimationFrame(raf);
		};
	});
</script>

<div bind:this={dot} class="cursor-dot" aria-hidden="true"></div>
<div bind:this={ring} class="cursor-ring" aria-hidden="true"></div>

<style>
	.cursor-dot,
	.cursor-ring {
		position: fixed;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 9999;
		border-radius: 9999px;
		mix-blend-mode: difference;
		will-change: transform;
	}
	.cursor-dot {
		width: 6px;
		height: 6px;
		margin: -3px 0 0 -3px;
		background: #fff;
	}
	.cursor-ring {
		width: 40px;
		height: 40px;
		margin: -20px 0 0 -20px;
		border: 1px solid #fff;
		transition:
			width 0.4s var(--ease-out-expo),
			height 0.4s var(--ease-out-expo),
			margin 0.4s var(--ease-out-expo),
			background 0.4s ease;
	}
	.cursor-ring.is-hover {
		width: 76px;
		height: 76px;
		margin: -38px 0 0 -38px;
		background: rgba(255, 255, 255, 0.12);
	}
	:global(html.has-cursor),
	:global(html.has-cursor a),
	:global(html.has-cursor button) {
		cursor: none;
	}
	@media (pointer: coarse) {
		.cursor-dot,
		.cursor-ring {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.cursor-dot,
		.cursor-ring {
			display: none;
		}
	}
</style>
