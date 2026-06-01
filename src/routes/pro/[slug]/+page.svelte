<script lang="ts">
	import ProjectHero from '$components/ProjectHero.svelte';
	import ProjectStory from '$components/ProjectStory.svelte';

	let { data } = $props();
</script>

<article>
	<ProjectHero meta={data.meta} />

	<!-- Récit lookbook : texte et visuels entrelacés (chaque visuel une seule fois) -->
	<div id="projet">
		<ProjectStory meta={data.meta} />
	</div>

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
