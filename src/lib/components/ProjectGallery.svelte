<script lang="ts">
	import type { GalleryItem } from '$lib/content/types';
	import ImageReveal from './ImageReveal.svelte';

	type Props = { items: GalleryItem[] };
	let { items }: Props = $props();

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

	const groups = $derived<Group[]>(() => {
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

{#if items.length}
	<section class="bg-[color:var(--color-cream)] text-[color:var(--color-ink)]">
		<div class="container-page section">
			<p class="eyebrow text-[color:var(--color-wine)]">Galerie</p>

			<div class="mt-10 space-y-20">
				{#each groups() as group, gi (gi)}
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
										<ImageReveal
											src={item.src}
											alt={item.alt || ''}
											ratio={item.ratio ?? '4/5'}
											parallax={2}
										/>
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
