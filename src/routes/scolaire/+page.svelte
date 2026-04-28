<script lang="ts">
	import ProjectCard from '$components/ProjectCard.svelte';
	import SplitText from '$components/SplitText.svelte';
	import { listProjects } from '$lib/content/projects';

	const entries = listProjects('scolaire');

	const layoutClass = (i: number): string => {
		const patterns = [
			'md:col-span-7',
			'md:col-span-5 md:col-start-8 md:mt-32',
			'md:col-span-6 md:col-start-2',
			'md:col-span-5 md:col-start-8',
			'md:col-span-8 md:col-start-3 md:mt-24',
			'md:col-span-5 md:col-start-1',
			'md:col-span-6 md:col-start-7 md:mt-40',
			'md:col-span-10 md:col-start-2'
		];
		return patterns[i % patterns.length];
	};
</script>

<article class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<section class="container-page pt-40 pb-24">
		<p class="eyebrow text-[color:var(--color-wine)]">Archive — 2023 / 2025</p>
		<SplitText
			as="h1"
			text="Scolaire"
			mode="chars"
			trigger="mount"
			class="mt-6 font-display text-[clamp(5rem,18vw,20rem)] leading-[0.85]"
			stagger={0.04}
		/>
		<p class="mt-10 max-w-[60ch] text-lg leading-relaxed text-[color:var(--color-ink)]/75">
			Huit études de cas menées pendant le BTS Communication — du print éditorial à la stratégie de marque, en passant par les campagnes sociales et la direction artistique.
		</p>
	</section>

	<section class="container-page pb-48">
		<div class="grid grid-cols-1 gap-20 md:grid-cols-12 md:gap-x-8 md:gap-y-32">
			{#each entries as entry, i (entry.meta.slug)}
				<div class={layoutClass(i)}>
					<ProjectCard {entry} index={i} size={i % 3 === 0 ? 'lg' : 'md'} />
				</div>
			{/each}
		</div>
	</section>
</article>
