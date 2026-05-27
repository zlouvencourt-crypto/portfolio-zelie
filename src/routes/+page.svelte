<script lang="ts">
	import SplitText from '$components/SplitText.svelte';
</script>

<article>
	<!-- HERO -->
	<section class="relative h-[100svh] w-full overflow-hidden bg-[color:var(--color-ink)] text-white">
		<video
			src="/images/accueil/video/accueil-1080p.mp4"
			class="absolute inset-0 h-full w-full object-cover opacity-65"
			autoplay
			muted
			loop
			playsinline
			poster="/images/accueil/00e578ba010c422290a36b73.jpg"
		></video>
		<div class="absolute inset-0 bg-[color:var(--color-ink)]/35"></div>

		<div class="container-page relative flex h-full flex-col items-center justify-center py-24 text-center">
			<p class="eyebrow text-white/80">Portfolio · 2024 — 2026 · La Réunion</p>

			<SplitText
				as="h1"
				text="Zélie Louvencourt"
				mode="chars"
				trigger="mount"
				stagger={0.03}
				duration={1.4}
				class="mt-12 font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[1] text-white"
			/>

			<SplitText
				as="p"
				text="Communication · Direction artistique · Événementiel"
				mode="words"
				trigger="mount"
				delay={0.4}
				class="mt-10 font-display-italic text-[clamp(0.95rem,1.3vw,1.25rem)] tracking-wide text-white/85"
			/>

			<a
				href="/scolaire"
				class="mt-16 inline-flex items-center gap-3 border-b border-white pb-1 font-sans text-[11px] font-light uppercase tracking-[0.32em] text-white transition-opacity hover:opacity-70"
			>
				<span>Découvrir les projets</span>
				<span aria-hidden="true">→</span>
			</a>
		</div>
	</section>
</article>
