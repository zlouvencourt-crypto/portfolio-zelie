<script lang="ts">
	import { page } from '$app/state';
	import MagneticLink from './MagneticLink.svelte';

	let open = $state(false);
	let projectsOpen = $state(false);

	const isHome = $derived(page.url.pathname === '/');
	const lightOnDark = $derived(open || isHome);

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
	</div>

	{#if open}
		<div
			class="fixed inset-0 top-0 z-40 flex flex-col justify-center bg-[color:var(--color-ink)]/95 px-[var(--spacing-page)] py-24 text-white backdrop-blur-md"
		>
			<nav class="flex flex-col gap-8">
				<a
					href="/a-propos"
					onclick={closeMenu}
					class="font-sans text-[clamp(2rem,5vw,3.5rem)] font-light tracking-tight transition-opacity hover:opacity-60"
				>
					À propos
				</a>

				<div class="flex flex-col gap-4">
					<button
						type="button"
						onclick={() => (projectsOpen = !projectsOpen)}
						class="flex items-center gap-4 text-left font-sans text-[clamp(2rem,5vw,3.5rem)] font-light tracking-tight transition-opacity hover:opacity-60"
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
						<div class="ml-8 flex flex-col gap-3 border-l border-white/30 pl-6">
							<a
								href="/pro"
								onclick={closeMenu}
								class="font-sans text-[clamp(1.25rem,2.5vw,1.75rem)] font-light tracking-tight transition-opacity hover:opacity-60"
							>
								Wexx OI
							</a>
							<a
								href="/scolaire"
								onclick={closeMenu}
								class="font-sans text-[clamp(1.25rem,2.5vw,1.75rem)] font-light tracking-tight transition-opacity hover:opacity-60"
							>
								Scolaire
							</a>
						</div>
					{/if}
				</div>

				<a
					href="/contact"
					onclick={closeMenu}
					class="font-sans text-[clamp(2rem,5vw,3.5rem)] font-light tracking-tight transition-opacity hover:opacity-60"
				>
					Contact
				</a>
			</nav>
		</div>
	{/if}
</header>
