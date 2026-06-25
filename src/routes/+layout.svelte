<script lang="ts">
	import '../app.css';
	import SmoothScroll from '$components/SmoothScroll.svelte';
	import Cursor from '$components/Cursor.svelte';
	import Grain from '$components/Grain.svelte';
	import Nav from '$components/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>WEXX OI — On fait vibrer l'océan Indien</title>
	<meta
		name="description"
		content="WEXX Indian Ocean — agence de communication événementielle à La Réunion. Stratégie, création, production."
	/>
	<meta property="og:title" content="WEXX OI — On fait vibrer l'océan Indien" />
	<meta property="og:type" content="website" />
	<meta
		property="og:description"
		content="Agence de communication événementielle à La Réunion. On imagine, on orchestre et on fait vivre des événements qui marquent les esprits."
	/>
	<meta property="og:image" content="/videos/hero-poster.jpg" />
	<meta property="og:image:width" content="1280" />
	<meta property="og:image:height" content="720" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="WEXX OI — On fait vibrer l'océan Indien" />
	<meta name="twitter:image" content="/videos/hero-poster.jpg" />
</svelte:head>

<Grain />
<Cursor />
<Nav />

<SmoothScroll>
	<main>
		{@render children()}
	</main>
</SmoothScroll>
