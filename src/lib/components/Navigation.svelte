<script lang="ts">
	import { page } from '$app/state';
	import MagneticLink from './MagneticLink.svelte';

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
	<div class="container-page flex items-center justify-between gap-6 py-5">
		<MagneticLink href="/" strength={0.2} ariaLabel="Accueil" class="group inline-flex items-center gap-2">
			<span
				class="font-sans text-sm font-light tracking-[0.18em] uppercase transition-colors"
				style:color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
			>
				Accueil
			</span>
		</MagneticLink>

		<div class="relative">
			<button
				class="relative z-[60] flex flex-col gap-1.5 p-2"
				aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
				aria-expanded={open}
				onclick={() => (open = !open)}
			>
				<span
					class="block h-[1.5px] w-6 transition-transform duration-300"
					style:background-color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
					class:translate-y-[6.5px]={open}
					class:rotate-45={open}
				></span>
				<span
					class="block h-[1.5px] w-6 transition-opacity duration-300"
					style:background-color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
					class:opacity-0={open}
				></span>
				<span
					class="block h-[1.5px] w-6 transition-transform duration-300"
					style:background-color={lightOnDark ? '#ffffff' : 'var(--color-ink)'}
					class:-translate-y-[6.5px]={open}
					class:-rotate-45={open}
				></span>
			</button>

			{#if open}
				<div
					class="absolute right-0 top-full mt-3 w-56 rounded-md bg-[color:var(--color-ink)]/90 px-6 py-6 text-white shadow-lg backdrop-blur-md"
				>
					<nav class="flex flex-col gap-3">
						<a
							href="/a-propos"
							onclick={closeMenu}
							class="font-sans text-sm font-light tracking-[0.08em] transition-opacity hover:opacity-60"
						>
							À propos
						</a>

						<div class="flex flex-col gap-2">
							<button
								type="button"
								onclick={() => (projectsOpen = !projectsOpen)}
								class="flex items-center justify-between text-left font-sans text-sm font-light tracking-[0.08em] transition-opacity hover:opacity-60"
								aria-expanded={projectsOpen}
							>
								<span>Mes projets</span>
								<span
									class="text-[0.7em] transition-transform duration-300"
									class:rotate-180={projectsOpen}
									aria-hidden="true">▾</span
								>
							</button>

							{#if projectsOpen}
								<div class="ml-3 flex flex-col gap-2 border-l border-white/20 pl-3">
									<a
										href="/pro"
										onclick={closeMenu}
										class="font-sans text-xs font-light tracking-[0.06em] text-white/80 transition-opacity hover:opacity-60"
									>
										Wexx OI
									</a>
									<a
										href="/scolaire"
										onclick={closeMenu}
										class="font-sans text-xs font-light tracking-[0.06em] text-white/80 transition-opacity hover:opacity-60"
									>
										Scolaire
									</a>
								</div>
							{/if}
						</div>

						<a
							href="/contact"
							onclick={closeMenu}
							class="font-sans text-sm font-light tracking-[0.08em] transition-opacity hover:opacity-60"
						>
							Contact
						</a>
					</nav>
				</div>
			{/if}
		</div>
	</div>
</header>
