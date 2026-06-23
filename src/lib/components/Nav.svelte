<script lang="ts">
	import Magnetic from './Magnetic.svelte';
	import AccentSwitcher from './AccentSwitcher.svelte';

	let open = $state(false);
	let scrolled = $state(false);

	const links = [
		{ href: '/expertise', label: 'Expertise' },
		{ href: '/esprit', label: "L'esprit WEXX" },
		{ href: '/realisations', label: 'Réalisations' },
		{ href: '/contact', label: 'Contact' }
	];

	$effect(() => {
		if (typeof window === 'undefined') return;
		const onScroll = () => (scrolled = window.scrollY > 60);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header
	class="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
	class:backdrop-blur-md={scrolled}
	style:background-color={scrolled ? 'color-mix(in srgb, var(--color-night) 75%, transparent)' : 'transparent'}
>
	<div class="container-page flex items-center justify-between py-5">
		<div class="flex items-center gap-5">
			<a href="/" class="block shrink-0" aria-label="WEXX OI — accueil">
				<img src="/brand/wexx-white.png" alt="WEXX Indian Ocean" class="h-5 w-auto md:h-6" />
			</a>
			<AccentSwitcher />
		</div>

		<nav class="hidden items-center gap-9 md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="group relative font-sans text-[13px] font-medium text-[color:var(--color-cream)]/80 transition-colors hover:text-[color:var(--color-cream)]"
				>
					{link.label}
					<span
						class="absolute -bottom-1 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-[400ms] ease-[var(--ease-out-expo)] group-hover:w-full"
					></span>
				</a>
			{/each}
		</nav>

		<div class="hidden md:block">
			<Magnetic strength={0.4}>
				<a
					href="/contact"
					class="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-cream)]/30 px-5 py-2.5 font-sans text-[12px] font-medium uppercase tracking-[0.12em] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
				>
					Parlons-en
				</a>
			</Magnetic>
		</div>

		<!-- mobile -->
		<button
			class="relative z-[60] flex h-8 w-8 flex-col items-center justify-center gap-[6px] md:hidden"
			aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
			aria-expanded={open}
			onclick={() => (open = !open)}
		>
			<span class="block h-px w-6 bg-[color:var(--color-cream)] transition-transform duration-300" class:translate-y-[7px]={open} class:rotate-45={open}></span>
			<span class="block h-px w-6 bg-[color:var(--color-cream)] transition-opacity duration-300" class:opacity-0={open}></span>
			<span class="block h-px w-6 bg-[color:var(--color-cream)] transition-transform duration-300" class:-translate-y-[7px]={open} class:-rotate-45={open}></span>
		</button>
	</div>

	{#if open}
		<div class="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-7 bg-[color:var(--color-night)] md:hidden">
			{#each links as link (link.href)}
				<a
					href={link.href}
					onclick={() => (open = false)}
					class="font-display text-[clamp(2.5rem,11vw,4rem)] transition-colors hover:text-[var(--accent)]"
				>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</header>
