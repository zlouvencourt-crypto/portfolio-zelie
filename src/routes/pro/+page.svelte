<script lang="ts">
	import ProjectCardGrid from '$components/ProjectCardGrid.svelte';
	import { listProjects } from '$lib/content/projects';

	const entries = listProjects('pro');
</script>

<article class="bg-[color:var(--color-cream)] text-[color:var(--color-ink)]">
	<section class="container-page pt-28 pb-16">
		<h1 class="mb-10 font-display text-[clamp(2rem,4vw,3.5rem)] font-light tracking-tight leading-none text-[color:var(--color-ink)]">
			WEXX OI
		</h1>
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
		<div class="columns-1 gap-10 md:columns-2 md:gap-14">
			{#each entries as entry (entry.meta.slug)}
				<div class="mb-10 break-inside-avoid md:mb-14">
					<ProjectCardGrid {entry} />
				</div>
			{/each}
		</div>
	</section>
</article>
