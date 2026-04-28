<script lang="ts">
	import SplitText from '$components/SplitText.svelte';
	import MagneticLink from '$components/MagneticLink.svelte';
</script>

<article>
	<!-- HERO -->
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
		<div class="absolute inset-0 bg-[color:var(--color-ink)]/40"></div>

		<div class="container-page relative flex h-full flex-col justify-between py-32">
			<div class="flex items-start justify-between">
				<p class="eyebrow text-white">
					Portfolio<br />2024 - 2026
				</p>
				<p class="eyebrow hidden text-right text-white md:block">
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
					class="font-display text-[clamp(2rem,5vw,4.5rem)] font-light tracking-tight leading-[1.05] text-white"
				/>
				<div class="mt-10 flex flex-wrap items-end justify-between gap-10">
					<SplitText
						as="p"
						text="Communication · Direction artistique · Événementiel"
						mode="words"
						trigger="mount"
						delay={0.45}
						class="font-display-italic text-[clamp(1rem,1.4vw,1.5rem)] text-white"
					/>
					<MagneticLink
						href="/scolaire"
						strength={0.25}
						class="eyebrow inline-flex items-center gap-3 rounded-full border border-white px-6 py-3 text-white transition-colors hover:bg-white hover:text-[color:var(--color-ink)]"
						cursorLabel="voir"
					>
						<span>Mes projets</span>
						<span aria-hidden="true">→</span>
					</MagneticLink>
				</div>
			</div>
		</div>
	</section>
</article>
