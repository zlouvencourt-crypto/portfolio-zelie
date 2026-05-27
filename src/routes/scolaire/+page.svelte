<script lang="ts">
	import { listProjects } from '$lib/content/projects';

	const entries = listProjects('scolaire');
</script>

<article class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<!-- HEADER -->
	<section class="container-page pt-44 pb-12 text-center">
		<p class="eyebrow text-[color:var(--color-wine)]">— Volume II —</p>
		<h1 class="mt-8 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95]">
			<span class="font-display-italic">Scolaire</span>
		</h1>
		<p class="mx-auto mt-10 max-w-[42ch] font-display-italic text-[clamp(1.05rem,1.5vw,1.4rem)] leading-snug text-[color:var(--color-ink)]/75">
			« On ne peut pas ne pas communiquer. »
		</p>
		<p class="eyebrow mt-4 text-[color:var(--color-ink)]/55">— Paul Watzlawick</p>

		<p class="mx-auto mt-12 max-w-[60ch] text-base leading-[1.7] text-[color:var(--color-ink)]/80">
			Études de cas menées pendant le BTS Communication — du print éditorial à la stratégie de marque, en passant par les campagnes sociales et la direction artistique.
		</p>
	</section>

	<div class="container-page">
		<div class="border-t border-[color:var(--color-ink)]/15"></div>
	</div>

	<section class="container-page pt-12">
		<p class="eyebrow text-[color:var(--color-ink)]/55">— Les projets —</p>
	</section>

	<section class="container-page pt-8 pb-32">
		<div class="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
			{#each entries as entry, i (entry.meta.slug)}
				<a
					href={`/${entry.meta.category}/${entry.meta.slug}`}
					class="group flex flex-col"
				>
					<div class="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[color:var(--color-cream)]">
						<img
							src={entry.meta.cover}
							alt={entry.meta.title}
							class="h-full w-full object-contain transition-opacity duration-500 group-hover:opacity-85"
							loading="lazy"
						/>
					</div>

					<p class="eyebrow mt-5 text-[color:var(--color-wine)]">
						N° {String(i + 1).padStart(2, '0')} {entry.meta.client ? `· ${entry.meta.client.split(',')[0]}` : ''}
					</p>

					<h2 class="mt-3 font-display text-[clamp(1.4rem,1.8vw,1.75rem)] font-medium leading-[1.1]">
						{entry.meta.title}
					</h2>

					<p class="mt-2 line-clamp-2 min-h-[3em] font-display-italic text-sm leading-snug text-[color:var(--color-ink)]/65">
						{entry.meta.tagline ?? ''}
					</p>

					<div class="mt-auto flex items-center gap-3 pt-4 text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink)]/55">
						<span>par Zélie Louvencourt</span>
						{#if entry.meta.year}
							<span>·</span>
							<span>{entry.meta.year}</span>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</section>
</article>
