---
paths:
  - "src/**/*.test.ts"
---

# Tests unitaires

- `node:test` et `node:assert` uniquement. **Ne propose jamais** d'installer Jest, Vitest, Chai ou
  Sinon : le projet n'a aucune dépendance de test et cela doit rester vrai.
- Mocks via `mock` de `node:test`, jamais de vraie base de données.
- Un `describe` par couche testée, nommé comme la classe logique (`EmployeeService`).
- Tester le comportement observable de la couche, pas l'implémentation de ses dépendances.
- Après toute modification : `npm run verify`.
