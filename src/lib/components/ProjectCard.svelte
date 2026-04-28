<script lang="ts">
	import type { ProjectEntry } from '$lib/content/projects';
	import ImageReveal from './ImageReveal.svelte';

	type Props = {
		entry: ProjectEntry;
		index?: number;
		size?: 'sm' | 'md' | 'lg';
		ratio?: string;
	};

	let { entry, index = 0, size = 'md', ratio }: Props = $props();

	const href = $derived(`/${entry.meta.category}/${entry.meta.slug}`);
	const displayRatio = $derived(ratio ?? (size === 'lg' ? '16/10' : size === 'sm' ? '3/4' : '4/5'));
	const indexLabel = $derived(String((index ?? 0) + 1).padStart(2, '0'));
</script>

<a
	{href}
	class="project-card group relative block"
	data-cursor-label="voir"
>
	<div class="overflow-hidden">
		<div class="transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
			<ImageReveal
				src={entry.meta.cover}
				alt={entry.meta.title}
				ratio={displayRatio}
				parallax={size === 'lg' ? 6 : 3}
			/>
		</div>
	</div>

	<div class="mt-5 flex items-start justify-between gap-6">
		<div>
			<p class="eyebrow text-[color:var(--color-wine)]">
				{indexLabel}
				{#if entry.meta.client}
					<span class="mx-2 text-[color:var(--color-rose)]">·</span>{entry.meta.client}
				{/if}
			</p>
			<h3 class="mt-2 font-display text-[clamp(2rem,4vw,3.5rem)] leading-none">
				{entry.meta.title}
			</h3>
			{#if entry.meta.tagline}
				<p class="mt-3 max-w-[40ch] text-[color:var(--color-ink)]/70">
					{entry.meta.tagline}
				</p>
			{/if}
		</div>
		<div class="hidden shrink-0 text-right md:block">
			{#if entry.meta.year}
				<p class="eyebrow text-[color:var(--color-rose)]">{entry.meta.year}</p>
			{/if}
			{#if entry.meta.tags?.length}
				<ul class="mt-2 space-y-1 eyebrow text-[color:var(--color-ink)]/60">
					{#each entry.meta.tags.slice(0, 3) as tag (tag)}
						<li>{tag}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</a>
