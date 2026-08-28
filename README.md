# explore-claude-demo — fil rouge du tuto « Fondamentaux de Claude Code »

Dépôt d'entraînement pour la série de tutoriels **Fondamentaux de Claude Code**.

C'est une API REST **Express + TypeScript** en architecture 3-tiers, issue du projet
[express_typescript_devpropulsor](https://github.com/rblmdst/express_typescript_devpropulsor)
(branche `error_handling__gracefully_shutdown`). L'historique d'origine est conservé : il sert de
matière réelle pour les démos d'exploration et de relecture de code.

> Le sujet de la série est **Claude Code**, pas Express. Vous n'avez pas besoin de connaître
> Express pour suivre : le code sert de terrain de jeu réaliste.

## Prérequis

- **Node.js 24** ou plus (`node --version`)
- **npm**
- **Claude Code v2.1.250** ou plus (`claude --version`)
- **Pas de MongoDB.** La boucle de vérification de la série s'appuie sur les tests unitaires, qui
  sont entièrement mockés et ne touchent aucune base.

## Démarrage

```bash
npm install
npm run verify     # équivaut à : npm run build && npm test
```

`npm run verify` doit afficher **6 tests / 3 suites / 0 échec**. C'est la commande de référence de
l'épisode 04.

## Rejoindre la série à n'importe quel épisode

Un tag marque l'état de départ de chaque épisode. La fin d'un épisode est le tag du suivant.

```bash
git checkout ep01-start     # le projet nu, aucune configuration Claude Code
```

| Tag | État du dépôt | Épisodes |
|---|---|---|
| `ep01-start` | Projet nu, **aucun `.claude/`** | 00, 01 |
| `ep02-start` | + `CLAUDE.md` | 02, 03 |
| `ep04-start` | + `.claude/rules/` | 04 |
| `ep05-start` | + le domaine `users` complété | 05 |
| `ep06-start` | + `.claude/skills/` | 06 |
| `ep07-start` | + `.claude/agents/` | 07 |
| `ep08-start` | + `.claude/settings.json` et le hook | 08 |
| `ep09-start` | + `.mcp.json` | 09 |
| `serie-complete` | État final | — |

Pour voir ce qu'un épisode ajoute :

```bash
git diff ep06-start ep07-start
```

## L'application

Architecture 3-tiers, un dossier par domaine :

```
src/
├── core/              # app, db, middlewares, configuration
├── employees/         # domaine COMPLET : controller, service, repository, routes, model + 3 tests
├── users/             # domaine INCOMPLET : ni controller, ni routes, ni tests
└── authentication/    # inscription, login, middleware JWT
```

Chaque couche est construite par une *factory*, ce qui rend les dépendances injectables — c'est
pour cette raison que les tests unitaires n'ont besoin d'aucune base de données.

> L'asymétrie entre `employees/` et `users/` est **voulue** : compléter `users/` en suivant le
> pattern de `employees/` est l'exercice de l'épisode 04.

## Pour aller plus loin (hors périmètre de la série)

Faire tourner l'API ou les tests d'intégration demande une instance MongoDB locale :

```bash
cp .development.env.local .development.env    # les scripts lisent .env, pas .env.local
npm run build && npm run start:dev
```

## Écarts avec le dépôt d'origine

- `npm test` utilise un glob explicite (`node --test "dist-server/**/*.test.js"`). Avec le
  répertoire nu, Node 24 exécute `dist-server/index.js`, donc l'application, qui tente de joindre
  MongoDB et fait échouer la commande.
- Ajout du script `npm run verify`.
- Ajout de `clean` / `prebuild` : `tsc` ne vide pas `dist-server`, donc passer d'un tag à un autre
  laissait des fichiers compilés issus d'un épisode ultérieur, et les tests échouaient sans raison
  visible. Le build nettoie maintenant sa sortie.
