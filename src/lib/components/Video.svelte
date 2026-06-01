<script lang="ts">
	import { isOptimizableVideo, toWebm, toH264 } from '$utils/media';

	type Props = {
		src: string;
		poster?: string;
		class?: string;
		autoplay?: boolean;
		loop?: boolean;
		muted?: boolean;
		playsinline?: boolean;
		controls?: boolean;
		preload?: 'none' | 'metadata' | 'auto';
		ariaLabel?: string;
	};

	let {
		src,
		poster,
		class: klass = '',
		autoplay = true,
		loop = true,
		muted = true,
		playsinline = true,
		controls = false,
		preload = 'metadata',
		ariaLabel
	}: Props = $props();

	const optimizable = $derived(isOptimizableVideo(src));
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<video
	class={klass}
	{poster}
	{autoplay}
	{loop}
	{muted}
	{controls}
	{preload}
	playsinline={playsinline}
	aria-label={ariaLabel}
>
	{#if optimizable}
		<source src={toWebm(src)} type="video/webm" />
		<source src={toH264(src)} type="video/mp4" />
	{:else}
		<source {src} type="video/mp4" />
	{/if}
</video>
