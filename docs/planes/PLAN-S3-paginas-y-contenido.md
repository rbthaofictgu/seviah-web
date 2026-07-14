```yaml
plan: S3
nombre: paginas-y-contenido
depende_de: [S2]
paralelo_con: [S4]
tareas: 4
estado: NO_INICIADO
```

# PLAN S3 — Páginas y contenido seed
> Prompt ejecutable por agente (Claude Code). Norma E-18. Frente de dominio; corre en
> paralelo con S4 según MAPA-PARALELIZACION (territorios disjuntos; contrato videos.json
> congelado por S2).

## GATE DE ENTRADA
- [ ] `grep "S2" docs/planes/ESTADO.md` → COMPLETADO; issue de S2 cerrado.
- [ ] `test -f src/_data/videos.json && test -f src/_includes/video-embed.njk` (o ruta
      equivalente del parcial) → ambos existen (contrato congelado).
- [ ] `npm ci && npx @11ty/eleventy` → verde.

Si algo falla: **reporta y detente.**

## Objetivo del scope
Al terminar existen todas las páginas informativas del sitio con el contenido seed verificable
de docs/02: Inicio completo (hero, destacados, noticias, franja de videos), Nosotros,
Autoridades, Programas, Sistemas, Noticias y Contacto — con "En construcción" donde docs/02 lo
mande.

## Contexto y fuentes
Implementa **D-01, D-06, D-07, D-11** (docs/01). TODO el contenido sale de docs/02 (§2 textos
oficiales, §3 base legal, §4 autoridades, §5 programas, §6 sistemas, §7 noticias, §8 contacto).
Componentes: los congelados por S2 (styleguide como referencia de uso).

## Reglas del plan
- Directorios propios: `src/index.njk`, `src/nosotros/`, `src/autoridades/`, `src/programas/`,
  `src/sistemas/`, `src/noticias/`, `src/contacto/`, `src/_data/contenido.json`,
  `src/_data/noticias.json`.
- Prohibido: tocar `src/_includes/` o `src/_data/videos.json` (contratos de S2, y videos.json
  es territorio de S4 — S3 solo lo LEE); `src/multimedia/` (S4); `src/transparencia/` (S5);
  redactar datos que no estén en docs/02.

## Tareas

### T1 — Inicio
**Prerequisito interno:** ninguno
**Alcance:** `src/index.njk` sustituyendo la provisional: hero Swiper (2-3 slides con lema y
CTA a Programas), sección Destacados (BVIS, Mejoramiento, SIGEBO, SIGEPO — cards carrusel),
sección Noticias (últimas 3 desde noticias.json de T3, con botón "Mostrar Más" → /noticias/),
franja de videos destacados **leyendo videos.json** y renderizando con el parcial de S2 (los
`destacado: true`; con el solo registro de ejemplo de S2 la franja debe renderizar 1 ítem, y
tras S4 renderizará los reales sin cambio alguno). NO entra: contenido de las demás páginas.
**Contexto:** docs/02 §1 (patrón home) y §7; D-05 (consumo del contrato).
**Entradas:** componentes S2, noticias.json (T3 — usar stub inicial de 3 registros y completarlo en T3) · **Salidas:** index.njk final.
**Criterios de aceptación (todos en verde):**
- [ ] `npx @11ty/eleventy && grep -c "swiper" _site/index.html` → ≥1 y `grep -ci "Mostrar Más" _site/index.html` → ≥1.
- [ ] `grep -c "SIGEBO" _site/index.html` → ≥1 y `grep -c "SIGEPO" _site/index.html` → ≥1 y `grep -ci "SISOCS" _site/index.html` → 0.
- [ ] Franja de video presente: `grep -c "video-embed\|youtube-nocookie\|proximamente\|Próximamente" _site/index.html` → ≥1.
**Commit/PR:** rama `s3/tarea-1-inicio`.

### T2 — Nosotros y Autoridades
**Prerequisito interno:** ninguno (paralelizable con T1 — MAPA §5)
**Alcance:** `/nosotros/` con misión, visión, 5 pilares (iconos FA en dorado, docs/03 §2) y
base legal (docs/02 §2-§3); `/autoridades/` con las 2 autoridades de docs/02 §4, retrato como
"En construcción" (silueta institucional). NO entra: organigrama (sin dato → En construcción).
**Contexto:** docs/02 §2-§4; D-06, D-11.
**Entradas:** componentes S2 · **Salidas:** nosotros/index.njk, autoridades/index.njk.
**Criterios de aceptación (todos en verde):**
- [ ] `grep -c "Rectorar, coordinar, ejecutar y evaluar" _site/nosotros/index.html` → 1 (misión oficial íntegra).
- [ ] `grep -c "Argeñal" _site/autoridades/index.html` → ≥1 y `grep -c "Palacios" _site/autoridades/index.html` → ≥1.
- [ ] `grep -ci "en construcción" _site/autoridades/index.html` → ≥1 (retratos/organigrama).
**Commit/PR:** rama `s3/tarea-2-nosotros-autoridades`.

### T3 — Programas, Sistemas y Noticias
**Prerequisito interno:** ninguno (paralelizable con T1/T2 — MAPA §5)
**Alcance:** `/programas/` con las 4 fichas de docs/02 §5 (cifras SOLO como declaraciones,
D-11); `/sistemas/` con fichas SIGEBO y SIGEPO de docs/02 §6 + "En construcción" para portales
ciudadanos; `src/_data/noticias.json` con las 6 notas de docs/02 §7 (título, fecha, resumen,
cuerpo 2-3 párrafos, video_slug opcional) y `/noticias/` como grid de cards con "Mostrar Más"
(paginación simple o carga completa). NO entra: notas adicionales inventadas.
**Contexto:** docs/02 §5-§7; D-07, D-11.
**Entradas:** componentes S2 · **Salidas:** programas/, sistemas/, noticias/, noticias.json.
**Criterios de aceptación (todos en verde):**
- [ ] `python3 -c "import json;d=json.load(open('src/_data/noticias.json'));assert len(d)==6"` → sin excepción.
- [ ] `grep -c "Bono de Vivienda de Interés Social" _site/programas/index.html` → ≥1 y `grep -ci "meta" _site/programas/index.html` → ≥1 (redacción como meta/declaración).
- [ ] `grep -ci "SISOCS" -r _site/` → 0 en todo el sitio.
**Commit/PR:** rama `s3/tarea-3-programas-sistemas-noticias`.

### T4 — Contacto e integración final del frente
**Prerequisito interno:** T1, T2, T3
**Alcance:** `/contacto/` con: redes según docs/02 §8 (solo Facebook enlazado), dirección y
teléfonos "En construcción", formulario maquetado deshabilitado con aviso; barrido de
integración del frente: navegación activa por página, títulos `<title>` y metadescripciones,
verificación cruzada de enlaces internos entre las páginas de S3.
**Contexto:** docs/02 §8; D-06.
**Entradas:** T1-T3 · **Salidas:** contacto/index.njk; frente S3 íntegro.
**Criterios de aceptación (todos en verde):**
- [ ] `grep -c "facebook.com/seviah.hn" _site/contacto/index.html` → ≥1 y `grep -c "instagram\|twitter\|x.com" _site/contacto/index.html` → 0.
- [ ] `npx linkinator _site --recurse --skip "youtube|facebook|iaip|gob.hn|multimedia|transparencia"` → 0 enlaces internos rotos (multimedia/transparencia excluidos: territorios S4/S5 posiblemente aún no fusionados).
- [ ] `npx html-validate "_site/**/*.html"` → 0 errores.
**Commit/PR:** rama `s3/tarea-4-contacto-integracion`.

## GATE DE SALIDA (declara S3 = COMPLETADO)
- [ ] Clon limpio: `npm ci && npx @11ty/eleventy` verde; las 7 rutas de S3 existen en `_site/`
      (`for p in "" nosotros autoridades programas sistemas noticias contacto; do test -f "_site/$p/index.html" || echo FALTA $p; done` → sin salida).
- [ ] CI verde; capturas desktop+móvil de Inicio en el PR.
- [ ] `docs/planes/ESTADO.md` → S3=COMPLETADO. Anunciar: **S5 se habilita cuando S4 también cierre**.

## Protocolo GitHub
Issue `[PLAN S3] paginas-y-contenido` etiqueta `plan:s3`; checklist = T1-T4; una rama/PR por
tarea; cierre solo con gate de salida en verde.
