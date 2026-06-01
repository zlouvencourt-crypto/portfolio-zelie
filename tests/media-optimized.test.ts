import { describe, it, expect } from 'vitest';
import { readdirSync, existsSync } from 'node:fs';
import { join, extname, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

// Vérifie que chaque média possède ses déclinaisons optimisées.
// Images (.png/.jpg/.jpeg) → .avif + .webp
// Vidéos (.mp4) → .webm + .h264.mp4
// Si ce test échoue : lance `npm run optimize:media`.

const sourceDir = fileURLToPath(new URL('../source/images', import.meta.url));

const RASTER = new Set(['.png', '.jpg', '.jpeg']);
const SKIP = new Set(['.avif', '.webp', '.webm', '.gif', '.svg', '.heic', '.ds_store']);

function walk(dir: string): string[] {
	const out: string[] = [];
	for (const e of readdirSync(dir, { withFileTypes: true })) {
		if (e.name.startsWith('.')) continue;
		const full = join(dir, e.name);
		if (e.isDirectory()) out.push(...walk(full));
		else if (e.isFile()) out.push(full);
	}
	return out;
}

function sibling(file: string, newExt: string): string {
	return join(dirname(file), basename(file, extname(file)) + newExt);
}

const files = existsSync(sourceDir) ? walk(sourceDir) : [];

describe('Médias optimisés', () => {
	it('chaque image a ses versions .avif et .webp', () => {
		const missing: string[] = [];
		for (const f of files) {
			const ext = extname(f).toLowerCase();
			if (!RASTER.has(ext)) continue;
			if (!existsSync(sibling(f, '.avif'))) missing.push(`${f} → .avif manquant`);
			if (!existsSync(sibling(f, '.webp'))) missing.push(`${f} → .webp manquant`);
		}
		expect(
			missing,
			`Images sans version optimisée (lance « npm run optimize:media ») :\n${missing.join('\n')}`
		).toEqual([]);
	});

	it('chaque vidéo a ses versions .webm et .h264.mp4', () => {
		const missing: string[] = [];
		for (const f of files) {
			const ext = extname(f).toLowerCase();
			if (ext !== '.mp4') continue;
			if (f.toLowerCase().endsWith('.h264.mp4')) continue; // fichier déjà généré
			if (!existsSync(sibling(f, '.webm'))) missing.push(`${f} → .webm manquant`);
			if (!existsSync(sibling(f, '.h264.mp4'))) missing.push(`${f} → .h264.mp4 manquant`);
		}
		expect(
			missing,
			`Vidéos sans version optimisée (lance « npm run optimize:media ») :\n${missing.join('\n')}`
		).toEqual([]);
	});

	// Garde-fou : on s'attend à trouver des médias (sinon le test ne protège rien).
	it('trouve bien des médias à vérifier', () => {
		expect(SKIP.size).toBeGreaterThan(0);
		expect(files.length).toBeGreaterThan(0);
	});
});
