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
	<div class="container-page pb-32">
		<!-- BRIEF (chapeau d'article) -->
		{#if meta.brief}
			<section class="border-y border-[color:var(--color-ink)]/15 py-16">
				<p class="eyebrow text-center text-[color:var(--color-wine)]">Le brief</p>
				<p class="mx-auto mt-10 max-w-[40ch] text-center font-display-italic text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.25] text-[color:var(--color-ink)]">
					« {meta.brief} »
				</p>
			</section>
		{/if}

		<!-- CONTEXTE (article body with drop cap) -->
		{#if meta.contexte}
			<section class="py-20">
				<div class="mx-auto max-w-[60ch]">
					<p class="brief-paragraph text-lg leading-[1.7] text-[color:var(--color-ink)]/85">
						{meta.contexte}
					</p>
				</div>
			</section>
		{/if}

		<!-- OBJECTIFS -->
		{#if hasObjectifs}
			<section class="border-t border-[color:var(--color-ink)]/15 py-20">
				<p class="eyebrow text-center text-[color:var(--color-wine)]">Objectifs</p>
				<div class="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-3 md:divide-x md:divide-[color:var(--color-ink)]/15">
					{#each objectifsEntries as [k, v], i (k)}
						<article class="md:px-8">
							<p class="font-display text-[3.5rem] font-light leading-none text-[color:var(--color-wine)]/40">
								{pad(i)}
							</p>
							<h3 class="mt-4 font-display-italic text-[clamp(1.5rem,2.2vw,2rem)] font-light">
								{objectifLabel(k)}
							</h3>
							<p class="mt-5 text-base leading-relaxed text-[color:var(--color-ink)]/80">{v}</p>
						</article>
					{/each}
				</div>
			</section>
		{/if}

		<!-- CIBLES -->
		{#if hasCibles}
			<section class="border-t border-[color:var(--color-ink)]/15 py-20">
				<p class="eyebrow text-center text-[color:var(--color-wine)]">Cibles</p>
				<div class="mx-auto mt-12 grid max-w-[80ch] grid-cols-1 gap-10 md:grid-cols-3">
					{#each ciblesEntries as [k, v] (k)}
						<article>
							<p class="font-display-italic text-base text-[color:var(--color-wine)]">
								{cibleLabel(k)}
							</p>
							<p class="mt-4 text-base leading-relaxed text-[color:var(--color-ink)]/80">{v}</p>
						</article>
					{/each}
				</div>
			</section>
		{/if}

		<!-- PRODUCTION -->
		{#if meta.livrables?.length || meta.contraintes || meta.direction}
			<section class="border-t border-[color:var(--color-ink)]/15 py-20">
				<p class="eyebrow text-center text-[color:var(--color-wine)]">Production</p>
				<div class="mx-auto mt-12 grid max-w-[90ch] grid-cols-1 gap-12 md:grid-cols-3">
					{#if meta.livrables?.length}
						<div>
							<p class="font-display-italic text-base text-[color:var(--color-wine)]">Livrables</p>
							<ul class="mt-4 space-y-2 text-base leading-relaxed text-[color:var(--color-ink)]/85">
								{#each meta.livrables as l (l)}
									<li class="border-b border-[color:var(--color-ink)]/10 pb-2">{l}</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if meta.contraintes}
						<div>
							<p class="font-display-italic text-base text-[color:var(--color-wine)]">Contraintes</p>
							{#if Array.isArray(meta.contraintes)}
								<ul class="mt-4 space-y-2 text-base leading-relaxed text-[color:var(--color-ink)]/85">
									{#each meta.contraintes as c (c)}
										<li class="border-b border-[color:var(--color-ink)]/10 pb-2">{c}</li>
									{/each}
								</ul>
							{:else}
								<p class="mt-4 text-base leading-relaxed text-[color:var(--color-ink)]/85">{meta.contraintes}</p>
							{/if}
						</div>
					{/if}
					{#if meta.direction}
						<div>
							<p class="font-display-italic text-base text-[color:var(--color-wine)]">Direction artistique</p>
							<p class="mt-4 text-base leading-relaxed text-[color:var(--color-ink)]/85">{meta.direction}</p>
						</div>
					{/if}
				</div>
			</section>
		{/if}

		<!-- End marker -->
		<p class="mt-12 text-center font-display text-2xl text-[color:var(--color-wine)]/60" aria-hidden="true">§</p>
	</div>
</div>

<style>
	.brief-paragraph::first-letter {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 300;
		font-size: 5rem;
		float: left;
		line-height: 0.85;
		margin: 0.35rem 0.7rem 0 0;
		color: var(--color-wine);
	}
</style>
