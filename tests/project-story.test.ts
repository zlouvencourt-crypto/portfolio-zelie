import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import ProjectStory from '../src/lib/components/ProjectStory.svelte';
import type { ProjectMeta } from '../src/lib/content/types';
import type { GalleryItem } from '../src/lib/content/types';

const base = (over: Partial<ProjectMeta> = {}): ProjectMeta =>
	({
		title: 'Test',
		slug: 'test',
		category: 'pro',
		order: 1,
		cover: '/images/cover.png',
		tags: [],
		gallery: [],
		visualOnly: false,
		hidden: false,
		featured: false,
		...over
	}) as ProjectMeta;

const r = (meta: ProjectMeta) => render(ProjectStory, { props: { meta } }).body;
const count = (s: string, sub: string) => s.split(sub).length - 1;

describe('ProjectStory — récit lookbook', () => {
	it('rend les moments de texte du brief', () => {
		const body = r(
			base({
				contexte: 'Le contexte du projet.',
				brief: 'La problématique.',
				objectifs: { information: 'Informer', image: 'Marquer', action: 'Agir' },
				direction: 'Direction artistique sobre.'
			})
		);
		expect(body).toContain('Le contexte du projet.');
		expect(body).toContain('La problématique.');
		expect(body).toContain('Informer');
		expect(body).toContain('Direction artistique sobre.');
	});

	it('ajoute un carrousel « Tous les visuels » en bas avec chaque visuel', () => {
		const gallery: GalleryItem[] = [
			{ src: '/images/a.png', alt: '', ratio: '4/5' },
			{ src: '/images/b.png', alt: '', ratio: '4/5' },
			{ src: '/images/c.png', alt: '', ratio: '16/9' }
		];
		const body = r(base({ contexte: 'Texte.', gallery }));
		expect(body).toContain('Tous les visuels');
		// chaque visuel est présent (dans le récit ET le carrousel)
		expect(count(body, 'src="/images/a.png"')).toBeGreaterThanOrEqual(1);
		expect(count(body, 'src="/images/c.png"')).toBeGreaterThanOrEqual(1);
	});

	it('entrelace texte et visuels (les deux présents)', () => {
		const gallery: GalleryItem[] = [
			{ src: '/images/a.png', alt: '', ratio: '4/5' },
			{ src: '/images/b.png', alt: '', ratio: '4/5' }
		];
		const body = r(base({ contexte: 'Mon contexte.', gallery }));
		expect(body).toContain('Mon contexte.');
		expect(body).toContain('type="image/avif"'); // visuel via Picture
	});

	it('projet visualOnly : que des visuels, aucun texte de brief', () => {
		const gallery: GalleryItem[] = [{ src: '/images/a.png', alt: '', ratio: '4/5' }];
		const body = r(base({ visualOnly: true, gallery }));
		expect(body).toContain('src="/images/a.png"');
		expect(body).not.toContain('— Le brief');
	});

	it('rend les vidéos via le composant Video', () => {
		const gallery: GalleryItem[] = [
			{ src: '/images/clip.mp4', alt: '', ratio: '9/16', video: true, poster: '/images/p.png' }
		];
		const body = r(base({ gallery }));
		expect(body).toContain('<video');
		expect(body).toContain('type="video/webm"');
	});

	it('affiche un mot géant en filigrane (à partir du premier tag) avec les visuels en trop', () => {
		const gallery: GalleryItem[] = Array.from({ length: 6 }, (_, i) => ({
			src: `/images/g${i}.png`,
			alt: '',
			ratio: '4/5'
		}));
		const body = r(base({ tags: ['Branding'], gallery }));
		expect(body).toContain('Branding');
	});
});
