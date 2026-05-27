<script lang="ts">
	import type { ProjectMeta } from '$lib/content/projects';

	type Props = { meta: ProjectMeta };
	let { meta }: Props = $props();

	const objectifsEntries = $derived<[string, string][]>(
		meta.objectifs
			? (Object.entries(meta.objectifs) as [string, string][]).filter(([, v]) => !!v)
			: []
	);
	const ciblesEntries = $derived<[string, string][]>(
		meta.cibles
			? (Object.entries(meta.cibles) as [string, string][]).filter(([, v]) => !!v)
			: []
	);
	const hasObjectifs = $derived(objectifsEntries.length > 0);
	const hasCibles = $derived(ciblesEntries.length > 0);

	const cibleLabel = (key: string): string => {
		if (key === 'principale') return 'Cible principale';
		if (key === 'coeur') return 'Cœur de cible';
		if (key === 'secondaire') return 'Cible secondaire';
		return key;
	};
	const objectifLabel = (key: string) => key[0].toUpperCase() + key.slice(1);
	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<div class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<!-- CHAPEAU — Article opening -->
	{#if meta.contexte}
		<section class="container-page pt-24 pb-12">
			<div class="mx-auto max-w-[68ch]">
				<p class="eyebrow text-center text-[color:var(--color-wine)]">— Chapeau —</p>
				<p class="article-opening mt-10 text-lg leading-[1.7] text-[color:var(--color-ink)]/85 md:text-xl md:leading-[1.65]">
					{meta.contexte}
				</p>
			</div>
		</section>
	{/if}

	<!-- PULL QUOTE — Brief -->
	{#if meta.brief}
		<section class="border-y border-[color:var(--color-ink)]/15 py-24">
			<div class="container-page text-center">
				<span class="font-display text-[clamp(5rem,10vw,9rem)] leading-[0.7] text-[color:var(--color-wine)]/45" aria-hidden="true">"</span>
				<p class="mx-auto -mt-12 max-w-[28ch] font-display-italic text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1.1] text-[color:var(--color-ink)]">
					{meta.brief}
				</p>
				<p class="eyebrow mt-10 text-[color:var(--color-ink)]/55">— Le brief —</p>
			</div>
		</section>
	{/if}

	<!-- OBJECTIFS -->
	{#if hasObjectifs}
		<section class="container-page py-24">
			<div class="text-center">
				<p class="eyebrow text-[color:var(--color-wine)]">— Objectifs —</p>
				<h2 class="mx-auto mt-6 max-w-[24ch] font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05]">
					Trois <span class="font-display-italic">ambitions</span>
				</h2>
			</div>
			<div class="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 border-y border-[color:var(--color-ink)]/15 py-16 md:grid-cols-3">
				{#each objectifsEntries as [k, v], i (k)}
					<article class="text-center">
						<p class="font-display text-[clamp(5rem,8vw,7rem)] font-medium leading-[0.85] text-[color:var(--color-wine)]/35">
							{pad(i)}
						</p>
						<h3 class="mt-2 font-display-italic text-[clamp(1.5rem,2.2vw,2rem)] font-medium">
							{objectifLabel(k)}
						</h3>
						<p class="mx-auto mt-5 max-w-[28ch] text-base leading-[1.6] text-[color:var(--color-ink)]/80">{v}</p>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	<!-- CIBLES -->
	{#if hasCibles}
		<section class="bg-[color:var(--color-cream)] py-24">
			<div class="container-page">
				<div class="text-center">
					<p class="eyebrow text-[color:var(--color-wine)]">— Cibles —</p>
					<h2 class="mx-auto mt-6 max-w-[24ch] font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05]">
						À qui <span class="font-display-italic">parle-t-on</span> ?
					</h2>
				</div>
				<div class="mx-auto mt-16 grid max-w-[100ch] grid-cols-1 gap-12 md:grid-cols-3">
					{#each ciblesEntries as [k, v] (k)}
						<article class="border-t-2 border-[color:var(--color-wine)] pt-6">
							<p class="font-display-italic text-base text-[color:var(--color-wine)]">
								{cibleLabel(k)}
							</p>
							<p class="mt-4 text-base leading-[1.6] text-[color:var(--color-ink)]/85">{v}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- PRODUCTION -->
	{#if meta.livrables?.length || meta.contraintes || meta.direction}
		<section class="container-page py-24">
			<div class="text-center">
				<p class="eyebrow text-[color:var(--color-wine)]">— Production —</p>
				<h2 class="mx-auto mt-6 max-w-[24ch] font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05]">
					Les <span class="font-display-italic">coulisses</span>
				</h2>
			</div>

			<div class="mx-auto mt-16 grid max-w-[110ch] grid-cols-1 gap-12 md:grid-cols-2">
				{#if meta.livrables?.length}
					<div class="border-t border-[color:var(--color-ink)]/25 pt-8">
						<p class="font-display-italic text-lg text-[color:var(--color-wine)]">— Livrables</p>
						<ul class="mt-6 space-y-3">
							{#each meta.livrables as l, i (l)}
								<li class="flex gap-4 text-base leading-[1.6] text-[color:var(--color-ink)]/85">
									<span class="font-display-italic text-[color:var(--color-wine)]">{String(i + 1).padStart(2, '0')}</span>
									<span>{l}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if meta.contraintes}
					<div class="border-t border-[color:var(--color-ink)]/25 pt-8">
						<p class="font-display-italic text-lg text-[color:var(--color-wine)]">— Contraintes</p>
						{#if Array.isArray(meta.contraintes)}
							<ul class="mt-6 space-y-3">
								{#each meta.contraintes as c, i (c)}
									<li class="flex gap-4 text-base leading-[1.6] text-[color:var(--color-ink)]/85">
										<span class="font-display-italic text-[color:var(--color-wine)]">{String(i + 1).padStart(2, '0')}</span>
										<span>{c}</span>
									</li>
								{/each}
							</ul>
						{:else}
							<p class="mt-6 text-base leading-[1.6] text-[color:var(--color-ink)]/85">{meta.contraintes}</p>
						{/if}
					</div>
				{/if}
				{#if meta.direction}
					<div class="border-t border-[color:var(--color-ink)]/25 pt-8 md:col-span-2">
						<p class="font-display-italic text-lg text-[color:var(--color-wine)]">— Direction artistique</p>
						<p class="mx-auto mt-6 max-w-[80ch] text-base leading-[1.7] text-[color:var(--color-ink)]/85">{meta.direction}</p>
					</div>
				{/if}
			</div>
		</section>
	{/if}

	<!-- End marker -->
	<p class="container-page pb-12 text-center font-display-italic text-3xl text-[color:var(--color-wine)]/55" aria-hidden="true">§</p>
</div>

<style>
	.article-opening::first-letter {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 500;
		font-size: 7rem;
		float: left;
		line-height: 0.75;
		margin: 0.5rem 0.8rem -0.2rem 0;
		color: var(--color-wine);
	}
</style>
