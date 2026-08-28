---
description: Salue une personne dans une langue donnée.
argument-hint: [langue] [prénom]
disable-model-invocation: true
---

Arguments : `$ARGUMENTS`

Analyse-les ainsi :

- **langue** = le premier token séparé par un espace (aussi disponible en `$0`)
- **prénom** = tout ce qui suit, verbatim, espaces compris
  (ex. `italien Jean-Marc De La Tour` -> langue `italien`, prénom `Jean-Marc De La Tour`)

Réponds uniquement par la salutation adressée à cette personne, dans cette langue. Rien d'autre.
