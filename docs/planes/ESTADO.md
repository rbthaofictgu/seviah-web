# Tablero ESTADO — seviah-web (E-18)

> Ejecución "de corrido" S1→S4 en una sesión (decisión RTBM 2026-07-14), sin paradas de
> revisión intermedias. S5 fuera del alcance de esta sesión.

| Plan | Depende de | Paralelo con | Estado | Issue | Cierre |
|---|---|---|---|---|---|
| S1 fundacion-repo-y-marca | — | — | EN_CURSO | — | — |
| S2 layout-y-componentes | S1 | — | NO_INICIADO | — | — |
| S3 paginas-y-contenido | S2 | S4 | NO_INICIADO | — | — |
| S4 multimedia-y-videos | S2 | S3 | NO_INICIADO | — | — |
| S5 transparencia-qa-despliegue | S3, S4 | — | FUERA_DE_ALCANCE | — | — |

## Registro de desviaciones
- 2026-07-14 · Ejecución S1→S4 de corrido sin paradas de revisión por plan (excepción a
  PROMPT-ARRANQUE). Sin remoto GitHub: sin PRs/CI-runs; evidencia = criterios verificados en
  local. Commits convencionales en `main`.
- 2026-07-14 · S4-T1 puebla `videos.json` desde `docs/videos-final.json` (no desde el
  inventario docs/04). `videos-final.json` manda: 4 verticales (v-01, v-04, v-05, v-06) →
  se enmienda el criterio #2 de S4-T1 de "2" a "4". 5 IDs reales; v-06/07/08 "Próximamente".
