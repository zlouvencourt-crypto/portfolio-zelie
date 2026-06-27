<script lang="ts">
	import { onMount } from 'svelte';
	import { setLockedAccent } from '$utils/scroll';

	let loading = $state(true);
	let isOut = $state(false);

	const swatches = [
		{ name: 'Lagon', color: '#12D6C6' },
		{ name: 'Corail', color: '#FF3D6E' },
		{ name: 'Solaire', color: '#FFD23F' },
		{ name: 'Améthyste', color: '#9B6CFF' }
	];

	let timer = 0;

	function exit(color: string | null) {
		window.clearTimeout(timer);
		if (color) setLockedAccent(color);
		sessionStorage.setItem('wexx-loaded', '1');
		isOut = true;
		document.documentElement.classList.remove('is-loading');
		window.setTimeout(() => (loading = false), 1000);
	}

	onMount(() => {
		// Une seule fois par session (à l'ouverture du site).
		if (sessionStorage.getItem('wexx-loaded')) {
			loading = false;
			return;
		}
		document.documentElement.classList.add('is-loading');
		window.scrollTo(0, 0);

		// Sans choix au bout de 5 s : ouverture par défaut.
		timer = window.setTimeout(() => exit(null), 5000);

		return () => {
			window.clearTimeout(timer);
			document.documentElement.classList.remove('is-loading');
		};
	});
</script>

{#if loading}
	<div class="preloader" class:is-out={isOut}>
		<div class="pre-inner">
			<img
				class="pre-logo"
				src="/brand/wexx-white.png"
				alt="WEXX Indian Ocean"
				width="638"
				height="266"
			/>

			<p class="pre-hint">Choisissez votre couleur</p>

			<div class="pre-swatches" role="group" aria-label="Couleur du site">
				{#each swatches as s (s.color)}
					<button
						type="button"
						class="pre-swatch"
						style="--c:{s.color}"
						aria-label={`Entrer le site en ${s.name}`}
						title={s.name}
						data-cursor
						onclick={() => exit(s.color)}
					></button>
				{/each}
			</div>

			<p class="pre-sub">ou patientez…</p>
		</div>

		<div class="pre-bar"><span></span></div>
	</div>
{/if}

<style>
	.preloader {
		position: fixed;
		inset: 0;
		z-index: 120;
		display: grid;
		place-items: center;
		background: var(--color-black);
		transition: transform 0.95s var(--ease-out-expo);
		will-change: transform;
	}
	.preloader.is-out {
		transform: translateY(-100%);
	}
	.pre-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2.2rem;
		padding: 2rem;
		text-align: center;
	}
	.pre-logo {
		width: clamp(220px, 42vw, 520px);
		height: auto;
		max-width: none;
		opacity: 0;
		transform: translateY(12px);
		animation: pre-rise 1s var(--ease-out-expo) 0.1s forwards;
	}
	.pre-hint {
		margin-top: 0.5rem;
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.22em;
		color: color-mix(in srgb, var(--color-cream) 60%, transparent);
		opacity: 0;
		animation: pre-fade 0.8s ease 0.5s forwards;
	}
	.pre-swatches {
		display: flex;
		gap: 1rem;
	}
	.pre-swatch {
		width: clamp(44px, 6vw, 58px);
		height: clamp(44px, 6vw, 58px);
		border-radius: 9px;
		background: var(--c);
		opacity: 0;
		transform: translateY(14px);
		animation: pre-rise 0.7s var(--ease-out-expo) forwards;
		transition:
			transform 0.3s var(--ease-out-expo),
			box-shadow 0.3s ease;
	}
	.pre-swatch:nth-child(1) {
		animation-delay: 0.6s;
	}
	.pre-swatch:nth-child(2) {
		animation-delay: 0.68s;
	}
	.pre-swatch:nth-child(3) {
		animation-delay: 0.76s;
	}
	.pre-swatch:nth-child(4) {
		animation-delay: 0.84s;
	}
	.pre-swatch:hover {
		transform: translateY(-5px) scale(1.08);
		box-shadow: 0 14px 34px -8px var(--c);
	}
	.pre-sub {
		font-family: var(--font-sans);
		font-size: 0.74rem;
		letter-spacing: 0.04em;
		color: color-mix(in srgb, var(--color-cream) 38%, transparent);
		opacity: 0;
		animation: pre-fade 0.8s ease 0.9s forwards;
	}
	.pre-bar {
		position: absolute;
		inset: auto 0 0 0;
		height: 2px;
		background: rgba(255, 255, 255, 0.1);
	}
	.pre-bar span {
		display: block;
		height: 100%;
		width: 0;
		background: color-mix(in srgb, var(--color-cream) 55%, transparent);
		animation: pre-load 5s linear forwards;
	}
	@keyframes pre-rise {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@keyframes pre-fade {
		to {
			opacity: 1;
		}
	}
	@keyframes pre-load {
		to {
			width: 100%;
		}
	}
	:global(html.is-loading) {
		overflow: hidden;
	}
	@media (prefers-reduced-motion: reduce) {
		.pre-logo,
		.pre-hint,
		.pre-swatch,
		.pre-sub {
			opacity: 1;
			transform: none;
			animation: none;
		}
		.preloader {
			transition-duration: 0.3s;
		}
	}
</style>
