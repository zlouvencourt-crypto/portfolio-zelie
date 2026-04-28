<script lang="ts">
	import { onMount } from 'svelte';
	import { ensureGsap, ScrollTrigger } from '$utils/gsap';
	import { splitText, type SplitMode } from '$utils/splitText';
	import { prefersReducedMotion } from '$utils/motion';

	type Props = {
		as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
		text: string;
		mode?: SplitMode;
		class?: string;
		delay?: number;
		stagger?: number;
		duration?: number;
		y?: number;
		from?: number;
		trigger?: 'mount' | 'scroll';
		start?: string;
	};

	let {
		as = 'p',
		text,
		mode = 'words',
		class: klass = '',
		delay = 0,
		stagger = 0.04,
		duration = 1.1,
		y = 100,
		from = 0,
		trigger = 'scroll',
		start = 'top 85%'
	}: Props = $props();

	let el = $state<HTMLElement | null>(null);

	onMount(() => {
		if (!el) return;
		const gsap = ensureGsap();

		if (prefersReducedMotion()) {
			el.style.opacity = '1';
			return;
		}

		const result = splitText(el, mode === 'lines' ? ['lines', 'words'] : [mode]);
		const targets = mode === 'lines' ? result.lines : mode === 'chars' ? result.chars : result.words;

		gsap.set(targets, { yPercent: y, opacity: from });

		const tween = () =>
			gsap.to(targets, {
				yPercent: 0,
				opacity: 1,
				duration,
				stagger,
				delay,
				ease: 'expo.out'
			});

		if (trigger === 'mount') {
			tween();
		} else {
			ScrollTrigger.create({
				trigger: el,
				start,
				once: true,
				onEnter: tween
			});
		}

		return () => result.revert();
	});
</script>

<svelte:element this={as} bind:this={el} class={klass}>{text}</svelte:element>
