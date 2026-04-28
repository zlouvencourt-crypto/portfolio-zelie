<script lang="ts">
	import { onMount } from 'svelte';
	import { ensureGsap } from '$utils/gsap';
	import { prefersReducedMotion } from '$utils/motion';

	let dot = $state<HTMLDivElement | null>(null);
	let ring = $state<HTMLDivElement | null>(null);
	let visible = $state(false);
	let active = $state(false);
	let label = $state('');

	onMount(() => {
		if (prefersReducedMotion()) return;
		if (window.matchMedia('(pointer: coarse)').matches) return;

		const gsap = ensureGsap();
		const setDotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
		const setDotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
		const setRingX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
		const setRingY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });

		document.documentElement.classList.add('no-cursor');
		visible = true;

		const onMove = (e: PointerEvent) => {
			setDotX(e.clientX);
			setDotY(e.clientY);
			setRingX(e.clientX);
			setRingY(e.clientY);
		};

		const onEnter = (e: Event) => {
			const el = e.currentTarget as HTMLElement;
			active = true;
			label = el.getAttribute('data-cursor-label') ?? '';
		};

		const onLeave = () => {
			active = false;
			label = '';
		};

		const bindInteractive = () => {
			const els = document.querySelectorAll<HTMLElement>(
				'a, button, [data-cursor], [data-cursor-label]'
			);
			els.forEach((el) => {
				el.addEventListener('pointerenter', onEnter);
				el.addEventListener('pointerleave', onLeave);
			});
			return () => {
				els.forEach((el) => {
					el.removeEventListener('pointerenter', onEnter);
					el.removeEventListener('pointerleave', onLeave);
				});
			};
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		let unbind = bindInteractive();

		const obs = new MutationObserver(() => {
			unbind();
			unbind = bindInteractive();
		});
		obs.observe(document.body, { childList: true, subtree: true });

		return () => {
			window.removeEventListener('pointermove', onMove);
			unbind();
			obs.disconnect();
			document.documentElement.classList.remove('no-cursor');
		};
	});
</script>

{#if visible}
	<div
		bind:this={ring}
		class="pointer-events-none fixed top-0 left-0 z-[100] -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-wine)] transition-transform duration-300"
		class:scale-[1.8]={active}
		aria-hidden="true"
	>
		{#if label}
			<span class="eyebrow text-[10px] text-[color:var(--color-wine)]">{label}</span>
		{/if}
	</div>
	<div
		bind:this={dot}
		class="pointer-events-none fixed top-0 left-0 z-[101] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[color:var(--color-wine)] transition-opacity"
		class:opacity-0={active && label}
		aria-hidden="true"
	></div>
{/if}
