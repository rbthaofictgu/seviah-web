```yaml
plan: S4
nombre: multimedia-y-videos
depende_de: [S2]
paralelo_con: [S3]
tareas: 3
estado: NO_INICIADO
```

# PLAN S4 — Multimedia y videos
> Prompt ejecutable por agente (Claude Code). Norma E-18. Frente de dominio paralelo a S3
> (MAPA-PARALELIZACION): territorio disjunto; consume los componentes congelados de S2 y es
> el ÚNICO plan que escribe `videos.json`.

## GATE DE ENTRADA
- [ ] `grep "S2" docs/planes/ESTADO.md` → COMPLETADO; issue de S2 cerrado.
- [ ] `test -f src/_data/videos.json` → existe con esquema de S2 (`python3 -c "import json;json.load(open('src/_data/videos.json'))"` sin error).
- [ ] Insumo NO bloqueante: IDs de YouTube — se asume que NO existen aún; el plan entrega todo
      en estado "Próximamente" (D-05). Si RTBM ya entregó IDs, inyectarlos en T1.

Si algo falla (bloqueante): **reporta y detente.**

## Objetivo del scope
Al terminar existe la videoteca institucional completa: `videos.json` poblado con los 8 videos
del inventario, página `/multimedia/` con filtro por playlist y embeds/estados correctos, y el
flujo de activación por ID documentado y probado — de modo que subir los videos a YouTube e
inyectar IDs sea la única acción restante para que todo el sitio los muestre.

## Contexto y fuentes
Implementa **D-04, D-05** (docs/01). Inventario y metadata: docs/04 §1-§4 (títulos "por
confirmar" se publican tal cual con esa marca retirada solo si RTBM confirma; mientras tanto
usar los títulos propuestos sin el sufijo). Flujo humano: INSTRUCCIONES-YOUTUBE.md.

## Reglas del plan
- Directorios propios: `src/multimedia/`, `src/_data/videos.json` (población), `scripts/`
  (utilidades de video del repo).
- Prohibido: tocar páginas de S3 o parciales de S2; commitear MP4 o cualquier binario de video;
  usar dominio youtube.com en embeds (solo youtube-nocookie.com, ya resuelto por el parcial S2);
  publicar nombres de personas de los videos v-05..v-08 (docs/04 §2 — pendiente confirmación).

## Tareas

### T1 — Poblar videos.json con el inventario completo
**Prerequisito interno:** ninguno
**Alcance:** reemplazar el registro de ejemplo de S2 por los 8 videos de docs/04 §1 con todos
los campos (slug, título, descripción breve derivada de docs/04 §2-§3, playlist, fecha,
formato, youtube_id vacío salvo que RTBM haya entregado IDs, destacado según docs/04 §1).
Validación de esquema contra videos.schema.md de S2. NO entra: página multimedia.
**Contexto:** docs/04 §1-§3; D-05.
**Entradas:** docs/04; videos.schema.md · **Salidas:** videos.json poblado.
**Criterios de aceptación (todos en verde):**
- [ ] `python3 -c "import json;d=json.load(open('src/_data/videos.json'));assert len(d)==8 and all(v['slug'].startswith('v-0') for v in d)"` → sin excepción.
- [ ] `python3 -c "import json;d=json.load(open('src/_data/videos.json'));assert sum(1 for v in d if v['formato']=='vertical')==2"` → sin excepción (v-05, v-06).
- [ ] `python3 -c "import json;d=json.load(open('src/_data/videos.json'));assert not any(v.get('ejemplo') for v in d)"` → registro de ejemplo eliminado.
**Commit/PR:** rama `s4/tarea-1-inventario-videos`.

### T2 — Página /multimedia/ con playlists
**Prerequisito interno:** T1
**Alcance:** `src/multimedia/index.njk`: encabezado institucional, filtro por playlist
(Institucional, Programas, Eventos, SEVIAH en Acción — tabs o botones), grid de videos usando
el parcial de S2 (embed si hay ID; "Próximamente" si no), soporte del formato vertical
(docs/04 §4). Enlace visible "Suscríbete a nuestro canal" apuntando a `#` con estado "En
construcción" hasta que exista el canal. NO entra: reproductor propio ni JS de terceros extra.
**Contexto:** D-04, D-05; docs/04 §4; docs/03 §3.
**Entradas:** videos.json T1, parcial S2 · **Salidas:** _site/multimedia/ navegable.
**Criterios de aceptación (todos en verde):**
- [ ] `npx @11ty/eleventy && grep -ci "próximamente" _site/multimedia/index.html` → 8 (los 8 sin ID) — o `8 - n` si RTBM entregó `n` IDs, con `grep -c "youtube-nocookie.com/embed/" _site/multimedia/index.html` → `n`.
- [ ] `grep -c "SEVIAH en Acción" _site/multimedia/index.html` → ≥1 y las 4 playlists presentes.
- [ ] `npx html-validate "_site/multimedia/**/*.html"` → 0 errores.
**Commit/PR:** rama `s4/tarea-2-pagina-multimedia`.

### T3 — Flujo de activación por ID (prueba de fuego)
**Prerequisito interno:** T2
**Alcance:** documentar en README (sección "Activar videos") el flujo de INSTRUCCIONES-YOUTUBE
§5; script opcional `scripts/set-video-id.mjs` (`node scripts/set-video-id.mjs <slug> <id>`)
que edita videos.json con validación; **prueba de fuego reversible**: inyectar un ID de prueba
en v-01, reconstruir, verificar el iframe, revertir (o dejarlo si RTBM ya entregó el ID real).
**Contexto:** D-05; INSTRUCCIONES-YOUTUBE.md §4-§5.
**Entradas:** T1-T2 · **Salidas:** README actualizado, script, evidencia de la prueba en el PR.
**Criterios de aceptación (todos en verde):**
- [ ] `node scripts/set-video-id.mjs v-01-presentacion dQw4w9WgXcQ && npx @11ty/eleventy && grep -c "youtube-nocookie.com/embed/dQw4w9WgXcQ" _site/multimedia/index.html` → 1.
- [ ] El mismo ID aparece donde el sitio consuma destacados sin editar nada más (evidencia: grep sobre `_site/index.html` si S3-T1 ya está fusionado; si no, sobre styleguide) → ≥1.
- [ ] Tras revertir: `grep -c "dQw4w9WgXcQ" src/_data/videos.json` → 0 y build verde.
**Commit/PR:** rama `s4/tarea-3-flujo-activacion`.

## GATE DE SALIDA (declara S4 = COMPLETADO)
- [ ] Clon limpio: `npm ci && npx @11ty/eleventy` verde; `test -f _site/multimedia/index.html`.
- [ ] CI verde; captura de /multimedia/ (desktop+móvil) en el PR.
- [ ] `docs/planes/ESTADO.md` → S4=COMPLETADO. Anunciar: **S5 se habilita cuando S3 también cierre**.

## Protocolo GitHub
Issue `[PLAN S4] multimedia-y-videos` etiqueta `plan:s4`; checklist = T1-T3; una rama/PR por
tarea; cierre solo con gate de salida en verde.
