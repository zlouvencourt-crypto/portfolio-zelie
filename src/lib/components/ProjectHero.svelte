<script lang="ts">
	import type { ProjectMeta } from '$lib/content/projects';

	type Props = { meta: ProjectMeta };
	let { meta }: Props = $props();

	const categoryLabel = $derived(meta.category === 'scolaire' ? 'Scolaire' : 'Wexx OI');
	// Découpe le titre en mots pour l'empilement vertical façon magazine
	const titleWords = $derived(meta.title.split(' '));
</script>

<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<div class="container-page pt-36 pb-20 md:pt-44 md:pb-32">
		<!-- TOP RIGHT FOLIO -->
		<div class="mb-12 flex items-baseline justify-between md:mb-16">
			<span class="font-display-italic text-sm text-[color:var(--color-ink)]/60">
				N° {String(meta.order).padStart(2, '0')}{#if meta.year} · {meta.year}{/if}
			</span>
			<span class="font-sans text-[11px] font-medium uppercase tracking-[0.38em] text-[color:var(--color-ink)]/70">
				— {categoryLabel}
			</span>
		</div>

		<!-- MAGAZINE SPREAD -->
		<div class="grid grid-cols-12 gap-6 md:gap-12">
			<!-- LEFT — Hero image / video -->
			<figure class="relative col-span-12 md:col-span-7">
				{#if meta.coverVideo}
					<video
						src={meta.coverVideo}
						poster={meta.cover}
						autoplay
						muted
						loop
						playsinline
						class="block h-auto w-full"
					></video>
				{:else}
					<img src={meta.cover} alt={meta.title} class="block h-auto w-full" />
				{/if}
				{#if meta.client}
					<figcaption class="absolute right-4 top-4 max-w-[18ch] text-right font-display-italic text-xs leading-snug text-white drop-shadow-md md:right-6 md:top-6 md:text-sm">
						{meta.client}
					</figcaption>
				{/if}
			</figure>

			<!-- RIGHT — Title block -->
			<div class="col-span-12 flex flex-col justify-center md:col-span-5 md:pt-8">
				<h1 class="font-display text-[clamp(3.5rem,9vw,8rem)] font-medium uppercase leading-[0.92]">
					{#each titleWords as word, i (i)}
						<span class="block">{word}</span>
					{/each}
				</h1>

				{#if meta.tagline}
					<p class="mt-8 max-w-[34ch] font-display-italic text-[clamp(1rem,1.4vw,1.35rem)] leading-snug text-[color:var(--color-ink)]/80">
						{meta.tagline}
					</p>
				{/if}

				<div class="mt-12 space-y-1 text-sm">
					<p class="font-display-italic text-[color:var(--color-ink)]/70">par Lize Louvencourt</p>
					{#if meta.role}
						<p class="font-display-italic text-[color:var(--color-ink)]/70">{meta.role}</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
