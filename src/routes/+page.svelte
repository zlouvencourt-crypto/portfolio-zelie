<script lang="ts">
	import SplitText from '$components/SplitText.svelte';
	import ProjectCard from '$components/ProjectCard.svelte';
	import MagneticLink from '$components/MagneticLink.svelte';
	import { listProjects } from '$lib/content/projects';

	const scolaireFeatured = listProjects('scolaire').slice(0, 3);
	const proFeatured = listProjects('pro').slice(0, 3);

	const year = new Date().getFullYear();
</script>

<article>
	<!-- HERO -->
	<section class="relative h-[100svh] w-full overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-bg)]">
		<video
			src="/images/accueil/video/accueil-1080p.mp4"
			class="absolute inset-0 h-full w-full object-cover opacity-70"
			autoplay
			muted
			loop
			playsinline
			poster="/images/accueil/00e578ba010c422290a36b73.jpg"
		></video>
		<div class="absolute inset-0 bg-[color:var(--color-ink)]/40"></div>

		<div class="container-page relative flex h-full flex-col justify-between py-32">
			<div class="flex items-start justify-between">
				<p class="eyebrow text-[color:var(--color-rose-soft)]">
					Portfolio<br />2024 - 2026
				</p>
				<p class="eyebrow hidden text-right text-[color:var(--color-rose-soft)] md:block">
					La Réunion
				</p>
			</div>

			<div class="max-w-full">
				<SplitText
					as="h1"
					text="Zélie Louvencourt"
					mode="chars"
					trigger="mount"
					stagger={0.022}
					duration={1.4}
					class="font-display text-[clamp(4rem,14vw,14rem)] leading-[0.9]"
				/>
				<div class="mt-10 flex flex-wrap items-end justify-between gap-10">
					<SplitText
						as="p"
						text="Communication · Direction artistique · Événementiel"
						mode="words"
						trigger="mount"
						delay={0.45}
						class="font-display-italic text-[clamp(1rem,1.4vw,1.5rem)] text-[color:var(--color-rose-soft)]"
					/>
					<MagneticLink
						href="/scolaire"
						strength={0.25}
						class="eyebrow inline-flex items-center gap-3 rounded-full border border-[color:var(--color-bg)] px-6 py-3 transition-colors hover:bg-[color:var(--color-bg)] hover:text-[color:var(--color-ink)]"
						cursorLabel="voir"
					>
						<span>Voir le travail</span>
						<span aria-hidden="true">→</span>
					</MagneticLink>
				</div>
			</div>
		</div>
	</section>

	<!-- MANIFESTE -->
	<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
		<div class="container-page section grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-3">
				<p class="eyebrow text-[color:var(--color-wine)]">Manifeste</p>
			</div>
			<div class="md:col-span-9">
				<SplitText
					as="p"
					text="Je crois au pouvoir des idées bien pensées pour transformer un concept en expérience mémorable."
					mode="lines"
					class="font-display text-[clamp(2rem,5vw,5rem)] leading-[1.05]"
				/>
				<SplitText
					as="p"
					text="Curieuse, passionnée, motivée par les défis. Je construis des projets qui allient créativité, innovation et proximité humaine."
					mode="lines"
					delay={0.1}
					class="mt-10 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-ink)]/75"
				/>
			</div>
		</div>
	</section>

	<!-- SCOLAIRE -->
	<section class="bg-[color:var(--color-cream)] text-[color:var(--color-ink)]">
		<div class="container-page section">
			<div class="flex flex-wrap items-end justify-between gap-8">
				<div>
					<p class="eyebrow text-[color:var(--color-wine)]">Scolaire</p>
					<h2 class="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none">
						BTS <span class="font-display-italic">Communication</span>
					</h2>
				</div>
				<MagneticLink
					href="/scolaire"
					strength={0.3}
					class="eyebrow inline-flex items-center gap-3 underline decoration-[color:var(--color-wine)] decoration-[1px] underline-offset-8"
					cursorLabel="voir tout"
				>
					<span>Voir les 8 projets</span>
					<span aria-hidden="true">→</span>
				</MagneticLink>
			</div>

			<div class="mt-16 grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
				{#each scolaireFeatured as entry, i (entry.meta.slug)}
					<div class={i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5 md:mt-40' : 'md:col-span-6 md:col-start-4'}>
						<ProjectCard {entry} index={i} size={i === 0 ? 'lg' : 'md'} />
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- PRO -->
	<section class="bg-[color:var(--color-ink)] text-[color:var(--color-bg)]">
		<div class="container-page section">
			<div class="flex flex-wrap items-end justify-between gap-8">
				<div>
					<p class="eyebrow text-[color:var(--color-rose-soft)]">Alternance</p>
					<h2 class="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none">
						WEXX <span class="font-display-italic">OI</span>
					</h2>
					<p class="mt-6 max-w-[50ch] text-[color:var(--color-rose-soft)]">
						Plus de deux ans au sein de l'agence événementielle WEXX OI — stratégie, direction artistique et production digitale.
					</p>
				</div>
				<MagneticLink
					href="/pro"
					strength={0.3}
					class="eyebrow inline-flex items-center gap-3 text-[color:var(--color-rose-soft)] underline decoration-[color:var(--color-wine)] decoration-[1px] underline-offset-8"
					cursorLabel="voir tout"
				>
					<span>Voir les 8 projets</span>
					<span aria-hidden="true">→</span>
				</MagneticLink>
			</div>

			<div class="mt-16 grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
				{#each proFeatured as entry, i (entry.meta.slug)}
					<div class={i === 0 ? 'md:col-span-6' : i === 1 ? 'md:col-span-5 md:col-start-8' : 'md:col-span-7 md:col-start-3'}>
						<ProjectCard {entry} index={i} size={i === 0 ? 'lg' : 'md'} />
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ABOUT TEASER -->
	<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
		<div class="container-page section grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-3">
				<p class="eyebrow text-[color:var(--color-wine)]">Derrière les projets</p>
			</div>
			<div class="md:col-span-9">
				<h2 class="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95]">
					22 ans, <span class="font-display-italic">curieuse</span>,
					basée à La Réunion.
				</h2>
				<MagneticLink
					href="/a-propos"
					strength={0.3}
					class="mt-12 eyebrow inline-flex items-center gap-3 underline decoration-[color:var(--color-wine)] decoration-[1px] underline-offset-8"
					cursorLabel="lire"
				>
					<span>Lire la suite</span>
					<span aria-hidden="true">→</span>
				</MagneticLink>
			</div>
		</div>
	</section>
</article>
