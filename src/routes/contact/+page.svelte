<script lang="ts">
	import { enhance } from '$app/forms';
	import SplitText from '$components/SplitText.svelte';
	import MagneticLink from '$components/MagneticLink.svelte';

	type ContactForm = {
		success?: boolean;
		errors?: Record<string, string>;
		values?: {
			name?: string;
			email?: string;
			subject?: string;
			message?: string;
		};
	};

	let { form }: { form?: ContactForm } = $props();
	let submitting = $state(false);
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

	<section class="container-page pb-24">
		<div class="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
			<div class="md:col-span-5">
				<p class="eyebrow text-[color:var(--color-wine)]">Écrivez-moi</p>
				<a
					href="mailto:zelie@louvencourt.com"
					class="mt-4 block font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none underline decoration-[color:var(--color-wine)] decoration-[2px] underline-offset-8 transition-opacity hover:opacity-70"
				>
					zelie@louvencourt.com
				</a>

				<div class="mt-14">
					<p class="eyebrow text-[color:var(--color-wine)]">Ailleurs</p>
					<ul class="mt-4 space-y-3 text-lg">
						<li class="text-[color:var(--color-ink)]/60">LinkedIn · à venir</li>
						<li class="text-[color:var(--color-ink)]/60">Instagram · à venir</li>
						<li class="text-[color:var(--color-ink)]/60">Behance · à venir</li>
					</ul>
				</div>

				<div class="mt-14">
					<p class="eyebrow text-[color:var(--color-wine)]">Localisation</p>
					<p class="mt-2 text-lg">Saint-Denis, La Réunion.</p>
				</div>
			</div>

			<div class="md:col-span-7">
				{#if form?.success}
					<div class="border border-[color:var(--color-ink)] bg-[color:var(--color-bg)] p-10">
						<p class="eyebrow text-[color:var(--color-ink)]/60">Message envoyé</p>
						<h2 class="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-none">
							Merci <span class="font-display-italic">beaucoup</span>.
						</h2>
						<p class="mt-6 max-w-[40ch] text-[color:var(--color-ink)]/75">
							Je reviens vers vous sous 48h. En attendant, n'hésitez pas à parcourir mes projets.
						</p>
						<MagneticLink
							href="/pro"
							strength={0.2}
							class="eyebrow mt-10 inline-flex items-center gap-3 underline decoration-[color:var(--color-ink)] decoration-[1px] underline-offset-8"
						>
							<span>Voir les projets pro</span>
							<span aria-hidden="true">→</span>
						</MagneticLink>
					</div>
				{:else}
					<form
						method="POST"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update();
								submitting = false;
							};
						}}
						class="space-y-8"
					>
						<!-- honeypot -->
						<input type="text" name="website" tabindex="-1" autocomplete="off" class="sr-only" aria-hidden="true" />

						<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
							<label class="block">
								<span class="eyebrow text-[color:var(--color-wine)]">Prénom</span>
								<input
									type="text"
									name="name"
									required
									autocomplete="given-name"
									value={form?.values?.name ?? ''}
									class="mt-2 w-full border-b border-[color:var(--color-ink)]/30 bg-transparent py-3 text-lg transition-colors focus:border-[color:var(--color-wine)] focus:outline-none"
								/>
								{#if form?.errors?.name}
									<p class="mt-2 text-sm text-[color:var(--color-wine)]">{form.errors.name}</p>
								{/if}
							</label>
							<label class="block">
								<span class="eyebrow text-[color:var(--color-wine)]">Email</span>
								<input
									type="email"
									name="email"
									required
									autocomplete="email"
									value={form?.values?.email ?? ''}
									class="mt-2 w-full border-b border-[color:var(--color-ink)]/30 bg-transparent py-3 text-lg transition-colors focus:border-[color:var(--color-wine)] focus:outline-none"
								/>
								{#if form?.errors?.email}
									<p class="mt-2 text-sm text-[color:var(--color-wine)]">{form.errors.email}</p>
								{/if}
							</label>
						</div>

						<label class="block">
							<span class="eyebrow text-[color:var(--color-wine)]">Sujet</span>
							<input
								type="text"
								name="subject"
								required
								value={form?.values?.subject ?? ''}
								class="mt-2 w-full border-b border-[color:var(--color-ink)]/30 bg-transparent py-3 text-lg transition-colors focus:border-[color:var(--color-wine)] focus:outline-none"
							/>
							{#if form?.errors?.subject}
								<p class="mt-2 text-sm text-[color:var(--color-wine)]">{form.errors.subject}</p>
							{/if}
						</label>

						<label class="block">
							<span class="eyebrow text-[color:var(--color-wine)]">Message</span>
							<textarea
								name="message"
								required
								rows="6"
								value={form?.values?.message ?? ''}
								class="mt-2 w-full resize-y border-b border-[color:var(--color-ink)]/30 bg-transparent py-3 text-lg transition-colors focus:border-[color:var(--color-wine)] focus:outline-none"
							></textarea>
							{#if form?.errors?.message}
								<p class="mt-2 text-sm text-[color:var(--color-wine)]">{form.errors.message}</p>
							{/if}
						</label>

						{#if form?.errors?.form}
							<p class="text-sm text-[color:var(--color-wine)]">{form.errors.form}</p>
						{/if}

						<div class="flex items-center justify-between gap-4 pt-4">
							<p class="text-sm text-[color:var(--color-ink)]/50">
								Vos informations restent strictement confidentielles.
							</p>
							<button
								type="submit"
								disabled={submitting}
								class="eyebrow inline-flex items-center gap-3 rounded-full border border-[color:var(--color-ink)] px-8 py-4 transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-bg)] disabled:opacity-40"
								data-cursor-label="envoyer"
							>
								<span>{submitting ? 'Envoi…' : 'Envoyer'}</span>
								<span aria-hidden="true">→</span>
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</section>
</article>
