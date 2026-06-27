<script lang="ts">
	import Magnetic from './Magnetic.svelte';
	import AccentSwitcher from './AccentSwitcher.svelte';

	let open = $state(false);

	const links = [
		{ href: '/expertise', label: 'Expertise' },
		{ href: '/esprit', label: "L'esprit WEXX" },
		{ href: '/realisations', label: 'Réalisations' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<header class="fixed inset-x-0 top-0 z-50">
	<div class="container-page flex items-center justify-between py-5">
		<div class="flex items-center gap-3">
			<a
				href="/"
				class="block shrink-0 drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]"
				aria-label="WEXX OI — accueil"
			>
				<img
					src="/brand/wexx-white.png"
					alt="WEXX Indian Ocean"
					width="638"
					height="266"
					class="h-5 w-auto md:h-6"
				/>
			</a>
			<div class="frost flex items-center px-3 py-2">
				<AccentSwitcher />
			</div>
		</div>

		<nav class="hidden items-center gap-2 md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="frost px-4 py-2 font-sans text-[13px] font-medium text-[color:var(--color-cream)]/85 transition-colors hover:text-[var(--accent)]"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="hidden md:block">
			<Magnetic strength={0.4}>
				<a
					href="/contact"
					class="frost inline-flex items-center gap-2 px-5 py-2.5 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-[color:var(--color-cream)]/90 transition-colors hover:text-[var(--accent)]"
				>
					Parlons-en
				</a>
			</Magnetic>
		</div>

		<!-- mobile -->
		<button
			class="frost relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
			aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
			aria-expanded={open}
			onclick={() => (open = !open)}
		>
			<span class="block h-px w-5 bg-[color:var(--color-cream)] transition-transform duration-300" class:translate-y-[7px]={open} class:rotate-45={open}></span>
			<span class="block h-px w-5 bg-[color:var(--color-cream)] transition-opacity duration-300" class:opacity-0={open}></span>
			<span class="block h-px w-5 bg-[color:var(--color-cream)] transition-transform duration-300" class:-translate-y-[7px]={open} class:-rotate-45={open}></span>
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

<style>
	/* verre dépoli : laisse passer la vidéo de fond, n'entoure que le texte */
	.frost {
		border-radius: 9999px;
		border: 1px solid color-mix(in srgb, white 14%, transparent);
		background: color-mix(in srgb, var(--color-night) 30%, transparent);
		backdrop-filter: blur(10px) saturate(1.1);
		-webkit-backdrop-filter: blur(10px) saturate(1.1);
	}
</style>
