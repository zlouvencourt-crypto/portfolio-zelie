import type { Component } from 'svelte';
import { projectMetaSchema, type ProjectMeta } from './types';

type RawModule = {
	default: Component;
	metadata: Record<string, unknown>;
};

const modules = import.meta.glob<RawModule>('/src/content/**/*.md', { eager: true });

type ProjectEntry = {
	meta: ProjectMeta;
	component: Component;
};

const bySlug: Map<string, ProjectEntry> = new Map();
const byCategory: Record<'scolaire' | 'pro', ProjectEntry[]> = { scolaire: [], pro: [] };

for (const [path, mod] of Object.entries(modules)) {
	const parsed = projectMetaSchema.safeParse(mod.metadata);
	if (!parsed.success) {
		// eslint-disable-next-line no-console
		console.error(`[content] Invalid project metadata in ${path}:`, parsed.error.format());
		continue;
	}
	const entry: ProjectEntry = { meta: parsed.data, component: mod.default };
	bySlug.set(parsed.data.slug, entry);
	byCategory[parsed.data.category].push(entry);
}

const sorter = (a: ProjectEntry, b: ProjectEntry) => a.meta.order - b.meta.order;
byCategory.scolaire.sort(sorter);
byCategory.pro.sort(sorter);

export const getProject = (slug: string): ProjectEntry | undefined => bySlug.get(slug);

export const listProjects = (category: 'scolaire' | 'pro', opts?: { includeHidden?: boolean }): ProjectEntry[] => {
	const arr = byCategory[category];
	return opts?.includeHidden ? arr : arr.filter((p) => !p.meta.hidden);
};

export const allVisibleProjects = (): ProjectEntry[] => [
	...listProjects('scolaire'),
	...listProjects('pro')
];

export const featuredProjects = (category: 'scolaire' | 'pro', max = 3): ProjectEntry[] =>
	listProjects(category)
		.filter((p) => p.meta.featured)
		.slice(0, max);

export const neighbours = (slug: string): { prev?: ProjectEntry; next?: ProjectEntry } => {
	const current = bySlug.get(slug);
	if (!current) return {};
	const list = listProjects(current.meta.category);
	const idx = list.findIndex((p) => p.meta.slug === slug);
	return {
		prev: idx > 0 ? list[idx - 1] : list[list.length - 1],
		next: idx < list.length - 1 ? list[idx + 1] : list[0]
	};
};

export type { ProjectMeta, ProjectEntry };
