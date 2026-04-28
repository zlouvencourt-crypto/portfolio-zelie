import { listProjects } from '$lib/content/projects';

export const prerender = true;

export const load = () => {
	return {
		title: 'Pro',
		description: 'Projets professionnels — alternance WEXX OI, La Réunion.',
		projects: listProjects('pro').map((p) => p.meta)
	};
};
