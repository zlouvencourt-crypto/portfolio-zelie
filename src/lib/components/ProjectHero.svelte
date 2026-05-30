<script lang="ts">
	import type { ProjectMeta } from '$lib/content/projects';

	type Props = { meta: ProjectMeta };
	let { meta }: Props = $props();

	const categoryLabel = $derived(meta.category === 'scolaire' ? 'Scolaire' : 'Wexx OI');
</script>

<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<div class="container-page pt-32 pb-20 md:pt-40 md:pb-28">
		<div class="grid grid-cols-12 items-center gap-x-8 gap-y-12 md:gap-x-16">
			<!-- LEFT — Titre & intro -->
			<div class="col-span-12 md:col-span-7 md:order-1">
				<p class="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--color-ink)]/55">
					N° {String(meta.order).padStart(2, '0')}{#if meta.year} · {meta.year}{/if} — {categoryLabel}
				</p>

				<h1 class="mt-8 font-display text-[clamp(2.75rem,7vw,6rem)] font-medium uppercase leading-[0.95]">
					{meta.title}
				</h1>

				{#if meta.tagline}
					<p class="mt-8 max-w-[52ch] font-display-italic text-[clamp(1.125rem,1.5vw,1.5rem)] leading-[1.45] text-[color:var(--color-ink)]/75">
						{meta.tagline}
					</p>
				{/if}

				<div class="mt-12 flex flex-wrap gap-x-10 gap-y-6">
					{#if meta.client}
						<div>
							<p class="font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-[color:var(--color-ink)]/50">
								Client
							</p>
							<p class="mt-2 text-[0.95rem] text-[color:var(--color-ink)]/90">{meta.client}</p>
						</div>
					{/if}
					{#if meta.role}
						<div>
							<p class="font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-[color:var(--color-ink)]/50">
								Rôle
							</p>
							<p class="mt-2 text-[0.95rem] text-[color:var(--color-ink)]/90">{meta.role}</p>
						</div>
					{/if}
					{#if meta.year}
						<div>
							<p class="font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-[color:var(--color-ink)]/50">
								Année
							</p>
							<p class="mt-2 text-[0.95rem] text-[color:var(--color-ink)]/90">{meta.year}</p>
						</div>
					{/if}
				</div>

				<a
					href="#projet"
					class="mt-12 inline-flex items-center gap-3 border border-[color:var(--color-ink)] px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.35em] text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-bg)]"
				>
					Découvrir
					<span aria-hidden="true">↓</span>
				</a>
			</div>

			<!-- RIGHT — Visuel de couverture -->
			<figure class="col-span-12 md:col-span-5 md:order-2">
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
			</figure>
		</div>
	</div>
</section>
