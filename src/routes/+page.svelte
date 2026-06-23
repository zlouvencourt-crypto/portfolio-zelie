<script lang="ts">
	import { reveal, accent } from '$utils/scroll';
	import Magnetic from '$components/Magnetic.svelte';
	import Marquee from '$components/Marquee.svelte';
	import CursorAura from '$components/CursorAura.svelte';

	const keywords = [
		'Événementiel',
		'Stratégie',
		'Création',
		'Production',
		'Régie',
		'Médias',
		'Influence',
		'La Réunion'
	];

	// Aperçu des expertises — chaque vignette a sa propre couleur de la palette.
	const apercu = [
		{ n: '01', titre: 'Stratégie & conseil', desc: 'On réfléchit avant de faire du bruit.', c: '#12D6C6' },
		{ n: '02', titre: 'Création & direction artistique', desc: 'Une identité forte pour un événement qu’on n’oublie pas.', c: '#FF3D6E' },
		{ n: '03', titre: 'Production & régie', desc: 'Le spectaculaire, c’est 90 % d’organisation.', c: '#FFD23F' },
		{ n: '04', titre: 'Communication & médias', desc: 'On fait parler de vous, aux bons endroits.', c: '#9B6CFF' }
	];
</script>

<!-- aura lumineuse interactive qui suit la souris -->
<CursorAura />

<!-- ░░░░░░░░ HERO ░░░░░░░░ -->
<section
	class="hero relative flex h-[100svh] w-full flex-col justify-end overflow-hidden"
	use:accent={'#12d6c6'}
>
	<video
		class="absolute inset-0 h-full w-full object-cover brightness-[0.8]"
		autoplay
		muted
		loop
		playsinline
		preload="metadata"
		poster="/videos/hero-poster.jpg"
	>
		<source src="/videos/hero.webm" type="video/webm" />
		<source src="/videos/hero.mp4" type="video/mp4" />
	</video>
	<div class="hero-veil" aria-hidden="true"></div>

	<div class="container-page relative z-10 pb-[12vh]">
		<p class="eyebrow text-[color:var(--color-cream)]/70" use:reveal={{ y: 40 }}>
			[ WEXX — Indian Ocean · 21°S ]
		</p>

		<h1 class="hero-title mt-6 font-display text-[length:var(--text-hero)]">
			<span class="reveal-mask"><span class="block" use:reveal={{ delay: 0.05 }}>On fait vibrer</span></span>
			<span class="reveal-mask"><span class="block" use:reveal={{ delay: 0.18 }}>l’océan Indien.</span></span>
		</h1>

		<div class="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
			<div class="max-w-[46ch]" use:reveal={{ y: 40, delay: 0.3 }}>
				<p class="text-[clamp(1.05rem,1.5vw,1.4rem)] leading-[1.6] text-[color:var(--color-cream)]/80">
					Agence de communication événementielle à La Réunion. On imagine, on orchestre et on fait
					vivre des événements qui marquent les esprits — et le territoire.
				</p>
			</div>

			<div use:reveal={{ y: 40, delay: 0.4 }}>
				<Magnetic strength={0.4}>
					<a
						href="/contact"
						class="group inline-flex items-center gap-4 rounded-full bg-[var(--accent)] px-8 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-night)]"
					>
						Parlons de votre projet
						<span aria-hidden="true" class="transition-transform duration-500 group-hover:translate-x-1">→</span>
					</a>
				</Magnetic>
			</div>
		</div>
	</div>

	<div class="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-cream)]/40">
		Scroll
	</div>
</section>

<!-- bandeau défilant, sous la vidéo -->
<div class="border-y border-white/10 py-7">
	<Marquee items={keywords} />
</div>

<!-- ░░░░░░░░ QUI SOMMES-NOUS (teaser) ░░░░░░░░ -->
<section class="py-32 md:py-48" use:accent={'#ff3d6e'}>
	<div class="container-page grid gap-10 md:grid-cols-12 md:gap-16">
		<div class="md:col-span-5">
			<p class="eyebrow text-[color:var(--color-cream)]/50">[ Qui sommes-nous ]</p>
			<h2 class="mt-7 max-w-[12ch] font-display text-[length:var(--text-big)]" use:reveal>
				Un événement réussi, ça se connaît.
			</h2>
		</div>
		<div class="md:col-span-6 md:col-start-7">
			<div
				class="space-y-6 text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.75] text-[color:var(--color-cream)]/75"
				use:reveal={{ y: 30, delay: 0.1 }}
			>
				<p>
					À La Réunion, un bon événement ne s’improvise pas. Il se connaît, il se ressent, il se
					construit avec ceux qui maîtrisent le terrain. Les publics, les lieux, les réseaux, les
					codes : on les pratique depuis l’intérieur.
				</p>
				<p>
					WEXX OI, c’est la rencontre entre une connaissance fine du territoire et une exigence
					créative sans compromis. On ne fait pas « comme ailleurs ». On fait comme ici —
					<span class="text-accent">en mieux.</span>
				</p>
			</div>
			<a
				href="/esprit"
				class="group mt-10 inline-flex items-center gap-3 font-sans text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-[var(--accent)]"
				use:reveal={{ y: 20, delay: 0.2 }}
			>
				L’esprit WEXX
				<span aria-hidden="true" class="transition-transform duration-500 group-hover:translate-x-1">→</span>
			</a>
		</div>
	</div>
</section>

<!-- ░░░░░░░░ CE QU'ON FAIT (aperçu expertises) ░░░░░░░░ -->
<section class="border-t border-white/10 py-32 md:py-48" use:accent={'#12d6c6'}>
	<div class="container-page">
		<div class="max-w-[58ch]">
			<p class="eyebrow text-[color:var(--color-cream)]/50">[ Ce qu’on fait ]</p>
			<h2 class="mt-7 max-w-[15ch] font-display text-[length:var(--text-big)]" use:reveal>
				De l’idée à la dernière lumière éteinte.
			</h2>
			<p
				class="mt-8 text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.7] text-[color:var(--color-cream)]/75"
				use:reveal={{ y: 30, delay: 0.1 }}
			>
				On vous accompagne sur toute la chaîne. Stratégie, création, production, médias : un seul
				interlocuteur, du premier brief au dernier applaudissement.
			</p>
		</div>

		<div class="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each apercu as item, i (item.n)}
				<a
					href="/expertise"
					class="exp-card group"
					style="--c:{item.c}"
					use:reveal={{ y: 36, delay: i * 0.08 }}
				>
					<span class="exp-num">{item.n}</span>
					<div class="mt-auto">
						<h3 class="exp-title">{item.titre}</h3>
						<p class="exp-desc">{item.desc}</p>
					</div>
					<span class="exp-arrow" aria-hidden="true">↗</span>
				</a>
			{/each}
		</div>

		<div class="mt-14" use:reveal={{ y: 20, delay: 0.1 }}>
			<a
				href="/expertise"
				class="group inline-flex items-center gap-3 font-sans text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-[var(--accent)]"
			>
				Découvrir nos expertises
				<span aria-hidden="true" class="transition-transform duration-500 group-hover:translate-x-1">→</span>
			</a>
		</div>
	</div>
</section>

<!-- ░░░░░░░░ POSITIONNEMENT ░░░░░░░░ -->
<section class="border-t border-white/10 py-32 md:py-52" use:accent={'#ffd23f'}>
	<div class="container-page">
		<p class="eyebrow mb-10 text-[color:var(--color-cream)]/50">[ Notre signature ]</p>
		<p class="max-w-[18ch] font-display text-[length:var(--text-giant)]">
			<span class="reveal-mask"><span class="block" use:reveal>On transforme</span></span>
			<span class="reveal-mask"><span class="block text-[color:var(--color-cream)]/35" use:reveal={{ delay: 0.1 }}>l’ordinaire</span></span>
			<span class="reveal-mask"><span class="block text-accent" use:reveal={{ delay: 0.2 }}>en extraordinaire.</span></span>
		</p>

		<div class="mt-12" use:reveal={{ y: 30, delay: 0.3 }}>
			<Magnetic strength={0.4}>
				<a
					href="/realisations"
					class="group inline-flex items-center gap-4 rounded-full border border-[color:var(--color-cream)]/30 px-8 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
				>
					Voir nos réalisations
					<span aria-hidden="true" class="transition-transform duration-500 group-hover:translate-x-1">→</span>
				</a>
			</Magnetic>
		</div>
	</div>
</section>

<!-- ░░░░░░░░ CTA FINAL ░░░░░░░░ -->
<section
	class="relative flex min-h-[88svh] items-center justify-center overflow-hidden border-t border-white/10 py-32 text-center"
	use:accent={'#12d6c6'}
>
	<div class="container-page relative z-10">
		<p class="eyebrow text-[color:var(--color-cream)]/50">[ On en parle ]</p>
		<h2 class="mx-auto mt-8 max-w-[16ch] font-display text-[length:var(--text-giant)]">
			<span class="reveal-mask"><span class="block" use:reveal>Vous avez un événement</span></span>
			<span class="reveal-mask"><span class="block" use:reveal={{ delay: 0.1 }}>en tête ?</span></span>
			<span class="reveal-mask"><span class="block text-accent" use:reveal={{ delay: 0.2 }}>Nous avons déjà des idées.</span></span>
		</h2>
		<div class="mt-14">
			<Magnetic strength={0.4}>
				<a
					href="/contact"
					class="group inline-flex items-center gap-4 rounded-full bg-[var(--accent)] px-9 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-night)]"
				>
					Parlons de votre projet
					<span aria-hidden="true" class="transition-transform duration-500 group-hover:translate-x-1">→</span>
				</a>
			</Magnetic>
		</div>
	</div>
</section>

<!-- ░░░░░░░░ FOOTER ░░░░░░░░ -->
<footer class="border-t border-white/10 py-14">
	<div class="container-page flex flex-col items-center justify-between gap-8 md:flex-row">
		<img src="/brand/wexx-white.png" alt="WEXX Indian Ocean" class="h-5 w-auto" />
		<p class="font-display text-[clamp(1.5rem,3vw,2.2rem)]">On fait vibrer l’océan Indien.</p>
		<div class="flex gap-6 font-sans text-[12px] uppercase tracking-[0.15em] text-[color:var(--color-cream)]/55">
			<a href="#" class="hover:text-[var(--accent)]">LinkedIn ↗</a>
			<a href="#" class="hover:text-[var(--accent)]">Instagram ↗</a>
		</div>
	</div>
	<p class="container-page mt-10 font-sans text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-cream)]/35">
		© {new Date().getFullYear()} WEXX Indian Ocean — La Réunion
	</p>
</footer>

<style>
	.hero-veil {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(to top, var(--bg) 30%, transparent 72%),
			color-mix(in srgb, var(--accent) 14%, transparent),
			rgba(8, 8, 8, 0.8);
	}
	.hero-title {
		mix-blend-mode: difference;
		color: #fff;
	}

	/* Vignettes « Ce qu'on fait » — différenciées par leur couleur (--c) */
	.exp-card {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 290px;
		padding: 1.75rem;
		border: 1px solid color-mix(in srgb, var(--c) 32%, transparent);
		border-radius: 14px;
		background: color-mix(in srgb, var(--c) 5%, transparent);
		overflow: hidden;
		transition:
			transform 0.5s var(--ease-out-expo),
			background-color 0.5s ease,
			border-color 0.5s ease;
	}
	.exp-card::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 3px;
		background: var(--c);
		transform-origin: left;
		transform: scaleX(0.4);
		transition: transform 0.5s var(--ease-out-expo);
	}
	.exp-card:hover {
		transform: translateY(-6px);
		background: color-mix(in srgb, var(--c) 14%, transparent);
		border-color: var(--c);
	}
	.exp-card:hover::before {
		transform: scaleX(1);
	}
	.exp-num {
		font-family: var(--font-display);
		font-size: clamp(2.4rem, 4vw, 3.4rem);
		line-height: 1;
		color: var(--c);
	}
	.exp-title {
		font-family: var(--font-alt);
		font-weight: 700;
		font-size: 1.12rem;
		line-height: 1.15;
		text-transform: uppercase;
		letter-spacing: -0.01em;
	}
	.exp-desc {
		margin-top: 0.6rem;
		font-size: 0.96rem;
		line-height: 1.5;
		color: color-mix(in srgb, var(--color-cream) 68%, transparent);
	}
	.exp-arrow {
		position: absolute;
		top: 1.6rem;
		right: 1.6rem;
		font-size: 1.2rem;
		color: var(--c);
		opacity: 0;
		transform: translate(-4px, 4px);
		transition:
			opacity 0.4s ease,
			transform 0.4s var(--ease-out-expo);
	}
	.exp-card:hover .exp-arrow {
		opacity: 1;
		transform: translate(0, 0);
	}
</style>
