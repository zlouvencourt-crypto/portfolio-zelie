<script lang="ts">
	import { page } from '$app/state';
	import MagneticLink from './MagneticLink.svelte';

	const links = [
		{ href: '/a-propos', label: 'À propos' },
		{ href: '/scolaire', label: 'Scolaire' },
		{ href: '/pro', label: 'Pro' },
		{ href: '/contact', label: 'Contact' }
	];

	let open = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		if (typeof window === 'undefined') return;
		const onScroll = () => {
			scrolled = window.scrollY > 20;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const isActive = (href: string): boolean => {
		const path = page.url.pathname;
		if (href === '/') return path === '/';
		return path === href || path.startsWith(href + '/');
	};
</script>

<header
	class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
	class:is-scrolled={scrolled}
>
	<div
		class="container-page flex items-center justify-between gap-6 py-5 transition-colors duration-500"
	>
		<MagneticLink href="/" strength={0.2} ariaLabel="Accueil" class="group inline-flex items-center gap-2">
			<span
				class="font-display text-[1.5rem] leading-none tracking-tight transition-colors"
				>Accueil</span
			>
		</MagneticLink>

		<nav class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<MagneticLink
					href={link.href}
					strength={0.3}
					class="relative px-4 py-2 eyebrow transition-opacity hover:opacity-60"
					cursorLabel={isActive(link.href) ? '' : 'voir'}
				>
					<span>{link.label}</span>
					{#if isActive(link.href)}
						<span
							class="absolute inset-x-4 -bottom-0.5 h-px bg-current"
							aria-hidden="true"
						></span>
					{/if}
				</MagneticLink>
			{/each}
		</nav>

		<button
			class="flex flex-col gap-1.5 p-2 md:hidden"
			aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
			aria-expanded={open}
			onclick={() => (open = !open)}
		>
			<span
				class="block h-[1.5px] w-6 bg-current transition-transform"
				class:translate-y-[6.5px]={open}
				class:rotate-45={open}
			></span>
			<span
				class="block h-[1.5px] w-6 bg-current transition-opacity"
				class:opacity-0={open}
			></span>
			<span
				class="block h-[1.5px] w-6 bg-current transition-transform"
				class:-translate-y-[6.5px]={open}
				class:-rotate-45={open}
			></span>
		</button>
	</div>

	{#if open}
		<div
			class="fixed inset-0 top-0 z-40 flex flex-col justify-between bg-[color:var(--color-ink)] px-[var(--spacing-page)] py-24 text-[color:var(--color-bg)] md:hidden"
		>
			<nav class="flex flex-col gap-5">
				{#each links as link (link.href)}
					<a
						href={link.href}
						onclick={() => (open = false)}
						class="font-display text-[clamp(3rem,12vw,5rem)] leading-none"
					>
						{link.label}
					</a>
				{/each}
			</nav>
			<div class="eyebrow text-[color:var(--color-rose)]">
				<p>Zélie Louvencourt — 2026</p>
			</div>
		</div>
	{/if}
</header>

<style>
	header {
		mix-blend-mode: normal;
	}
	header.is-scrolled {
		backdrop-filter: blur(12px);
		background: color-mix(in oklab, var(--bg) 78%, transparent);
	}
</style>
