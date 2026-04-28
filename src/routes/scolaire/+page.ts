import { listProjects } from '$lib/content/projects';

export const prerender = true;

export const load = () => {
	return {
		title: 'Scolaire',
		description: 'Projets BTS Communication — 2023 à 2025.',
		projects: listProjects('scolaire').map((p) => p.meta)
	};
};
