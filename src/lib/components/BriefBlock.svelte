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
	const roman = (n: number) => ['I', 'II', 'III', 'IV', 'V'][n] ?? String(n + 1);
</script>

<div class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<!-- ARTICLE OPENING — Magazine spread body -->
	{#if meta.contexte}
		<section class="container-page pt-20 pb-16 md:pt-28 md:pb-24">
			<div class="grid grid-cols-12 gap-x-8 gap-y-10">
				<aside class="col-span-12 md:col-span-3 md:pt-2">
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
						— Le contexte
					</p>
					<p class="mt-3 font-display-italic text-base text-[color:var(--color-ink)]/55">
						Article I.
					</p>
				</aside>
				<div class="col-span-12 md:col-span-9">
					<p class="article-opening text-[1.05rem] leading-[1.75] text-[color:var(--color-ink)]/90 md:columns-2 md:gap-10 md:text-[1.0625rem] md:leading-[1.7]">
						{meta.contexte}
					</p>
				</div>
			</div>
		</section>
	{/if}

	<!-- PULL QUOTE — Brief as editorial breakout -->
	{#if meta.brief}
		<section class="container-page py-16 md:py-20">
			<div class="mx-auto max-w-[60ch] border-y border-[color:var(--color-ink)]/25 py-14 text-center">
				<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-wine)]">
					— Le brief —
				</p>
				<p class="mx-auto mt-8 max-w-[32ch] font-display-italic text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.15] text-[color:var(--color-ink)]">
					« {meta.brief} »
				</p>
			</div>
		</section>
	{/if}

	<!-- OBJECTIFS — Editorial triptyque -->
	{#if hasObjectifs}
		<section class="container-page pt-12 pb-20 md:pt-16 md:pb-28">
			<div class="grid grid-cols-12 gap-x-8 gap-y-10">
				<aside class="col-span-12 md:col-span-3 md:pt-3">
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
						— Les objectifs
					</p>
					<p class="mt-3 font-display-italic text-base text-[color:var(--color-ink)]/55">
						Article II.
					</p>
				</aside>
				<h2 class="col-span-12 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium uppercase leading-[0.95] md:col-span-9">
					Trois <span class="font-display-italic normal-case">ambitions</span>
				</h2>
			</div>

			<div class="mt-14 grid grid-cols-12 gap-x-8 gap-y-12 md:mt-20">
				{#each objectifsEntries as [k, v], i (k)}
					<article class="col-span-12 md:col-span-4">
						<div class="flex items-baseline gap-4 border-t border-[color:var(--color-ink)]/30 pt-4">
							<span class="font-display-italic text-2xl text-[color:var(--color-wine)]">{roman(i)}.</span>
							<h3 class="font-display text-xl font-medium uppercase tracking-wide">
								{objectifLabel(k)}
							</h3>
						</div>
						<p class="mt-5 text-[1.0625rem] leading-[1.7] text-[color:var(--color-ink)]/85">{v}</p>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	<!-- CIBLES — Magazine portrait blocks -->
	{#if hasCibles}
		<section class="bg-[color:var(--color-cream)] py-20 md:py-28">
			<div class="container-page">
				<div class="grid grid-cols-12 gap-x-8 gap-y-10">
					<aside class="col-span-12 md:col-span-3 md:pt-3">
						<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
							— Les cibles
						</p>
						<p class="mt-3 font-display-italic text-base text-[color:var(--color-ink)]/55">
							Article III.
						</p>
					</aside>
					<h2 class="col-span-12 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium uppercase leading-[0.95] md:col-span-9">
						À qui <span class="font-display-italic normal-case">parle-t-on</span> ?
					</h2>
				</div>

				<div class="mt-14 grid grid-cols-12 gap-x-8 gap-y-12 md:mt-20">
					{#each ciblesEntries as [k, v], i (k)}
						<article class="col-span-12 md:col-span-4 {i === 1 ? 'md:translate-y-12' : ''} {i === 2 ? 'md:translate-y-6' : ''}">
							<p class="font-display-italic text-lg text-[color:var(--color-wine)]">
								{cibleLabel(k)}.
							</p>
							<p class="mt-4 border-t border-[color:var(--color-ink)]/25 pt-4 text-[1.0625rem] leading-[1.7] text-[color:var(--color-ink)]/85">
								{v}
							</p>
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- DIRECTION ARTISTIQUE — Pleine page éditoriale -->
	{#if meta.direction}
		<section class="container-page pt-20 pb-16 md:pt-28 md:pb-24">
			<div class="grid grid-cols-12 gap-x-8 gap-y-10">
				<aside class="col-span-12 md:col-span-3 md:pt-3">
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
						— Direction
					</p>
					<p class="mt-3 font-display-italic text-base text-[color:var(--color-ink)]/55">
						Article IV.
					</p>
				</aside>
				<div class="col-span-12 md:col-span-9">
					<h2 class="font-display text-[clamp(2.25rem,5vw,4rem)] font-medium uppercase leading-[0.95]">
						La <span class="font-display-italic normal-case">direction</span><br />artistique
					</h2>
					<p class="mt-10 max-w-[68ch] text-[1.0625rem] leading-[1.75] text-[color:var(--color-ink)]/90 md:columns-2 md:gap-10">
						{meta.direction}
					</p>
				</div>
			</div>
		</section>
	{/if}

	<!-- LIVRABLES & CONTRAINTES — Colophon style -->
	{#if meta.livrables?.length || meta.contraintes}
		<section class="container-page pb-24 md:pb-32">
			<div class="grid grid-cols-12 gap-x-8 gap-y-10 border-t border-[color:var(--color-ink)]/25 pt-12">
				<aside class="col-span-12 md:col-span-3">
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
						— Production
					</p>
					<p class="mt-3 font-display-italic text-base text-[color:var(--color-ink)]/55">
						Colophon.
					</p>
				</aside>

				<div class="col-span-12 grid grid-cols-1 gap-12 md:col-span-9 md:grid-cols-2">
					{#if meta.livrables?.length}
						<div>
							<p class="font-display-italic text-lg text-[color:var(--color-wine)]">— Livrables</p>
							<ul class="mt-5 space-y-2.5">
								{#each meta.livrables as l, i (l)}
									<li class="flex gap-4 text-[1.0625rem] leading-[1.65] text-[color:var(--color-ink)]/85">
										<span class="font-display-italic text-[color:var(--color-wine)]/70">{String(i + 1).padStart(2, '0')}</span>
										<span>{l}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if meta.contraintes}
						<div>
							<p class="font-display-italic text-lg text-[color:var(--color-wine)]">— Contraintes</p>
							{#if Array.isArray(meta.contraintes)}
								<ul class="mt-5 space-y-2.5">
									{#each meta.contraintes as c, i (c)}
										<li class="flex gap-4 text-[1.0625rem] leading-[1.65] text-[color:var(--color-ink)]/85">
											<span class="font-display-italic text-[color:var(--color-wine)]/70">{String(i + 1).padStart(2, '0')}</span>
											<span>{c}</span>
										</li>
									{/each}
								</ul>
							{:else}
								<p class="mt-5 text-[1.0625rem] leading-[1.7] text-[color:var(--color-ink)]/85">{meta.contraintes}</p>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</section>
	{/if}

	<!-- End marker -->
	<p class="container-page pb-10 text-center font-display-italic text-2xl text-[color:var(--color-wine)]/55" aria-hidden="true">§</p>
</div>

<style>
	.article-opening::first-letter {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 500;
		font-size: 5.5rem;
		float: left;
		line-height: 0.8;
		margin: 0.4rem 0.7rem -0.2rem 0;
		color: var(--color-wine);
	}
</style>
