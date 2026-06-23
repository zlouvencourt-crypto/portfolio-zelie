<script lang="ts">
	import { setLockedAccent } from '$utils/scroll';

	const swatches = [
		{ name: 'Lagon', color: '#12D6C6' },
		{ name: 'Corail', color: '#FF3D6E' },
		{ name: 'Solaire', color: '#FFD23F' },
		{ name: 'Améthyste', color: '#9B6CFF' }
	];

	let active = $state<string | null>(null);

	// Restaure le choix de couleur sauvegardé (et l'applique).
	$effect(() => {
		const saved = localStorage.getItem('wexx-accent');
		if (saved) {
			active = saved;
			setLockedAccent(saved);
		}
	});

	function pick(color: string) {
		if (active === color) {
			// Re-clic sur la couleur active : retour aux couleurs automatiques.
			active = null;
			setLockedAccent(null);
			localStorage.removeItem('wexx-accent');
		} else {
			active = color;
			setLockedAccent(color);
			localStorage.setItem('wexx-accent', color);
		}
	}
</script>

<div class="flex items-center gap-2" role="group" aria-label="Couleur du site">
	{#each swatches as s (s.color)}
		<button
			type="button"
			onclick={() => pick(s.color)}
			aria-label={`Voir le site en ${s.name}`}
			aria-pressed={active === s.color}
			title={s.name}
			data-cursor
			class="h-4 w-4 rounded-[3px] transition-transform duration-300 hover:scale-125"
			style="background-color: {s.color}; box-shadow: {active === s.color
				? '0 0 0 2px var(--color-night), 0 0 0 3.5px #fff'
				: 'none'};"
		></button>
	{/each}
</div>
