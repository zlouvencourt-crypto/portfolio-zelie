<script lang="ts">
	import { onMount } from 'svelte';
	import { ensureGsap, ScrollTrigger } from '$utils/gsap';
	import { prefersReducedMotion } from '$utils/motion';
	import { isOptimizableImage, toAvif, toWebp } from '$utils/media';

	type Props = {
		src: string;
		alt: string;
		ratio?: string;
		class?: string;
		parallax?: number;
		loading?: 'eager' | 'lazy';
		sizes?: string;
	};

	let {
		src,
		alt,
		ratio = '4/5',
		class: klass = '',
		parallax = 0,
		loading = 'lazy',
		sizes = '100vw'
	}: Props = $props();

	const optimizable = $derived(isOptimizableImage(src));

	let wrapper = $state<HTMLElement | null>(null);
	let imgEl = $state<HTMLImageElement | null>(null);

	onMount(() => {
		if (!wrapper || !imgEl) return;
		const gsap = ensureGsap();

		if (prefersReducedMotion()) {
			wrapper.style.clipPath = 'inset(0)';
			wrapper.style.opacity = '1';
			return;
		}

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: wrapper,
				start: 'top 90%',
				once: true
			}
		});

		tl.fromTo(
			wrapper,
			{ clipPath: 'inset(100% 0 0 0)', opacity: 1 },
			{ clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'expo.out' }
		).fromTo(imgEl, { scale: 1.15 }, { scale: 1, duration: 1.6, ease: 'expo.out' }, '<');

		let parallaxST: ScrollTrigger | null = null;
		if (parallax !== 0) {
			parallaxST = ScrollTrigger.create({
				trigger: wrapper,
				start: 'top bottom',
				end: 'bottom top',
				scrub: true,
				animation: gsap.fromTo(
					imgEl,
					{ yPercent: -parallax },
					{ yPercent: parallax, ease: 'none' }
				)
			});
		}

		return () => {
			tl.scrollTrigger?.kill();
			tl.kill();
			parallaxST?.kill();
		};
	});
</script>

<div
	bind:this={wrapper}
	class="image-reveal relative overflow-hidden {klass}"
	style:aspect-ratio={ratio}
>
	{#if optimizable}
		<picture>
			<source srcset={toAvif(src)} type="image/avif" />
			<source srcset={toWebp(src)} type="image/webp" />
			<img
				bind:this={imgEl}
				{src}
				{alt}
				{loading}
				{sizes}
				decoding="async"
				class="h-full w-full object-contain"
			/>
		</picture>
	{:else}
		<img
			bind:this={imgEl}
			{src}
			{alt}
			{loading}
			{sizes}
			decoding="async"
			class="h-full w-full object-contain"
		/>
	{/if}
</div>

<style>
	.image-reveal {
		clip-path: inset(100% 0 0 0);
	}
	picture {
		display: contents;
	}
</style>
