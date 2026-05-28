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
	<section class="bg-[color:var(--color-ink)] text-white">
		<div class="container-page py-24">
			<p class="eyebrow text-center text-white/60">— Continuer la lecture —</p>
			<div class="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
				{#if data.prev}
					<a href={`/${data.prev.category}/${data.prev.slug}`} class="group block">
						<p class="eyebrow text-[color:var(--color-wine)]">← Article précédent</p>
						<h3 class="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-medium leading-tight text-white transition-opacity group-hover:opacity-60">
							{data.prev.title}
						</h3>
					</a>
				{/if}
				{#if data.next}
					<a href={`/${data.next.category}/${data.next.slug}`} class="group block md:text-right">
						<p class="eyebrow text-[color:var(--color-wine)]">Article suivant →</p>
						<h3 class="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-medium leading-tight text-white transition-opacity group-hover:opacity-60">
							{data.next.title}
						</h3>
					</a>
				{/if}
			</div>
		</div>
	</section>
</article>
