<script lang="ts">
	import ProjectCardGrid from '$components/ProjectCardGrid.svelte';
	import { listProjects } from '$lib/content/projects';

	const entries = listProjects('pro');
</script>

<article class="bg-[color:var(--color-cream)] text-[color:var(--color-ink)]">
	<section class="container-page pt-40 pb-16">
		<figure class="mb-10 max-w-[42ch]">
			<blockquote class="font-display-italic text-base leading-relaxed text-[color:var(--color-ink)]/80">
				« Communiquer, c'est mettre en commun. »
			</blockquote>
			<figcaption class="eyebrow mt-3 text-[color:var(--color-rose)]">— Dominique Wolton</figcaption>
		</figure>
		<p class="eyebrow text-[color:var(--color-wine)]">Alternance — WEXX OI, La Réunion</p>
		<p class="mt-10 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-ink)]/75">
			Deux années d'alternance au sein d'une agence événementielle réunionnaise — stratégie digitale, direction artistique, production vidéo et gestion de festivals.
		</p>
	</section>

	<section class="container-page pb-48">
		<div class="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
			{#each entries as entry (entry.meta.slug)}
				<ProjectCardGrid {entry} />
			{/each}
		</div>
	</section>
</article>
