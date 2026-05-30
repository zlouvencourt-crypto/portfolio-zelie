<script lang="ts">
	import type { GalleryItem } from '$lib/content/types';

	type Props = { items: GalleryItem[] };
	let { items }: Props = $props();

	let lightboxItem = $state<GalleryItem | null>(null);
	let trackEl = $state<HTMLDivElement | null>(null);
	let currentIndex = $state(0);

	const openLightbox = (item: GalleryItem) => {
		if (item.video) return;
		lightboxItem = item;
	};
	const closeLightbox = () => {
		lightboxItem = null;
	};
	const onKey = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && lightboxItem) closeLightbox();
	};

	const scrollByOne = (dir: 1 | -1) => {
		if (!trackEl) return;
		const step = trackEl.clientWidth * 0.65;
		trackEl.scrollBy({ left: dir * step, behavior: 'smooth' });
	};

	const onScroll = () => {
		if (!trackEl) return;
		const children = Array.from(trackEl.children) as HTMLElement[];
		const center = trackEl.scrollLeft + trackEl.clientWidth / 2;
		let nearest = 0;
		let minDist = Infinity;
		for (let i = 0; i < children.length; i++) {
			const c = children[i];
			const cCenter = c.offsetLeft + c.offsetWidth / 2;
			const d = Math.abs(cCenter - center);
			if (d < minDist) {
				minDist = d;
				nearest = i;
			}
		}
		currentIndex = nearest;
	};
</script>

<svelte:window on:keydown={onKey} />

{#if items.length}
	<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
		<div class="pt-20 pb-16 md:pt-28 md:pb-24">
			<!-- HEADER -->
			<div class="container-page flex flex-wrap items-end justify-between gap-6 pb-10">
				<div>
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
						— La galerie
					</p>
					<h2 class="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium uppercase leading-[0.95]">
						Les <span class="font-display-italic normal-case">visuels</span>
					</h2>
				</div>
				<span class="font-display-italic text-base text-[color:var(--color-ink)]/65 tabular-nums">
					{String(currentIndex + 1).padStart(2, '0')} <span class="text-[color:var(--color-ink)]/30">/</span> {String(items.length).padStart(2, '0')}
				</span>
			</div>

			<!-- TRACK -->
			<div
				bind:this={trackEl}
				onscroll={onScroll}
				class="carousel-track flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-6 md:gap-6"
				style="padding-left: var(--spacing-page); padding-right: var(--spacing-page);"
			>
				{#each items as item, i (i)}
					<figure class="flex shrink-0 snap-center flex-col">
						<div class="h-[55vh] md:h-[75vh]">
							{#if item.video}
								<video
									src={item.src}
									poster={item.poster}
									muted
									loop
									playsinline
									autoplay
									class="block h-full w-auto"
								></video>
							{:else}
								<button
									type="button"
									onclick={() => openLightbox(item)}
									class="group block h-full cursor-zoom-in p-0 leading-[0]"
									aria-label="Agrandir l'image"
								>
									<img
										src={item.src}
										alt={item.alt || ''}
										class="block h-full w-auto transition-opacity duration-500 group-hover:opacity-85"
										loading="lazy"
									/>
								</button>
							{/if}
						</div>
						{#if item.caption}
							<figcaption class="mt-4 max-w-[42ch] font-display-italic text-sm text-[color:var(--color-ink)]/55">
								{item.caption}
							</figcaption>
						{/if}
					</figure>
				{/each}
			</div>

			<!-- CONTROLS -->
			<div class="container-page mt-10 flex items-center justify-between gap-6">
				<div class="flex items-center gap-3">
					<button
						type="button"
						onclick={() => scrollByOne(-1)}
						class="flex h-12 w-12 items-center justify-center border border-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-bg)]"
						aria-label="Visuel précédent"
					>
						<span aria-hidden="true" class="text-xl leading-none">←</span>
					</button>
					<button
						type="button"
						onclick={() => scrollByOne(1)}
						class="flex h-12 w-12 items-center justify-center border border-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-bg)]"
						aria-label="Visuel suivant"
					>
						<span aria-hidden="true" class="text-xl leading-none">→</span>
					</button>
				</div>
				<p class="hidden font-display-italic text-sm text-[color:var(--color-ink)]/55 sm:block">
					Faites défiler pour explorer
				</p>
			</div>
		</div>
	</section>
{/if}

{#if lightboxItem}
	<div
		class="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
		role="dialog"
		aria-modal="true"
		aria-label="Image agrandie"
	>
		<button
			type="button"
			onclick={closeLightbox}
			class="absolute inset-0 cursor-zoom-out"
			aria-label="Fermer"
		></button>

		<button
			type="button"
			onclick={closeLightbox}
			class="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-black"
			aria-label="Fermer"
		>
			<span aria-hidden="true" class="text-lg leading-none">×</span>
		</button>

		<img
			src={lightboxItem.src}
			alt={lightboxItem.alt || ''}
			class="relative z-[5] max-h-[90vh] max-w-[95vw] object-contain"
		/>
	</div>
{/if}

<style>
	.carousel-track {
		scrollbar-width: none;
	}
	.carousel-track::-webkit-scrollbar {
		display: none;
	}
</style>
