<script lang="ts">
	import type { ProjectMeta } from '$lib/content/projects';

	type Props = { meta: ProjectMeta };
	let { meta }: Props = $props();

	const categoryLabel = $derived(meta.category === 'scolaire' ? 'Scolaire' : 'Professionnel');
</script>

<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<div class="container-page pt-36 pb-12">
		<!-- FOLIO -->
		<div class="flex flex-wrap items-baseline justify-between gap-4 border-b border-[color:var(--color-ink)]/25 pb-4">
			<span class="eyebrow">— Le Portfolio</span>
			<span class="font-display-italic text-sm tracking-wide text-[color:var(--color-ink)]/70">
				{categoryLabel}{#if meta.year}, {meta.year}{/if}
			</span>
			<span class="eyebrow">N° {String(meta.order).padStart(2, '0')}</span>
		</div>

		<!-- HEADLINE -->
		<div class="mx-auto mt-20 max-w-[26ch] text-center md:mt-28">
			<p class="eyebrow text-[color:var(--color-wine)]">
				{categoryLabel === 'Professionnel' ? 'Une mission' : 'Une étude'}
			</p>

			<h1 class="mt-8 font-display text-[clamp(3rem,8vw,8rem)] font-light leading-[0.95]">
				{meta.title}
			</h1>

			{#if meta.tagline}
				<p class="mx-auto mt-10 max-w-[36ch] font-display-italic text-[clamp(1.1rem,1.6vw,1.6rem)] leading-snug text-[color:var(--color-ink)]/75">
					{meta.tagline}
				</p>
			{/if}
		</div>

		<!-- BYLINE -->
		<div class="mx-auto mt-20 flex max-w-[60ch] flex-wrap items-center justify-center gap-x-12 gap-y-3 border-y border-[color:var(--color-ink)]/15 py-5">
			<span class="eyebrow text-[color:var(--color-ink)]/70">par Zélie Louvencourt</span>
			{#if meta.client}
				<span class="eyebrow text-[color:var(--color-ink)]/70">Client · {meta.client}</span>
			{/if}
			{#if meta.role}
				<span class="eyebrow text-[color:var(--color-ink)]/70">Rôle · {meta.role}</span>
			{/if}
		</div>
	</div>

	<!-- COVER -->
	<div class="container-page pb-24">
		<div class="overflow-hidden">
			{#if meta.coverVideo}
				<video
					src={meta.coverVideo}
					poster={meta.cover}
					autoplay
					muted
					loop
					playsinline
					aria-hidden="true"
					class="block h-auto max-h-[80svh] w-full object-cover"
				></video>
			{:else}
				<img
					src={meta.cover}
					alt={meta.title}
					class="block h-auto max-h-[80svh] w-full object-cover"
				/>
			{/if}
		</div>

		{#if meta.tagline}
			<p class="mt-4 text-center font-display-italic text-sm text-[color:var(--color-ink)]/55">
				Fig. 01 — {meta.title}
			</p>
		{/if}
	</div>
</section>
