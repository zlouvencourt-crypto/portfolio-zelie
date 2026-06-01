// Petits utilitaires de chemins pour les médias optimisés.
// À partir du chemin d'un média d'origine (ex. "/images/x/post.png"), on déduit
// le chemin de ses déclinaisons modernes générées par scripts/optimize-media.mjs.

const RASTER_EXT = ['.png', '.jpg', '.jpeg'];

function replaceExt(src: string, newExt: string): string {
	const dot = src.lastIndexOf('.');
	return dot === -1 ? src + newExt : src.slice(0, dot) + newExt;
}

/** Vrai si l'image peut avoir des versions .avif / .webp. */
export function isOptimizableImage(src: string): boolean {
	const lower = src.toLowerCase();
	return RASTER_EXT.some((ext) => lower.endsWith(ext));
}

/** Vrai si la vidéo peut avoir des versions .webm / .h264.mp4. */
export function isOptimizableVideo(src: string): boolean {
	const lower = src.toLowerCase();
	return lower.endsWith('.mp4') && !lower.endsWith('.h264.mp4');
}

export const toAvif = (src: string): string => replaceExt(src, '.avif');
export const toWebp = (src: string): string => replaceExt(src, '.webp');
export const toWebm = (src: string): string => replaceExt(src, '.webm');
export const toH264 = (src: string): string => replaceExt(src, '.h264.mp4');
