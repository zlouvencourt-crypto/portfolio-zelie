<script lang="ts">
	import { accent } from '$utils/scroll';
	import ProjectsCanvas from '$components/ProjectsCanvas.svelte';
</script>

<svelte:head><title>Réalisations — WEXX OI</title></svelte:head>

<section class="relative h-[100svh] w-full overflow-hidden" use:accent={'#ff3d6e'}>
	<ProjectsCanvas />
</section>
