<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import Video from '$components/Video.svelte';
	import type { GalleryItem } from '$lib/content/types';

	type Props = { items: GalleryItem[] };
	let { items }: Props = $props();

	let trackEl = $state<HTMLDivElement | null>(null);
	let currentIndex = $state(0);

	const scrollByOne = (dir: 1 | -1) => {
		if (!trackEl) return;
		const step = trackEl.clientWidth * 0.7;
		trackEl.scrollBy({ left: dir * step, behavior: 'smooth' });
	};

	const onScroll = () => {
		if (!trackEl) return;
		const children = Array.from(trackEl.children) as HTMLElement[];
		const center = trackEl.scrollLeft + trackEl.clientWidth / 2;
		let nearest = 0;
		let min = Infinity;
		for (let i = 0; i < children.length; i++) {
			const c = children[i];
			const cCenter = c.offsetLeft + c.offsetWidth / 2;
			const d = Math.abs(cCenter - center);
			if (d < min) {
				min = d;
				nearest = i;
			}
		}
		currentIndex = nearest;
	};
</script>

{#if items.length}
	<section class="bg-[color:var(--color-ink)] py-16 text-white md:py-24">
		<!-- En-tête -->
		<div class="container-page flex flex-wrap items-end justify-between gap-6 pb-10">
			<div>
				<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-white/50">
					— La galerie
				</p>
				<h2 class="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1]">
					Tous les visuels
				</h2>
			</div>
			<span class="font-display text-base tabular-nums text-white/70">
				{String(currentIndex + 1).padStart(2, '0')}
				<span class="text-white/30">/</span>
				{String(items.length).padStart(2, '0')}
			</span>
		</div>

		<!-- Piste défilante -->
		<div
			bind:this={trackEl}
			onscroll={onScroll}
			class="carousel-track flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 md:gap-6"
			style="padding-inline: var(--spacing-page);"
		>
			{#each items as item, i (i)}
				<figure class="flex shrink-0 snap-center flex-col">
					<div class="h-[58vh] md:h-[74vh]">
						{#if item.video}
							<Video
								src={item.src}
								poster={item.poster}
								ariaLabel={item.alt || ''}
								class="block h-full w-auto"
							/>
						{:else}
							<Picture src={item.src} alt={item.alt || ''} loading="lazy" class="block h-full w-auto" />
						{/if}
					</div>
					{#if item.caption}
						<figcaption class="mt-4 max-w-[42ch] font-display-italic text-sm text-white/55">
							{item.caption}
						</figcaption>
					{/if}
				</figure>
			{/each}
		</div>

		<!-- Contrôles -->
		<div class="container-page mt-10 flex items-center justify-between gap-6">
			<div class="flex items-center gap-3">
				<button
					type="button"
					onclick={() => scrollByOne(-1)}
					class="flex h-12 w-12 items-center justify-center border border-white/40 transition-colors hover:bg-white hover:text-[color:var(--color-ink)]"
					aria-label="Visuel précédent"
				>
					<span aria-hidden="true" class="text-xl leading-none">←</span>
				</button>
				<button
					type="button"
					onclick={() => scrollByOne(1)}
					class="flex h-12 w-12 items-center justify-center border border-white/40 transition-colors hover:bg-white hover:text-[color:var(--color-ink)]"
					aria-label="Visuel suivant"
				>
					<span aria-hidden="true" class="text-xl leading-none">→</span>
				</button>
			</div>
			<p class="hidden font-display-italic text-sm text-white/55 sm:block">
				Faites défiler pour explorer
			</p>
		</div>
	</section>
{/if}

<style>
	.carousel-track {
		scrollbar-width: none;
	}
	.carousel-track::-webkit-scrollbar {
		display: none;
	}
</style>
