<script lang="ts">
	import SplitText from '$components/SplitText.svelte';
</script>

<article class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<section class="container-page pt-40 pb-16">
		<p class="eyebrow text-[color:var(--color-wine)]">Données personnelles</p>
		<SplitText
			as="h1"
			text="Confidentialité"
			mode="chars"
			trigger="mount"
			stagger={0.03}
			class="mt-6 font-display text-[clamp(3rem,10vw,10rem)] leading-[0.9]"
		/>
	</section>

	<section class="container-page pb-32">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-3">
				<p class="eyebrow text-[color:var(--color-wine)]">Formulaire de contact</p>
			</div>
			<div class="md:col-span-9 space-y-4 max-w-[65ch] text-lg leading-relaxed text-[color:var(--color-ink)]/80">
				<p>
					Les informations que vous renseignez (prénom, email, sujet, message) sont utilisées uniquement pour répondre à votre demande. Elles ne sont ni cédées, ni revendues, ni exploitées à des fins commerciales.
				</p>
				<p>
					Les messages sont transmis via le service Resend puis conservés dans ma boîte mail personnelle. Vous pouvez à tout moment demander leur suppression en écrivant à <a href="mailto:zelie@louvencourt.com" class="underline decoration-[color:var(--color-wine)] underline-offset-4">zelie@louvencourt.com</a>.
				</p>
			</div>
		</div>

		<div class="mt-20 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-3">
				<p class="eyebrow text-[color:var(--color-wine)]">Cookies et traceurs</p>
			</div>
			<div class="md:col-span-9 space-y-4 max-w-[65ch] text-lg leading-relaxed text-[color:var(--color-ink)]/80">
				<p>
					Ce site ne dépose aucun cookie de suivi, aucun traceur publicitaire, aucun outil d'analyse tiers par défaut. Seuls les éléments strictement nécessaires au bon fonctionnement technique peuvent être utilisés.
				</p>
			</div>
		</div>

		<div class="mt-20 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-3">
				<p class="eyebrow text-[color:var(--color-wine)]">Vos droits</p>
			</div>
			<div class="md:col-span-9 space-y-4 max-w-[65ch] text-lg leading-relaxed text-[color:var(--color-ink)]/80">
				<p>
					Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression des informations vous concernant. Pour l'exercer, adressez-vous à l'adresse ci-dessus.
				</p>
			</div>
		</div>
	</section>
</article>
