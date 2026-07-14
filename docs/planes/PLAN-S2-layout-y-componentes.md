```yaml
plan: S2
nombre: layout-y-componentes
depende_de: [S1]
paralelo_con: []
tareas: 3
estado: NO_INICIADO
```

# PLAN S2 — Layout y componentes transversales
> Prompt ejecutable por agente (Claude Code). Norma E-18. Último eslabón de la espina: al
> cerrarse, congela los contratos (layout + videos.json) y abre los frentes S3 ∥ S4.

## GATE DE ENTRADA
- [ ] `grep "S1" docs/planes/ESTADO.md` → COMPLETADO; issue de S1 cerrado.
- [ ] `npm ci && npx @11ty/eleventy` → verde desde clon limpio.
- [ ] `grep -c -- "--sev-dorado" src/assets/css/tokens.css` → ≥1 (tokens de S1 presentes).

Si algo falla: **reporta y detente.**

## Objetivo del scope
Al terminar existe el esqueleto visual completo del sitio: layout base (header con banner de
gobierno, navegación responsive, footer legal), los componentes reutilizables (hero Swiper,
card de destacado/noticia, "En construcción", embed de video con estado "Próximamente") y el
**contrato videos.json congelado** — todo demostrado en una página styleguide.

## Contexto y fuentes
Implementa **D-01, D-02, D-03, D-05, D-06** (docs/01). Composición: docs/03 §2-§4. Patrón
estructural de la home clonada: docs/02 §1. Footer: docs/02 §9. Esquema de video: docs/04 §5.

## Reglas del plan
- Directorios propios: `src/_includes/`, `src/assets/css/main.css`, `src/assets/js/`,
  `src/_data/videos.json` (solo definición del esquema + 1 registro de ejemplo),
  `src/styleguide/`.
- Prohibido: crear las páginas reales del sitio (S3) o la videoteca (S4); poblar videos.json
  con el inventario completo (S4); hex fuera de tokens.css.

## Tareas

### T1 — Layout base: header, navegación y footer
**Prerequisito interno:** ninguno
**Alcance:** `src/_includes/layouts/base.njk` (head con CDNs de D-03 vía jsDelivr/cdnjs +
tokens/main.css, estructura semántica header/main/footer); parcial header: franja dorada
superior, barra blanca con escudo + lockup SEVIAH, navbar Bootstrap responsive con los 9 ítems
del mapa de sitio (docs/02 §1); parcial footer según docs/02 §9 (enlaces de transparencia
apuntan a `/transparencia/` interna y a portalunico/SIELHO externos). La index provisional de
S1 pasa a usar este layout. NO entra: contenido real de páginas.
**Contexto:** D-01, D-02, D-03; docs/03 §2; docs/02 §1 y §9.
**Entradas:** tokens.css, activos de S1 · **Salidas:** base.njk, header.njk, footer.njk, main.css (secciones layout).
**Criterios de aceptación (todos en verde):**
- [ ] `npx @11ty/eleventy && grep -c "navbar" _site/index.html` → ≥1 y `grep -c "portalunico.iaip.gob.hn" _site/index.html` → ≥1.
- [ ] `grep -o "cdn.jsdelivr.net\|cdnjs.cloudflare.com" _site/index.html | sort -u | wc -l` → ≥1 y `grep -c "sit.gob.hn/assets" _site/index.html` → 0 (nada del sitio SIT).
- [ ] `npx html-validate "_site/**/*.html"` → 0 errores.
**Commit/PR:** rama `s2/tarea-1-layout-base`.

### T2 — Componentes: hero, cards, "En construcción" y embed de video (contrato)
**Prerequisito interno:** T1
**Alcance:** parciales Nunjucks parametrizables: `hero.njk` (Swiper full-width, docs/03 §3),
`card-destacado.njk`, `card-noticia.njk`, `en-construccion.njk` (D-06, texto de docs/03 §3),
`video-embed.njk` — este último recibe un objeto del esquema videos.json (docs/04 §5): con
`youtube_id` renderiza iframe `youtube-nocookie.com/embed/<id>?rel=0` lazy con `title` y
wrapper 16:9 o 9:16 según `formato`; sin `youtube_id` renderiza el estado "Próximamente".
Crear `src/_data/videos.json` con **el esquema documentado en comentario adjunto
(videos.schema.md) y exactamente 1 registro de ejemplo** con id de prueba `dQw4w9WgXcQ`
marcado `"ejemplo": true`. NO entra: inventario completo (S4).
**Contexto:** D-05, D-06; docs/03 §3; docs/04 §4-§5.
**Entradas:** layout T1 · **Salidas:** 5 parciales, videos.json (esquema+ejemplo), videos.schema.md, main.css (componentes).
**Criterios de aceptación (todos en verde):**
- [ ] `python3 -c "import json;d=json.load(open('src/_data/videos.json'));assert isinstance(d,list) and set(d[0])=={'slug','titulo','descripcion','playlist','fecha','formato','youtube_id','destacado','ejemplo'}"` → sin excepción.
- [ ] Página de prueba renderiza ambos estados: `grep -c "youtube-nocookie.com/embed/dQw4w9WgXcQ" _site/styleguide/index.html` → 1 y `grep -ci "próximamente" _site/styleguide/index.html` → ≥1.
- [ ] `grep -rEn "#[0-9a-fA-F]{3,8}\b" src/assets/css --include="*.css" | grep -v tokens.css | wc -l` → 0.
**Commit/PR:** rama `s2/tarea-2-componentes`.

### T3 — Styleguide integrador y validación
**Prerequisito interno:** T2
**Alcance:** `src/styleguide/index.njk` que monta TODOS los componentes con datos de muestra
(hero de 2 slides, 3 destacados, 3 cards de noticia, en-construcción, video con id de ejemplo y
video sin id, variante vertical) — es la prueba de fuego visual del plan y referencia para
S3/S4. Verificación responsive básica.
**Contexto:** docs/03 §3-§4.
**Entradas:** componentes T2 · **Salidas:** styleguide navegable en `_site/styleguide/`.
**Criterios de aceptación (todos en verde):**
- [ ] `npx @11ty/eleventy --serve &` y `npx playwright screenshot --viewport-size=390,844 http://localhost:8080/styleguide/ /tmp/sg-movil.png` → archivo creado; captura pegada en el PR sin desbordes horizontales (verificar `document.documentElement.scrollWidth<=390` vía script Playwright → true).
- [ ] `npx linkinator _site/styleguide --skip "youtube" ` → 0 rotos.
- [ ] `npx html-validate "_site/styleguide/**/*.html"` → 0 errores.
**Commit/PR:** rama `s2/tarea-3-styleguide`.

## GATE DE SALIDA (declara S2 = COMPLETADO)
- [ ] Clon limpio: `npm ci && npx @11ty/eleventy && npx html-validate "_site/**/*.html"` → verde.
- [ ] CI verde; evidencias (capturas styleguide desktop+móvil) en los PRs.
- [ ] **Contratos congelados:** layout base y esquema videos.json no se modifican más sin enmienda E-18.
- [ ] `docs/planes/ESTADO.md` → S2=COMPLETADO. Anunciar: **quedan habilitados S3 y S4 (paralelos)**.

## Protocolo GitHub
Issue `[PLAN S2] layout-y-componentes` etiqueta `plan:s2`; checklist = T1-T3; una rama/PR por
tarea; cierre solo con gate de salida en verde.
