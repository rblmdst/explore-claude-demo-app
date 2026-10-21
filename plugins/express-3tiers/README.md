# express-3tiers

Plugin Claude Code pour les API Express + TypeScript en architecture 3-tiers.

| Composant | Type | Rôle |
|---|---|---|
| `nouveau-domaine` | skill | `/express-3tiers:nouveau-domaine <nom>` crée un domaine complet en imitant le domaine de référence du projet |
| `format.mjs` | hook `PostToolUse` | Normalise chaque fichier que Claude édite (espaces de fin, saut de ligne final) |

## Installation

```bash
claude plugin marketplace add rblmdst/explore-claude-demo-app
claude plugin install express-3tiers@explore-demo
```

## Configuration du projet

Le skill lit `.claude/express-3tiers.json` à la racine du projet qui l'utilise. Copiez
[`config/express-3tiers.example.json`](config/express-3tiers.example.json) et adaptez :

| Clé | Rôle |
|---|---|
| `referenceDomain` | Le dossier du domaine à imiter, par exemple `src/employees` |

## Versions

- **0.2.0** — le domaine de référence est lu dans `.claude/express-3tiers.json` (le fichier est
  désormais requis) ; le hook de formatage rejoint le plugin.
- **0.1.0** — le skill `nouveau-domaine`, copié du projet tel quel.
