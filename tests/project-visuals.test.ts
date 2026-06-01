import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import ProjectVisuals from '../src/lib/components/ProjectVisuals.svelte';
import type { GalleryItem } from '../src/lib/content/types';

const r = (items: GalleryItem[]) => render(ProjectVisuals, { props: { items } }).body;

describe('ProjectVisuals — galerie en mosaïque', () => {
	it('ne rend aucune galerie si la liste est vide', () => {
		const body = r([]);
		expect(body).not.toContain('<figure');
		expect(body).not.toContain('masonry');
	});

	it('regroupe par section et numérote les groupes', () => {
		const body = r([
			{ src: '/images/a.png', alt: '', ratio: '4/5', section: 'Affiches' },
			{ src: '/images/b.png', alt: '', ratio: '4/5', section: 'Affiches' },
			{ src: '/images/c.png', alt: '', ratio: '4/5', section: 'Photos' }
		]);
		expect(body).toContain('Affiches');
		expect(body).toContain('Photos');
		expect(body).toContain('Sélection 01');
		expect(body).toContain('Sélection 02');
	});

	it("n'affiche aucun titre quand les visuels n'ont pas de section", () => {
		const body = r([
			{ src: '/images/a.png', alt: '', ratio: '4/5' },
			{ src: '/images/b.png', alt: '', ratio: '4/5' }
		]);
		expect(body).not.toContain('Sélection');
		expect(body).toContain('masonry'); // la mosaïque est bien rendue
	});

	it('rend une image via le composant Picture (avif/webp)', () => {
		const body = r([{ src: '/images/a.png', alt: 'Affiche', ratio: '4/5' }]);
		expect(body).toContain('type="image/avif"');
		expect(body).toContain('type="image/webp"');
	});

	it('rend une vidéo via le composant Video (webm + mp4)', () => {
		const body = r([
			{ src: '/images/clip.mp4', alt: '', ratio: '9/16', video: true, poster: '/images/p.png' }
		]);
		expect(body).toContain('<video');
		expect(body).toContain('type="video/webm"');
	});
});
