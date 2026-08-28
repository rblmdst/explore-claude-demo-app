# API Employés — Express + TypeScript

API REST en architecture 3-tiers. Sert de fil rouge à la série de tutoriels Claude Code.

## Commandes

```bash
npm run verify        # build + tests unitaires — LA commande à lancer après toute modification
npm run build         # tsc vers dist-server/
npm test              # tests unitaires seuls (nécessite un build préalable)
```

Les tests unitaires sont mockés et **ne nécessitent aucune base de données**.

## Architecture

Un dossier par domaine sous `src/`, et dans chaque domaine une couche par fichier :

| Fichier | Rôle |
|---|---|
| `*.routes.ts` | Déclaration des routes Express, branche le controller |
| `*.controller.ts` | Lit la requête, appelle le service, écrit la réponse |
| `*.service.ts` | Logique métier, ne connaît pas Express |
| `*.repository.ts` | Accès aux données via Mongoose, ne connaît pas le métier |
| `*.model.ts` | Schéma Mongoose |
| `*.interface.ts` | Types du domaine |
| `*.repository.interface.ts` | Contrat du repository, permet de le mocker |

`src/core/` contient l'app, la connexion base, les middlewares et la configuration.

## Conventions

- **Chaque couche est une factory** : `employeeServiceFactory(deps)` renvoie le service. Ne jamais
  instancier une couche directement — c'est ce qui rend les tests unitaires possibles sans base.
- Une couche ne parle qu'à la couche immédiatement inférieure. Un controller n'appelle jamais un
  repository.
- Les tests sont **colocalisés** avec le code : `employee.service.test.ts` à côté de
  `employee.service.ts`.
- Tests écrits avec `node:test` et `node:assert`, mocks via `mock` de `node:test`. Aucune
  dépendance de test à installer.
- `src/users/` est **volontairement incomplet** (ni controller, ni routes, ni tests). Le modèle à
  suivre pour le compléter est `src/employees/`.

## Périmètre

- **MongoDB est hors périmètre** de cette série. Ne propose pas de lancer l'application ni les
  tests d'intégration (`npm run test:integ`) : ils exigent une base que personne n'a démarrée.
- Les fichiers `.env` sont générés depuis les `.env.local` par une copie manuelle. Ne les commite
  jamais : le `.gitignore` couvre `*.env`.
