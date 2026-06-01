import { prefersReducedMotion } from './motion';

// Action Svelte : fait apparaître l'élément en fondu + léger glissement quand il
// entre dans l'écran. Si l'élément est déjà visible au chargement, il s'affiche
// immédiatement (pas de clignotement). Respecte « réduire les animations ».
export function reveal(node: HTMLElement, params?: { delay?: number }) {
	if (prefersReducedMotion()) return;

	const alreadyVisible = node.getBoundingClientRect().top < window.innerHeight * 0.95;
	if (alreadyVisible) return;

	node.style.opacity = '0';
	node.style.transform = 'translateY(28px)';
	node.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
	if (params?.delay) node.style.transitionDelay = `${params.delay}ms`;
	node.style.willChange = 'opacity, transform';

	const show = () => {
		node.style.opacity = '1';
		node.style.transform = 'none';
	};

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					show();
					io.disconnect();
				}
			}
		},
		{ threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
}
