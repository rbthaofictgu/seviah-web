# seviah-web

Sitio web institucional de la **Secretaría de Vivienda y Asentamientos Humanos (SEVIAH)** —
Gobierno de la República de Honduras. Sitio estático que **clona la estructura** de
www.sit.gob.hn con la **identidad visual propia** de SEVIAH (D-01).

- **Generador:** [Eleventy 3](https://www.11ty.dev/) (Nunjucks + datos JSON) → HTML estático en `_site/` (D-09).
- **Librerías (CDN):** Bootstrap 5.3, Swiper 11, Font Awesome 6 (D-03). Sin frameworks SPA, sin backend, sin base de datos.
- **Marca:** dorado `#AD8411`, navy `#273A7F`, oscuro `#231F20`; tipografía Georgia. Todos los colores viven en `src/assets/css/tokens.css` (D-02).
- **Videos:** hospedados en YouTube y consumidos por iframe `youtube-nocookie.com` desde `src/_data/videos.json`; los MP4 nunca entran al repo (D-04/D-05).

## Comandos canónicos

```bash
npm install                 # dependencias (solo Eleventy + devtools de validación)
npx @11ty/eleventy          # build → _site/
npx @11ty/eleventy --serve  # servidor local :8080
npx html-validate "_site/**/*.html"
npx linkinator _site --recurse --skip "youtube|facebook|iaip|gob.hn"
grep -rEn "#[0-9a-fA-F]{3,8}\b" src/assets/css --include="*.css" | grep -v tokens.css   # → 0 (disciplina de tokens)
```

## Estructura

```
docs/            fuente de verdad (ADR, contenido seed, identidad, videos)
docs/planes/     planes E-18 + ESTADO.md (tablero de avance)
src/_includes/   layouts y parciales (header, footer, hero, cards, video-embed)
src/_data/       contenido.json, noticias.json, videos.json
src/assets/      css (tokens.css, main.css), js, img
src/<páginas>    index, nosotros, autoridades, programas, sistemas, noticias, contacto
src/multimedia/  videoteca
_site/           salida generada (no se edita a mano)
```

## Activar videos

Todo el sitio se construye completo aunque los videos aún no estén en YouTube: los que no
tienen `youtube_id` se muestran como **"Próximamente"** (D-05). Activar un video es **una sola
edición** en `src/_data/videos.json` — el resto del sitio (Inicio, Multimedia, Noticias) lo
consume automáticamente. Guía humana completa (crear el canal, subir con metadata):
[`docs/planes/INSTRUCCIONES-YOUTUBE.md`](docs/planes/INSTRUCCIONES-YOUTUBE.md).

### Flujo (INSTRUCCIONES-YOUTUBE §5)

1. Obtén el ID del video de su URL: en `https://www.youtube.com/watch?v=ABC123xyz45`, el ID es
   `ABC123xyz45` (11 caracteres).
2. Inyéctalo con el script (recomendado):

   ```bash
   node scripts/set-video-id.mjs <slug> <youtube_id>
   # ejemplo:
   node scripts/set-video-id.mjs v-07-sesion-planificacion Ab12Cd34Ef5
   ```

   El script valida que el slug exista y que el ID tenga el formato de YouTube. Para volver a
   "Próximamente", pasa un ID vacío: `node scripts/set-video-id.mjs <slug> ""`.
   (Alternativa manual: editar el campo `"youtube_id"` del video en `src/_data/videos.json`.)
3. Reconstruye: `npx @11ty/eleventy`. El video pasa solo de "Próximamente" al reproductor
   embebido (`youtube-nocookie.com`), sin tocar HTML.

Slugs disponibles: `v-01-presentacion`, `v-02-incendio-yauyupe`, `v-03-congreso-riesgos`,
`v-04-san-marcos`, `v-05-reunion-copeco`, `v-06-reunion-directiva`, `v-07-sesion-planificacion`,
`v-08-seviah-en-accion`. El esquema del contrato está en
[`src/_data/videos.schema.md`](src/_data/videos.schema.md).

## Metodología

Este repositorio se construye bajo la norma **E-18**. El paquete de planes de trabajo, el
tablero de estado y las decisiones de arquitectura (ADR D-01…D-11) viven en
[`docs/planes/`](docs/planes/) y [`docs/`](docs/). Regla de oro: lo que no esté documentado en
`docs/` no se inventa — se marca **"En construcción"** (D-06).

---

© 2026 Secretaría de Vivienda y Asentamientos Humanos (SEVIAH). Gobierno de la República de Honduras.
