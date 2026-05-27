<script lang="ts">
	import type { ProjectMeta } from '$lib/content/projects';

	type Props = { meta: ProjectMeta };
	let { meta }: Props = $props();

	const categoryLabel = $derived(meta.category === 'scolaire' ? 'Scolaire' : 'Professionnel');
</script>

<section class="relative h-[100svh] w-full overflow-hidden bg-[color:var(--color-ink)] text-white">
	{#if meta.coverVideo}
		<video
			src={meta.coverVideo}
			poster={meta.cover}
			autoplay
			muted
			loop
			playsinline
			aria-hidden="true"
			class="absolute inset-0 h-full w-full object-cover opacity-80"
		></video>
	{:else}
		<img
			src={meta.cover}
			alt={meta.title}
			class="absolute inset-0 h-full w-full object-cover opacity-80"
		/>
	{/if}
	<div class="absolute inset-0 bg-gradient-to-b from-[color:var(--color-ink)]/30 via-transparent to-[color:var(--color-ink)]/85"></div>

	<!-- FOLIO -->
	<div class="container-page absolute inset-x-0 top-32 flex flex-wrap items-baseline justify-between gap-4">
		<span class="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-white">
			— Le Portfolio · {categoryLabel}
		</span>
		<span class="font-display-italic text-base text-white/85">
			N° {String(meta.order).padStart(2, '0')}{#if meta.year} · {meta.year}{/if}
		</span>
	</div>

	<!-- HEADLINE OVERLAID -->
	<div class="container-page absolute inset-x-0 bottom-0 flex flex-col items-center pb-20 text-center">
		<p class="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-white/80">
			{categoryLabel === 'Professionnel' ? 'Une mission' : 'Une étude'}
		</p>

		<h1 class="mt-8 max-w-[18ch] font-display text-[clamp(3.5rem,10vw,10rem)] font-medium leading-[0.95] text-white">
			{meta.title}
		</h1>

		{#if meta.tagline}
			<p class="mt-8 max-w-[42ch] font-display-italic text-[clamp(1.1rem,1.6vw,1.6rem)] leading-snug text-white/90">
				{meta.tagline}
			</p>
		{/if}

		<!-- BYLINE -->
		<div class="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 border-t border-white/30 pt-6 text-white/85">
			<span class="font-sans text-[10px] font-medium uppercase tracking-[0.28em]">par Zélie Louvencourt</span>
			{#if meta.client}
				<span class="font-sans text-[10px] font-medium uppercase tracking-[0.28em]">Client · {meta.client.split(',')[0]}</span>
			{/if}
			{#if meta.role}
				<span class="font-sans text-[10px] font-medium uppercase tracking-[0.28em]">{meta.role.split('—')[0].trim()}</span>
			{/if}
		</div>
	</div>

	<!-- SCROLL INDICATOR -->
	<div class="container-page absolute inset-x-0 bottom-6 flex justify-center">
		<span class="font-display-italic text-xs text-white/70">— lire l'article —</span>
	</div>
</section>
