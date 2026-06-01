import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Configuration de test indépendante de SvelteKit : on compile les .svelte/.md
// avec le plugin Svelte + mdsvex, on rebranche les alias du projet, et on
// remplace $app/environment par un faux module (voir tests/mocks).
export default defineConfig({
	plugins: [
		svelte({
			extensions: ['.svelte', '.md'],
			preprocess: [mdsvex({ extensions: ['.md'] })],
			compilerOptions: { runes: true }
		})
	],
	resolve: {
		alias: {
			$lib: r('./src/lib'),
			$components: r('./src/lib/components'),
			$utils: r('./src/lib/utils'),
			$content: r('./src/content'),
			'$app/environment': r('./tests/mocks/app-environment.ts')
		}
	},
	test: {
		environment: 'node',
		include: ['tests/**/*.test.ts'],
		globals: false
	}
});
