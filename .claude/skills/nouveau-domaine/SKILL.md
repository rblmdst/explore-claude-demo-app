---
description: >
  Crée un nouveau domaine métier complet en architecture 3-tiers (interface, model, repository,
  service, controller, routes et tests), en suivant le pattern de src/employees/. À utiliser quand
  l'utilisateur demande d'ajouter une nouvelle entité ou un nouveau domaine à l'API. Passer le
  nom du domaine au singulier et en minuscules, par exemple "project" ou "invoice".
argument-hint: [nom-du-domaine-au-singulier]
---

Crée le domaine `$0` dans `src/$0s/`, en suivant **exactement** le pattern de `src/employees/`.

Si `$0` est vide, demande à l'utilisateur le nom du domaine et arrête-toi là.

## Ce qu'il existe déjà — à lire avant d'écrire

Le domaine de référence, à imiter fichier par fichier :

!`ls -1 src/employees/`

## Fichiers à produire

Dans `src/$0s/`, avec `$0` au singulier et `$0s` au pluriel :

| Fichier | Contenu |
|---|---|
| `$0.interface.ts` | Le type du domaine, `_id: Types.ObjectId` en premier champ |
| `$0.model.ts` | Le schéma Mongoose et le modèle exporté |
| `$0.repository.interface.ts` | Le contrat du repository |
| `$0.repository.ts` | `${0}RepositoryFactory(Model)` — **le modèle est un paramètre**, jamais importé directement, sinon le repository n'est pas testable |
| `$0.service.ts` | `${0}ServiceFactory(repository)` — la logique métier, sans Express |
| `$0.controller.ts` | `${0}ControllerFactory(service)` — chaque handler enveloppé dans `asyncHandler` de `../core/utils` |
| `$0.routes.ts` | Le Router, qui assemble les factories |
| `$0.service.test.ts` | Tests avec `node:test` et `mock`, repository stubbé |
| `$0.controller.test.ts` | Tests avec `node:test` et `mock`, service stubbé |

Puis monte le router dans `src/core/app.ts`, derrière `createAuthMiddlewareFactory(configService)`
si le domaine doit être protégé.

## Contraintes

- **Chaque couche est une factory.** Aucune couche n'instancie ses dépendances.
- Une couche ne parle qu'à celle immédiatement en dessous.
- Aucune dépendance de test à installer : `node:test`, `node:assert`, `mock`.
- Un identifiant reçu en paramètre de route est validé avec `isValidObjectId` avant tout appel au
  service, et renvoie 404 s'il est invalide.
- Ne jamais exposer de champ sensible (mot de passe, hash) dans une réponse.

## Pour finir

Lance `npm run verify` et corrige jusqu'à ce que tous les tests passent. Ne rends pas la main sur
une suite rouge.
