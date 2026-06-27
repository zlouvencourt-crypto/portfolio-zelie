<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$utils/motion';
	import { projects } from '$content/projects';

	const COLS = 3;
	// rapport hauteur/largeur de repli pour les projets sans image
	const fallback = [0.75, 1, 0.8, 1.25, 0.66, 1];

	// chaque tuile garde son format ; on l'ajoute à la colonne la plus courte
	// (masonry équilibrée) pour bien remplir l'espace.
	const tiles = projects.map((p, i) => ({
		...p,
		ratio: p.cover && p.w && p.h ? p.h / p.w : fallback[i % fallback.length]
	}));
	const columns: (typeof tiles)[] = Array.from({ length: COLS }, () => []);
	const heights = Array(COLS).fill(0);
	for (const t of tiles) {
		let m = 0;
		for (let c = 1; c < COLS; c++) if (heights[c] < heights[m]) m = c;
		columns[m].push(t);
		heights[m] += t.ratio;
	}

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
			maxX = Math.max(0, (pw - sw) / 2);
			maxY = Math.max(0, (ph - sh) / 2);
		};
		measure();
		window.addEventListener('resize', measure);
		plane.querySelectorAll('img').forEach((img) => {
			if (!img.complete) img.addEventListener('load', measure, { once: true });
		});

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
				tx += (-mxNorm * maxX - tx) * 0.05;
				ty += (-myNorm * maxY - ty) * 0.05;
			}
			cx += (tx - cx) * 0.12;
			cy += (ty - cy) * 0.12;
			if (plane) plane.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		const onVis = () => {
			cancelAnimationFrame(raf);
			if (!document.hidden) raf = requestAnimationFrame(loop);
		};
		document.addEventListener('visibilitychange', onVis);

		return () => {
			window.removeEventListener('resize', measure);
			stage?.removeEventListener('pointermove', onMove);
			stage?.removeEventListener('pointerdown', onDown);
			window.removeEventListener('pointerup', onUp);
			stage?.removeEventListener('click', onClickCapture, true);
			document.removeEventListener('visibilitychange', onVis);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div bind:this={stage} class="stage">
	<div bind:this={plane} class="plane">
		{#each columns as col, c (c)}
			<div class="col">
				{#each col as p (p.slug)}
					<a
						href={`/realisations/${p.slug}`}
						class="tile"
						style="--c:{p.color}"
						data-cursor
						draggable="false"
					>
						{#if p.cover}
							<picture>
								<source srcset={`${p.cover}.avif`} type="image/avif" />
								<source srcset={`${p.cover}.webp`} type="image/webp" />
								<img
									class="tile-media"
									src={`${p.cover}.jpg`}
									alt={p.title}
									width={p.w}
									height={p.h}
									loading="lazy"
									decoding="async"
									draggable="false"
								/>
							</picture>
						{:else}
							<div class="tile-ph" style="aspect-ratio:{(1 / p.ratio).toFixed(4)}">
								<span>{p.title}</span>
							</div>
						{/if}
						<div class="tile-overlay">
							<span class="tile-name">{p.title}</span>
							<span class="tile-tag">{p.tag}</span>
						</div>
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
		background: var(--color-black);
	}
	.stage:global(.dragging) {
		cursor: grabbing;
	}
	/* masonry : colonnes alignées en haut, images dans leur format, sans vide */
	.plane {
		display: flex;
		align-items: flex-start;
		gap: 0;
		width: 120vw;
		will-change: transform;
	}
	.col {
		display: flex;
		flex: 1 1 0;
		min-width: 0;
		flex-direction: column;
		gap: 0;
	}
	.tile {
		position: relative;
		display: block;
		width: 100%;
		overflow: hidden;
		user-select: none;
		-webkit-user-drag: none;
	}
	.tile-media {
		display: block;
		width: 100%;
		height: auto;
		max-width: none;
		transition: transform 0.7s var(--ease-out-expo);
	}
	.tile-ph {
		display: grid;
		place-items: center;
		width: 100%;
		background: linear-gradient(145deg, color-mix(in srgb, var(--c) 48%, #08070b), #08070b 88%);
	}
	.tile-ph span {
		padding: 0 1rem;
		font-family: var(--font-display);
		font-size: clamp(1rem, 1.5vw, 1.7rem);
		letter-spacing: 0.03em;
		text-align: center;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--color-cream) 84%, transparent);
	}
	.tile::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(8, 7, 11, 0.2);
		transition: opacity 0.5s ease;
		pointer-events: none;
	}
	.tile:hover::after {
		opacity: 0;
	}
	.tile:hover .tile-media {
		transform: scale(1.05);
	}
	.tile-overlay {
		position: absolute;
		inset: auto 0 0 0;
		z-index: 1;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 1.2rem 1.3rem;
		background: linear-gradient(to top, rgba(8, 7, 11, 0.85), transparent);
		opacity: 0;
		transform: translateY(10px);
		transition:
			opacity 0.4s ease,
			transform 0.5s var(--ease-out-expo);
	}
	.tile:hover .tile-overlay {
		opacity: 1;
		transform: translateY(0);
	}
	.tile-name {
		font-family: var(--font-display);
		font-size: clamp(1rem, 1.4vw, 1.6rem);
		line-height: 1;
		text-transform: uppercase;
	}
	.tile-tag {
		font-family: var(--font-sans);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		white-space: nowrap;
		color: var(--c);
	}
	@media (max-width: 768px) {
		.plane {
			width: 165vw;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.stage {
			overflow: auto;
		}
	}
</style>
