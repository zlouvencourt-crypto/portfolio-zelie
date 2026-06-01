<script lang="ts">
	import type { ProjectMeta } from '$lib/content/projects';
	import Picture from '$components/Picture.svelte';
	import Video from '$components/Video.svelte';

	type Props = { meta: ProjectMeta };
	let { meta }: Props = $props();
</script>

<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<!-- COUVERTURE plein cadre + nom du projet en géant (façon « sage ») -->
	<div class="relative h-[82svh] min-h-[480px] w-full overflow-hidden md:h-[92svh]">
		{#if meta.coverVideo}
			<Video src={meta.coverVideo} poster={meta.cover} class="absolute inset-0 h-full w-full object-cover" />
		{:else}
			<Picture
				src={meta.cover}
				alt={meta.title}
				loading="eager"
				fetchpriority="high"
				class="absolute inset-0 h-full w-full object-cover"
			/>
		{/if}
		<div class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/35"></div>

		<h1
			class="absolute inset-x-0 bottom-0 px-[var(--spacing-page)] pb-1 font-display lowercase leading-[0.82] text-white md:pb-3"
			style="font-size: clamp(3rem, 13vw, 11rem);"
		>
			{meta.title}
		</h1>
	</div>

	<!-- BANDE INFOS sous l'image -->
	<div class="container-page flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between md:gap-16 md:py-14">
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
