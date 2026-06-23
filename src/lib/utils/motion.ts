import { browser } from '$app/environment';

export function prefersReducedMotion(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isTouch(): boolean {
	if (!browser) return false;
	return window.matchMedia('(pointer: coarse)').matches;
}
