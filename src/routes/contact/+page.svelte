<script lang="ts">
	import { accent, reveal } from '$utils/scroll';
	import Magnetic from '$components/Magnetic.svelte';
</script>

<svelte:head><title>Contact — WEXX OI</title></svelte:head>

<section
	class="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
	use:accent={'#12d6c6'}
>
	<p class="eyebrow text-[color:var(--color-cream)]/50">[ On en parle ]</p>
	<h1 class="mt-6 max-w-[14ch] font-display text-[length:var(--text-giant)]" use:reveal>
		On fait vibrer votre projet ?
	</h1>
	<p class="mt-7 max-w-[40ch] font-sans text-[1.05rem] leading-relaxed text-[color:var(--color-cream)]/60">
		Écrivez-nous, on vous répond vite.
	</p>
	<div class="mt-12">
		<Magnetic strength={0.4}>
			<a
				href="mailto:contact@wexx.re"
				class="group inline-flex items-center gap-4 rounded-full bg-[var(--accent)] px-9 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-night)]"
			>
				contact@wexx.re
				<span aria-hidden="true" class="transition-transform duration-500 group-hover:translate-x-1">→</span>
			</a>
		</Magnetic>
	</div>
	<a
		href="/"
		class="mt-12 inline-flex items-center gap-3 font-sans text-[13px] uppercase tracking-[0.12em] text-[color:var(--color-cream)]/70 transition-colors hover:text-[var(--accent)]"
	>
		← Retour à l’accueil
	</a>
</section>
