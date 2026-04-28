<script lang="ts">
	import ProjectCardGrid from '$components/ProjectCardGrid.svelte';
	import { listProjects } from '$lib/content/projects';

	const entries = listProjects('pro');
</script>

<article class="bg-[color:var(--color-cream)] text-[color:var(--color-ink)]">
	<section class="container-page pt-40 pb-16">
		<p class="eyebrow text-[color:var(--color-wine)]">Alternance — WEXX OI, La Réunion</p>
		<p class="mt-10 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-ink)]/75">
			Deux années d'alternance au sein d'une agence événementielle réunionnaise — stratégie digitale, direction artistique, production vidéo et gestion de festivals.
		</p>
	</section>

	<section class="container-page pb-48">
		<div class="grid grid-cols-1 gap-14 sm:grid-cols-2 md:gap-20 lg:grid-cols-3">
			{#each entries as entry (entry.meta.slug)}
				<ProjectCardGrid {entry} />
			{/each}
		</div>
	</section>
</article>
