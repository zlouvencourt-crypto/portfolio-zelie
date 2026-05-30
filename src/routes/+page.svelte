<script lang="ts">
	import { listProjects } from '$lib/content/projects';

	const featured = [
		...listProjects('pro').filter((p) => p.meta.featured),
		...listProjects('scolaire').filter((p) => p.meta.featured)
	].slice(0, 8);

	const keywords = ['Stratégie', 'Image', 'Mode', 'Branding', 'Social Media', 'Événementiel', 'Émotion'];

	const proCover = listProjects('pro')[0]?.meta.cover;
	const scoCover = '/images/coco-crush/0285d2a1e9ac47779327613e.png';
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
				<span class="font-display-italic">Portfolio</span>
			</h1>
			<p class="mt-10 max-w-[40ch] font-display-italic text-[clamp(1.1rem,1.6vw,1.6rem)] leading-snug text-white/90">
				Communication, direction artistique &amp; événementiel — par Lize Louvencourt.
			</p>
			<a
				href="/pro"
				class="mt-14 inline-flex items-center gap-3 border border-white px-10 py-4 font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-white transition-colors hover:bg-white hover:text-[color:var(--color-ink)]"
			>
				Découvrir les projets
			</a>
		</div>
	</section>

	<!-- BANDEAU MOTS-CLÉS -->
	<section class="border-b border-[color:var(--color-ink)]/12 bg-[color:var(--color-bg)] py-7">
		<div class="container-page">
			<ul class="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
				{#each keywords as word, i (word)}
					<li class="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-ink)]/70">
						{word}
					</li>
					{#if i < keywords.length - 1}
						<li class="text-[color:var(--color-wine)]" aria-hidden="true">·</li>
					{/if}
				{/each}
			</ul>
		</div>
	</section>

	<!-- À LA UNE -->
	<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
		<div class="container-page py-24">
			<div class="flex items-end justify-between border-b border-[color:var(--color-ink)]/15 pb-4">
				<p class="eyebrow">— À la une —</p>
				<a href="/pro" class="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[color:var(--color-ink)]/60 transition-opacity hover:opacity-60">Tout voir →</a>
			</div>

			{#if featured.length}
				<div class="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
					{#each featured as entry, i (entry.meta.slug)}
						<a href={`/${entry.meta.category}/${entry.meta.slug}`} class="group flex flex-col">
							<div class="aspect-[4/5] overflow-hidden bg-[color:var(--color-cream)]">
								{#if entry.meta.coverVideo}
									<video src={entry.meta.coverVideo} poster={entry.meta.cover} autoplay muted loop playsinline class="h-full w-full object-cover object-center transition-opacity duration-500 group-hover:opacity-85"></video>
								{:else}
									<img src={entry.meta.cover} alt={entry.meta.title} class="h-full w-full object-cover object-center transition-opacity duration-500 group-hover:opacity-85" loading="lazy" />
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
								<span>par Lize Louvencourt</span>
								{#if entry.meta.year}<span>·</span><span>{entry.meta.year}</span>{/if}
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- LES DEUX VOLUMES -->
	<section class="bg-[color:var(--color-cream)] text-white">
		<div class="container-page py-24">
			<div class="border-b border-white/20 pb-4 text-center">
				<p class="eyebrow text-white/60">— Dans ce numéro —</p>
			</div>

			<div class="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
				<!-- Volume I -->
				<a href="/pro" class="group block">
					<div class="aspect-[4/5] overflow-hidden bg-[color:var(--color-bg)]">
						{#if proCover}
							<img src={proCover} alt="Wexx OI" class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
						{/if}
					</div>
					<p class="eyebrow mt-6 text-white/60">Volume I</p>
					<h3 class="mt-3 font-display text-[clamp(2rem,3.5vw,3.25rem)] font-medium leading-tight">
						Wexx <span class="font-display-italic">OI</span>
					</h3>
					<p class="mt-3 max-w-[42ch] text-base leading-relaxed text-white/75">
						Deux années d'alternance en agence événementielle — stratégie digitale, direction artistique et festivals.
					</p>
					<span class="mt-5 inline-block border-b border-white pb-1 font-sans text-[10px] font-medium uppercase tracking-[0.28em] transition-opacity group-hover:opacity-60">Lire le volume →</span>
				</a>

				<!-- Volume II -->
				<a href="/scolaire" class="group block">
					<div class="aspect-[4/5] overflow-hidden bg-[color:var(--color-bg)]">
						{#if scoCover}
							<img src={scoCover} alt="Scolaire" class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
						{/if}
					</div>
					<p class="eyebrow mt-6 text-white/60">Volume II</p>
					<h3 class="mt-3 font-display text-[clamp(2rem,3.5vw,3.25rem)] font-medium leading-tight">
						<span class="font-display-italic">Scolaire</span>
					</h3>
					<p class="mt-3 max-w-[42ch] text-base leading-relaxed text-white/75">
						Les études de cas du BTS Communication — print éditorial, stratégie de marque et campagnes sociales.
					</p>
					<span class="mt-5 inline-block border-b border-white pb-1 font-sans text-[10px] font-medium uppercase tracking-[0.28em] transition-opacity group-hover:opacity-60">Lire le volume →</span>
				</a>
			</div>
		</div>
	</section>

	<!-- CITATION (rupture noire) -->
	<section class="bg-[color:var(--color-ink)] py-32 text-white">
		<div class="container-page text-center">
			<span class="font-display text-[clamp(5rem,10vw,9rem)] leading-[0.7] text-[color:var(--color-wine)]" aria-hidden="true">"</span>
			<p class="mx-auto -mt-12 max-w-[26ch] font-display-italic text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1.1] text-white">
				La mode habille le regard, la communication donne du sens à ce qu'on voit.
			</p>
			<p class="eyebrow mt-12 text-white/60">— Lize Louvencourt —</p>
		</div>
	</section>

	<!-- À PROPOS TEASER -->
	<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
		<div class="container-page grid grid-cols-1 items-center gap-16 py-24 md:grid-cols-12">
			<div class="md:col-span-5">
				<div class="aspect-[4/5] overflow-hidden bg-[color:var(--color-cream)]">
					<img src="/images/a-propos/portrait.jpg" alt="Portrait — Lize Louvencourt" class="h-full w-full object-cover object-center" loading="lazy" />
				</div>
			</div>
			<div class="md:col-span-6 md:col-start-7">
				<p class="eyebrow text-[color:var(--color-wine)]">— L'autrice —</p>
				<h2 class="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1]">
					Moi, <span class="font-display-italic">c'est Lize.</span>
				</h2>
				<p class="mt-8 max-w-[48ch] text-lg leading-relaxed text-[color:var(--color-ink)]/80">
					Passionnée par la mode, l'image et la communication, je conçois des contenus et des identités visuelles qui racontent une histoire avant même qu'un mot soit prononcé.
				</p>
				<a href="/a-propos" class="mt-8 inline-block border-b border-[color:var(--color-ink)] pb-1 font-sans text-[10px] font-medium uppercase tracking-[0.28em] transition-opacity hover:opacity-60">
					Découvrir mon univers →
				</a>
			</div>
		</div>
	</section>

	<!-- CONTACT CTA -->
	<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
		<div class="container-page border-t border-[color:var(--color-ink)]/15 py-24 text-center">
			<p class="eyebrow text-[color:var(--color-wine)]">— Contact —</p>
			<h2 class="mx-auto mt-8 max-w-[20ch] font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[1]">
				On travaille <span class="font-display-italic">ensemble</span> ?
			</h2>
			<a
				href="/contact"
				class="mt-12 inline-flex items-center gap-3 border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-10 py-4 font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-white transition-colors hover:bg-transparent hover:text-[color:var(--color-ink)]"
			>
				Me contacter
			</a>
		</div>
	</section>
</article>
