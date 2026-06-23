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
</svelte:head>

<Grain />
<Cursor />
<Nav />

<SmoothScroll>
	<main>
		{@render children()}
	</main>
</SmoothScroll>
