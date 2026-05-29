<script lang="ts">
	import type { GalleryItem } from '$lib/content/types';

	type Props = { items: GalleryItem[] };
	let { items }: Props = $props();

	let lightboxItem = $state<GalleryItem | null>(null);

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

</script>

<svelte:window on:keydown={onKey} />

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
						<!-- COLLAGE MASONRY -->
						<div class="columns-2 gap-3 lg:columns-3">
							{#each group.items as item, i (i)}
								<figure class="mb-3 break-inside-avoid">
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
