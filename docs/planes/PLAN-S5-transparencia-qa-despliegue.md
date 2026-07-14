```yaml
plan: S5
nombre: transparencia-qa-despliegue
depende_de: [S3, S4]
paralelo_con: []
tareas: 3
estado: NO_INICIADO
```

# PLAN S5 — Transparencia, QA integral y despliegue
> Prompt ejecutable por agente (Claude Code). Norma E-18. Plan de CONVERGENCIA: exige S3 y S4
> completos y fusionados; cierra el paquete.

## GATE DE ENTRADA
- [ ] `grep -E "S3|S4" docs/planes/ESTADO.md` → ambos COMPLETADO; issues cerrados.
- [ ] Clon limpio: `npm ci && npx @11ty/eleventy` → verde; existen `_site/index.html`,
      `_site/noticias/index.html` y `_site/multimedia/index.html` (frentes fusionados en main).

Si algo falla: **reporta y detente.**

## Objetivo del scope
Al terminar el sitio cumple los mínimos legales de transparencia (D-08), pasa el QA integral
(enlaces, HTML, tokens, accesibilidad básica, responsive iPhone, rendimiento) y está desplegado
en staging (GitHub Pages) con paquete de entrega para RTBM.

## Contexto y fuentes
Implementa **D-02 (QA de tokens), D-08, D-10** (docs/01). Contenido de transparencia: docs/02
§1 (ruta) y ADR D-08. Verificación responsive: docs/03 §4.

## Reglas del plan
- Directorios propios: `src/transparencia/`, `.github/workflows/deploy.yml`, `qa/` (reportes).
- Prohibido: modificar contenido de S3/S4 salvo correcciones de defectos detectados por QA
  (cada corrección se anota en el PR con el defecto que resuelve); inventar datos del OIP.

## Tareas

### T1 — Sección Transparencia
**Prerequisito interno:** ninguno
**Alcance:** `src/transparencia/index.njk` con: bloque de enlaces institucionales (Portal
Único de Transparencia — portalunico.iaip.gob.hn; SIELHO — sielho.iaip.gob.hn), bloque OIP
(cargo y contacto: "En construcción" hasta designación oficial), y esqueleto de información de
oficio del Art. 13 (Decreto 170-2006) como acordeón de categorías: estructura orgánica,
servicios, presupuesto y ejecución, contrataciones, remuneraciones, planes, marco normativo —
cada categoría con "En construcción" hasta recibir documentos oficiales. Marco legal citado:
Decreto 170-2006 y su reforma, patrón verificado en transparencia.sit.gob.hn.
**Contexto:** D-08; docs/02 §1.
**Entradas:** componentes S2 · **Salidas:** _site/transparencia/ navegable.
**Criterios de aceptación (todos en verde):**
- [ ] `npx @11ty/eleventy && grep -c "portalunico.iaip.gob.hn" _site/transparencia/index.html` → ≥1 y `grep -c "sielho" _site/transparencia/index.html` → ≥1.
- [ ] `grep -ci "170-2006" _site/transparencia/index.html` → ≥1 y `grep -ci "en construcción" _site/transparencia/index.html` → ≥7 (categorías Art. 13 + OIP).
- [ ] `npx html-validate "_site/transparencia/**/*.html"` → 0 errores.
**Commit/PR:** rama `s5/tarea-1-transparencia`.

### T2 — QA integral del sitio
**Prerequisito interno:** T1
**Alcance:** batería completa con reporte en `qa/REPORTE-QA.md`: (a) enlaces
(`linkinator` recursivo, externos incluidos); (b) HTML (`html-validate` global); (c) disciplina
de tokens (grep hex); (d) terminología prohibida (SISOCS, SEVAH); (e) responsive: Playwright en
390×844 (iPhone) y 1366×768 sobre las 9 rutas, capturas + verificación scrollWidth; (f)
accesibilidad básica: `npx pa11y-ci` (o pa11y por ruta) sobre las 9 rutas; (g) rendimiento:
Lighthouse CI (`npx lhci autorun` o `lighthouse` por ruta) con presupuesto: Performance ≥85,
Accessibility ≥90 en Inicio. Corregir defectos encontrados (anotados uno a uno).
**Contexto:** D-02, D-07; docs/03 §4.
**Entradas:** sitio completo · **Salidas:** qa/REPORTE-QA.md + correcciones.
**Criterios de aceptación (todos en verde):**
- [ ] `npx linkinator _site --recurse` → 0 rotos (o excepciones justificadas una a una en el reporte).
- [ ] `grep -rci "SISOCS" _site/ | grep -v ":0" | wc -l` → 0 y `grep -rc "SEVAH[^I]" _site/ --include="*.html" | grep -v ":0" | wc -l` → 0.
- [ ] `for p in "" nosotros autoridades programas sistemas noticias multimedia transparencia contacto; do ...playwright scrollWidth<=390...; done` → 9/9 true (script en qa/, salidas en el reporte).
- [ ] Lighthouse Inicio: Performance ≥85 y Accessibility ≥90 (JSON del run adjunto en qa/).
**Commit/PR:** rama `s5/tarea-2-qa-integral`.

### T3 — Despliegue a staging y paquete de entrega
**Prerequisito interno:** T2
**Alcance:** `.github/workflows/deploy.yml` (GitHub Pages vía Actions sobre main);
verificación del sitio publicado; `ENTREGA.md` para RTBM: URL de staging, estado de cada
sección (completa / en construcción), pendientes humanos (IDs de YouTube, dirección/teléfonos,
fotos de autoridades, OIP, confirmación de títulos v-05..v-08) y el puntero a
INSTRUCCIONES-YOUTUBE.md. NO entra: dominio .gob.hn (trámite institucional, D-10).
**Contexto:** D-10; INSTRUCCIONES-YOUTUBE.md.
**Entradas:** sitio QA-verde · **Salidas:** sitio en Pages, ENTREGA.md.
**Criterios de aceptación (todos en verde):**
- [ ] Run de deploy en verde y `curl -s -o /dev/null -w "%{http_code}" https://<usuario>.github.io/<repo>/` → 200.
- [ ] `curl -s https://<usuario>.github.io/<repo>/ | grep -c "SEVIAH"` → ≥1 (contenido real publicado).
- [ ] `test -f ENTREGA.md` y contiene la lista de pendientes humanos (grep de "YouTube", "OIP", "teléfono") → 3/3 presentes.
**Commit/PR:** rama `s5/tarea-3-despliegue-entrega`.

## GATE DE SALIDA (declara S5 = COMPLETADO y cierra el paquete)
- [ ] Desde clon limpio: `npm ci && npx @11ty/eleventy && npx html-validate "_site/**/*.html" && npx linkinator _site --recurse` → todo verde.
- [ ] Sitio accesible en la URL de staging; capturas finales en el PR.
- [ ] `docs/planes/ESTADO.md` → S5=COMPLETADO (paquete cerrado). Anunciar a RTBM la URL y ENTREGA.md.

## Protocolo GitHub
Issue `[PLAN S5] transparencia-qa-despliegue` etiqueta `plan:s5`; checklist = T1-T3; una
rama/PR por tarea; cierre solo con gate de salida en verde.
