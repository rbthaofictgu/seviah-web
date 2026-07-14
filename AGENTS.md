# AGENTS.md — Sitio web institucional SEVIAH (seviah-web)

## 1. Qué es este repo
Sitio web estático institucional de SEVIAH que clona la **estructura** de www.sit.gob.hn con
identidad propia. Stack fijado: **Eleventy 3** (Nunjucks + JSON) → HTML estático en `_site/`;
CDN permitidos: Bootstrap 5.3, Swiper 11, Font Awesome 6 (D-03/D-09). Prohibido: frameworks SPA
(React/Vue), backend, base de datos, npm deps no decididas, activos copiados del sitio de la SIT.

## 2. Estructura de directorios
```
docs/            # fuente de verdad (ADR, contenido seed, identidad, videos) — solo lectura para planes
docs/planes/     # planes E-18 + ESTADO.md (tablero)
src/_includes/   # layouts y parciales (territorio S2)
src/_data/       # contenido.json, noticias.json, videos.json
src/assets/      # css (tokens.css, main.css), js, img
src/<páginas>    # index.njk, nosotros/, autoridades/, programas/, sistemas/, noticias/, contacto/ (S3)
src/multimedia/  # videoteca (territorio S4)
src/transparencia/ # (territorio S5)
_site/           # salida generada — nunca se commitea editada a mano
```

## 3. Fuente de verdad y precedencia documental
Ante ambigüedad: `docs/01-ADR-decisiones.md` > `docs/02-mapa-de-sitio-y-contenido-seed.md` >
`docs/03-identidad-visual.md` / `docs/04-inventario-videos.md` > este archivo > el plan en curso.
Si un dato no existe en docs/: **NO se inventa** — se usa el componente "En construcción" (D-06)
o se abre `duda:` en el issue del plan y se detiene esa tarea.

## 4. Reglas duras
- Idioma del sitio y de commits: **español**. Terminología: SEVIAH (nunca SEVAH); SIGEBO ≠
  SIGEPO; **SISOCS no se menciona jamás** (D-07).
- Ningún hex fuera de `src/assets/css/tokens.css` (D-02).
- Videos: solo embeds `youtube-nocookie.com` desde `videos.json`; MP4 prohibidos en el repo (D-04).
- Contenido factual: solo el de docs/02; cifras de prensa se redactan como declaraciones (D-11).
- Accesibilidad mínima: `alt` en imágenes, `title` en iframes, contraste AA (docs/03 §4).

## 5. Flujo E-18
Planes en `docs/planes/`, precedencia estricta por grafo; una rama y un PR por tarea
(`s<n>/tarea-<m>-<slug>`, commits convencionales); evidencias de criterios pegadas en el PR;
`docs/planes/ESTADO.md` es el tablero y se actualiza al abrir/cerrar cada plan.

## 6. Comandos canónicos
```bash
npm install                 # dependencias (solo las decididas)
npx @11ty/eleventy          # build → _site/
npx @11ty/eleventy --serve  # servidor local :8080
npx html-validate "_site/**/*.html"
npx linkinator _site --recurse --skip "youtube|facebook|iaip|gob.hn"
grep -rEn "#[0-9a-fA-F]{3,8}\b" src/assets/css --include="*.css" | grep -v tokens.css
```

## 7. Prohibiciones frecuentes
No añadir dependencias sin decisión D-nn · no renombrar el contrato videos.json ni sus campos ·
no desactivar validaciones para poner el gate en verde · no tocar territorio de otro plan ·
no publicar fotos/nombres de personas de los videos sin confirmación de RTBM (docs/04 §2).
