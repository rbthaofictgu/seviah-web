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

Los videos nacen en estado **"Próximamente"**. Para activarlos, ver
[`docs/planes/INSTRUCCIONES-YOUTUBE.md`](docs/planes/INSTRUCCIONES-YOUTUBE.md) §5 y la sección
**Activar videos** más abajo (script `scripts/set-video-id.mjs`).

## Metodología

Este repositorio se construye bajo la norma **E-18**. El paquete de planes de trabajo, el
tablero de estado y las decisiones de arquitectura (ADR D-01…D-11) viven en
[`docs/planes/`](docs/planes/) y [`docs/`](docs/). Regla de oro: lo que no esté documentado en
`docs/` no se inventa — se marca **"En construcción"** (D-06).

---

© 2026 Secretaría de Vivienda y Asentamientos Humanos (SEVIAH). Gobierno de la República de Honduras.
