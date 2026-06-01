<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import Video from '$components/Video.svelte';
	import { reveal } from '$utils/reveal';
	import type { ProjectMeta } from '$lib/content/projects';
	import type { GalleryItem } from '$lib/content/types';

	type Props = { meta: ProjectMeta };
	let { meta }: Props = $props();

	// ————— TEXTES (moments du récit) —————
	const objectifsEntries = $derived<[string, string][]>(
		meta.objectifs
			? (Object.entries(meta.objectifs) as [string, string][]).filter(([, v]) => !!v)
			: []
	);
	const ciblesEntries = $derived<[string, string][]>(
		meta.cibles ? (Object.entries(meta.cibles) as [string, string][]).filter(([, v]) => !!v) : []
	);

	const objectifLabel = (k: string) => k[0].toUpperCase() + k.slice(1);
	const cibleLabel = (k: string): string => {
		if (k === 'principale') return 'Cible principale';
		if (k === 'coeur') return 'Cœur de cible';
		if (k === 'secondaire') return 'Cible secondaire';
		return k;
	};

	type Block =
		| { type: 'context'; text: string }
		| { type: 'brief'; text: string }
		| { type: 'objectifs'; entries: [string, string][] }
		| { type: 'cibles'; entries: [string, string][] }
		| { type: 'direction'; text: string }
		| { type: 'livrables'; livrables?: string[]; contraintes?: string | string[] }
		| { type: 'visual'; layout: 'solo' | 'duo'; items: GalleryItem[]; section?: string; sectionStart: boolean };

	const textBlocks = $derived<Block[]>(
		(() => {
			const tb: Block[] = [];
			if (meta.contexte) tb.push({ type: 'context', text: meta.contexte });
			if (meta.brief) tb.push({ type: 'brief', text: meta.brief });
			if (objectifsEntries.length) tb.push({ type: 'objectifs', entries: objectifsEntries });
			if (meta.direction) tb.push({ type: 'direction', text: meta.direction });
			if (ciblesEntries.length) tb.push({ type: 'cibles', entries: ciblesEntries });
			if (meta.livrables?.length || meta.contraintes)
				tb.push({ type: 'livrables', livrables: meta.livrables, contraintes: meta.contraintes });
			return tb;
		})()
	);

	// ————— VISUELS (groupés en solo / duo) —————
	const ratioWH = (r?: string): number => {
		const [a, b] = (r ?? '4/5').split('/').map(Number);
		return a > 0 && b > 0 ? a / b : 0.8;
	};
	const isTall = (it: GalleryItem) => ratioWH(it.ratio) < 1;

	const visualBlocks = $derived<Block[]>(
		(() => {
			const items = meta.gallery ?? [];
			const out: Block[] = [];
			let prevSection: string | undefined | symbol = Symbol('none');
			let i = 0;
			while (i < items.length) {
				const a = items[i];
				const b = items[i + 1];
				const sectionStart = a.section !== prevSection;
				// On apparie deux visuels verticaux de MÊME format et MÊME section :
				// alignés naturellement, sans recadrage ni décrochage.
				if (b && isTall(a) && a.ratio && a.ratio === b.ratio && a.section === b.section) {
					out.push({ type: 'visual', layout: 'duo', items: [a, b], section: a.section, sectionStart });
					i += 2;
				} else {
					out.push({ type: 'visual', layout: 'solo', items: [a], section: a.section, sectionStart });
					i += 1;
				}
				prevSection = a.section;
			}
			return out;
		})()
	);

	// ————— ENTRELACEMENT texte + visuels —————
	const blocks = $derived<Block[]>(
		(() => {
			const texts = textBlocks;
			const visuals = visualBlocks;
			if (!texts.length) return visuals;
			const seq: Block[] = [];
			const perGap = Math.max(1, Math.ceil(visuals.length / texts.length));
			let vi = 0;
			for (const tb of texts) {
				seq.push(tb);
				for (let k = 0; k < perGap && vi < visuals.length; k++) seq.push(visuals[vi++]);
			}
			while (vi < visuals.length) seq.push(visuals[vi++]);
			return seq;
		})()
	);

	const wide = (it: GalleryItem) => !isTall(it);
</script>

<div class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	{#each blocks as block, bi (bi)}
		{#if block.type === 'visual'}
			{#if block.sectionStart && block.section}
				<div class="container-page pt-12 md:pt-20" use:reveal>
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/45">
						— {block.section}
					</p>
				</div>
			{/if}

			{#if block.layout === 'solo'}
				{@const item = block.items[0]}
				<figure class="container-page py-6 md:py-10" use:reveal>
					<div class={wide(item) ? 'mx-auto w-full' : 'mx-auto max-w-2xl'}>
						{#if item.video}
							<Video src={item.src} poster={item.poster} ariaLabel={item.alt || ''} class="block w-full" />
						{:else}
							<Picture src={item.src} alt={item.alt || ''} loading="lazy" class="block w-full" />
						{/if}
					</div>
					{#if item.caption}
						<figcaption class="mx-auto mt-4 max-w-2xl font-display-italic text-sm text-[color:var(--color-ink)]/55">
							{item.caption}
						</figcaption>
					{/if}
				</figure>
			{:else}
				<div class="container-page py-6 md:py-10" use:reveal>
					<div class="grid grid-cols-2 gap-3 md:gap-6">
						{#each block.items as it (it.src)}
							<figure>
								{#if it.video}
									<Video src={it.src} poster={it.poster} ariaLabel={it.alt || ''} class="block w-full" />
								{:else}
									<Picture src={it.src} alt={it.alt || ''} loading="lazy" class="block w-full" />
								{/if}
							</figure>
						{/each}
					</div>
				</div>
			{/if}

		{:else if block.type === 'context'}
			<section class="container-page py-16 md:py-28" use:reveal>
				<p class="mb-6 font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/45">
					— L'histoire
				</p>
				<p class="max-w-[24ch] font-display text-[clamp(1.75rem,4vw,3.5rem)] font-medium leading-[1.1]">
					{block.text}
				</p>
			</section>

		{:else if block.type === 'brief'}
			<section class="my-6 bg-[color:var(--color-ink)] py-24 text-white md:my-10 md:py-36" use:reveal>
				<div class="container-page text-center">
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-white/50">— Le brief</p>
					<p class="mx-auto mt-10 max-w-[34ch] font-display text-[clamp(1.75rem,4vw,3.5rem)] font-medium leading-[1.12]">
						<span class="font-display-italic">« </span>{block.text}<span class="font-display-italic"> »</span>
					</p>
				</div>
			</section>

		{:else if block.type === 'objectifs'}
			<section class="container-page py-16 md:py-24" use:reveal>
				<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/45">
					— Les objectifs
				</p>
				<div class="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-3">
					{#each block.entries as [k, v], i (k)}
						<div>
							<p class="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-[color:var(--color-ink)]/15">
								{String(i + 1).padStart(2, '0')}
							</p>
							<h3 class="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-ink)]/80">
								{objectifLabel(k)}
							</h3>
							<p class="mt-3 text-[0.95rem] leading-[1.7] text-[color:var(--color-ink)]/70">{v}</p>
						</div>
					{/each}
				</div>
			</section>

		{:else if block.type === 'cibles'}
			<section class="container-page py-16 md:py-24" use:reveal>
				<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/45">
					— À qui s'adresse-t-on
				</p>
				<div class="mt-10 grid gap-10 md:grid-cols-3">
					{#each block.entries as [k, v] (k)}
						<div>
							<p class="border-t border-[color:var(--color-ink)] pt-4 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-ink)]/70">
								{cibleLabel(k)}
							</p>
							<p class="mt-4 text-[0.95rem] leading-[1.7] text-[color:var(--color-ink)]/80">{v}</p>
						</div>
					{/each}
				</div>
			</section>

		{:else if block.type === 'direction'}
			<section class="container-page py-16 md:py-24" use:reveal>
				<div class="grid gap-x-16 gap-y-6 md:grid-cols-12">
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/45 md:col-span-4">
						— La direction artistique
					</p>
					<p class="font-display text-[clamp(1.35rem,2.5vw,2rem)] font-medium leading-[1.3] text-[color:var(--color-ink)]/90 md:col-span-8">
						{block.text}
					</p>
				</div>
			</section>

		{:else if block.type === 'livrables'}
			<section class="container-page py-16 md:py-24" use:reveal>
				<div class="grid gap-x-16 gap-y-10 md:grid-cols-12">
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/45 md:col-span-4">
						— La production
					</p>
					<div class="grid gap-10 md:col-span-8 {block.contraintes ? 'sm:grid-cols-2' : 'sm:grid-cols-1'}">
						{#if block.livrables?.length}
							<div>
								<p class="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-ink)]/55">
									Livrés
								</p>
								<ul class="mt-5 divide-y divide-[color:var(--color-ink)]/15 border-y border-[color:var(--color-ink)]/15">
									{#each block.livrables as l (l)}
										<li class="py-3.5 text-[0.95rem] text-[color:var(--color-ink)]/85">{l}</li>
									{/each}
								</ul>
							</div>
						{/if}
						{#if block.contraintes}
							<div>
								<p class="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-ink)]/55">
									Contraintes
								</p>
								{#if Array.isArray(block.contraintes)}
									<ul class="mt-5 divide-y divide-[color:var(--color-ink)]/15 border-y border-[color:var(--color-ink)]/15">
										{#each block.contraintes as c (c)}
											<li class="py-3.5 text-[0.95rem] text-[color:var(--color-ink)]/85">{c}</li>
										{/each}
									</ul>
								{:else}
									<p class="mt-5 text-[0.95rem] leading-[1.7] text-[color:var(--color-ink)]/85">{block.contraintes}</p>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</section>
		{/if}
	{/each}
</div>
