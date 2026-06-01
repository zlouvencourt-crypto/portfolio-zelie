import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import ProProjectPage from '../src/routes/pro/[slug]/+page.svelte';
import ScolaireProjectPage from '../src/routes/scolaire/[slug]/+page.svelte';
import { getProject, listProjects } from '../src/lib/content/projects';
import ProjectHero from '../src/lib/components/ProjectHero.svelte';

// Régression du bug de déploiement : le bouton « Découvrir » pointe vers #projet.
// Ce repère doit exister sur CHAQUE page projet, y compris les projets visualOnly.

function findProject(category: 'pro' | 'scolaire', wantVisualOnly: boolean) {
	const match = listProjects(category, { includeHidden: true }).find(
		(p) => !!p.meta.visualOnly === wantVisualOnly
	);
	return match;
}

function renderPage(
	Page: typeof ProProjectPage,
	meta: NonNullable<ReturnType<typeof getProject>>['meta']
) {
	return render(Page, { props: { data: { meta, prev: undefined, next: undefined } } }).body;
}

describe('Ancre #projet (bouton « Découvrir »)', () => {
	it('le hero génère bien un lien vers #projet', () => {
		const sample = listProjects('pro', { includeHidden: true })[0];
		expect(sample, 'aucun projet pro trouvé').toBeTruthy();
		const body = render(ProjectHero, { props: { meta: sample!.meta } }).body;
		expect(body).toContain('href="#projet"');
	});

	it('une page projet PRO classique contient id="projet"', () => {
		const p = findProject('pro', false);
		expect(p, 'aucun projet pro classique trouvé').toBeTruthy();
		const body = renderPage(ProProjectPage, p!.meta);
		expect(body).toContain('href="#projet"');
		expect(body).toContain('id="projet"');
	});

	it('une page projet PRO visualOnly contient aussi id="projet"', () => {
		const p = findProject('pro', true);
		// Certains jeux de données peuvent ne pas avoir de visualOnly : on saute alors.
		if (!p) return;
		const body = renderPage(ProProjectPage, p.meta);
		expect(body).toContain('href="#projet"');
		expect(body).toContain('id="projet"');
	});

	it('une page projet SCOLAIRE classique contient id="projet"', () => {
		const p = findProject('scolaire', false);
		expect(p, 'aucun projet scolaire classique trouvé').toBeTruthy();
		const body = renderPage(ScolaireProjectPage, p!.meta);
		expect(body).toContain('href="#projet"');
		expect(body).toContain('id="projet"');
	});

	it('TOUS les projets exposent id="projet" (pro + scolaire)', () => {
		const broken: string[] = [];
		for (const category of ['pro', 'scolaire'] as const) {
			const Page = category === 'pro' ? ProProjectPage : ScolaireProjectPage;
			for (const p of listProjects(category, { includeHidden: true })) {
				const body = renderPage(Page, p.meta);
				const hasLink = body.includes('href="#projet"');
				const hasTarget = body.includes('id="projet"');
				if (hasLink && !hasTarget) broken.push(`${category}/${p.meta.slug}`);
			}
		}
		expect(
			broken,
			`Pages avec un bouton « Découvrir » sans cible #projet :\n${broken.join('\n')}`
		).toEqual([]);
	});
});
