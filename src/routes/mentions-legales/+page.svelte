<script lang="ts">
	import SplitText from '$components/SplitText.svelte';
</script>

<article class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<section class="container-page pt-40 pb-16">
		<p class="eyebrow text-[color:var(--color-wine)]">Informations légales</p>
		<SplitText
			as="h1"
			text="Mentions légales"
			mode="chars"
			trigger="mount"
			stagger={0.03}
			class="mt-6 font-display text-[clamp(3rem,10vw,10rem)] leading-[0.9]"
		/>
	</section>

	<section class="container-page pb-32">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-3">
				<p class="eyebrow text-[color:var(--color-wine)]">Éditeur du site</p>
			</div>
			<div class="md:col-span-9 space-y-4 max-w-[65ch] text-lg leading-relaxed text-[color:var(--color-ink)]/80">
				<p>
					Le présent site est édité à titre personnel par Lize Louvencourt, résidant à Saint-Denis, La Réunion.
				</p>
				<p>
					Contact : <a href="mailto:zelie@louvencourt.com" class="underline decoration-[color:var(--color-wine)] underline-offset-4">zelie@louvencourt.com</a>.
				</p>
			</div>
		</div>

		<div class="mt-20 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-3">
				<p class="eyebrow text-[color:var(--color-wine)]">Hébergement</p>
			</div>
			<div class="md:col-span-9 space-y-4 max-w-[65ch] text-lg leading-relaxed text-[color:var(--color-ink)]/80">
				<p>
					Site hébergé sur un serveur dédié privé. Les coordonnées de l'hébergeur sont disponibles sur demande à l'adresse ci-dessus.
				</p>
			</div>
		</div>

		<div class="mt-20 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-3">
				<p class="eyebrow text-[color:var(--color-wine)]">Propriété intellectuelle</p>
			</div>
			<div class="md:col-span-9 space-y-4 max-w-[65ch] text-lg leading-relaxed text-[color:var(--color-ink)]/80">
				<p>
					L'ensemble des contenus présentés (textes, visuels, projets) est la propriété de leurs auteurs respectifs. Les projets étudiants ont été réalisés dans le cadre du BTS Communication ; les projets professionnels dans le cadre d'une alternance chez WEXX OI.
				</p>
				<p>
					Les marques citées — notamment Chanel, Nespresso, Fiat, Benetton, Crocs — demeurent la propriété exclusive de leurs détenteurs respectifs. Elles apparaissent ici à des fins pédagogiques et illustratives uniquement.
				</p>
				<p>
					Toute reproduction, même partielle, est soumise à autorisation préalable.
				</p>
			</div>
		</div>
	</section>
</article>
