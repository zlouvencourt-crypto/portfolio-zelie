#!/usr/bin/env node
// Optimise toutes les images et vidéos du site.
//
// Images (.png/.jpg/.jpeg) → versions .avif (la plus légère) et .webp,
//   bornées à 2560 px sur le plus grand côté. L'original reste le secours ultime.
// Vidéos (.mp4) → version .webm (AV1, moderne et légère) et .h264.mp4
//   (H.264 universel, secours), bornées à 1920 px, sans audio
//   (toutes les vidéos du site sont muettes).
//
// Le script est incrémental : il ne retraite que les médias nouveaux ou modifiés.
// Lancement : `npm run optimize:media` ou `node scripts/optimize-media.mjs [dossier]`.

import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, dirname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const DEFAULT_DIR = join(repoRoot, 'source', 'images');
const targetDir = process.argv[2] ? join(process.cwd(), process.argv[2]) : DEFAULT_DIR;

// Réglages qualité — pensés pour rester visuellement excellents.
const IMAGE_MAX = 2560; // px sur le plus grand côté
const AVIF_QUALITY = 60;
const WEBP_QUALITY = 82;
const VIDEO_MAX = 1920; // px sur le plus grand côté
const AV1_CRF = 30; // plus bas = meilleure qualité
const AV1_PRESET = 7; // plus bas = plus lent / meilleur
const H264_CRF = 23;

const RASTER = new Set(['.png', '.jpg', '.jpeg']);
const SKIP_EXT = new Set(['.avif', '.webp', '.webm', '.gif', '.svg', '.heic', '.ds_store']);

const stats = { imagesDone: 0, imagesSkipped: 0, videosDone: 0, videosSkipped: 0, errors: [] };
// On compare le poids des originaux retraités au poids RÉELLEMENT livré à un
// navigateur moderne : l'AVIF pour les images, le WebM pour les vidéos (un seul
// format est téléchargé, jamais tous à la fois).
let srcBytes = 0;
let deliveredBytes = 0;

async function walk(dir) {
	const out = [];
	let entries;
	try {
		entries = await readdir(dir, { withFileTypes: true });
	} catch {
		return out;
	}
	for (const e of entries) {
		const full = join(dir, e.name);
		if (e.isDirectory()) {
			out.push(...(await walk(full)));
		} else if (e.isFile() && !e.name.startsWith('.')) {
			out.push(full);
		}
	}
	return out;
}

async function isOutdated(src, out) {
	if (!existsSync(out)) return true;
	const [s, o] = await Promise.all([stat(src), stat(out)]);
	return o.mtimeMs < s.mtimeMs;
}

async function sizeOf(p) {
	try {
		return (await stat(p)).size;
	} catch {
		return 0;
	}
}

const rel = (p) => relative(repoRoot, p);

async function optimizeImage(file) {
	const dir = dirname(file);
	const name = basename(file, extname(file));
	const avif = join(dir, `${name}.avif`);
	const webp = join(dir, `${name}.webp`);

	const need = (await isOutdated(file, avif)) || (await isOutdated(file, webp));
	if (!need) {
		stats.imagesSkipped++;
		return;
	}

	const pipeline = sharp(file).rotate().resize(IMAGE_MAX, IMAGE_MAX, {
		fit: 'inside',
		withoutEnlargement: true
	});

	await Promise.all([
		pipeline.clone().avif({ quality: AVIF_QUALITY, effort: 4 }).toFile(avif),
		pipeline.clone().webp({ quality: WEBP_QUALITY }).toFile(webp)
	]);

	srcBytes += await sizeOf(file);
	deliveredBytes += await sizeOf(avif);
	stats.imagesDone++;
	console.log(`  🖼  ${rel(file)} → .avif + .webp`);
}

const scaleFilter = `scale=${VIDEO_MAX}:${VIDEO_MAX}:force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2`;

async function optimizeVideo(file) {
	const dir = dirname(file);
	const name = basename(file, extname(file));
	const webm = join(dir, `${name}.webm`);
	const h264 = join(dir, `${name}.h264.mp4`);

	const need = (await isOutdated(file, webm)) || (await isOutdated(file, h264));
	if (!need) {
		stats.videosSkipped++;
		return;
	}

	console.log(`  🎬 ${rel(file)} → .webm (AV1) + .h264.mp4 …`);

	if (await isOutdated(file, webm)) {
		await execFileAsync('ffmpeg', [
			'-y', '-i', file,
			'-an',
			'-c:v', 'libsvtav1',
			'-crf', String(AV1_CRF),
			'-preset', String(AV1_PRESET),
			'-pix_fmt', 'yuv420p',
			'-vf', scaleFilter,
			webm
		], { maxBuffer: 1024 * 1024 * 64 });
	}

	if (await isOutdated(file, h264)) {
		await execFileAsync('ffmpeg', [
			'-y', '-i', file,
			'-an',
			'-c:v', 'libx264',
			'-crf', String(H264_CRF),
			'-preset', 'slow',
			'-profile:v', 'high',
			'-pix_fmt', 'yuv420p',
			'-movflags', '+faststart',
			'-vf', scaleFilter,
			h264
		], { maxBuffer: 1024 * 1024 * 64 });
	}

	srcBytes += await sizeOf(file);
	deliveredBytes += await sizeOf(webm);
	stats.videosDone++;
}

// Limite la parallélisation des images pour ne pas saturer la machine.
async function runPool(items, worker, concurrency) {
	let i = 0;
	const runners = Array.from({ length: concurrency }, async () => {
		while (i < items.length) {
			const item = items[i++];
			try {
				await worker(item);
			} catch (err) {
				stats.errors.push(`${rel(item)} : ${err.message}`);
				console.error(`  ❌ ${rel(item)} : ${err.message}`);
			}
		}
	});
	await Promise.all(runners);
}

function fmt(bytes) {
	const mb = bytes / (1024 * 1024);
	return `${mb.toFixed(1)} Mo`;
}

async function main() {
	if (!existsSync(targetDir)) {
		console.error(`Dossier introuvable : ${targetDir}`);
		process.exit(1);
	}
	console.log(`Optimisation des médias dans ${rel(targetDir)} …\n`);

	const files = await walk(targetDir);
	const images = [];
	const videos = [];
	for (const f of files) {
		const ext = extname(f).toLowerCase();
		if (SKIP_EXT.has(ext)) continue;
		if (f.toLowerCase().endsWith('.h264.mp4')) continue; // déjà un fichier généré
		if (RASTER.has(ext)) images.push(f);
		else if (ext === '.mp4') videos.push(f);
	}

	console.log(`${images.length} image(s) et ${videos.length} vidéo(s) à examiner.\n`);

	// Images en parallèle (rapides), vidéos en série (gourmandes en CPU).
	await runPool(images, optimizeImage, 4);
	for (const v of videos) {
		try {
			await optimizeVideo(v);
		} catch (err) {
			stats.errors.push(`${rel(v)} : ${err.message}`);
			console.error(`  ❌ ${rel(v)} : ${err.message}`);
		}
	}

	console.log('\n— Résumé —');
	console.log(`Images : ${stats.imagesDone} générée(s), ${stats.imagesSkipped} déjà à jour`);
	console.log(`Vidéos : ${stats.videosDone} générée(s), ${stats.videosSkipped} déjà à jour`);
	if (srcBytes > 0) {
		const saved = srcBytes - deliveredBytes;
		const pct = ((saved / srcBytes) * 100).toFixed(0);
		console.log(
			`Poids livré aux navigateurs modernes (AVIF/WebM) : ${fmt(srcBytes)} → ${fmt(deliveredBytes)} (−${pct}%)`
		);
	}
	if (stats.errors.length) {
		console.error(`\n${stats.errors.length} erreur(s) :`);
		for (const e of stats.errors) console.error(` - ${e}`);
		process.exit(1);
	}
	console.log('\n✅ Terminé.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
