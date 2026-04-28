<script lang="ts">
	import { onMount } from 'svelte';
	import { ensureGsap } from '$utils/gsap';
	import { prefersReducedMotion } from '$utils/motion';

	type Props = {
		href?: string;
		onclick?: (e: MouseEvent) => void;
		strength?: number;
		class?: string;
		ariaLabel?: string;
		as?: 'a' | 'button';
		cursorLabel?: string;
		children: import('svelte').Snippet;
	};

	let {
		href,
		onclick,
		strength = 0.35,
		class: klass = '',
		ariaLabel,
		as = 'a',
		cursorLabel,
		children
	}: Props = $props();

	let el = $state<HTMLElement | null>(null);

	onMount(() => {
		if (!el || prefersReducedMotion()) return;
		if (window.matchMedia('(pointer: coarse)').matches) return;
		const gsap = ensureGsap();
		const qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
		const qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });

		const onMove = (e: PointerEvent) => {
			const rect = el!.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			qx((e.clientX - cx) * strength);
			qy((e.clientY - cy) * strength);
		};
		const reset = () => {
			qx(0);
			qy(0);
		};

		el.addEventListener('pointermove', onMove);
		el.addEventListener('pointerleave', reset);

		return () => {
			el?.removeEventListener('pointermove', onMove);
			el?.removeEventListener('pointerleave', reset);
		};
	});
</script>

{#if as === 'a'}
	<a
		bind:this={el}
		{href}
		aria-label={ariaLabel}
		class={klass}
		data-cursor-label={cursorLabel}
		{onclick}
	>
		{@render children()}
	</a>
{:else}
	<button
		bind:this={el}
		aria-label={ariaLabel}
		class={klass}
		data-cursor-label={cursorLabel}
		{onclick}
	>
		{@render children()}
	</button>
{/if}
