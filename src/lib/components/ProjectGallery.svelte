<script lang="ts">
	import type { GalleryItem } from '$lib/content/types';

	type Props = { items: GalleryItem[] };
	let { items }: Props = $props();

	let lightboxItem = $state<GalleryItem | null>(null);
	let innerWidth = $state(1200);

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

	const numCols = $derived(innerWidth >= 1024 ? 3 : innerWidth >= 640 ? 2 : 1);

	type Group = { label: string | null; items: GalleryItem[] };
	const groups: Group[] = $derived.by(() => {
		const list: Group[] = [];
		let current: Group | null = null;
		for (const item of items) {
			const label = item.section ?? null;
			if (!current || current.label !== label) {
				current = { label, items: [] };
				list.push(current);
			}
			current.items.push(item);
		}
		return list;
	});

	// Vraie répartition masonry : chaque image va dans la colonne la plus courte.
	const itemHeight = (item: GalleryItem): number => {
		const [w, h] = (item.ratio ?? '4/5').split('/').map(Number);
		if (!w || !h) return 1.25;
		return h / w;
	};

	const distribute = (list: GalleryItem[], cols: number): GalleryItem[][] => {
		const columns: GalleryItem[][] = Array.from({ length: cols }, () => []);
		const heights = new Array(cols).fill(0);
		for (const item of list) {
			let shortest = 0;
			for (let c = 1; c < cols; c++) {
				if (heights[c] < heights[shortest]) shortest = c;
			}
			columns[shortest].push(item);
			heights[shortest] += itemHeight(item);
		}
		return columns;
	};
</script>

<svelte:window on:keydown={onKey} bind:innerWidth />

{#if items.length}
	<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
		<div class="container-page py-24">
			<p class="eyebrow text-center text-[color:var(--color-wine)]">La galerie</p>

			<div class="mt-20 space-y-28">
				{#each groups as group, gi (gi)}
					<div>
						{#if group.label}
							<div class="mb-12 text-center">
								<p class="eyebrow text-[color:var(--color-ink)]/55">— Chapitre {String(gi + 1).padStart(2, '0')} —</p>
								<h3 class="mt-4 font-display-italic text-[clamp(1.75rem,3.5vw,3rem)] font-normal leading-tight text-[color:var(--color-ink)]">
									{group.label}
								</h3>
							</div>
						{/if}

						<!-- MASONRY : colonnes équilibrées -->
						<div class="flex items-start gap-3">
							{#each distribute(group.items, numCols) as column (column)}
								<div class="flex flex-1 flex-col gap-3">
									{#each column as item, i (i)}
										<figure>
											{#if item.video}
												<video
													src={item.src}
													poster={item.poster}
													muted
													loop
													playsinline
													autoplay
													class="block h-auto w-full align-top"
												></video>
											{:else}
												<button
													type="button"
													onclick={() => openLightbox(item)}
													class="group block w-full cursor-zoom-in p-0 leading-[0]"
													aria-label="Agrandir l'image"
												>
													<img
														src={item.src}
														alt={item.alt || ''}
														class="block h-auto w-full align-top transition-opacity duration-500 group-hover:opacity-85"
														loading="lazy"
													/>
												</button>
											{/if}
											{#if item.caption}
												<figcaption class="mt-2 text-center font-display-italic text-sm text-[color:var(--color-ink)]/55">
													{item.caption}
												</figcaption>
											{/if}
										</figure>
									{/each}
								</div>
							{/each}
						</div>
					</div>
				{/each}
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
