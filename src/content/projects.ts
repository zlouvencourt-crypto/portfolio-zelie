export type Project = {
	slug: string;
	title: string;
	/** Catégorie affichée (à ajuster librement). */
	tag: string;
	year?: string;
	/** Couleur d'accent de la palette, pour le survol et l'aperçu. */
	color: string;
	/** Base de l'image de couverture (sans extension) : .avif/.webp/.jpg. */
	cover?: string;
};

// L'ordre ici = l'ordre d'affichage sur la page Réalisations.
// Les catégories (tag) sont des suggestions à corriger au besoin.
export const projects: Project[] = [
	{ slug: 'chevillard', title: 'Chevillard', tag: 'Marque', color: '#12D6C6' },
	{ slug: 'dancewell', title: 'Dancewell', tag: 'Événement', color: '#FF3D6E' },
	{
		slug: 'electropicales-2024',
		title: 'Electropicales 2024',
		tag: 'Festival',
		year: '2024',
		color: '#FFD23F',
		cover: '/realisations/electropicales-2024/cover'
	},
	{ slug: 'electropicales-2025', title: 'Electropicales 2025', tag: 'Festival', year: '2025', color: '#9B6CFF' },
	{
		slug: 'eklectropicales-rap-dj-culture',
		title: 'Eklectropicales — Rap & DJ Culture',
		tag: 'Festival',
		color: '#12D6C6',
		cover: '/realisations/eklectropicales-rap-dj-culture/cover'
	},
	{
		slug: 'merchandesign',
		title: 'Merchandesign',
		tag: 'Merchandising',
		color: '#FF3D6E',
		cover: '/realisations/merchandesign/cover'
	},
	{ slug: 'socopharm', title: 'Socopharm', tag: 'Corporate', color: '#FFD23F' },
	{ slug: 'bebea', title: 'Bebea', tag: 'Marque', color: '#9B6CFF' },
	{ slug: 'gayar-lartiste', title: 'Gayar l’Artiste', tag: 'Artiste', color: '#12D6C6' },
	{ slug: 'denise', title: 'Denise', tag: 'Marque', color: '#FF3D6E' },
	{
		slug: 'la-delicieuse',
		title: 'La Délicieuse',
		tag: 'Événement',
		color: '#FFD23F',
		cover: '/realisations/la-delicieuse/cover'
	},
	{
		slug: 'carte-blanche',
		title: 'Carte Blanche',
		tag: 'Événement',
		color: '#9B6CFF',
		cover: '/realisations/carte-blanche/cover'
	}
];
