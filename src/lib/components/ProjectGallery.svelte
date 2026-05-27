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

	const widthClass = (item: GalleryItem): string => {
		const ratio = item.ratio ?? '4/5';
		// Heuristique : portrait étroit → narrower max-width
		if (ratio === '9/16' || ratio === '1/2' || ratio === '7/12') return 'max-w-[420px]';
		if (ratio === '2/3' || ratio === '5/7' || ratio === '7/10' || ratio === '5/8') return 'max-w-[560px]';
		if (ratio === '3/4' || ratio === '4/5' || ratio === '7/8' || ratio === '11/12' || ratio === '12/13' || ratio === '9/10') return 'max-w-[680px]';
		if (ratio === '1/1' || ratio === '16/15') return 'max-w-[720px]';
		// Paysage
		if (ratio === '4/3' || ratio === '5/3' || ratio === '6/5' || ratio === '13/10') return 'max-w-[900px]';
		if (ratio === '16/9' || ratio === '16/10' || ratio === '3/2' || ratio === '7/5') return 'max-w-[1000px]';
		// Bandeaux très larges
		if (ratio === '12/5' || ratio === '20/7' || ratio === '23/10' || ratio === '50/9') return 'max-w-[1200px]';
		return 'max-w-[720px]';
	};
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
							<div class="mb-16 text-center">
								<p class="eyebrow text-[color:var(--color-ink)]/55">— Chapitre {String(gi + 1).padStart(2, '0')} —</p>
								<h3 class="mt-4 font-display-italic text-[clamp(1.75rem,3.5vw,3rem)] font-normal leading-tight text-[color:var(--color-ink)]">
									{group.label}
								</h3>
							</div>
						{/if}
						<div class="space-y-20">
							{#each group.items as item, i (i)}
								<figure class={`mx-auto ${widthClass(item)}`}>
									{#if item.video}
										<video
											src={item.src}
											poster={item.poster}
											muted
											loop
											playsinline
											autoplay
											class="block h-auto w-full"
										></video>
									{:else}
										<button
											type="button"
											onclick={() => openLightbox(item)}
											class="group block w-full cursor-zoom-in p-0"
											aria-label="Agrandir l'image"
										>
											<img
												src={item.src}
												alt={item.alt || ''}
												class="block h-auto w-full transition-opacity duration-500 group-hover:opacity-85"
												loading="lazy"
											/>
										</button>
									{/if}
									{#if item.caption}
										<figcaption class="mt-4 text-center font-display-italic text-sm text-[color:var(--color-ink)]/55">
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
