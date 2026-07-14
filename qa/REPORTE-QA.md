# Reporte de QA integral — seviah-web (S5-T2)

**Fecha:** 2026-07-14 · **Alcance:** 9 rutas del sitio (Inicio, Nosotros, Autoridades,
Programas, Sistemas, Noticias, Multimedia, Transparencia, Contacto) + styleguide.
**Entorno:** Node 24, Eleventy 3.1.6; navegador Chromium de Playwright (headless).

> Nota de entorno: sin remoto GitHub en esta sesión, por lo que las corridas se ejecutaron en
> local (no en CI). Los comandos son reproducibles con `npm ci` + los scripts de `qa/`.

## Resumen

| # | Batería | Herramienta | Resultado |
|---|---------|-------------|-----------|
| a | Enlaces | linkinator (recursivo, con externos) | ✅ 0 rotos reales (1 excepción justificada) |
| b | HTML | html-validate (10 páginas) | ✅ 0 errores |
| c | Disciplina de tokens | grep hex | ✅ 0 hex fuera de `tokens.css` |
| d | Terminología prohibida | grep | ✅ SISOCS 0 · SEVAH(err) 0 · SIGEBO≠SIGEPO |
| e | Responsive | Playwright 390×844 y 1366×768 | ✅ 9/9 sin desborde en ambos viewports |
| f | Accesibilidad | axe-core (WCAG 2.0/2.1 A+AA) | ✅ 0 violaciones serias/críticas en 9/9 |
| g | Rendimiento | Lighthouse (Inicio) | ✅ Performance **89** (≥85) · Accessibility **96** (≥90) |

## (a) Enlaces — `npx linkinator _site --recurse`

27 enlaces escaneados. Todos 200 (los 5 embeds `youtube-nocookie.com`, `portalunico.iaip.gob.hn`,
`sielho.iaip.gob.hn`, CDNs de Bootstrap/Swiper/Font Awesome, y todos los internos).

**Excepción justificada (1):** `https://www.facebook.com/seviah.hn` → **HTTP 400**. Facebook
responde 400/429 a peticiones automatizadas (protección anti-bot); la URL es válida y carga
correctamente en un navegador real. Es la única red social confirmada (docs/02 §8).

## (b) HTML — `npx html-validate "_site/**/*.html"`

0 errores en las 10 páginas generadas (config `.htmlvalidate.json`, preset `recommended`).

## (c) Disciplina de tokens (D-02)

`grep -rEn "#[0-9a-fA-F]{3,8}" src/assets/css --include=*.css | grep -v tokens.css` → **0**.
Todos los colores viven en `tokens.css`; los tintes translúcidos se derivan con `color-mix()`.

## (d) Terminología (D-07)

- `SISOCS` en todo `_site/`: **0** (prohibido mencionarlo).
- `SEVAH` incorrecto (`SEVAH[^I]`): **0** (el nombre correcto es SEVIAH).
- `SIGEBO` y `SIGEPO` presentes como sistemas **distintos** (5 y 4 apariciones).

## (e) Responsive — `node qa/responsive-check.mjs`

`document.documentElement.scrollWidth` ≤ ancho del viewport en las 9 rutas, en móvil (390×844)
y escritorio (1366×768): **9/9 en ambos** → sin desborde horizontal. Capturas en `qa/capturas/`.

## (f) Accesibilidad — `node qa/a11y-check.mjs` (axe-core 4.12, WCAG 2.0/2.1 A+AA)

**0 violaciones serias/críticas en 9/9 rutas.**

Defecto detectado y **corregido**: `color-contrast` — el dorado `#AD8411` en textos pequeños
(eyebrows, fechas de noticia, meta de video) sobre fondo claro daba ~3.0–3.4 (AA exige 4.5).
Se añadió el token derivado `--sev-dorado-texto: #7A5E0C` para texto pequeño sobre claro
(≥5.3:1), conservando el dorado brillante para titulares grandes y para acentos sobre fondos
oscuros (alineado con docs/03 §4).

**Exclusión declarada:** se excluye el contenido **interno de los iframes** (`.exclude('iframe')`).
axe reportaba `button-name` y `aria-prohibited-attr` dentro del reproductor de YouTube
(`#movie_player`), markup de terceros fuera de nuestro control. Nuestros propios `<iframe>`
llevan `title` (nombre accesible), que es el requisito aplicable.

## (g) Rendimiento — Lighthouse (Inicio, escritorio)

- **Performance: 89** (presupuesto ≥85 ✅)
- **Accessibility: 96** (presupuesto ≥90 ✅)

JSON completo del run en `qa/lighthouse-inicio.json`.

## Defectos corregidos en esta pasada de QA

1. **Contraste AA** de textos dorados pequeños → nuevo token `--sev-dorado-texto` (ver (f)).
2. (previo) **Styleguide** desacoplado de `videos.json` (usaba `videos[0]`, mostraba el video
   real tras poblar S4) → datos de muestra fijos.

## Herramientas

`@11ty/eleventy`, `html-validate`, `linkinator`, `playwright` + `@axe-core/playwright` +
`axe-core` (devDependencies), y `lighthouse@12` (vía `npx`, usando el Chromium de Playwright).
Scripts reproducibles: `qa/responsive-check.mjs`, `qa/a11y-check.mjs`.
