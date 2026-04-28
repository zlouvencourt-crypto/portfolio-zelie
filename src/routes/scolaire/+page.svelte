<script lang="ts">
	import ProjectCardGrid from '$components/ProjectCardGrid.svelte';
	import { listProjects } from '$lib/content/projects';

	const entries = listProjects('scolaire');
</script>

<article class="bg-[color:var(--color-cream)] text-[color:var(--color-ink)]">
	<section class="container-page pt-40 pb-16">
		<figure class="mb-10 max-w-[42ch]">
			<blockquote class="font-display-italic text-base leading-relaxed text-[color:var(--color-ink)]/80">
				« On ne peut pas ne pas communiquer. »
			</blockquote>
			<figcaption class="eyebrow mt-3 text-[color:var(--color-rose)]">— Paul Watzlawick</figcaption>
		</figure>
		<p class="eyebrow text-[color:var(--color-wine)]">Archive — BTS Communication, 2023 / 2025</p>
		<p class="mt-10 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-ink)]/75">
			Études de cas menées pendant le BTS Communication — du print éditorial à la stratégie de marque, en passant par les campagnes sociales et la direction artistique.
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
