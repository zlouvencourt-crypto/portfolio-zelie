<script lang="ts">
	import { page } from '$app/stores';
	import { accent, reveal } from '$utils/scroll';
	import { projects } from '$content/projects';

	let project = $derived(projects.find((p) => p.slug === $page.params.slug));
</script>

<svelte:head>
	<title>{project ? project.title : 'Projet'} — WEXX OI</title>
</svelte:head>

<section
	class="container-page flex min-h-[100svh] flex-col justify-center py-32"
	use:accent={project?.color ?? '#12d6c6'}
>
	{#if project}
		<p class="eyebrow text-[color:var(--color-cream)]/50">[ {project.tag} ]</p>
		<h1
			class="mt-6 font-display text-[length:var(--text-hero)] text-[color:var(--accent)]"
			use:reveal
		>
			{project.title}
		</h1>
		<p class="mt-8 max-w-[46ch] text-[1.05rem] leading-relaxed text-[color:var(--color-cream)]/65">
			Page projet en préparation. Dépose tes visuels dans le dossier
			« {project.title} » et je construis l’étude de cas complète.
		</p>
	{:else}
		<h1 class="font-display text-[length:var(--text-giant)]">Projet introuvable</h1>
		<p class="mt-6 text-[color:var(--color-cream)]/65">Ce projet n’existe pas (encore).</p>
	{/if}

	<a
		href="/realisations"
		class="mt-14 inline-flex items-center gap-3 font-sans text-[13px] uppercase tracking-[0.12em] text-[color:var(--color-cream)]/70 transition-colors hover:text-[var(--accent)]"
	>
		← Toutes les réalisations
	</a>
</section>
