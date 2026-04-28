import { browser } from '$app/environment';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export const ensureGsap = () => {
	if (!browser) return gsap;
	if (!registered) {
		gsap.registerPlugin(ScrollTrigger);
		gsap.defaults({ ease: 'expo.out', duration: 1.2 });
		registered = true;
	}
	return gsap;
};

export { gsap, ScrollTrigger };
