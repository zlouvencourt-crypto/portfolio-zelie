import { ensureGsap, ScrollTrigger } from './gsap';
import { prefersReducedMotion } from './motion';

/**
 * Révélation au défilement : l'élément monte depuis le bas (idéalement placé dans
 * un parent `.reveal-mask` en overflow hidden pour l'effet de masque/clip).
 */
export function reveal(node: HTMLElement, params: { delay?: number; y?: number } = {}) {
	if (prefersReducedMotion()) {
		node.style.transform = 'none';
		node.style.opacity = '1';
		return;
	}
	const gsap = ensureGsap();
	const y = params.y ?? 105;
	gsap.set(node, { yPercent: y, opacity: 0 });
	const st = ScrollTrigger.create({
		trigger: node,
		start: 'top 92%',
		once: true,
		onEnter: () =>
			gsap.to(node, {
				yPercent: 0,
				opacity: 1,
				duration: 1.15,
				ease: 'expo.out',
				delay: params.delay ?? 0
			})
	});
	return {
		destroy() {
			st.kill();
		}
	};
}

/**
 * Définit l'accent de marque actif (lagon / corail / solaire) lorsque la section
 * entre dans la vue. Le changement est lissé par la transition CSS sur `--accent`.
 */
export function accent(node: HTMLElement, color: string) {
	ensureGsap();
	let current = color;
	const apply = () => document.documentElement.style.setProperty('--accent', current);
	const st = ScrollTrigger.create({
		trigger: node,
		start: 'top 55%',
		end: 'bottom 45%',
		onEnter: apply,
		onEnterBack: apply
	});
	return {
		update(c: string) {
			current = c;
		},
		destroy() {
			st.kill();
		}
	};
}

/** Parallaxe verticale légère sur un élément (ex. médias). */
export function parallax(node: HTMLElement, amount = 12) {
	if (prefersReducedMotion()) return;
	const gsap = ensureGsap();
	const st = ScrollTrigger.create({
		trigger: node,
		start: 'top bottom',
		end: 'bottom top',
		scrub: true,
		animation: gsap.fromTo(node, { yPercent: -amount }, { yPercent: amount, ease: 'none' })
	});
	return {
		destroy() {
			st.kill();
		}
	};
}
