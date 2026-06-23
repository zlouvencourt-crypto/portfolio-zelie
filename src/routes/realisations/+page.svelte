<script lang="ts">
	import { accent } from '$utils/scroll';
	import ProjectsCanvas from '$components/ProjectsCanvas.svelte';
</script>

<svelte:head><title>Réalisations — WEXX OI</title></svelte:head>

<section class="relative h-[100svh] w-full overflow-hidden" use:accent={'#ff3d6e'}>
	<ProjectsCanvas />

	<!-- titre en superposition (ne bloque pas l'interaction) -->
	<div class="pointer-events-none absolute inset-x-0 top-0 z-10">
		<div class="container-page pt-[15vh]">
			<p class="eyebrow text-[color:var(--color-cream)]/55">[ Réalisations ]</p>
			<h1 class="mt-4 font-display text-[length:var(--text-big)] mix-blend-difference">
				Nos projets.
			</h1>
		</div>
	</div>

	<!-- indice d'interaction -->
	<div
		class="pointer-events-none absolute inset-x-0 bottom-6 z-10 text-center font-sans text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-cream)]/45"
	>
		Glissez ou bougez la souris pour explorer
	</div>
</section>
