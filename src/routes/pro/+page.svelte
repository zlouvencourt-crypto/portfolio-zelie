<script lang="ts">
	import { listProjects } from '$lib/content/projects';

	const entries = listProjects('pro');
</script>

<article class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<!-- HEADER -->
	<section class="container-page pt-44 pb-12 text-center">
		<p class="eyebrow text-[color:var(--color-wine)]">— Volume I —</p>
		<h1 class="mt-8 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95]">
			Wexx <span class="font-display-italic">OI</span>
		</h1>
		<p class="mx-auto mt-10 max-w-[42ch] font-display-italic text-[clamp(1.05rem,1.5vw,1.4rem)] leading-snug text-[color:var(--color-ink)]/75">
			« Communiquer, c'est mettre en commun. »
		</p>
		<p class="eyebrow mt-4 text-[color:var(--color-ink)]/55">— Dominique Wolton</p>

		<p class="mx-auto mt-12 max-w-[60ch] text-base leading-[1.7] text-[color:var(--color-ink)]/80">
			Deux années d'alternance au sein d'une agence événementielle réunionnaise — stratégie digitale, direction artistique, production vidéo et gestion de festivals.
		</p>
	</section>

	<!-- DIVIDER -->
	<div class="container-page">
		<div class="border-t border-[color:var(--color-ink)]/15"></div>
	</div>

	<!-- SECTION TITLE -->
	<section class="container-page pt-12">
		<p class="eyebrow text-[color:var(--color-ink)]/55">— Les projets —</p>
	</section>

	<!-- GRID OF ARTICLES (Vogue style) -->
	<section class="container-page pt-8 pb-32">
		<div class="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
			{#each entries as entry, i (entry.meta.slug)}
				<a
					href={`/${entry.meta.category}/${entry.meta.slug}`}
					class="group flex flex-col"
				>
					<!-- Image (no crop) -->
					<div class="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[color:var(--color-cream)]">
						{#if entry.meta.coverVideo}
							<video
								src={entry.meta.coverVideo}
								poster={entry.meta.cover}
								autoplay
								muted
								loop
								playsinline
								class="h-full w-full object-contain transition-opacity duration-500 group-hover:opacity-85"
							></video>
						{:else}
							<img
								src={entry.meta.cover}
								alt={entry.meta.title}
								class="h-full w-full object-contain transition-opacity duration-500 group-hover:opacity-85"
								loading="lazy"
							/>
						{/if}
					</div>

					<!-- Eyebrow category -->
					<p class="eyebrow mt-5 text-[color:var(--color-wine)]">
						N° {String(i + 1).padStart(2, '0')} {entry.meta.client ? `· ${entry.meta.client.split(',')[0]}` : ''}
					</p>

					<!-- Title -->
					<h2 class="mt-3 font-display text-[clamp(1.4rem,1.8vw,1.75rem)] font-medium leading-[1.1]">
						{entry.meta.title}
					</h2>

					<p class="mt-2 line-clamp-2 min-h-[3em] font-display-italic text-sm leading-snug text-[color:var(--color-ink)]/65">
						{entry.meta.tagline ?? ''}
					</p>

					<!-- Byline + date -->
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
