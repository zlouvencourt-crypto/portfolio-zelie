<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal, accent } from '$utils/scroll';
	import { prefersReducedMotion, isTouch } from '$utils/motion';
	import { projects } from '$content/projects';

	let hovered = $state<number | null>(null);
	let preview = $state<HTMLDivElement | null>(null);

	onMount(() => {
		if (isTouch() || prefersReducedMotion() || !preview) return;
		let tx = window.innerWidth / 2;
		let ty = window.innerHeight / 2;
		let cx = tx;
		let cy = ty;
		const move = (e: PointerEvent) => {
			tx = e.clientX;
			ty = e.clientY;
		};
		window.addEventListener('pointermove', move, { passive: true });
		let raf = 0;
		const loop = () => {
			cx += (tx - cx) * 0.14;
			cy += (ty - cy) * 0.14;
			if (preview) preview.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			window.removeEventListener('pointermove', move);
			cancelAnimationFrame(raf);
		};
	});
</script>

<svelte:head><title>Réalisations — WEXX OI</title></svelte:head>

<!-- ░░░░░░░░ EN-TÊTE ░░░░░░░░ -->
<header class="container-page pb-[10vh] pt-[24vh]" use:accent={'#ff3d6e'}>
	<p class="eyebrow text-[color:var(--color-cream)]/50">[ Réalisations ]</p>
	<h1 class="mt-7 max-w-[16ch] font-display text-[length:var(--text-giant)]" use:reveal>
		Des événements qu’on n’oublie pas.
	</h1>
	<p
		class="mt-8 max-w-[52ch] text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.7] text-[color:var(--color-cream)]/70"
		use:reveal={{ y: 30, delay: 0.1 }}
	>
		Festivals, marques, institutions, artistes — une sélection de projets imaginés et produits à
		La Réunion et au-delà.
	</p>
</header>

<!-- ░░░░░░░░ LISTE DES PROJETS ░░░░░░░░ -->
<section class="container-page pb-32" onpointerleave={() => (hovered = null)}>
	<div class="border-t border-white/10">
		{#each projects as p, i (p.slug)}
			<a
				href={`/realisations/${p.slug}`}
				class="work-row group"
				class:dimmed={hovered !== null && hovered !== i}
				style="--c:{p.color}"
				onpointerenter={() => (hovered = i)}
				use:reveal={{ y: 24, delay: Math.min(i * 0.04, 0.32) }}
			>
				<span class="work-index">{String(i + 1).padStart(2, '0')}</span>
				<span class="work-title">{p.title}</span>
				<span class="work-tag">{p.tag}</span>
				<span class="work-arrow" aria-hidden="true">↗</span>
			</a>
		{/each}
	</div>
</section>

<!-- aperçu flottant qui suit la souris -->
<div bind:this={preview} class="work-preview" class:show={hovered !== null} aria-hidden="true">
	{#each projects as p, i (p.slug)}
		<div class="work-preview-img" class:active={hovered === i} style="--c:{p.color}">
			<span>{p.title}</span>
		</div>
	{/each}
</div>

<style>
	.work-row {
		position: relative;
		display: grid;
		grid-template-columns: auto 1fr auto auto;
		align-items: center;
		gap: 1.5rem;
		padding: clamp(1.1rem, 2.4vw, 2.1rem) 0;
		border-bottom: 1px solid color-mix(in srgb, white 10%, transparent);
		transition:
			opacity 0.4s ease,
			border-color 0.4s ease;
	}
	.work-row.dimmed {
		opacity: 0.3;
	}
	.work-row:hover {
		border-color: var(--c);
	}
	.work-index {
		font-size: 0.78rem;
		letter-spacing: 0.1em;
		color: color-mix(in srgb, var(--color-cream) 45%, transparent);
	}
	.work-title {
		font-family: var(--font-display);
		font-size: clamp(2rem, 6vw, 5rem);
		line-height: 0.95;
		text-transform: uppercase;
		transition:
			color 0.4s ease,
			transform 0.55s var(--ease-out-expo);
	}
	.work-row:hover .work-title {
		color: var(--c);
		transform: translateX(1.6rem);
	}
	.work-tag {
		font-size: 0.76rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		white-space: nowrap;
		color: color-mix(in srgb, var(--color-cream) 55%, transparent);
	}
	.work-arrow {
		font-size: 1.3rem;
		color: var(--c);
		opacity: 0;
		transform: translateX(-8px);
		transition:
			opacity 0.4s ease,
			transform 0.4s var(--ease-out-expo);
	}
	.work-row:hover .work-arrow {
		opacity: 1;
		transform: translateX(0);
	}

	.work-preview {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5;
		width: clamp(220px, 22vw, 340px);
		aspect-ratio: 4 / 3;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.4s ease;
		will-change: transform;
	}
	.work-preview.show {
		opacity: 1;
	}
	.work-preview-img {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		overflow: hidden;
		border-radius: 12px;
		background: linear-gradient(140deg, color-mix(in srgb, var(--c) 55%, #08070b), #08070b 85%);
		opacity: 0;
		transform: scale(1.05);
		transition:
			opacity 0.4s ease,
			transform 0.6s var(--ease-out-expo);
	}
	.work-preview-img.active {
		opacity: 1;
		transform: scale(1);
	}
	.work-preview-img span {
		padding: 0 1rem;
		font-family: var(--font-display);
		font-size: 1.1rem;
		letter-spacing: 0.04em;
		text-align: center;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--color-cream) 82%, transparent);
	}

	@media (max-width: 640px) {
		.work-row {
			grid-template-columns: 1fr auto;
			gap: 0.75rem;
		}
		.work-index,
		.work-arrow {
			display: none;
		}
		.work-title {
			font-size: 2rem;
		}
	}
</style>
