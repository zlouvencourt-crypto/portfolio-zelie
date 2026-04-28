import { browser } from '$app/environment';
import Lenis from 'lenis';
import { ScrollTrigger } from './gsap';

let lenis: Lenis | null = null;
let raf: number | null = null;

export const startLenis = (): Lenis | null => {
	if (!browser || lenis) return lenis;

	lenis = new Lenis({
		duration: 1.2,
		easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		wheelMultiplier: 0.9,
		touchMultiplier: 1.2
	});

	lenis.on('scroll', ScrollTrigger.update);

	const loop = (time: number) => {
		lenis?.raf(time);
		raf = requestAnimationFrame(loop);
	};
	raf = requestAnimationFrame(loop);

	return lenis;
};

export const stopLenis = () => {
	if (raf !== null) cancelAnimationFrame(raf);
	lenis?.destroy();
	lenis = null;
	raf = null;
};

export const getLenis = () => lenis;

export const scrollTo = (target: string | HTMLElement | number, options?: { offset?: number; duration?: number; immediate?: boolean }) => {
	lenis?.scrollTo(target, options);
};
