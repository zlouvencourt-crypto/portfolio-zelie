<script lang="ts">
	import '../app.css';
	import SmoothScroll from '$components/SmoothScroll.svelte';
	import Navigation from '$components/Navigation.svelte';
	import Footer from '$components/Footer.svelte';
	import PageTransition from '$components/PageTransition.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const baseTitle = 'Zélie Louvencourt — Portfolio';
	const description =
		"Zélie Louvencourt, créatrice de 22 ans spécialisée en communication et direction artistique à La Réunion. Projets scolaires et professionnels chez WEXX OI.";
</script>

<svelte:head>
	<title>{page.data.title ? `${page.data.title} — Zélie Louvencourt` : baseTitle}</title>
	<meta name="description" content={page.data.description ?? description} />
	<meta property="og:title" content={page.data.title ?? baseTitle} />
	<meta property="og:description" content={page.data.description ?? description} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<SmoothScroll>
	<Navigation />
	<main>
		{@render children()}
	</main>
	<Footer />
	<PageTransition />
</SmoothScroll>
