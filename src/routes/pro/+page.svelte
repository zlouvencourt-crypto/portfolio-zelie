<script lang="ts">
	import ProjectCardGrid from '$components/ProjectCardGrid.svelte';
	import SplitText from '$components/SplitText.svelte';
	import { listProjects } from '$lib/content/projects';

	const entries = listProjects('pro');
</script>

<article class="bg-[color:var(--color-ink)] text-[color:var(--color-bg)]">
	<section class="container-page pt-40 pb-24">
		<p class="eyebrow text-[color:var(--color-rose-soft)]">Alternance — WEXX OI, La Réunion</p>
		<SplitText
			as="h1"
			text="Pro"
			mode="chars"
			trigger="mount"
			class="mt-6 font-display text-[clamp(6rem,22vw,22rem)] leading-[0.85]"
			stagger={0.06}
		/>
		<p class="mt-10 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-rose-soft)]">
			Deux années d'alternance au sein d'une agence événementielle réunionnaise — stratégie digitale, direction artistique, production vidéo et gestion de festivals.
		</p>
	</section>

	<section class="container-page pb-48">
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
			{#each entries as entry (entry.meta.slug)}
				<ProjectCardGrid {entry} />
			{/each}
		</div>
	</section>
</article>
