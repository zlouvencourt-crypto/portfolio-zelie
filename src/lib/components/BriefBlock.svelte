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
</script>

<div id="projet" class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<!-- CONTEXTE -->
	{#if meta.contexte}
		<section class="container-page py-20 md:py-28">
			<div class="grid grid-cols-12 gap-x-8 gap-y-10 md:gap-x-16">
				<div class="col-span-12 md:col-span-4">
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
						— Le contexte
					</p>
					<h2 class="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium uppercase leading-[0.95]">
						<span class="font-display-italic normal-case">L'</span>histoire
					</h2>
				</div>
				<div class="col-span-12 md:col-span-8">
					<p class="text-[1.0625rem] leading-[1.75] text-[color:var(--color-ink)]/85">
						{meta.contexte}
					</p>
				</div>
			</div>
		</section>
	{/if}

	<!-- BRIEF — rupture noire -->
	{#if meta.brief}
		<section class="bg-[color:var(--color-ink)] py-24 text-white md:py-32">
			<div class="container-page text-center">
				<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-white/60">
					— Le brief
				</p>
				<p class="mx-auto mt-10 max-w-[36ch] font-display text-[clamp(1.75rem,3.5vw,3rem)] font-medium leading-[1.15] text-white">
					<span class="font-display-italic">« </span>{meta.brief}<span class="font-display-italic"> »</span>
				</p>
			</div>
		</section>
	{/if}

	<!-- OBJECTIFS — blocs noirs façon Astrid -->
	{#if hasObjectifs}
		<section class="container-page py-20 md:py-28">
			<div class="grid grid-cols-12 gap-x-8 gap-y-10 md:gap-x-16">
				<div class="col-span-12 md:col-span-4">
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
						— Les objectifs
					</p>
					<h2 class="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium uppercase leading-[0.95]">
						Trois <span class="font-display-italic normal-case">ambitions</span>
					</h2>
					<p class="mt-6 max-w-[32ch] text-[0.95rem] leading-[1.65] text-[color:var(--color-ink)]/70">
						Les axes stratégiques qui ont guidé la création de ce projet.
					</p>
				</div>
				<div class="col-span-12 md:col-span-8">
					<div class="divide-y divide-white/15 bg-[color:var(--color-ink)] text-white">
						{#each objectifsEntries as [k, v] (k)}
							<article class="px-7 py-7 md:px-10 md:py-9">
								<h3 class="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium uppercase leading-tight">
									{objectifLabel(k)}
								</h3>
								<p class="mt-3 text-[0.9375rem] leading-[1.65] text-white/75">{v}</p>
							</article>
						{/each}
					</div>
				</div>
			</div>
		</section>
	{/if}

	<!-- CIBLES -->
	{#if hasCibles}
		<section class="bg-[color:var(--color-bg)] py-20 md:py-28">
			<div class="container-page">
				<div class="grid grid-cols-12 gap-x-8 gap-y-10 md:gap-x-16">
					<div class="col-span-12 md:col-span-4">
						<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
							— Les cibles
						</p>
						<h2 class="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium uppercase leading-[0.95]">
							À qui <span class="font-display-italic normal-case">parle-t-on</span> ?
						</h2>
					</div>
					<div class="col-span-12 grid grid-cols-1 gap-10 md:col-span-8 md:grid-cols-3">
						{#each ciblesEntries as [k, v] (k)}
							<article>
								<p class="border-t border-[color:var(--color-ink)] pt-4 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-ink)]/70">
									{cibleLabel(k)}
								</p>
								<p class="mt-4 text-[0.95rem] leading-[1.7] text-[color:var(--color-ink)]/85">{v}</p>
							</article>
						{/each}
					</div>
				</div>
			</div>
		</section>
	{/if}

	<!-- DIRECTION ARTISTIQUE -->
	{#if meta.direction}
		<section class="container-page py-20 md:py-28">
			<div class="grid grid-cols-12 gap-x-8 gap-y-10 md:gap-x-16">
				<div class="col-span-12 md:col-span-4">
					<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
						— La direction
					</p>
					<h2 class="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium uppercase leading-[0.95]">
						Direction <span class="font-display-italic normal-case">artistique</span>
					</h2>
				</div>
				<div class="col-span-12 md:col-span-8">
					<p class="text-[1.0625rem] leading-[1.75] text-[color:var(--color-ink)]/85">{meta.direction}</p>
				</div>
			</div>
		</section>
	{/if}

	<!-- LIVRABLES & CONTRAINTES -->
	{#if meta.livrables?.length || meta.contraintes}
		<section class="bg-[color:var(--color-bg)] py-20 md:py-28">
			<div class="container-page">
				<div class="grid grid-cols-12 gap-x-8 gap-y-10 md:gap-x-16">
					<div class="col-span-12 md:col-span-4">
						<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
							— La production
						</p>
						<h2 class="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium uppercase leading-[0.95]">
							Les <span class="font-display-italic normal-case">livrables</span>
						</h2>
					</div>
					<div class="col-span-12 grid grid-cols-1 gap-10 md:col-span-8 {meta.contraintes ? 'md:grid-cols-2' : 'md:grid-cols-1'}">
						{#if meta.livrables?.length}
							<div>
								<p class="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-ink)]/55">
									Livrés
								</p>
								<ul class="mt-5 divide-y divide-[color:var(--color-ink)]/20 border-y border-[color:var(--color-ink)]/20">
									{#each meta.livrables as l (l)}
										<li class="py-4 text-[0.95rem] leading-[1.5] text-[color:var(--color-ink)]/90">{l}</li>
									{/each}
								</ul>
							</div>
						{/if}
						{#if meta.contraintes}
							<div>
								<p class="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-ink)]/55">
									Contraintes
								</p>
								{#if Array.isArray(meta.contraintes)}
									<ul class="mt-5 divide-y divide-[color:var(--color-ink)]/20 border-y border-[color:var(--color-ink)]/20">
										{#each meta.contraintes as c (c)}
											<li class="py-4 text-[0.95rem] leading-[1.5] text-[color:var(--color-ink)]/90">{c}</li>
										{/each}
									</ul>
								{:else}
									<p class="mt-5 text-[0.95rem] leading-[1.7] text-[color:var(--color-ink)]/85">{meta.contraintes}</p>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</section>
	{/if}
</div>
