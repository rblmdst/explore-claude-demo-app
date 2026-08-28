---
paths:
  - "src/**/*.repository.ts"
  - "src/**/*.repository.interface.ts"
---

# Couche d'accès aux données

Ces règles ne se chargent que lorsque tu lis un fichier de la couche repository.

- Un repository est construit par une **factory** qui reçoit le modèle Mongoose en paramètre.
  Il n'importe jamais la connexion directement : c'est ce qui permet de le mocker.
- Il expose exactement les méthodes déclarées dans son `*.repository.interface.ts`. Toute nouvelle
  méthode s'ajoute d'abord à l'interface.
- **Aucune logique métier ici.** Pas de validation, pas de calcul, pas de règle de gestion : c'est
  le rôle du service. Le repository traduit un appel en requête et rend le résultat.
- Les erreurs Mongoose ne sont pas attrapées ici. Elles remontent au middleware d'erreur de
  `src/core/middlewares/error.middleware.ts`.
- Toute méthode ajoutée doit être couverte dans le `*.repository.test.ts` voisin, avec un modèle
  mocké via `mock` de `node:test`.
