import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import SectionGrid from '../src/lib/components/SectionGrid.svelte';
import type { GalleryItem } from '../src/lib/content/types';

const r = (items: GalleryItem[]) => render(SectionGrid, { props: { items } }).body;

describe('SectionGrid — visuels dispersés', () => {
	it('ne rend aucune grille si la galerie est vide', () => {
		const body = r([]);
		expect(body).not.toContain('<figure');
		expect(body).not.toContain('<section');
	});

	it('regroupe par section et numérote les groupes', () => {
		const body = r([
			{ src: '/images/a.png', alt: '', ratio: '4/5', span: 6, section: 'Affiches' },
			{ src: '/images/b.png', alt: '', ratio: '4/5', span: 6, section: 'Affiches' },
			{ src: '/images/c.png', alt: '', ratio: '4/5', span: 6, section: 'Photos' }
		]);
		expect(body).toContain('Affiches');
		expect(body).toContain('Photos');
		expect(body).toContain('Sélection 01');
		expect(body).toContain('Sélection 02');
	});

	it("n'affiche aucun titre de section quand les visuels n'en ont pas", () => {
		const body = r([
			{ src: '/images/a.png', alt: '', ratio: '4/5', span: 6 },
			{ src: '/images/b.png', alt: '', ratio: '4/5', span: 6 }
		]);
		expect(body).not.toContain('Sélection');
	});

	it('applique la largeur span en classes littérales (Tailwind)', () => {
		const body = r([{ src: '/images/a.png', alt: '', ratio: '4/5', span: 6 }]);
		expect(body).toContain('md:col-span-6');
	});

	it('utilise pleine largeur (span 12) par défaut sans span', () => {
		const body = r([{ src: '/images/a.png', alt: '', ratio: '4/5' }]);
		expect(body).toContain('md:col-span-12');
	});

	it('rend une vidéo via le composant Video (webm + mp4)', () => {
		const body = r([
			{ src: '/images/clip.mp4', alt: '', ratio: '9/16', video: true, poster: '/images/p.png' }
		]);
		expect(body).toContain('<video');
		expect(body).toContain('type="video/webm"');
	});
});
