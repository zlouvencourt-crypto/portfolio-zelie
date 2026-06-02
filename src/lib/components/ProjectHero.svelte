<script lang="ts">
	import type { ProjectMeta } from '$lib/content/projects';
	import Picture from '$components/Picture.svelte';
	import Video from '$components/Video.svelte';

	type Props = { meta: ProjectMeta };
	let { meta }: Props = $props();

	const categoryLabel = $derived(meta.category === 'scolaire' ? 'Scolaire' : 'Wexx OI');
</script>

<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<!-- Nom du projet en grand -->
	<div class="container-page pt-32 md:pt-40">
		<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/45">
			N° {String(meta.order).padStart(2, '0')}{#if meta.year} · {meta.year}{/if} — {categoryLabel}
		</p>
		<h1
			class="mt-5 font-display lowercase leading-[0.85]"
			style="font-size: clamp(2.75rem, 11vw, 9rem);"
		>
			{meta.title}
		</h1>
	</div>

	<!-- Couverture affichée dans son format naturel (jamais rognée) -->
	<figure class="mt-10 flex justify-center px-[var(--spacing-page)] md:mt-14">
		{#if meta.coverVideo}
			<Video src={meta.coverVideo} poster={meta.cover} class="block max-h-[80svh] w-auto max-w-full" />
		{:else}
			<Picture
				src={meta.cover}
				alt={meta.title}
				loading="eager"
				fetchpriority="high"
				class="block max-h-[80svh] w-auto max-w-full"
			/>
		{/if}
	</figure>

	<!-- Infos -->
	<div class="container-page flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between md:gap-16 md:py-16">
		<div class="max-w-[46ch]">
			{#if meta.tagline}
				<p class="font-sans text-[clamp(1.05rem,1.4vw,1.35rem)] leading-[1.6] text-[color:var(--color-ink)]/70">
					{meta.tagline}
				</p>
			{/if}
			<a
				href="#projet"
				class="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[color:var(--color-ink)] px-7 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-[color:var(--color-bg)] transition-opacity hover:opacity-80"
			>
				Découvrir
				<span aria-hidden="true">↓</span>
			</a>
		</div>

		<dl class="flex flex-wrap gap-x-10 gap-y-5">
			{#if meta.client}
				<div>
					<dt class="font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-[color:var(--color-ink)]/45">
						Client
					</dt>
					<dd class="mt-2 font-sans text-[0.95rem] text-[color:var(--color-ink)]/85">{meta.client}</dd>
				</div>
			{/if}
			{#if meta.role}
				<div>
					<dt class="font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-[color:var(--color-ink)]/45">
						Rôle
					</dt>
					<dd class="mt-2 font-sans text-[0.95rem] text-[color:var(--color-ink)]/85">{meta.role}</dd>
				</div>
			{/if}
			{#if meta.year}
				<div>
					<dt class="font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-[color:var(--color-ink)]/45">
						Année
					</dt>
					<dd class="mt-2 font-sans text-[0.95rem] text-[color:var(--color-ink)]/85">{meta.year}</dd>
				</div>
			{/if}
		</dl>
	</div>
</section>
