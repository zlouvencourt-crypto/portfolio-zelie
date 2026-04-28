<script lang="ts">
	import type { GalleryItem } from '$lib/content/types';
	import ImageReveal from './ImageReveal.svelte';

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

	const spanClass = (span?: number): string => {
		const n = span ?? 6;
		const safe = Math.min(12, Math.max(1, n));
		const map: Record<number, string> = {
			12: 'md:col-span-12',
			11: 'md:col-span-11',
			10: 'md:col-span-10',
			9: 'md:col-span-9',
			8: 'md:col-span-8',
			7: 'md:col-span-7',
			6: 'md:col-span-6',
			5: 'md:col-span-5',
			4: 'md:col-span-4',
			3: 'md:col-span-3',
			2: 'md:col-span-2',
			1: 'md:col-span-1'
		};
		return map[safe];
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
	<section class="bg-[color:var(--color-cream)] text-[color:var(--color-ink)]">
		<div class="container-page section">
			<p class="eyebrow text-[color:var(--color-wine)]">Galerie</p>

			<div class="mt-10 space-y-20">
				{#each groups as group, gi (gi)}
					<div>
						{#if group.label}
							<h3 class="mb-8 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-[color:var(--color-ink)]">
								{group.label}
							</h3>
						{/if}
						<div class="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
							{#each group.items as item, i (i)}
								<div class={`col-span-1 ${spanClass(item.span)}`}>
									{#if item.video}
										<div class="overflow-hidden" style:aspect-ratio={item.ratio ?? '16/9'}>
											<video
												src={item.src}
												poster={item.poster}
												muted
												loop
												playsinline
												autoplay
												class="h-full w-full object-cover"
											></video>
										</div>
									{:else}
										<button
											type="button"
											onclick={() => openLightbox(item)}
											class="group block w-full cursor-zoom-in overflow-hidden p-0 text-left"
											aria-label="Agrandir l'image"
										>
											<div class="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]">
												<ImageReveal
													src={item.src}
													alt={item.alt || ''}
													ratio={item.ratio ?? '4/5'}
													parallax={2}
												/>
											</div>
										</button>
									{/if}
									{#if item.caption}
										<p class="mt-3 font-sans text-sm font-light text-[color:var(--color-ink)]/70">
											{item.caption}
										</p>
									{/if}
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
