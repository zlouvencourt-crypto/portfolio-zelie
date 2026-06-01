<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import Video from '$components/Video.svelte';
	import { reveal } from '$utils/reveal';
	import type { ProjectMeta } from '$lib/content/projects';
	import type { GalleryItem } from '$lib/content/types';

	type Props = { meta: ProjectMeta };
	let { meta }: Props = $props();

	// ————— Blocs de texte (titre sans + contenu) —————
	type TextBlock =
		| { kind: 'para'; heading: string; text: string }
		| { kind: 'list'; heading: string; entries: [string, string][] }
		| { kind: 'livr'; heading: string; livrables?: string[]; contraintes?: string | string[] };

	const objectifLabel = (k: string) => k[0].toUpperCase() + k.slice(1);
	const cibleLabel = (k: string): string => {
		if (k === 'principale') return 'Cible principale';
		if (k === 'coeur') return 'Cœur de cible';
		if (k === 'secondaire') return 'Cible secondaire';
		return k;
	};

	const textBlocks = $derived<TextBlock[]>(
		(() => {
			const tb: TextBlock[] = [];
			if (meta.contexte) tb.push({ kind: 'para', heading: "L'histoire", text: meta.contexte });
			if (meta.brief) tb.push({ kind: 'para', heading: 'Le brief', text: meta.brief });
			const obj = meta.objectifs
				? (Object.entries(meta.objectifs) as [string, string][]).filter(([, v]) => !!v)
				: [];
			if (obj.length) tb.push({ kind: 'list', heading: 'Les objectifs', entries: obj });
			if (meta.direction) tb.push({ kind: 'para', heading: 'Direction artistique', text: meta.direction });
			const cib = meta.cibles
				? (Object.entries(meta.cibles) as [string, string][]).filter(([, v]) => !!v)
				: [];
			if (cib.length) tb.push({ kind: 'list', heading: "À qui s'adresse-t-on", entries: cib });
			if (meta.livrables?.length || meta.contraintes)
				tb.push({ kind: 'livr', heading: 'La production', livrables: meta.livrables, contraintes: meta.contraintes });
			return tb;
		})()
	);

	// ————— Assemblage des chapitres (façon Sage) —————
	type Chapter =
		| { type: 'split'; text: TextBlock; image: GalleryItem | null; reverse: boolean }
		| { type: 'gallery'; images: GalleryItem[] }
		| { type: 'mark'; word: string; images: GalleryItem[] };

	const markWord = $derived(meta.tags?.[0] ?? meta.client?.split(',')[0]?.trim() ?? '');

	const chapters = $derived<Chapter[]>(
		(() => {
			const texts = textBlocks;
			const visuals = meta.gallery ?? [];
			const out: Chapter[] = [];
			let vi = 0;
			texts.forEach((t, i) => {
				const image = vi < visuals.length ? visuals[vi++] : null;
				out.push({ type: 'split', text: t, image, reverse: i % 2 === 1 });
			});
			// Visuels restants → groupes de 3 (avec un mot géant en filigrane au milieu)
			const leftover = visuals.slice(vi);
			const groups: GalleryItem[][] = [];
			for (let k = 0; k < leftover.length; k += 3) groups.push(leftover.slice(k, k + 3));
			const markIndex = groups.length ? Math.floor((groups.length - 1) / 2) : -1;
			groups.forEach((g, gi) => {
				if (gi === markIndex && markWord) out.push({ type: 'mark', word: markWord, images: g });
				else out.push({ type: 'gallery', images: g });
			});
			return out;
		})()
	);

	const colsClass = (n: number) => (n >= 3 ? 'sm:grid-cols-3' : n === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1');
</script>

{#snippet textBody(block: TextBlock)}
	<h2 class="font-sans text-[clamp(1.6rem,2.8vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.01em] text-[color:var(--color-ink)]">
		{block.heading}
	</h2>
	{#if block.kind === 'para'}
		<p class="mt-6 max-w-[46ch] font-sans text-[0.975rem] leading-[1.85] text-[color:var(--color-ink)]/60">
			{block.text}
		</p>
	{:else if block.kind === 'list'}
		<div class="mt-7 space-y-5">
			{#each block.entries as [k, v] (k)}
				<div class="max-w-[46ch]">
					<p class="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink)]/80">
						{block.heading === 'Les objectifs' ? objectifLabel(k) : cibleLabel(k)}
					</p>
					<p class="mt-1.5 font-sans text-[0.95rem] leading-[1.7] text-[color:var(--color-ink)]/60">{v}</p>
				</div>
			{/each}
		</div>
	{:else}
		<div class="mt-7 grid gap-8 {block.contraintes ? 'sm:grid-cols-2' : 'sm:grid-cols-1'}">
			{#if block.livrables?.length}
				<div>
					<p class="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink)]/80">Livrés</p>
					<ul class="mt-4 space-y-2.5">
						{#each block.livrables as l (l)}
							<li class="font-sans text-[0.95rem] leading-[1.5] text-[color:var(--color-ink)]/60">{l}</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if block.contraintes}
				<div>
					<p class="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink)]/80">Contraintes</p>
					{#if Array.isArray(block.contraintes)}
						<ul class="mt-4 space-y-2.5">
							{#each block.contraintes as c (c)}
								<li class="font-sans text-[0.95rem] leading-[1.5] text-[color:var(--color-ink)]/60">{c}</li>
							{/each}
						</ul>
					{:else}
						<p class="mt-4 font-sans text-[0.95rem] leading-[1.7] text-[color:var(--color-ink)]/60">{block.contraintes}</p>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
{/snippet}

{#snippet visual(item: GalleryItem, klass: string)}
	{#if item.video}
		<Video src={item.src} poster={item.poster} ariaLabel={item.alt || ''} class={klass} />
	{:else}
		<Picture src={item.src} alt={item.alt || ''} loading="lazy" class={klass} />
	{/if}
{/snippet}

<div class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	{#each chapters as chapter, ci (ci)}
		{#if chapter.type === 'split'}
			<section class="container-page py-14 md:py-24" use:reveal>
				{#if chapter.image}
					<div class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
						<div class={chapter.reverse ? 'md:order-2' : ''}>
							{@render textBody(chapter.text)}
						</div>
						<figure class={chapter.reverse ? 'md:order-1' : ''}>
							{@render visual(chapter.image, 'block w-full')}
						</figure>
					</div>
				{:else}
					<div class="max-w-2xl">
						{@render textBody(chapter.text)}
					</div>
				{/if}
			</section>

		{:else if chapter.type === 'gallery'}
			<section class="container-page py-8 md:py-12" use:reveal>
				<div class="grid grid-cols-1 gap-4 {colsClass(chapter.images.length)} md:gap-6">
					{#each chapter.images as item (item.src)}
						<figure class="relative overflow-hidden" style:aspect-ratio={chapter.images.length === 1 ? (item.ratio ?? '16/10') : '3/4'}>
							{@render visual(item, 'absolute inset-0 h-full w-full object-cover')}
						</figure>
					{/each}
				</div>
			</section>

		{:else}
			<section class="relative overflow-hidden py-16 md:py-28" use:reveal>
				<p
					class="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display lowercase leading-none text-[color:var(--color-ink)]/[0.07]"
					style="font-size: clamp(5rem, 22vw, 20rem);"
					aria-hidden="true"
				>
					{chapter.word}
				</p>
				<div class="container-page relative">
					<div class="mx-auto grid max-w-4xl grid-cols-1 gap-4 {colsClass(chapter.images.length)} md:gap-6">
						{#each chapter.images as item (item.src)}
							<figure class="relative overflow-hidden" style:aspect-ratio="3/4">
								{@render visual(item, 'absolute inset-0 h-full w-full object-cover')}
							</figure>
						{/each}
					</div>
				</div>
			</section>
		{/if}
	{/each}
</div>
