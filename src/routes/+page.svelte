<script lang="ts">
	import { reveal, accent } from '$utils/scroll';
	import Magnetic from '$components/Magnetic.svelte';
	import Marquee from '$components/Marquee.svelte';

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
</script>

<!-- ░░░░░░░░ HERO ░░░░░░░░ -->
<section
	class="hero relative flex h-[100svh] w-full flex-col overflow-hidden"
	use:accent={'#12d6c6'}
>
	<video
		class="absolute inset-0 h-full w-full object-cover"
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

	<!-- bandeau défilant, sous le menu -->
	<div class="relative z-10 mt-[clamp(4.6rem,9vh,6.2rem)] border-y border-white/15 bg-[color-mix(in_srgb,var(--color-night)_25%,transparent)] py-3 backdrop-blur-[2px]">
		<Marquee items={keywords} />
	</div>

	<div class="container-page relative z-10 mt-auto pb-[12vh]">
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

<!-- ░░░░░░░░ POSITIONNEMENT ░░░░░░░░ -->
<section class="border-t border-white/10 py-32 md:py-52" use:accent={'#ffd23f'}>
	<div class="container-page">
		<p class="eyebrow mb-10 text-[color:var(--color-cream)]/50">[ Notre signature ]</p>
		<p class="max-w-[18ch] font-display text-[length:var(--text-giant)]">
			<span class="reveal-mask"><span class="block" use:reveal>On transforme</span></span>
			<span class="reveal-mask"><span class="block text-[color:var(--color-cream)]/35" use:reveal={{ delay: 0.1 }}>l’ordinaire</span></span>
			<span class="reveal-mask"><span class="block text-accent" use:reveal={{ delay: 0.2 }}>en extraordinaire.</span></span>
		</p>
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
			linear-gradient(to top, var(--color-night) 3%, transparent 50%),
			color-mix(in srgb, var(--accent) 14%, transparent),
			color-mix(in srgb, var(--color-night) 25%, transparent);
	}
	.hero-title {
		mix-blend-mode: difference;
		color: #fff;
	}
</style>
