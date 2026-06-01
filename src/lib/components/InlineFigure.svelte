<script lang="ts">
	import ImageReveal from '$components/ImageReveal.svelte';
	import Video from '$components/Video.svelte';
	import type { GalleryItem } from '$lib/content/types';

	// Un visuel calme tissé dans le texte du brief, pour combler les colonnes vides.
	type Props = { item: GalleryItem; ratio?: string };
	let { item, ratio }: Props = $props();

	const r = $derived(ratio ?? item.ratio ?? '4/5');
</script>

<div class="mt-10">
	{#if item.video}
		<div class="relative overflow-hidden" style:aspect-ratio={r}>
			<Video
				src={item.src}
				poster={item.poster}
				ariaLabel={item.alt || ''}
				class="absolute inset-0 h-full w-full object-cover"
			/>
		</div>
	{:else}
		<ImageReveal src={item.src} alt={item.alt || ''} ratio={r} class="[&_img]:object-cover" />
	{/if}
</div>
