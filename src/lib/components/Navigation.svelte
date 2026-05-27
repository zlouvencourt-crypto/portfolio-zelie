<script lang="ts">
	import { page } from '$app/state';

	let open = $state(false);
	let projectsOpen = $state(false);
	let scrolled = $state(false);

	const isHome = $derived(page.url.pathname === '/');
	const isProjectDetail = $derived(/^\/(pro|scolaire)\/.+/.test(page.url.pathname));
	const lightOnDark = $derived((isHome || isProjectDetail) && !scrolled);

	const closeMenu = () => {
		open = false;
		projectsOpen = false;
	};

	$effect(() => {
		if (typeof window === 'undefined') return;
		const onScroll = () => {
			scrolled = window.scrollY > 80;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const navLinks = [
		{ href: '/', label: 'Accueil' },
		{ href: '/a-propos', label: 'À propos' },
		{ href: '/pro', label: 'Wexx OI' },
		{ href: '/scolaire', label: 'Scolaire' },
		{ href: '/contact', label: 'Contact' }
	];

	const isActive = (href: string): boolean => {
		const path = page.url.pathname;
		if (href === '/') return path === '/';
		return path === href || path.startsWith(href + '/');
	};
</script>

<header
	class="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
	class:bg-white={scrolled && !isHome}
	class:bg-transparent={!scrolled || isHome}
>
	<!-- TOP ROW -->
	<div class="container-page grid grid-cols-3 items-center py-5">
		<!-- LEFT : hamburger -->
		<div class="flex items-center justify-start">
			<button
				class="relative z-[60] flex flex-col gap-[5px] p-2"
				aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
				aria-expanded={open}
				onclick={() => (open = !open)}
			>
				<span
					class="block h-px w-5 transition-transform duration-300"
					style:background-color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
					class:translate-y-[6px]={open}
					class:rotate-45={open}
				></span>
				<span
					class="block h-px w-5 transition-opacity duration-300"
					style:background-color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
					class:opacity-0={open}
				></span>
				<span
					class="block h-px w-5 transition-transform duration-300"
					style:background-color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
					class:-translate-y-[6px]={open}
					class:-rotate-45={open}
				></span>
			</button>
		</div>

		<!-- CENTER : logo -->
		<div class="flex justify-center">
			<a
				href="/"
				class="font-display text-[clamp(1.6rem,2.4vw,2.25rem)] font-medium uppercase leading-none tracking-[0.18em] transition-colors"
				style:color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
			>
				Zélie
			</a>
		</div>

		<!-- RIGHT : contact link -->
		<div class="flex items-center justify-end">
			<a
				href="/contact"
				class="hidden font-sans text-[10px] font-medium uppercase tracking-[0.28em] transition-opacity hover:opacity-60 md:inline-block"
				style:color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
			>
				Contact
			</a>
		</div>
	</div>

	<!-- BOTTOM NAV (desktop only) -->
	<nav class="hidden border-t md:block" style:border-color={lightOnDark ? 'rgba(255,255,255,0.25)' : 'rgba(10,10,10,0.12)'}>
		<ul class="container-page flex flex-wrap items-center justify-center gap-x-10 py-3">
			{#each navLinks as link (link.href)}
				<li>
					<a
						href={link.href}
						class="font-sans text-[10px] font-medium uppercase tracking-[0.28em] transition-opacity hover:opacity-60"
						style:color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
						style:font-weight={isActive(link.href) ? '600' : '400'}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<!-- Fine line at bottom of header -->
	<div class="absolute inset-x-0 bottom-0 h-px" style:background-color={lightOnDark ? 'rgba(255,255,255,0.15)' : 'rgba(10,10,10,0.08)'}></div>

	<!-- FULLSCREEN MENU (mobile + hamburger overlay) -->
	{#if open}
		<div
			class="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center bg-[color:var(--color-bg)] px-[var(--spacing-page)]"
		>
			<nav class="flex flex-col items-center gap-8 text-center">
				{#each navLinks as link (link.href)}
					{#if link.href !== '/pro' && link.href !== '/scolaire'}
						<a
							href={link.href}
							onclick={closeMenu}
							class="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-none transition-opacity hover:opacity-60"
						>
							{link.label}
						</a>
					{/if}
				{/each}

				<div class="flex flex-col items-center gap-5">
					<button
						type="button"
						onclick={() => (projectsOpen = !projectsOpen)}
						class="flex items-center gap-3 font-display-italic text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-none transition-opacity hover:opacity-60"
						aria-expanded={projectsOpen}
					>
						<span>Projets</span>
						<span class="text-[0.4em] transition-transform duration-300" class:rotate-180={projectsOpen} aria-hidden="true">▾</span>
					</button>
					{#if projectsOpen}
						<div class="flex flex-col items-center gap-3">
							<a
								href="/pro"
								onclick={closeMenu}
								class="font-sans text-xs font-light uppercase tracking-[0.32em] transition-opacity hover:opacity-60"
							>
								Wexx OI
							</a>
							<a
								href="/scolaire"
								onclick={closeMenu}
								class="font-sans text-xs font-light uppercase tracking-[0.32em] transition-opacity hover:opacity-60"
							>
								Scolaire
							</a>
						</div>
					{/if}
				</div>
			</nav>

			<p class="absolute bottom-12 left-1/2 -translate-x-1/2 font-sans text-[10px] font-light uppercase tracking-[0.32em] text-[color:var(--color-ink)]/50">
				Zélie Louvencourt · Portfolio · 2024 — 2026
			</p>
		</div>
	{/if}
</header>
