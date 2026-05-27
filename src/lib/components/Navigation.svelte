<script lang="ts">
	import { page } from '$app/state';

	let open = $state(false);
	let projectsOpen = $state(false);

	const isHome = $derived(page.url.pathname === '/');
	const isProjectDetail = $derived(/^\/(pro|scolaire)\/.+/.test(page.url.pathname));
	const lightOnDark = $derived(isHome || isProjectDetail);

	const closeMenu = () => {
		open = false;
		projectsOpen = false;
	};
</script>

<header class="fixed inset-x-0 top-0 z-50">
	<div class="container-page grid grid-cols-3 items-center py-7">
		<!-- LEFT : à propos -->
		<nav class="hidden md:flex">
			<a
				href="/a-propos"
				class="font-sans text-[11px] font-light uppercase tracking-[0.28em] transition-colors hover:opacity-60"
				style:color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
			>
				À propos
			</a>
		</nav>

		<!-- CENTER : logo -->
		<div class="flex justify-center md:justify-start lg:justify-center">
			<a
				href="/"
				class="font-display text-[1.5rem] font-light leading-none tracking-[0.04em] transition-colors"
				style:color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
			>
				zélie
			</a>
		</div>

		<!-- RIGHT : contact + hamburger -->
		<div class="flex items-center justify-end gap-6">
			<a
				href="/contact"
				class="hidden font-sans text-[11px] font-light uppercase tracking-[0.28em] transition-colors hover:opacity-60 md:inline-block"
				style:color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
			>
				Contact
			</a>

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
					class="block h-px w-5 transition-transform duration-300"
					style:background-color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
					class:-translate-y-[6px]={open}
					class:-rotate-45={open}
				></span>
			</button>
		</div>
	</div>

	{#if open}
		<div
			class="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center bg-[color:var(--color-bg)] px-[var(--spacing-page)]"
		>
			<nav class="flex flex-col items-center gap-10 text-center">
				<a
					href="/"
					onclick={closeMenu}
					class="font-display text-[clamp(2.5rem,6vw,4rem)] font-light leading-none transition-opacity hover:opacity-60"
				>
					Accueil
				</a>
				<a
					href="/a-propos"
					onclick={closeMenu}
					class="font-display text-[clamp(2.5rem,6vw,4rem)] font-light leading-none transition-opacity hover:opacity-60"
				>
					À propos
				</a>

				<div class="flex flex-col items-center gap-6">
					<button
						type="button"
						onclick={() => (projectsOpen = !projectsOpen)}
						class="flex items-center gap-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-light leading-none transition-opacity hover:opacity-60"
						aria-expanded={projectsOpen}
					>
						<span class="font-display-italic">Projets</span>
						<span class="text-[0.4em] transition-transform duration-300" class:rotate-180={projectsOpen} aria-hidden="true">▾</span>
					</button>

					{#if projectsOpen}
						<div class="flex flex-col items-center gap-3">
							<a
								href="/pro"
								onclick={closeMenu}
								class="font-sans text-sm font-light uppercase tracking-[0.28em] transition-opacity hover:opacity-60"
							>
								Wexx OI
							</a>
							<a
								href="/scolaire"
								onclick={closeMenu}
								class="font-sans text-sm font-light uppercase tracking-[0.28em] transition-opacity hover:opacity-60"
							>
								Scolaire
							</a>
						</div>
					{/if}
				</div>

				<a
					href="/contact"
					onclick={closeMenu}
					class="font-display text-[clamp(2.5rem,6vw,4rem)] font-light leading-none transition-opacity hover:opacity-60"
				>
					Contact
				</a>
			</nav>

			<p class="absolute bottom-12 left-1/2 -translate-x-1/2 font-sans text-[10px] font-light uppercase tracking-[0.32em] text-[color:var(--color-ink)]/50">
				Zélie Louvencourt — Portfolio
			</p>
		</div>
	{/if}
</header>
