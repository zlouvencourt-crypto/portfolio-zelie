<script lang="ts">
	import { accent } from '$utils/scroll';
	import { reveal } from '$utils/scroll';
</script>

<svelte:head><title>Expertise — WEXX OI</title></svelte:head>

<section
	class="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
	use:accent={'#12d6c6'}
>
	<p class="eyebrow text-[color:var(--color-cream)]/50">[ WEXX — Indian Ocean ]</p>
	<h1 class="mt-6 font-display text-[length:var(--text-giant)]" use:reveal>Expertise</h1>
	<p class="mt-7 max-w-[40ch] font-sans text-[1.05rem] leading-relaxed text-[color:var(--color-cream)]/60">
		Page en préparation. On la construit juste après l’accueil.
	</p>
	<a
		href="/"
		class="mt-12 inline-flex items-center gap-3 font-sans text-[13px] uppercase tracking-[0.12em] text-[color:var(--color-cream)]/70 transition-colors hover:text-[var(--accent)]"
	>
		← Retour à l’accueil
	</a>
</section>
