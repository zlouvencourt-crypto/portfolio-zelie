// Remplace $app/environment pendant les tests (hors SvelteKit).
// En test on rend les composants côté serveur : browser = false.
export const browser = false;
export const dev = false;
export const building = false;
export const version = 'test';
