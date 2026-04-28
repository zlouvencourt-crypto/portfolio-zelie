<script lang="ts">
	import SplitText from '$components/SplitText.svelte';
	import ImageReveal from '$components/ImageReveal.svelte';
	import MagneticLink from '$components/MagneticLink.svelte';

	const inspirations = [
		'Photographie argentique',
		'Art contemporain',
		'Culture réunionnaise',
		'Musique électronique',
		'Édition indépendante',
		'Voyage et altérité',
		'Cinéma des années 70',
		'Graphisme suisse'
	];
</script>

<article class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<!-- HERO -->
	<section class="container-page pt-40 pb-20">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-7">
				<p class="eyebrow text-[color:var(--color-wine)]">À propos</p>
				<SplitText
					as="h1"
					text="Zélie Louvencourt"
					mode="chars"
					trigger="mount"
					stagger={0.03}
					class="mt-6 font-display text-[clamp(4rem,12vw,12rem)] leading-[0.9]"
				/>
				<SplitText
					as="p"
					text="22 ans · communication · direction artistique · La Réunion"
					mode="words"
					trigger="mount"
					delay={0.3}
					class="mt-8 font-display-italic text-[clamp(1rem,1.4vw,1.5rem)] text-[color:var(--color-wine)]"
				/>
			</div>
			<div class="md:col-span-5 md:col-start-8">
				<ImageReveal
					src="/images/commun/ac47435b9f7345c9ad9aef22.png"
					alt="Portrait — Zélie Louvencourt"
					ratio="4/5"
					parallax={6}
				/>
			</div>
		</div>
	</section>

	<!-- INTRO -->
	<section class="section bg-[color:var(--color-cream)]">
		<div class="container-page grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-3">
				<p class="eyebrow text-[color:var(--color-wine)]">Introduction</p>
			</div>
			<div class="md:col-span-9">
				<SplitText
					as="p"
					text="Je m'appelle Zélie Louvencourt, j'ai 22 ans et je suis passionnée par l'univers de la communication."
					mode="lines"
					class="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1]"
				/>
				<p class="mt-10 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-ink)]/75">
					Curieuse, passionnée et motivée par les défis, j'aime créer des expériences uniques et développer des projets qui ont un impact réel, tout en cultivant le lien humain au cœur de mon travail.
				</p>
			</div>
		</div>
	</section>

	<!-- PARCOURS -->
	<section class="section">
		<div class="container-page grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-5">
				<ImageReveal
					src="/images/commun/ad92d70923b14d38a4949eaf.png"
					alt=""
					ratio="3/4"
					parallax={4}
				/>
			</div>
			<div class="md:col-span-6 md:col-start-7">
				<p class="eyebrow text-[color:var(--color-wine)]">Parcours</p>
				<h2 class="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05]">
					Mon parcours <span class="font-display-italic">et ma formation</span>
				</h2>
				<div class="mt-8 space-y-6 text-lg leading-relaxed text-[color:var(--color-ink)]/75">
					<p>
						Après l'obtention de mon baccalauréat général, j'ai choisi de me spécialiser dans la communication et j'ai intégré le BTS Communication en alternance.
					</p>
					<p>
						Depuis plus de deux ans, je travaille au sein de l'agence événementielle <strong>WEXX OI</strong>, située à La Réunion, où je participe à la conception et la réalisation de projets créatifs et événementiels.
					</p>
					<p>
						Cette expérience m'a permis de mettre en pratique mes compétences et de découvrir les différentes facettes du métier — de la stratégie à la production — tout en développant ma rigueur et ma créativité.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- VISION -->
	<section class="section bg-[color:var(--color-ink)] text-[color:var(--color-bg)]">
		<div class="container-page grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-6">
				<p class="eyebrow text-[color:var(--color-rose-soft)]">Vision</p>
				<h2 class="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05]">
					<span class="font-display-italic">Ma vision</span> et ma mission
				</h2>
				<div class="mt-8 space-y-6 text-lg leading-relaxed text-[color:var(--color-rose-soft)]">
					<p>
						Ma vision est de créer des projets de communication qui allient créativité, innovation et proximité humaine. Je crois au pouvoir des idées bien pensées pour transformer un concept en expérience mémorable.
					</p>
					<p>
						Mon objectif est de continuer à apprendre, à relever des défis et à collaborer avec des équipes passionnées pour concevoir des projets ambitieux et impactants.
					</p>
					<p>
						À terme, je souhaite contribuer à la naissance d'expériences uniques et, pourquoi pas, développer ma propre agence pour mettre ma vision de la communication au service de projets inspirants.
					</p>
				</div>
			</div>
			<div class="md:col-span-5 md:col-start-8 md:mt-24">
				<ImageReveal
					src="/images/commun/de89fdf056fc43fbbb2e031b.png"
					alt=""
					ratio="4/5"
					parallax={6}
				/>
			</div>
		</div>
	</section>

	<!-- INSPIRED BY -->
	<section class="section">
		<div class="container-page grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-4">
				<p class="eyebrow text-[color:var(--color-wine)]">Inspired by</p>
				<p class="mt-4 font-display-italic text-[clamp(1.5rem,2.5vw,2rem)] text-[color:var(--color-ink)]/60">
					Mes sources de curiosité.
				</p>
			</div>
			<ul class="md:col-span-8 space-y-1 font-display text-[clamp(2rem,5vw,4.5rem)] leading-none">
				{#each inspirations as item, i (item)}
					<li class="group flex items-baseline gap-6">
						<span class="eyebrow min-w-[3ch] text-[color:var(--color-rose)]">
							{String(i + 1).padStart(2, '0')}
						</span>
						<span class="transition-all duration-500 group-hover:italic group-hover:text-[color:var(--color-wine)]">
							{item}
						</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- CTA -->
	<section class="section">
		<div class="container-page">
			<div class="flex flex-wrap items-end justify-between gap-8 border-t border-[color:var(--color-ink)]/15 pt-12">
				<h2 class="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none">
					On travaille <span class="font-display-italic">ensemble</span> ?
				</h2>
				<MagneticLink
					href="/contact"
					strength={0.3}
					class="eyebrow inline-flex items-center gap-3 rounded-full border border-[color:var(--color-ink)] px-8 py-4 transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-bg)]"
					cursorLabel="écrire"
				>
					<span>Contactez-moi</span>
					<span aria-hidden="true">→</span>
				</MagneticLink>
			</div>
		</div>
	</section>
</article>
