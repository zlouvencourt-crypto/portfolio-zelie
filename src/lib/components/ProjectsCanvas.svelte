<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$utils/motion';
	import { projects } from '$content/projects';

	// Variations de format pour un rendu « galerie » plutôt qu'une grille rigide.
	const tiles = projects.map((p, i) => ({
		...p,
		ar: i % 3 === 0 ? '4 / 5' : i % 3 === 1 ? '1 / 1' : '5 / 4'
	}));

	const COLS = 4;
	const colOffset = ['0vh', '10vh', '-4vh', '7vh'];
	const columns = Array.from({ length: COLS }, (_, c) => tiles.filter((_, i) => i % COLS === c));

	let stage = $state<HTMLDivElement | null>(null);
	let plane = $state<HTMLDivElement | null>(null);

	onMount(() => {
		if (!stage || !plane) return;
		const reduce = prefersReducedMotion();

		let tx = 0,
			ty = 0,
			cx = 0,
			cy = 0;
		let maxX = 0,
			maxY = 0;
		let dragging = false,
			moved = 0;
		let startX = 0,
			startY = 0,
			baseX = 0,
			baseY = 0;
		let mxNorm = 0,
			myNorm = 0;

		const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));

		const measure = () => {
			const sw = stage!.clientWidth;
			const sh = stage!.clientHeight;
			const pw = plane!.scrollWidth;
			const ph = plane!.scrollHeight;
			maxX = Math.max(0, (pw - sw) / 2 + 60);
			maxY = Math.max(0, (ph - sh) / 2 + 60);
		};
		measure();
		window.addEventListener('resize', measure);

		const onMove = (e: PointerEvent) => {
			if (dragging) {
				const dx = e.clientX - startX;
				const dy = e.clientY - startY;
				moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
				tx = clamp(baseX + dx, maxX);
				ty = clamp(baseY + dy, maxY);
			} else {
				const r = stage!.getBoundingClientRect();
				mxNorm = ((e.clientX - r.left) / r.width - 0.5) * 2;
				myNorm = ((e.clientY - r.top) / r.height - 0.5) * 2;
			}
		};
		const onDown = (e: PointerEvent) => {
			dragging = true;
			moved = 0;
			startX = e.clientX;
			startY = e.clientY;
			baseX = tx;
			baseY = ty;
			stage!.setPointerCapture?.(e.pointerId);
			stage!.classList.add('dragging');
		};
		const onUp = () => {
			dragging = false;
			stage!.classList.remove('dragging');
		};
		// Empêche la navigation si on a glissé (drag) plutôt que cliqué.
		const onClickCapture = (e: MouseEvent) => {
			if (moved > 8) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		stage.addEventListener('pointermove', onMove, { passive: true });
		stage.addEventListener('pointerdown', onDown);
		window.addEventListener('pointerup', onUp);
		stage.addEventListener('click', onClickCapture, true);

		let raf = 0;
		const loop = () => {
			if (!dragging && !reduce) {
				// le plan suit la souris (déplacement inverse pour explorer)
				tx += (-mxNorm * maxX - tx) * 0.05;
				ty += (-myNorm * maxY - ty) * 0.05;
			}
			cx += (tx - cx) * 0.12;
			cy += (ty - cy) * 0.12;
			if (plane) plane.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		return () => {
			window.removeEventListener('resize', measure);
			stage?.removeEventListener('pointermove', onMove);
			stage?.removeEventListener('pointerdown', onDown);
			window.removeEventListener('pointerup', onUp);
			stage?.removeEventListener('click', onClickCapture, true);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div bind:this={stage} class="stage">
	<div bind:this={plane} class="plane">
		{#each columns as col, c (c)}
			<div class="col" style="--off:{colOffset[c]}">
				{#each col as p (p.slug)}
					<a
						href={`/realisations/${p.slug}`}
						class="tile"
						style="--c:{p.color}; --ar:{p.ar}"
						data-cursor
						draggable="false"
					>
						<div class="tile-img"><span>{p.title}</span></div>
						<span class="tile-label">{p.title} <em>— {p.tag}</em></span>
					</a>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.stage {
		position: absolute;
		inset: 0;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: grab;
		touch-action: none;
	}
	.stage:global(.dragging) {
		cursor: grabbing;
	}
	.plane {
		display: flex;
		gap: clamp(1rem, 2.2vw, 2.2rem);
		padding: 10vh 6vw;
		will-change: transform;
	}
	.col {
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2.2vw, 2.2rem);
		transform: translateY(var(--off, 0));
	}
	.tile {
		position: relative;
		display: block;
		width: clamp(200px, 19vw, 340px);
		user-select: none;
		-webkit-user-drag: none;
	}
	.tile-img {
		display: grid;
		place-items: center;
		aspect-ratio: var(--ar, 4 / 5);
		overflow: hidden;
		border-radius: 12px;
		background: linear-gradient(145deg, color-mix(in srgb, var(--c) 52%, #08070b), #08070b 88%);
		transition:
			transform 0.6s var(--ease-out-expo),
			box-shadow 0.5s ease;
	}
	.tile-img span {
		padding: 0 1rem;
		font-family: var(--font-display);
		font-size: clamp(1rem, 1.4vw, 1.4rem);
		letter-spacing: 0.03em;
		text-align: center;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--color-cream) 84%, transparent);
		transition: transform 0.6s var(--ease-out-expo);
	}
	.tile:hover .tile-img {
		transform: scale(1.04);
		box-shadow: 0 24px 60px -20px color-mix(in srgb, var(--c) 60%, transparent);
	}
	.tile:hover .tile-img span {
		transform: scale(1.06);
	}
	.tile-label {
		display: block;
		margin-top: 0.7rem;
		font-family: var(--font-sans);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: color-mix(in srgb, var(--color-cream) 70%, transparent);
		opacity: 0;
		transform: translateY(4px);
		transition:
			opacity 0.4s ease,
			transform 0.4s var(--ease-out-expo);
	}
	.tile:hover .tile-label {
		opacity: 1;
		transform: translateY(0);
	}
	.tile-label em {
		font-style: normal;
		color: var(--c);
	}
	@media (prefers-reduced-motion: reduce) {
		.stage {
			overflow: auto;
		}
	}
</style>
