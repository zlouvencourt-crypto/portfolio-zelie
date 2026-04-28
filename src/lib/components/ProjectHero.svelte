<script lang="ts">
	import type { ProjectMeta } from '$lib/content/projects';
	import SplitText from './SplitText.svelte';

	type Props = { meta: ProjectMeta };
	let { meta }: Props = $props();
</script>

<section class="project-hero relative w-full overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-bg)]">
	<div class="absolute inset-0">
		<img
			src={meta.cover}
			alt=""
			aria-hidden="true"
			class="h-full w-full object-cover opacity-45"
		/>
		<div class="absolute inset-0 bg-black/35"></div>
		<div class="absolute inset-0 bg-gradient-to-b from-[color:var(--color-ink)]/50 via-[color:var(--color-ink)]/20 to-[color:var(--color-ink)]"></div>
	</div>

	<div class="container-page relative flex min-h-[100svh] flex-col justify-end pb-16 pt-40">
		<div class="max-w-[24ch]">
			<p class="eyebrow text-[color:var(--color-rose-soft)]">
				{meta.category === 'scolaire' ? 'Projet scolaire' : 'Projet professionnel'}
				{#if meta.year}
					<span class="mx-2">·</span>{meta.year}
				{/if}
			</p>
			<SplitText
				as="h1"
				text={meta.title}
				mode="chars"
				trigger="mount"
				class="mt-6 font-display text-[clamp(2.25rem,7vw,6rem)]"
				stagger={0.025}
				duration={1.3}
			/>
			{#if meta.tagline}
				<SplitText
					as="p"
					text={meta.tagline}
					mode="words"
					trigger="mount"
					delay={0.3}
					class="mt-8 max-w-[50ch] font-display-italic text-[clamp(1.25rem,2vw,1.75rem)] leading-tight text-[color:var(--color-rose-soft)]"
				/>
			{/if}
		</div>

		<div class="mt-16 grid grid-cols-2 gap-8 border-t border-[color:var(--color-rose)]/30 pt-8 text-sm md:grid-cols-4">
			{#if meta.client}
				<div>
					<p class="eyebrow text-[color:var(--color-rose)]">Client</p>
					<p class="mt-2">{meta.client}</p>
				</div>
			{/if}
			{#if meta.role}
				<div>
					<p class="eyebrow text-[color:var(--color-rose)]">Rôle</p>
					<p class="mt-2">{meta.role}</p>
				</div>
			{/if}
			{#if meta.tags?.length}
				<div class="col-span-2">
					<p class="eyebrow text-[color:var(--color-rose)]">Disciplines</p>
					<ul class="mt-2 flex flex-wrap gap-x-3 gap-y-1">
						{#each meta.tags as tag (tag)}
							<li class="after:ml-3 after:text-[color:var(--color-rose)] after:content-['·'] last:after:content-['']">
								{tag}
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</section>
