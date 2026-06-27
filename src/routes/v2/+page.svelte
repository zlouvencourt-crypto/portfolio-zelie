<script lang="ts">
	import HeroBgScroll from '$components/HeroBgScroll.svelte';
	import HomeSections from '$components/HomeSections.svelte';
</script>

<svelte:head>
	<title>WEXX OI — version scroll</title>
	<link rel="preload" as="image" href="/videos/hero-poster.jpg" fetchpriority="high" />
</svelte:head>

<HeroBgScroll />
<HomeSections />
