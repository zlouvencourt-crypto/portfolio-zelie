<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>WEXX OI — Agence de communication événementielle &amp; digitale</title>
	<meta
		name="description"
		content="WEXX Indian Ocean — agence de communication événementielle et digitale à La Réunion."
	/>
</svelte:head>

{@render children()}
