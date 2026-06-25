<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { prefersReducedMotion, isTouch } from '$utils/motion';

	type Props = {
		children: import('svelte').Snippet;
		strength?: number;
		class?: string;
	};
	let { children, strength = 0.4, class: klass = '' }: Props = $props();

	let el = $state<HTMLElement | null>(null);

	onMount(() => {
		if (prefersReducedMotion() || isTouch() || !el) return;
		const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'expo.out' });
		const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'expo.out' });

		const move = (e: PointerEvent) => {
			const r = el!.getBoundingClientRect();
			xTo((e.clientX - (r.left + r.width / 2)) * strength);
			yTo((e.clientY - (r.top + r.height / 2)) * strength);
		};
		const reset = () => {
			xTo(0);
			yTo(0);
		};

		el.addEventListener('pointermove', move);
		el.addEventListener('pointerleave', reset);
		return () => {
			el?.removeEventListener('pointermove', move);
			el?.removeEventListener('pointerleave', reset);
		};
	});
</script>

<span bind:this={el} class={klass} style="display:inline-block;will-change:transform;">
	{@render children()}
</span>
