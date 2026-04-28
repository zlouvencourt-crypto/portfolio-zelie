<script lang="ts">
	import ProjectHero from '$components/ProjectHero.svelte';
	import BriefBlock from '$components/BriefBlock.svelte';
	import ProjectGallery from '$components/ProjectGallery.svelte';
	import ImageReveal from '$components/ImageReveal.svelte';
	import MagneticLink from '$components/MagneticLink.svelte';

	let { data } = $props();
</script>

<article>
	<ProjectHero meta={data.meta} />

	{#if !data.meta.visualOnly}
		<BriefBlock meta={data.meta} />
	{:else}
		<section class="bg-[color:var(--color-bg)]">
			<div class="container-page section">
				<p class="eyebrow text-[color:var(--color-wine)]">Étude de cas</p>
				<p class="mt-6 max-w-[50ch] font-display text-[clamp(1.5rem,2.5vw,2.5rem)] leading-tight text-[color:var(--color-ink)]/75">
					Le brief détaillé sera publié prochainement. En attendant, place aux visuels.
				</p>
			</div>
		</section>
	{/if}

	<ProjectGallery items={data.meta.gallery ?? []} />

	<!-- Prev / Next -->
	<section class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
		<div class="container-page section grid grid-cols-1 gap-16 md:grid-cols-2">
			{#if data.prev}
				<MagneticLink
					href={`/${data.prev.category}/${data.prev.slug}`}
					strength={0.12}
					class="group block"
					cursorLabel="précédent"
				>
					<p class="eyebrow text-[color:var(--color-wine)]">← Précédent</p>
					<div class="mt-6 overflow-hidden">
						<div class="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
							<ImageReveal src={data.prev.cover} alt={data.prev.title} ratio="16/10" />
						</div>
					</div>
					<h3 class="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] leading-none">
						{data.prev.title}
					</h3>
				</MagneticLink>
			{/if}
			{#if data.next}
				<MagneticLink
					href={`/${data.next.category}/${data.next.slug}`}
					strength={0.12}
					class="group block md:text-right"
					cursorLabel="suivant"
				>
					<p class="eyebrow text-[color:var(--color-wine)]">Suivant →</p>
					<div class="mt-6 overflow-hidden">
						<div class="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
							<ImageReveal src={data.next.cover} alt={data.next.title} ratio="16/10" />
						</div>
					</div>
					<h3 class="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] leading-none">
						{data.next.title}
					</h3>
				</MagneticLink>
			{/if}
		</div>
	</section>
</article>
