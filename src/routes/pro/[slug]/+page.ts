import { error } from '@sveltejs/kit';
import { getProject, listProjects, neighbours } from '$lib/content/projects';

export const prerender = true;

export const entries = () =>
	listProjects('pro', { includeHidden: true }).map((p) => ({ slug: p.meta.slug }));

export const load = ({ params }: { params: { slug: string } }) => {
	const entry = getProject(params.slug);
	if (!entry || entry.meta.category !== 'pro') error(404, 'Projet introuvable');

	const { prev, next } = neighbours(params.slug);

	return {
		title: entry.meta.title,
		description: entry.meta.tagline ?? entry.meta.brief ?? '',
		meta: entry.meta,
		prev: prev
			? { slug: prev.meta.slug, title: prev.meta.title, cover: prev.meta.cover, category: prev.meta.category }
			: null,
		next: next
			? { slug: next.meta.slug, title: next.meta.title, cover: next.meta.cover, category: next.meta.category }
			: null
	};
};
