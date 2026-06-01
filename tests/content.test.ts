import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { projectMetaSchema, type ProjectMeta } from '../src/lib/content/types';

// Toutes les fiches projet (.md) avec leur frontmatter déjà analysé.
const modules = import.meta.glob<{ metadata: Record<string, unknown> }>(
	'/src/content/**/*.md',
	{ eager: true }
);
const entries = Object.entries(modules);

// Récupère tous les chemins de médias référencés par une fiche projet.
function mediaRefs(meta: ProjectMeta): string[] {
	const refs: (string | undefined)[] = [
		meta.cover,
		meta.coverPortrait,
		meta.coverVideo
	];
	for (const item of meta.gallery ?? []) {
		refs.push(item.src, item.poster);
	}
	// On ne garde que les médias locaux (servis depuis /static).
	return refs.filter((r): r is string => typeof r === 'string' && r.startsWith('/'));
}

// Transforme un chemin public ("/images/x.png") en chemin disque dans /static.
function toDiskPath(publicPath: string): string {
	return fileURLToPath(new URL('../static' + publicPath, import.meta.url));
}

describe('Contenu des projets', () => {
	it('trouve au moins une fiche projet', () => {
		expect(entries.length).toBeGreaterThan(0);
	});

	it("chaque fiche a un frontmatter valide", () => {
		const errors: string[] = [];
		for (const [path, mod] of entries) {
			const parsed = projectMetaSchema.safeParse(mod.metadata);
			if (!parsed.success) {
				errors.push(`${path} :\n${JSON.stringify(parsed.error.format(), null, 2)}`);
			}
		}
		expect(errors, `Fiches projet invalides :\n${errors.join('\n')}`).toEqual([]);
	});

	it('toutes les images et vidéos citées existent sur le disque', () => {
		const missing: string[] = [];
		for (const [path, mod] of entries) {
			const parsed = projectMetaSchema.safeParse(mod.metadata);
			if (!parsed.success) continue; // déjà signalé par le test précédent
			for (const ref of mediaRefs(parsed.data)) {
				if (!existsSync(toDiskPath(ref))) {
					missing.push(`${path} → ${ref}`);
				}
			}
		}
		expect(
			missing,
			`Médias référencés mais introuvables (cassent le build / s'affichent en erreur en ligne) :\n${missing.join('\n')}`
		).toEqual([]);
	});

	it('chaque projet possède une couverture', () => {
		const noCover: string[] = [];
		for (const [path, mod] of entries) {
			const parsed = projectMetaSchema.safeParse(mod.metadata);
			if (parsed.success && !parsed.data.cover) noCover.push(path);
		}
		expect(noCover, `Projets sans couverture :\n${noCover.join('\n')}`).toEqual([]);
	});
});
