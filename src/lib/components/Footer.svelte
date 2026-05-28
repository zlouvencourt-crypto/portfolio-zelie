<script lang="ts">
	import MagneticLink from './MagneticLink.svelte';
	const year = new Date().getFullYear();
	const socials = [
		{ label: 'LinkedIn', href: '#', handle: '@zelielouvencourt' },
		{ label: 'Instagram', href: '#', handle: '@lize.creative' },
		{ label: 'Behance', href: '#', handle: '@zelielouvencourt' }
	];
</script>

<footer class="relative overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-bg)]">
	<div class="container-page section">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-7">
				<p class="eyebrow text-[color:var(--color-rose)]">Travaillons ensemble</p>
				<h2 class="mt-6 font-display text-[clamp(3rem,10vw,8rem)]">
					Dites
					<span class="font-display-italic">bonjour</span>
				</h2>
				<a
					href="mailto:zelie@louvencourt.com"
					class="mt-8 inline-block font-display text-[clamp(1.5rem,3vw,2.75rem)] underline decoration-[color:var(--color-wine)] decoration-[3px] underline-offset-8 transition-opacity hover:opacity-70"
				>
					zelie@louvencourt.com
				</a>
				<div class="mt-10">
					<MagneticLink
						href="/contact"
						strength={0.25}
						class="eyebrow inline-flex items-center gap-3 rounded-full border border-[color:var(--color-rose)] px-6 py-3 transition-colors hover:bg-[color:var(--color-wine)] hover:border-[color:var(--color-wine)]"
						cursorLabel="écrire"
					>
						<span>Démarrer un projet</span>
						<span aria-hidden="true">→</span>
					</MagneticLink>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-8 md:col-span-5 md:grid-cols-2">
				<div>
					<p class="eyebrow text-[color:var(--color-rose)]">Navigation</p>
					<ul class="mt-4 space-y-2">
						<li><a href="/a-propos" class="transition-opacity hover:opacity-70">À propos</a></li>
						<li><a href="/scolaire" class="transition-opacity hover:opacity-70">Scolaire</a></li>
						<li><a href="/pro" class="transition-opacity hover:opacity-70">Pro</a></li>
						<li><a href="/contact" class="transition-opacity hover:opacity-70">Contact</a></li>
					</ul>
				</div>
				<div>
					<p class="eyebrow text-[color:var(--color-rose)]">Réseaux</p>
					<ul class="mt-4 space-y-2">
						{#each socials as s (s.label)}
							<li>
								<a
									href={s.href}
									target="_blank"
									rel="noopener noreferrer"
									class="transition-opacity hover:opacity-70"
								>
									{s.label} <span class="opacity-60">↗</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>

		<div class="mt-24 flex flex-wrap items-end justify-between gap-6 border-t border-[color:var(--color-rose)]/30 pt-8">
			<p class="eyebrow text-[color:var(--color-rose)]">© {year} Lize Louvencourt — La Réunion</p>
			<ul class="flex flex-wrap gap-6 eyebrow text-[color:var(--color-rose)]">
				<li><a href="/mentions-legales" class="hover:text-[color:var(--color-bg)]">Mentions légales</a></li>
				<li><a href="/confidentialite" class="hover:text-[color:var(--color-bg)]">Confidentialité</a></li>
			</ul>
		</div>
	</div>

	<div
		class="pointer-events-none select-none overflow-hidden whitespace-nowrap text-[color:var(--color-wine)]/60"
		aria-hidden="true"
	>
		<p class="font-display text-[clamp(6rem,22vw,22rem)] leading-[0.85] -mb-[0.18em]">
			Lize <span class="font-display-italic">Louvencourt</span>
		</p>
	</div>
</footer>
