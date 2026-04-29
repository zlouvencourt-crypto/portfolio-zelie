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
</script>

<div class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<div class="container-page section space-y-24">
		{#if meta.brief}
			<section class="grid grid-cols-1 gap-12 md:grid-cols-12">
				<div class="md:col-span-3">
					<p class="eyebrow text-[color:var(--color-wine)]">Brief</p>
				</div>
				<div class="md:col-span-9">
					<SplitText
						as="p"
						text={meta.brief}
						mode="lines"
						class="max-w-[60ch] font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.15]"
					/>
				</div>
			</section>
		{/if}

		{#if meta.contexte}
			<section class="grid grid-cols-1 gap-12 md:grid-cols-12">
				<div class="md:col-span-3">
					<p class="eyebrow text-[color:var(--color-wine)]">Contexte</p>
				</div>
				<div class="md:col-span-9">
					<p class="max-w-[70ch] text-lg leading-relaxed text-[color:var(--color-ink)]/80">
						{meta.contexte}
					</p>
				</div>
			</section>
		{/if}

		{#if hasObjectifs}
			<section>
				<p class="eyebrow text-[color:var(--color-wine)]">Objectifs</p>
				<div class="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
					{#each objectifsEntries as [k, v], i (k)}
						<article class="relative border-t border-[color:var(--color-ink)]/15 pt-6">
							<p class="eyebrow text-[color:var(--color-rose)]">
								{String(i + 1).padStart(2, '0')}
							</p>
							<h3 class="mt-2 font-display text-[clamp(1.5rem,2.5vw,2rem)]">
								{objectifLabel(k)}
							</h3>
							<p class="mt-4 text-[color:var(--color-ink)]/80 leading-relaxed">{v}</p>
						</article>
					{/each}
				</div>
			</section>
		{/if}

		{#if hasCibles}
			<section>
				<p class="eyebrow text-[color:var(--color-wine)]">Cibles</p>
				<div class="mt-8 grid grid-cols-1 divide-y divide-[color:var(--color-ink)]/15 border-y border-[color:var(--color-ink)]/15 md:grid-cols-3 md:divide-x md:divide-y-0">
					{#each ciblesEntries as [k, v] (k)}
						<article class="p-6 md:p-8">
							<p class="eyebrow text-[color:var(--color-rose)]">{cibleLabel(k)}</p>
							<p class="mt-3 text-[color:var(--color-ink)]/85 leading-relaxed">{v}</p>
						</article>
					{/each}
				</div>
			</section>
		{/if}

		{#if meta.livrables?.length || meta.contraintes || meta.direction}
			<section class="grid grid-cols-1 gap-12 md:grid-cols-12">
				<div class="md:col-span-3">
					<p class="eyebrow text-[color:var(--color-wine)]">Production</p>
				</div>
				<div class="grid grid-cols-1 gap-8 md:col-span-9 md:grid-cols-2">
					{#if meta.livrables?.length}
						<div>
							<p class="eyebrow text-[color:var(--color-rose)]">Livrables</p>
							<ul class="mt-3 space-y-2 leading-relaxed">
								{#each meta.livrables as l (l)}
									<li>— {l}</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if meta.contraintes}
						<div>
							<p class="eyebrow text-[color:var(--color-rose)]">Contraintes</p>
							{#if Array.isArray(meta.contraintes)}
								<ul class="mt-3 space-y-2 leading-relaxed">
									{#each meta.contraintes as c (c)}
										<li>— {c}</li>
									{/each}
								</ul>
							{:else}
								<p class="mt-3 leading-relaxed">{meta.contraintes}</p>
							{/if}
						</div>
					{/if}
					{#if meta.direction}
						<div class="md:col-span-2">
							<p class="eyebrow text-[color:var(--color-rose)]">Direction artistique</p>
							<p class="mt-3 leading-relaxed">{meta.direction}</p>
						</div>
					{/if}
				</div>
			</section>
		{/if}
	</div>
</div>
