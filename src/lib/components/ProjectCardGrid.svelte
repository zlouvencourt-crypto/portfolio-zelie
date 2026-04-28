<script lang="ts">
	import type { ProjectEntry } from '$lib/content/projects';

	type Props = {
		entry: ProjectEntry;
	};

	let { entry }: Props = $props();

	const href = $derived(`/${entry.meta.category}/${entry.meta.slug}`);
</script>

<a {href} class="project-card-grid group relative block overflow-hidden rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.22)] transition-shadow duration-500 ease-[var(--ease-out-expo)] hover:shadow-[0_0_55px_rgba(0,0,0,0.35)]">
	<div class="relative w-full">
		<img
			src={entry.meta.cover}
			alt={entry.meta.title}
			class="block h-auto w-full object-contain transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
			loading="lazy"
		/>

		<div
			class="pointer-events-none absolute inset-0 flex flex-col justify-end gap-3 p-6 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:bg-[color:var(--color-rose)]/65 group-hover:opacity-100 group-hover:backdrop-blur-md"
		>
			{#if entry.meta.client}
				<p class="font-sans text-xs font-light uppercase tracking-[0.18em] text-white/80">
					{entry.meta.client}
				</p>
			{/if}
			<h3 class="font-display text-2xl leading-tight text-white">
				{entry.meta.title}
			</h3>
			{#if entry.meta.tagline}
				<p class="text-sm font-light leading-relaxed text-white/85">
					{entry.meta.tagline}
				</p>
			{/if}
		</div>
	</div>
</a>
