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

<header class="fixed inset-x-0 top-0 z-50 pt-4 md:pt-5">
	<div class="container-page relative flex items-center justify-center">
		<!-- logo à gauche, séparé de la barre -->
		<a
			href="/"
			class="absolute left-0 top-1/2 block -translate-y-1/2 shrink-0 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]"
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

		<!-- barre menu compacte, centrée -->
		<div class="frost hidden items-center gap-4 px-4 py-2 md:flex">
			<AccentSwitcher />
			<span class="seg"></span>
			<nav class="flex items-center gap-6">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class="font-sans text-[13px] font-medium text-[color:var(--color-cream)]/85 transition-colors hover:text-[var(--accent)]"
					>
						{link.label}
					</a>
				{/each}
			</nav>
			<span class="seg"></span>
			<Magnetic strength={0.4}>
				<a
					href="/contact"
					class="group inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]"
				>
					Parlons-en
					<span aria-hidden="true" class="transition-transform duration-500 group-hover:translate-x-1">→</span>
				</a>
			</Magnetic>
		</div>

		<!-- bouton mobile à droite -->
		<button
			class="absolute right-0 top-1/2 z-[60] flex h-7 w-7 -translate-y-1/2 flex-col items-center justify-center gap-[6px] md:hidden"
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
	/* barre menu en verre dépoli, teintée par la couleur active */
	.frost {
		border-radius: 9999px;
		border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
		background: color-mix(in srgb, var(--accent) 14%, color-mix(in srgb, var(--color-night) 55%, transparent));
		backdrop-filter: blur(12px) saturate(1.2);
		-webkit-backdrop-filter: blur(12px) saturate(1.2);
		box-shadow: 0 10px 30px -18px color-mix(in srgb, var(--accent) 60%, transparent);
		transition:
			border-color 0.8s var(--ease-out-expo),
			background-color 0.8s var(--ease-out-expo),
			box-shadow 0.8s var(--ease-out-expo);
	}
	/* petit séparateur vertical teinté */
	.seg {
		width: 1px;
		height: 1.1rem;
		background: color-mix(in srgb, var(--accent) 45%, transparent);
	}
</style>
