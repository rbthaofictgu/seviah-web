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
- 2026-07-15 · Al aplicar AJUSTE-03 (D-14, rama `ajuste-03/redes-sociales`, PR #2) se detectó
  que la enmienda AJUSTE-01 nunca se había aplicado (`grep -c "D-12"` en el ADR → 0). Se
  incorporó primero su punto 1-B (tabla de las 5 redes oficiales en docs/02 §8) y **D-12 se
  registró retroactivamente** en el ADR dentro del mismo PR, como prerrequisito de D-14.
- 2026-07-15 · **AJUSTE-03 mergeado** (PR #2, rebase → `d2bc58d`/`4bbde22`/`adddc6c`) y
  verificado en Pages: banda "Síguenos en nuestras redes" en Inicio y /contacto/, iconos
  inline en el footer, botón de suscripción real en /multimedia/. Limpieza posterior
  (`82e85e0`): se retira `contenido.contacto.facebook`, huérfano desde D-14 — `redes.json`
  queda como única fuente de verdad de los perfiles sociales. ADR completo D-01…D-14.
- 2026-07-15 · **AJUSTE-04 aplicado** (rama `ajuste-04/correcciones-revision-1`, un commit
  por defecto D1…D5): D1 hero con fotografías institucionales propias (congreso-02 y
  emergencia-01 de `src/assets/img/hero/`, 10 en reserva editorial) y estructura de la home
  verificada con `scripts/estructura-home.mjs`; D2 preloader propio con la coreografía del
  loader de la SIT (inspeccionada por curl a /tmp, sin activos de terceros, D-03); D3 AOS +
  microinteracciones con `prefers-reduced-motion`; D4 logos nuevos desde `docs/logos/`
  (header/footer/favicons/og:image; hallazgo: el dorado de fondo de los PNG entregados es
  `#B88A3C`, no el token `#AD8411`); D5 miniaturas i.ytimg.com en cards-enlace de video.
  ADR: **D-15**. Changelog: v05.
- 2026-07-15 · **AJUSTE-04 mergeado** (PR #3, rebase → `ee2a57c`…`7070533`, 7 commits) y
  verificado en Pages: home 200 con hero fotográfico (congreso-02 referenciada), preloader
  presente (grep 5), AOS activo (data-aos 16), logos nuevos servidos (escudo header, lockup
  dorado footer y favicons 200; logo-gobierno.png y favicon.png viejos → 404), miniatura
  i.ytimg de v-02 en la home y embed en /multimedia/; lockup/Logo_Gobierno/SISOCS → 0.
- 2026-07-15 · Endurecimiento post-merge del preloader (revisión en vivo de AJUSTE-04-D2):
  el failsafe de 2.5s se armaba en main.js (tras los CDN) — un CDN lento lo retrasaba
  (observado 7.2s con aos.js +6s). Ahora la marca de sesión y el failsafe viven en el
  head (desvanecido por CSS con `.preloader-vencido`) y se añade retención mínima de
  1.2s (una vuelta del anillo) para que no sea un parpadeo en cargas rápidas.
- 2026-07-15 · Revisión 2 de AJUSTE-04 (indicación del usuario: imágenes reales, no
  ilustración): slide 3 del hero usa `hero-emergencia-06.jpg` (familia beneficiaria de
  Yauyupe); las 6 cards de noticias llevan imagen temática real — miniatura de YouTube
  para las noticias con video horizontal y recortes de la banda central de los fotogramas
  maxres de los videos verticales del canal propio (v-01/v-04/v-05/v-06) en
  `src/assets/img/noticias/`. El macro card-noticia solo usa miniatura automática con
  videos horizontales (la hqdefault vertical viene pilarizada). Corregido de paso el
  `video_slug` roto de la noticia del incendio (`v-02-incendio-yauyupe` →
  `v-02-agradecimiento-yauyupe`): su boletín nunca mostraba el video.
- 2026-07-15 · Slide 3: se sirve `hero-vivienda-digna-01.jpg`, derivado nítido de
  hero-emergencia-06 (máscara de enfoque + microcontraste + grano sutil vía canvas de
  Chromium). El original queda intacto en la reserva; el reemplazo definitivo sigue siendo
  la fotografía de alta resolución de comunicaciones (ENTREGA.md §3.6).
- 2026-07-15 · Preloader en cada página y cada visita (indicación del usuario: paridad con
  el comportamiento real del loader de la SIT, cuya bandera doneLoad es por carga de
  página). Se retira el "una vez por sesión (sessionStorage)" del texto original de
  AJUSTE-04-D2; D-15 actualizado. Verificado con Playwright: visible en primera visita,
  navegación interna y reentrada (~1.7–2s por página).
- 2026-07-15 · Endurecimiento de entrega del preloader (reporte "cero loader" del usuario):
  diagnóstico en su máquina — el eleventy --serve local (:8080) servía la última versión;
  la copia vieja vivía en la caché del navegador (el dev server no envía Cache-Control).
  Medidas: (1) cache-busting ?v= en tokens.css/main.css/main.js; (2) renombrado
  .preloader/#preloader → .sev-cargador/#sevCargador (los filtros cosméticos de los
  bloqueadores ocultan los selectores genéricos; data-preloader conserva el criterio QA
  de la enmienda); (3) prefers-reduced-motion ahora lo muestra estático (sin giro) con
  desvanecido al cargar, como pedía la enmienda, en vez de display:none.
- 2026-07-15 · Preloader rev. 6 (indicación del usuario): duración fija de 5s por página
  (constante DURACION_CARGADOR; deja sin efecto la salida en window load del texto
  original), failsafe reubicado a duración+2.5s, y corrección visual del escudo: disco
  interior opaco + recorte circular (el PNG cuadrado con fondo blanco se notaba "fuera"
  del círculo sobre el disco translúcido). Assets a ?v=20260715-5.
- 2026-07-15 · Preloader rev. 7: duración a 10s (indicación del usuario; failsafe 12.5s),
  escudo anclado por posicionamiento absoluto al mismo punto que el anillo (centrado
  verificado por getBoundingClientRect: centros idénticos), y dev server con
  Cache-Control: no-store (la caché heurística del navegador sobre localhost:8080
  ocultaba cada revisión hasta un hard-reload — causa de los reportes "sigue igual").
  Assets a ?v=20260715-6.
