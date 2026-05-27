<script lang="ts">
	import SplitText from '$components/SplitText.svelte';
	import ImageReveal from '$components/ImageReveal.svelte';
	import MagneticLink from '$components/MagneticLink.svelte';

	const keywords = ['Stratégie', 'Image', 'Mode', 'Branding', 'Social Media', 'Émotion'];

	const piliers = [
		{ title: 'Stratégie', text: 'Donner une direction claire à chaque prise de parole.' },
		{ title: 'Image', text: 'Construire une identité forte, reconnaissable, durable.' },
		{ title: 'Émotion', text: 'Créer un lien sensible avec le public visé.' }
	];

	const competences = [
		{
			title: 'Direction artistique',
			text: 'Définir le ton visuel, choisir les images, dessiner les codes d\'une marque pour qu\'elle existe avant même de parler.'
		},
		{
			title: 'Réseaux sociaux',
			text: 'Concevoir et orchestrer des contenus pensés pour le format, le rythme et les codes de chaque plateforme.'
		},
		{
			title: 'Branding',
			text: 'Construire une identité cohérente — logo, charte, voix, attitudes — pour ancrer une marque dans son époque.'
		},
		{
			title: 'Contenu éditorial',
			text: 'Écrire pour le digital, le print et l\'événementiel avec un souci d\'élégance et de précision.'
		}
	];
</script>

<article class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<!-- 1. HERO -->
	<section class="relative h-[100svh] w-full overflow-hidden bg-[color:var(--color-ink)] text-white">
		<img
			src="/images/a-propos/portrait.jpg"
			alt="Portrait — Zélie Louvencourt"
			class="absolute inset-0 h-full w-full object-cover opacity-55"
		/>
		<div class="absolute inset-0 bg-[color:var(--color-ink)]/55"></div>
		<div class="absolute inset-0 bg-gradient-to-b from-[color:var(--color-ink)]/40 via-transparent to-[color:var(--color-ink)]/80"></div>

		<div class="container-page relative flex min-h-[100svh] flex-col items-center justify-center pt-32 pb-20 text-center">
			<p class="eyebrow text-white/80">À propos</p>

			<SplitText
				as="h1"
				text="Là où la communication rencontre le style"
				mode="words"
				trigger="mount"
				stagger={0.04}
				class="mt-10 max-w-[18ch] font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[1] text-white"
			/>

			<SplitText
				as="p"
				text="Créer du sens, provoquer une émotion, laisser une impression."
				mode="words"
				trigger="mount"
				delay={0.4}
				stagger={0.025}
				class="mt-10 max-w-[42ch] font-display-italic text-[clamp(1.1rem,1.6vw,1.6rem)] leading-snug text-white/90"
			/>

			<p class="mt-10 max-w-[50ch] text-base leading-relaxed text-white/75">
				J'imagine des contenus, des identités et des expériences visuelles qui racontent une histoire avant même qu'un mot soit prononcé.
			</p>

			<MagneticLink
				href="#manifeste"
				strength={0.2}
				class="eyebrow mt-12 inline-flex items-center gap-3 border border-white px-8 py-4 text-white transition-colors hover:bg-white hover:text-[color:var(--color-ink)]"
				cursorLabel="voir"
			>
				<span>Découvrir mon univers</span>
				<span aria-hidden="true">→</span>
			</MagneticLink>
		</div>
	</section>

	<!-- 2. BANDEAU ÉDITORIAL -->
	<section class="border-y border-[color:var(--color-ink)]/15 bg-[color:var(--color-bg)] py-8 overflow-hidden">
		<div class="container-page">
			<ul class="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
				{#each keywords as word, i (word)}
					<li class="font-sans text-xs font-light uppercase tracking-[0.32em] text-[color:var(--color-ink)]/70">
						{word}
					</li>
					{#if i < keywords.length - 1}
						<li class="text-[color:var(--color-wine)]" aria-hidden="true">—</li>
					{/if}
				{/each}
			</ul>
		</div>
	</section>

	<!-- 3. PRÉSENTATION -->
	<section class="section">
		<div class="container-page grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
			<div class="md:col-span-5">
				<ImageReveal
					src="/images/a-propos/portrait.jpg"
					alt="Portrait lifestyle Zélie Louvencourt"
					ratio="4/5"
					parallax={5}
				/>
			</div>
			<div class="md:col-span-6 md:col-start-7 md:pt-12">
				<p class="eyebrow text-[color:var(--color-wine)]">Présentation</p>
				<h2 class="mt-6 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95]">
					Moi, <span class="font-display-italic">c'est Zélie.</span>
				</h2>
				<p class="mt-10 max-w-[55ch] text-lg leading-relaxed text-[color:var(--color-ink)]/80">
					Je suis passionnée par la communication, l'image et la manière dont une marque peut exister dans l'esprit des gens. Pour moi, communiquer, ce n'est pas seulement transmettre une information : c'est créer une perception, une émotion, une identité.
				</p>

				<figure class="mt-14 border-l-2 border-[color:var(--color-wine)] pl-8">
					<blockquote class="font-display-italic text-[clamp(1.5rem,2.5vw,2.25rem)] leading-snug text-[color:var(--color-wine)]">
						« Communiquer, c'est transformer une idée en style, et un style en émotion. »
					</blockquote>
				</figure>
			</div>
		</div>
	</section>

	<!-- 4. MANIFESTE -->
	<section id="manifeste" class="bg-[color:var(--color-ink)] text-white">
		<div class="container-page section">
			<p class="eyebrow text-white/60">Manifeste</p>

			<SplitText
				as="h2"
				text="Je crois qu'une bonne communication se voit, se ressent et se retient."
				mode="lines"
				class="mt-10 max-w-[24ch] font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-white"
			/>

			<div class="mt-24 grid grid-cols-1 gap-12 border-t border-white/20 pt-16 md:grid-cols-3 md:gap-16">
				{#each piliers as pillier, i (pillier.title)}
					<article>
						<p class="eyebrow text-white/50">{String(i + 1).padStart(2, '0')}</p>
						<h3 class="mt-4 font-display-italic text-[clamp(1.75rem,3vw,2.5rem)] text-white">
							{pillier.title}
						</h3>
						<p class="mt-6 max-w-[28ch] text-base leading-relaxed text-white/75">
							{pillier.text}
						</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- 5. COMPÉTENCES -->
	<section class="section">
		<div class="container-page">
			<div class="flex flex-wrap items-end justify-between gap-8">
				<div>
					<p class="eyebrow text-[color:var(--color-wine)]">Compétences</p>
					<h2 class="mt-4 max-w-[22ch] font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05]">
						Mes <span class="font-display-italic">terrains</span> de jeu.
					</h2>
				</div>
			</div>

			<div class="mt-16 grid grid-cols-1 gap-px bg-[color:var(--color-ink)]/15 md:grid-cols-2">
				{#each competences as item, i (item.title)}
					<article class="group bg-[color:var(--color-bg)] p-10 transition-colors duration-500 hover:bg-[color:var(--color-cream)] md:p-14">
						<p class="eyebrow text-[color:var(--color-rose)]">
							{String(i + 1).padStart(2, '0')}
						</p>
						<h3 class="mt-6 font-display text-[clamp(1.75rem,2.8vw,2.5rem)] leading-tight">
							{item.title}
						</h3>
						<p class="mt-6 max-w-[45ch] leading-relaxed text-[color:var(--color-ink)]/75">
							{item.text}
						</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- 6. CTA -->
	<section class="section">
		<div class="container-page border-t border-[color:var(--color-ink)]/15 pt-20 text-center">
			<SplitText
				as="h2"
				text="Et si on donnait du style à vos idées ?"
				mode="words"
				class="mx-auto max-w-[24ch] font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.05]"
			/>
			<p class="mx-auto mt-10 max-w-[55ch] text-lg leading-relaxed text-[color:var(--color-ink)]/75">
				Je conçois des supports de communication qui ne se contentent pas d'être beaux : ils doivent être justes, cohérents et mémorables.
			</p>
			<MagneticLink
				href="/contact"
				strength={0.25}
				class="eyebrow mt-12 inline-flex items-center gap-3 border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-10 py-4 text-white transition-colors hover:bg-transparent hover:text-[color:var(--color-ink)]"
				cursorLabel="écrire"
			>
				<span>Me contacter</span>
				<span aria-hidden="true">→</span>
			</MagneticLink>
		</div>
	</section>
</article>
