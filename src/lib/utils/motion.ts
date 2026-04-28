import { browser } from '$app/environment';

export const prefersReducedMotion = (): boolean => {
	if (!browser) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const onReducedMotionChange = (cb: (reduced: boolean) => void): (() => void) => {
	if (!browser) return () => {};
	const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
	const handler = (e: MediaQueryListEvent) => cb(e.matches);
	mq.addEventListener('change', handler);
	return () => mq.removeEventListener('change', handler);
};
