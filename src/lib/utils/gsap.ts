import { browser } from '$app/environment';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function ensureGsap() {
	if (browser && !registered) {
		gsap.registerPlugin(ScrollTrigger);
		registered = true;
	}
	return gsap;
}

export { gsap, ScrollTrigger };
