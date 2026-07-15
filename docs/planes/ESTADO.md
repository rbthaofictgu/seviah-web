# Tablero ESTADO — seviah-web (E-18)

> Ejecución "de corrido" S1→S5 en una sesión (decisión RTBM 2026-07-14), sin paradas de
> revisión intermedias. Paquete cerrado y **desplegado en vivo**:
> https://rbthaofictgu.github.io/seviah-web/ (GitHub Pages, workflow `deploy.yml`).

| Plan | Depende de | Paralelo con | Estado | Issue | Cierre |
|---|---|---|---|---|---|
| S1 fundacion-repo-y-marca | — | — | COMPLETADO | — | — |
| S2 layout-y-componentes | S1 | — | COMPLETADO | — | — |
| S3 paginas-y-contenido | S2 | S4 | COMPLETADO | — | — |
| S4 multimedia-y-videos | S2 | S3 | COMPLETADO | — | — |
| S5 transparencia-qa-despliegue | S3, S4 | — | COMPLETADO (en vivo en GitHub Pages) | — | — |

## Registro de desviaciones
- 2026-07-14 · Ejecución S1→S4 de corrido sin paradas de revisión por plan (excepción a
  PROMPT-ARRANQUE). Sin remoto GitHub: sin PRs/CI-runs; evidencia = criterios verificados en
  local. Commits convencionales en `main`.
- 2026-07-14 · S4-T1 puebla `videos.json` desde `docs/videos-final.json` (no desde el
  inventario docs/04). `videos-final.json` manda: 4 verticales (v-01, v-04, v-05, v-06) →
  se enmienda el criterio #2 de S4-T1 de "2" a "4". 5 IDs reales; v-06/07/08 "Próximamente".
- 2026-07-14 · Activación total de videos (flujo D-05, commit `b4a108b`): los 6 videos de
  `videos.json` quedan con `youtube_id` real (4 verticales, 2 horizontales); v-02 y v-06 se
  retitulan a su versión definitiva y se retiran los marcadores v-07/v-08 que no llegaron al
  canal. Deja sin efecto el "5 IDs reales; v-06/07/08 Próximamente" de la nota anterior.
  Desplegado y verificado en Pages: 6 iframes en /multimedia/, 0 "Próximamente".
