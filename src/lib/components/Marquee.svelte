<script lang="ts">
	type Props = { items: string[]; speed?: number; class?: string };
	let { items, speed = 34, class: klass = '' }: Props = $props();
</script>

<div class="marquee {klass}">
	<ul class="marquee-track" style="--speed:{speed}s">
		{#each [...items, ...items] as it, i (i)}
			<li class="flex shrink-0 items-center gap-7">
				<span class="font-display text-[clamp(1.4rem,3vw,2.6rem)]">{it}</span>
				<span class="text-accent text-[clamp(0.9rem,1.6vw,1.4rem)]" aria-hidden="true">✦</span>
			</li>
		{/each}
	</ul>
</div>

<style>
	.marquee {
		overflow: hidden;
		width: 100%;
	}
	.marquee-track {
		display: flex;
		align-items: center;
		gap: 1.75rem;
		width: max-content;
		animation: marquee var(--speed, 34s) linear infinite;
	}
	.marquee:hover .marquee-track {
		animation-play-state: paused;
	}
	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
	}
</style>
