import { z } from 'zod';

export const galleryItemSchema = z.object({
	src: z.string(),
	alt: z.string().default(''),
	ratio: z.string().optional(), // "4/5", "16/9", etc.
	span: z.number().int().min(1).max(12).optional(),
	video: z.boolean().optional(),
	poster: z.string().optional(),
	section: z.string().optional(),
	caption: z.string().optional()
});

export const projectMetaSchema = z.object({
	title: z.string(),
	slug: z.string(),
	category: z.enum(['scolaire', 'pro']),
	order: z.number().int().default(999),
	year: z.union([z.number(), z.string()]).optional(),
	client: z.string().optional(),
	tagline: z.string().optional(),
	cover: z.string(),
	coverPortrait: z.string().optional(),
	tags: z.array(z.string()).default([]),
	role: z.string().optional(),

	brief: z.string().optional(),
	contexte: z.string().optional(),

	objectifs: z
		.object({
			information: z.string().optional(),
			image: z.string().optional(),
			action: z.string().optional()
		})
		.partial()
		.optional(),

	cibles: z
		.object({
			principale: z.string().optional(),
			coeur: z.string().optional(),
			secondaire: z.string().optional()
		})
		.partial()
		.optional(),

	livrables: z.array(z.string()).optional(),
	contraintes: z.union([z.string(), z.array(z.string())]).optional(),
	direction: z.string().optional(),

	gallery: z.array(galleryItemSchema).default([]),

	visualOnly: z.boolean().default(false),
	hidden: z.boolean().default(false),
	featured: z.boolean().default(false)
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type ProjectMeta = z.infer<typeof projectMetaSchema>;
