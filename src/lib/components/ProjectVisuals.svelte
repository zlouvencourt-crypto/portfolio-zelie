<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import Video from '$components/Video.svelte';
	import { reveal } from '$utils/reveal';
	import type { GalleryItem } from '$lib/content/types';

	type Props = { items: GalleryItem[] };
	let { items }: Props = $props();

	// Regroupe les visuels par "section" en respectant l'ordre (groupes contigus).
	// Sans section, tout va dans un seul groupe sans titre.
	type Group = { section?: string; items: GalleryItem[] };
	const groups = $derived<Group[]>(
		(items ?? []).reduce<Group[]>((acc, item) => {
			const last = acc[acc.length - 1];
			if (last && last.section === item.section) last.items.push(item);
			else acc.push({ section: item.section, items: [item] });
			return acc;
		}, [])
	);

	const two = (n: number) => String(n).padStart(2, '0');
</script>

{#if groups.length}
	<div class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
		{#each groups as group, gi (gi)}
			<section class="container-page py-12 md:py-16">
				{#if group.section}
					<div class="mb-8 md:mb-12" use:reveal>
						<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
							— Sélection {two(gi + 1)}
						</p>
						<h2 class="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium uppercase leading-[0.95]">
							{group.section}
						</h2>
					</div>
				{/if}

				<div class="masonry">
					{#each group.items as item, ii (ii)}
						<figure class="masonry-item group" use:reveal>
							{#if item.video}
								<Video
									src={item.src}
									poster={item.poster}
									ariaLabel={item.alt || ''}
									class="block w-full"
								/>
							{:else}
								<Picture
									src={item.src}
									alt={item.alt || ''}
									loading="lazy"
									class="block w-full transition-opacity duration-500 group-hover:opacity-90"
								/>
							{/if}
							{#if item.caption}
								<figcaption class="mt-3 font-display-italic text-sm text-[color:var(--color-ink)]/55">
									{item.caption}
								</figcaption>
							{/if}
						</figure>
					{/each}
				</div>
			</section>
		{/each}
	</div>
{/if}

<style>
	/* Mosaïque (masonry) en colonnes CSS : les visuels gardent leur format naturel
	   et s'imbriquent sans trou ni effet « en escalier », quelle que soit leur taille. */
	.masonry {
		column-count: 1;
		column-gap: 1rem;
	}
	@media (min-width: 640px) {
		.masonry {
			column-count: 2;
		}
	}
	@media (min-width: 1024px) {
		.masonry {
			column-count: 3;
			column-gap: 1.5rem;
		}
	}
	.masonry-item {
		break-inside: avoid;
		margin-bottom: 1rem;
	}
	@media (min-width: 1024px) {
		.masonry-item {
			margin-bottom: 1.5rem;
		}
	}
</style>
