<script lang="ts">
	import { listProjects } from '$lib/content/projects';

	const entries = listProjects('scolaire');
</script>

<article class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<!-- HEADER MAGAZINE -->
	<section class="container-page pt-36 pb-12">
		<div class="flex flex-wrap items-baseline justify-between gap-4 border-b border-[color:var(--color-ink)]/25 pb-4">
			<span class="eyebrow">— Le Portfolio</span>
			<span class="font-display-italic text-sm text-[color:var(--color-ink)]/70">
				Volume II · BTS Communication
			</span>
			<span class="eyebrow">Scolaire</span>
		</div>

		<div class="mx-auto mt-20 max-w-[40ch] text-center md:mt-28">
			<p class="eyebrow text-[color:var(--color-wine)]">Sommaire</p>
			<h1 class="mt-8 font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[0.95]">
				<span class="font-display-italic">Scolaire</span>
			</h1>
			<p class="mx-auto mt-10 max-w-[42ch] font-display-italic text-[clamp(1.1rem,1.5vw,1.4rem)] leading-snug text-[color:var(--color-ink)]/75">
				« On ne peut pas ne pas communiquer. »
			</p>
			<p class="eyebrow mt-4 text-[color:var(--color-ink)]/55">— Paul Watzlawick</p>
		</div>

		<p class="mx-auto mt-20 max-w-[60ch] text-center text-base leading-[1.7] text-[color:var(--color-ink)]/80">
			Études de cas menées pendant le BTS Communication — du print éditorial à la stratégie de marque, en passant par les campagnes sociales et la direction artistique.
		</p>
	</section>

	<!-- INDEX / LISTE PROJETS -->
	<section class="container-page pb-32">
		<div class="border-y border-[color:var(--color-ink)]/25 py-3">
			<div class="grid grid-cols-12 items-baseline gap-4">
				<span class="eyebrow col-span-1 text-[color:var(--color-ink)]/55">N°</span>
				<span class="eyebrow col-span-6 text-[color:var(--color-ink)]/55">Projet</span>
				<span class="eyebrow col-span-3 hidden text-[color:var(--color-ink)]/55 md:block">Client</span>
				<span class="eyebrow col-span-2 text-right text-[color:var(--color-ink)]/55">Année</span>
			</div>
		</div>

		<ul>
			{#each entries as entry, i (entry.meta.slug)}
				<li class="group border-b border-[color:var(--color-ink)]/15">
					<a href={`/${entry.meta.category}/${entry.meta.slug}`} class="grid grid-cols-12 items-center gap-4 py-8 transition-colors hover:bg-[color:var(--color-cream)]">
						<span class="eyebrow col-span-1 text-[color:var(--color-wine)]">
							{String(i + 1).padStart(2, '0')}
						</span>
						<div class="col-span-11 grid grid-cols-11 items-center gap-4">
							<div class="col-span-11 md:col-span-6">
								<h2 class="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-tight">
									{entry.meta.title}
								</h2>
								{#if entry.meta.tagline}
									<p class="mt-2 font-display-italic text-sm text-[color:var(--color-ink)]/65">
										{entry.meta.tagline}
									</p>
								{/if}
							</div>
							<span class="hidden font-sans text-sm font-light text-[color:var(--color-ink)]/65 md:col-span-3 md:block">
								{entry.meta.client ?? '—'}
							</span>
							<span class="hidden font-display-italic text-base text-[color:var(--color-ink)]/65 md:col-span-2 md:block md:text-right">
								{entry.meta.year ?? ''}
							</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>

		<p class="mt-16 text-center font-display text-2xl text-[color:var(--color-wine)]/60" aria-hidden="true">§</p>
	</section>
</article>
