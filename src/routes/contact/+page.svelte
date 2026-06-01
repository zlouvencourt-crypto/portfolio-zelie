<script lang="ts">
	import SplitText from '$components/SplitText.svelte';

	const email = 'zlouvencourt@gmail.com';
</script>

<article class="bg-[color:var(--color-bg)] text-[color:var(--color-ink)]">
	<section class="container-page pt-40 pb-16">
		<p class="eyebrow text-[color:var(--color-wine)]">Contact</p>
		<SplitText
			as="h1"
			text="Parlons-en"
			mode="chars"
			trigger="mount"
			stagger={0.04}
			class="mt-6 font-display text-[clamp(5rem,18vw,18rem)] leading-[0.85]"
		/>
	</section>

	<section class="container-page pb-28">
		<div class="max-w-[58ch]">
			<p class="font-display text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.2]">
				Une question, un projet ou une collaboration ?
				<span class="font-display-italic">Vous pouvez me contacter directement à cette adresse.</span>
			</p>

			<a
				href="mailto:{email}"
				class="mt-10 inline-flex items-center gap-3 rounded-full bg-[color:var(--color-ink)] px-8 py-4 font-sans text-[clamp(1rem,1.7vw,1.4rem)] text-[color:var(--color-bg)] transition-opacity hover:opacity-80"
			>
				{email}
				<span aria-hidden="true">→</span>
			</a>

			<div class="mt-16">
				<p class="eyebrow text-[color:var(--color-wine)]">Localisation</p>
				<p class="mt-2 text-lg text-[color:var(--color-ink)]/80">Saint-Denis, La Réunion.</p>
			</div>
		</div>
	</section>
</article>
