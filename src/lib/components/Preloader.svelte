<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$utils/motion';

	let loading = $state(true);
	let isOut = $state(false);
	let count = $state(0);

	onMount(() => {
		// Une seule fois par session (à l'ouverture du site).
		if (sessionStorage.getItem('wexx-loaded')) {
			loading = false;
			return;
		}

		const root = document.documentElement;
		root.classList.add('is-loading');
		window.scrollTo(0, 0);

		let counterDone = false;
		let fontsReady = false;
		let raf = 0;

		const exit = () => {
			isOut = true;
			root.classList.remove('is-loading');
			sessionStorage.setItem('wexx-loaded', '1');
			window.setTimeout(() => (loading = false), 1000);
		};
		const tryExit = () => {
			if (counterDone && fontsReady) exit();
		};

		if (document.fonts) {
			document.fonts.ready.then(() => {
				fontsReady = true;
				tryExit();
			});
		} else {
			fontsReady = true;
		}

		if (prefersReducedMotion()) {
			count = 100;
			counterDone = true;
			tryExit();
			return () => root.classList.remove('is-loading');
		}

		const duration = 2000;
		let t0: number | null = null;
		const tick = (now: number) => {
			if (t0 === null) t0 = now;
			const p = Math.min(1, (now - t0) / duration);
			count = Math.round((1 - Math.pow(1 - p, 3)) * 100);
			if (p < 1) {
				raf = requestAnimationFrame(tick);
			} else {
				counterDone = true;
				tryExit();
			}
		};
		raf = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(raf);
			root.classList.remove('is-loading');
		};
	});
</script>

{#if loading}
	<div class="preloader" class:is-out={isOut} aria-hidden="true">
		<div class="pre-top container-page">
			<span class="eyebrow text-[color:var(--color-cream)]/60">[ WEXX — Indian Ocean · 21°S ]</span>
		</div>

		<div class="pre-center">
			<h2 class="pre-sign font-display">
				<span class="reveal-mask"><span class="pre-line">On fait vibrer</span></span>
				<span class="reveal-mask"><span class="pre-line pre-line-2">l’océan Indien.</span></span>
			</h2>
		</div>

		<div class="pre-bottom container-page">
			<span class="pre-count font-display">{count}<small>%</small></span>
		</div>

		<div class="pre-bar"><span style="transform: scaleX({count / 100})"></span></div>
	</div>
{/if}

<style>
	.preloader {
		position: fixed;
		inset: 0;
		z-index: 120;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: var(--color-black);
		transition: transform 0.95s var(--ease-out-expo);
		will-change: transform;
	}
	.preloader.is-out {
		transform: translateY(-100%);
	}
	.pre-top {
		padding-top: 2rem;
	}
	.pre-center {
		flex: 1;
		display: grid;
		place-items: center;
		text-align: center;
		padding: 1rem;
	}
	.pre-sign {
		font-size: clamp(2.4rem, 8vw, 7rem);
		line-height: 0.95;
		text-transform: uppercase;
	}
	.reveal-mask {
		display: block;
		overflow: hidden;
	}
	.pre-line {
		display: block;
		transform: translateY(110%);
		animation: pre-rise 1s var(--ease-out-expo) 0.1s forwards;
	}
	.pre-line-2 {
		color: var(--accent);
		animation-delay: 0.22s;
	}
	.pre-bottom {
		display: flex;
		justify-content: flex-end;
		padding-bottom: 1.6rem;
	}
	.pre-count {
		font-size: clamp(3rem, 11vw, 8.5rem);
		line-height: 1;
		color: var(--accent);
	}
	.pre-count small {
		font-size: 0.28em;
		vertical-align: super;
		margin-left: 0.12em;
		color: color-mix(in srgb, var(--color-cream) 60%, transparent);
	}
	.pre-bar {
		position: absolute;
		inset: auto 0 0 0;
		height: 2px;
		background: rgba(255, 255, 255, 0.12);
	}
	.pre-bar span {
		display: block;
		height: 100%;
		transform-origin: left;
		background: var(--accent);
	}
	@keyframes pre-rise {
		to {
			transform: translateY(0);
		}
	}
	:global(html.is-loading) {
		overflow: hidden;
	}
	@media (prefers-reduced-motion: reduce) {
		.pre-line {
			transform: none;
			animation: none;
		}
		.preloader {
			transition-duration: 0.3s;
		}
	}
</style>
