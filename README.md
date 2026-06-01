# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.15.1 create --template minimal --types ts --no-install site
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Vérifier avant de déployer

Avant chaque mise en ligne, lance :

```sh
npm run verify
```

Cette commande joue les tests automatiques **puis** le build de production —
exactement les mêmes contrôles que le serveur de déploiement. Si elle réussit,
le déploiement réussira aussi.

- `npm run test` — lance uniquement les tests (rapide).
- `npm run test:watch` — relance les tests à chaque modification.

Les tests vérifient notamment :

- que chaque page projet possède bien le repère `#projet` (cible du bouton « Découvrir ») ;
- que toutes les images et vidéos citées dans les fiches projet existent vraiment ;
- que chaque fiche projet est correctement remplie.

## Optimisation des images et vidéos

Tous les médias sont déclinés en formats modernes et légers (AVIF / WebP pour
les images, WebM pour les vidéos) avec un format de secours universel
(PNG / JPG, MP4). Pour (re)générer ces fichiers après avoir ajouté de nouveaux
médias :

```sh
npm run optimize:media
```

Le script ne retraite que les nouveaux médias ou ceux qui ont changé.
Il a besoin de [`ffmpeg`](https://ffmpeg.org/) installé sur la machine pour les vidéos.
