<script lang="ts">
	import type { ProjectMeta } from '$lib/content/projects';
	import SplitText from './SplitText.svelte';

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
	const pad = (n: number): string => String(n + 1).padStart(2, '0');
</script>

<div class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<div class="container-page section space-y-32">
		{#if meta.brief}
			<section class="grid grid-cols-1 gap-12 md:grid-cols-12">
				<div class="md:col-span-3">
					<p class="brief-label eyebrow text-[color:var(--color-wine)]">Brief</p>
				</div>
				<div class="relative md:col-span-9">
					<span
						class="pointer-events-none absolute -left-2 -top-16 select-none font-display text-[clamp(6rem,12vw,10rem)] leading-none text-[color:var(--color-rose)]/40 md:-left-6"
						aria-hidden="true">«</span
					>
					<SplitText
						as="p"
						text={meta.brief}
						mode="lines"
						class="relative max-w-[60ch] font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.15]"
					/>
				</div>
			</section>
		{/if}

		{#if meta.contexte}
			<section class="grid grid-cols-1 gap-12 md:grid-cols-12">
				<div class="md:col-span-3">
					<p class="brief-label eyebrow text-[color:var(--color-wine)]">Contexte</p>
				</div>
				<div class="md:col-span-9">
					<p class="brief-paragraph max-w-[70ch] text-lg leading-relaxed text-[color:var(--color-ink)]/80">
						{meta.contexte}
					</p>
				</div>
			</section>
		{/if}

		{#if hasObjectifs}
			<section>
				<p class="brief-label eyebrow text-[color:var(--color-wine)]">Objectifs</p>
				<div class="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
					{#each objectifsEntries as [k, v], i (k)}
						<article class="relative overflow-hidden border-t border-[color:var(--color-ink)]/20 pt-6">
							<span
								class="pointer-events-none absolute -right-2 -top-2 select-none font-display text-[clamp(4rem,8vw,7rem)] leading-none text-[color:var(--color-rose)]/22"
								aria-hidden="true">{pad(i)}</span
							>
							<p class="eyebrow text-[color:var(--color-rose)]">{pad(i)}</p>
							<h3 class="mt-2 font-display text-[clamp(1.5rem,2.5vw,2rem)]">
								{objectifLabel(k)}
							</h3>
							<p class="mt-4 leading-relaxed text-[color:var(--color-ink)]/80">{v}</p>
						</article>
					{/each}
				</div>
			</section>
		{/if}

		{#if hasCibles}
			<section>
				<p class="brief-label eyebrow text-[color:var(--color-wine)]">Cibles</p>
				<div
					class="mt-8 grid grid-cols-1 divide-y divide-[color:var(--color-ink)]/15 border-y border-[color:var(--color-ink)]/15 md:grid-cols-3 md:divide-x md:divide-y-0"
				>
					{#each ciblesEntries as [k, v], i (k)}
						<article class="relative p-8">
							<span
								class="pointer-events-none absolute right-4 top-3 select-none font-sans text-xs font-light tracking-[0.18em] text-[color:var(--color-rose)]"
								aria-hidden="true">— {pad(i)}</span
							>
							<p class="eyebrow text-[color:var(--color-rose)]">{cibleLabel(k)}</p>
							<p class="mt-4 leading-relaxed text-[color:var(--color-ink)]/85">{v}</p>
						</article>
					{/each}
				</div>
			</section>
		{/if}

		{#if meta.livrables?.length || meta.contraintes || meta.direction}
			<section class="grid grid-cols-1 gap-12 md:grid-cols-12">
				<div class="md:col-span-3">
					<p class="brief-label eyebrow text-[color:var(--color-wine)]">Production</p>
				</div>
				<div class="grid grid-cols-1 gap-10 md:col-span-9 md:grid-cols-2">
					{#if meta.livrables?.length}
						<div class="rounded-md border border-[color:var(--color-ink)]/12 bg-white/40 p-6 backdrop-blur-sm">
							<p class="eyebrow text-[color:var(--color-rose)]">Livrables</p>
							<ul class="mt-4 space-y-2 leading-relaxed">
								{#each meta.livrables as l (l)}
									<li class="flex gap-3">
										<span class="text-[color:var(--color-rose)]" aria-hidden="true">→</span>
										<span>{l}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if meta.contraintes}
						<div class="rounded-md border border-[color:var(--color-ink)]/12 bg-white/40 p-6 backdrop-blur-sm">
							<p class="eyebrow text-[color:var(--color-rose)]">Contraintes</p>
							{#if Array.isArray(meta.contraintes)}
								<ul class="mt-4 space-y-2 leading-relaxed">
									{#each meta.contraintes as c (c)}
										<li class="flex gap-3">
											<span class="text-[color:var(--color-rose)]" aria-hidden="true">→</span>
											<span>{c}</span>
										</li>
									{/each}
								</ul>
							{:else}
								<p class="mt-4 leading-relaxed">{meta.contraintes}</p>
							{/if}
						</div>
					{/if}
					{#if meta.direction}
						<div class="rounded-md border border-[color:var(--color-ink)]/12 bg-white/40 p-6 backdrop-blur-sm md:col-span-2">
							<p class="eyebrow text-[color:var(--color-rose)]">Direction artistique</p>
							<p class="mt-4 leading-relaxed">{meta.direction}</p>
						</div>
					{/if}
				</div>
			</section>
		{/if}
	</div>
</div>

<style>
	.brief-label {
		position: relative;
		display: inline-block;
		padding-left: 1.25rem;
	}
	.brief-label::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		width: 0.75rem;
		height: 1px;
		background: var(--color-rose);
		transform: translateY(-50%);
	}

	.brief-paragraph::first-letter {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 3.5rem;
		float: left;
		line-height: 0.9;
		margin: 0.25rem 0.6rem 0 0;
		color: var(--color-wine);
	}
</style>
