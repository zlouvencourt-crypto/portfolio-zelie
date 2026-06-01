import { describe, it, expect } from 'vitest';
import {
	listProjects,
	allVisibleProjects,
	featuredProjects,
	neighbours,
	getProject
} from '../src/lib/content/projects';

describe('Couche de données des projets', () => {
	it('charge des projets pro et scolaires', () => {
		expect(listProjects('pro').length).toBeGreaterThan(0);
		expect(listProjects('scolaire').length).toBeGreaterThan(0);
	});

	it('exclut les projets cachés par défaut', () => {
		const visibles = listProjects('pro');
		const tous = listProjects('pro', { includeHidden: true });
		expect(tous.length).toBeGreaterThanOrEqual(visibles.length);
		expect(visibles.every((p) => !p.meta.hidden)).toBe(true);
	});

	it('trie les projets par ordre croissant', () => {
		const orders = listProjects('pro').map((p) => p.meta.order);
		const sorted = [...orders].sort((a, b) => a - b);
		expect(orders).toEqual(sorted);
	});

	it('chaque slug est unique', () => {
		const slugs = allVisibleProjects().map((p) => p.meta.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('les projets mis en avant sont bien marqués featured et limités', () => {
		const feat = featuredProjects('pro', 3);
		expect(feat.length).toBeLessThanOrEqual(3);
		expect(feat.every((p) => p.meta.featured)).toBe(true);
	});

	it('neighbours renvoie un précédent et un suivant (boucle)', () => {
		const list = listProjects('pro');
		expect(list.length).toBeGreaterThan(1);
		const { prev, next } = neighbours(list[0].meta.slug);
		expect(prev).toBeTruthy();
		expect(next).toBeTruthy();
		// Le suivant du premier est le deuxième de la liste.
		expect(next?.meta.slug).toBe(list[1].meta.slug);
	});

	it('getProject retrouve un projet par son slug', () => {
		const first = listProjects('scolaire')[0];
		expect(getProject(first.meta.slug)?.meta.title).toBe(first.meta.title);
	});
});
