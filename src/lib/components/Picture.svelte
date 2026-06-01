<script lang="ts">
	import { isOptimizableImage, toAvif, toWebp } from '$utils/media';

	type Props = {
		src: string;
		alt?: string;
		class?: string;
		loading?: 'eager' | 'lazy';
		fetchpriority?: 'high' | 'low' | 'auto';
		sizes?: string;
		decoding?: 'async' | 'sync' | 'auto';
		style?: string;
	};

	let {
		src,
		alt = '',
		class: klass = '',
		loading = 'lazy',
		fetchpriority,
		sizes,
		decoding = 'async',
		style
	}: Props = $props();

	const optimizable = $derived(isOptimizableImage(src));
</script>

{#if optimizable}
	<picture>
		<source srcset={toAvif(src)} type="image/avif" />
		<source srcset={toWebp(src)} type="image/webp" />
		<img {src} {alt} class={klass} {loading} {decoding} {sizes} {fetchpriority} {style} />
	</picture>
{:else}
	<img {src} {alt} class={klass} {loading} {decoding} {sizes} {fetchpriority} {style} />
{/if}

<style>
	/* La balise <picture> ne crée aucune boîte : l'<img> garde le comportement
	   de mise en page qu'il avait avant (utile pour flex / hauteurs fixes). */
	picture {
		display: contents;
	}
</style>
