import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

// ADAPTER=static → site 100% statique (déployable partout, ex. Netlify).
// Par défaut → adapter-node (déploiement Docker / Coolify, inchangé).
const useStatic = process.env.ADAPTER === 'static';
const adapter = useStatic
	? adapterStatic({ pages: 'dist', assets: 'dist', fallback: '200.html', precompress: false })
	: adapterNode({ out: 'build' });

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	preprocess: [
		mdsvex({
			extensions: ['.md']
		})
	],
	kit: {
		adapter,
		alias: {
			$content: './src/content',
			$components: './src/lib/components',
			$utils: './src/lib/utils'
		}
	}
};

export default config;
