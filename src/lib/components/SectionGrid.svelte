<script lang="ts">
	import ImageReveal from '$components/ImageReveal.svelte';
	import Video from '$components/Video.svelte';
	import type { GalleryItem } from '$lib/content/types';

	type Props = { items: GalleryItem[] };
	let { items }: Props = $props();

	// Regroupe les visuels par "section" en respectant l'ordre (groupes contigus).
	// Les projets sans section donnent un seul groupe sans titre.
	type Group = { section?: string; items: GalleryItem[] };
	const groups = $derived<Group[]>(
		(items ?? []).reduce<Group[]>((acc, item) => {
			const last = acc[acc.length - 1];
			if (last && last.section === item.section) last.items.push(item);
			else acc.push({ section: item.section, items: [item] });
			return acc;
		}, [])
	);

	// Tailwind v4 : classes LITTÉRALES obligatoires (jamais `md:col-span-${n}`).
	const SPAN: Record<number, string> = {
		1: 'md:col-span-1',
		2: 'md:col-span-2',
		3: 'md:col-span-3',
		4: 'md:col-span-4',
		5: 'md:col-span-5',
		6: 'md:col-span-6',
		7: 'md:col-span-7',
		8: 'md:col-span-8',
		9: 'md:col-span-9',
		10: 'md:col-span-10',
		11: 'md:col-span-11',
		12: 'md:col-span-12'
	};
	const spanClass = (s?: number) => SPAN[s ?? 12] ?? SPAN[12];
	const two = (n: number) => String(n).padStart(2, '0');
</script>

{#if groups.length}
	<div class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
		{#each groups as group, gi (gi)}
			<section class="container-page py-14 md:py-20">
				{#if group.section}
					<div class="mb-10">
						<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
							— Sélection {two(gi + 1)}
						</p>
						<h2 class="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium uppercase leading-[0.95]">
							{group.section}
						</h2>
					</div>
				{/if}

				<div class="grid grid-cols-12 gap-x-4 gap-y-10 md:gap-x-6">
					{#each group.items as item, ii (ii)}
						<figure class="col-span-12 {spanClass(item.span)}">
							{#if item.video}
								<div class="relative overflow-hidden" style:aspect-ratio={item.ratio ?? '9/16'}>
									<Video
										src={item.src}
										poster={item.poster}
										ariaLabel={item.alt || ''}
										class="absolute inset-0 h-full w-full object-cover"
									/>
								</div>
							{:else}
								<ImageReveal
									src={item.src}
									alt={item.alt || ''}
									ratio={item.ratio ?? '4/5'}
									class="[&_img]:object-cover"
								/>
							{/if}

							{#if item.caption}
								<figcaption class="mt-3 max-w-[42ch] font-display-italic text-sm text-[color:var(--color-ink)]/55">
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
