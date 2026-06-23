<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$utils/motion';
	import { projects } from '$content/projects';

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
		{#each projects as p (p.slug)}
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
							loading="lazy"
							draggable="false"
						/>
					</picture>
				{:else}
					<div class="tile-ph"><span>{p.title}</span></div>
				{/if}
				<div class="tile-overlay">
					<span class="tile-name">{p.title}</span>
					<span class="tile-tag">{p.tag}</span>
				</div>
			</a>
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
	.plane {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-auto-rows: 46vh;
		width: 132vw;
		will-change: transform;
	}
	.tile {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
		user-select: none;
		-webkit-user-drag: none;
	}
	.tile-media,
	.tile-ph {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.tile-media {
		object-fit: cover;
		transition: transform 0.7s var(--ease-out-expo);
	}
	.tile-ph {
		display: grid;
		place-items: center;
		background: linear-gradient(145deg, color-mix(in srgb, var(--c) 48%, #08070b), #08070b 88%);
	}
	.tile-ph span {
		padding: 0 1rem;
		font-family: var(--font-display);
		font-size: clamp(1rem, 1.5vw, 1.5rem);
		letter-spacing: 0.03em;
		text-align: center;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--color-cream) 84%, transparent);
	}
	/* léger assombrissement constant pour l'unité de la grille */
	.tile::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(8, 7, 11, 0.18);
		opacity: 1;
		transition: opacity 0.5s ease;
		pointer-events: none;
	}
	.tile:hover::after {
		opacity: 0;
	}
	.tile:hover .tile-media {
		transform: scale(1.06);
	}
	.tile-overlay {
		position: absolute;
		inset: auto 0 0 0;
		z-index: 1;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 1.1rem 1.2rem;
		background: linear-gradient(to top, rgba(8, 7, 11, 0.78), transparent);
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
		font-size: clamp(1rem, 1.4vw, 1.5rem);
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
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-auto-rows: 38vh;
			width: 150vw;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.stage {
			overflow: auto;
		}
	}
</style>
