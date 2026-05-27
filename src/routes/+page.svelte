<script lang="ts">
	import { listProjects } from '$lib/content/projects';

	const featured = [
		...listProjects('pro').filter((p) => p.meta.featured),
		...listProjects('scolaire').filter((p) => p.meta.featured)
	].slice(0, 8);
</script>

<article>
	<!-- HERO COVER MAGAZINE -->
	<section class="relative h-[100svh] w-full overflow-hidden bg-[color:var(--color-ink)] text-white">
		<video
			src="/images/accueil/video/accueil-1080p.mp4"
			class="absolute inset-0 h-full w-full object-cover opacity-70"
			autoplay
			muted
			loop
			playsinline
			poster="/images/accueil/00e578ba010c422290a36b73.jpg"
		></video>
		<div class="absolute inset-0 bg-[color:var(--color-ink)]/30"></div>

		<div class="container-page relative flex h-full flex-col items-center justify-end pb-24 text-center">
			<p class="eyebrow text-white">— Volume 2024 — 2026 —</p>

			<h1 class="mt-8 font-display text-[clamp(3.5rem,11vw,11rem)] font-medium leading-[0.92] text-white">
				Le <span class="font-display-italic">Portfolio</span>
			</h1>

			<p class="mt-10 max-w-[40ch] font-display-italic text-[clamp(1.1rem,1.6vw,1.6rem)] leading-snug text-white/90">
				Communication, direction artistique &amp; événementiel — par Zélie Louvencourt, La Réunion.
			</p>

			<a
				href="/pro"
				class="mt-14 inline-flex items-center gap-3 border border-white px-10 py-4 font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-white transition-colors hover:bg-white hover:text-[color:var(--color-ink)]"
			>
				Découvrir les projets
			</a>
		</div>
	</section>

	<!-- À LA UNE -->
	<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
		<div class="container-page py-24">
			<div class="border-b border-[color:var(--color-ink)]/15 pb-4">
				<p class="eyebrow">— À la une —</p>
			</div>

			{#if featured.length}
				<div class="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
					{#each featured as entry, i (entry.meta.slug)}
						<a href={`/${entry.meta.category}/${entry.meta.slug}`} class="group flex flex-col">
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
									<span>·</span><span>{entry.meta.year}</span>
								{/if}
							</div>
						</a>
					{/each}
				</div>
			{/if}

			<div class="mt-16 text-center">
				<a
					href="/pro"
					class="inline-flex items-center gap-3 border-b border-[color:var(--color-ink)] pb-1 font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-[color:var(--color-ink)] transition-opacity hover:opacity-60"
				>
					<span>Voir tous les projets</span>
					<span aria-hidden="true">→</span>
				</a>
			</div>
		</div>
	</section>
</article>
