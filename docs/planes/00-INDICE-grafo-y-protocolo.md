# ÍNDICE — Paquete E-18 · Sitio web institucional SEVIAH (seviah-web)
### v01 · 2026-07-13 · Generado por planificador-e18

## 1. Contenido del paquete

| Archivo | Rol |
|---|---|
| `00-INDICE-grafo-y-protocolo.md` | Este índice: grafo, protocolo, tablero ESTADO, supuestos |
| `ORDEN-EJECUCION.md` | Runbook: qué plan ejecutar ahora (1 agente y bifurcaciones) |
| `MAPA-PARALELIZACION.md` | Análisis de paralelización (veredicto: parcial, S3 ∥ S4) |
| `PLANTILLA-E18-plan-de-trabajo.md` | Norma de anatomía para planes futuros |
| `AGENTS.md` | Constitución operativa del repo para agentes |
| `PLAN-S1-fundacion-repo-y-marca.md` | Repo Eleventy, tokens de marca, activos, CI |
| `PLAN-S2-layout-y-componentes.md` | Layout base, componentes, contrato videos.json |
| `PLAN-S3-paginas-y-contenido.md` | Todas las páginas con contenido seed verificable |
| `PLAN-S4-multimedia-y-videos.md` | Videoteca, videos.json poblado, flujo de activación |
| `PLAN-S5-transparencia-qa-despliegue.md` | Transparencia legal, QA integral, staging |
| `docs/01-ADR-decisiones.md` | Registro de decisiones D-01…D-11 (fuente de verdad) |
| `docs/02-mapa-de-sitio-y-contenido-seed.md` | Mapa de sitio + todo el contenido verificable |
| `docs/03-identidad-visual.md` | Tokens, marca, composición, accesibilidad |
| `docs/04-inventario-videos.md` | 8 videos con metadata propuesta y análisis de fotogramas |
| `docs/Logo_Gobierno.png` | Insumo gráfico (escudo/marca gobierno) |
| `INSTRUCCIONES-YOUTUBE.md` | Tarea HUMANA de RTBM: canal, subida, IDs, activación |
| `PROMPT-ARRANQUE.md` | Texto para pegar en Claude Code e iniciar la ejecución |

No hay PROMPT-0: el bootstrap del repo está integrado en S1-T1 (proyecto desde cero, sin
cosecha de repos hermanos).

## 2. Grafo de dependencias

```
S1 ──► S2 ──┬──► S3 ──┐
            │         ├──► S5
            └──► S4 ──┘
```
Lectura operativa: espina S1→S2; ola paralela S3 ∥ S4; convergencia S5. Detalle en
MAPA-PARALELIZACION.md.

## 3. Protocolo de ejecución
1. **Bootstrap**: copiar este paquete a `docs/planes/` del repo destino (docs/ del paquete →
   `docs/` del repo). Copiar el tablero de §4 a `docs/planes/ESTADO.md`.
2. **Apertura de plan**: verificar ESTADO + crear issue `[PLAN Sn] <nombre>` + ejecutar GATE
   DE ENTRADA con comandos; si falla, reportar y detenerse.
3. **Ejecución**: una sesión por tarea; rama `s<n>/tarea-<m>-<slug>`; un PR por tarea con las
   evidencias de TODOS los criterios pegadas.
4. **Cierre**: GATE DE SALIDA en verde → actualizar ESTADO → cerrar issue → anunciar planes
   habilitados.

## 4. Tablero ESTADO (copiar a docs/planes/ESTADO.md en el bootstrap)

| Plan | Depende de | Paralelo con | Estado | Issue | Cierre |
|---|---|---|---|---|---|
| S1 fundacion-repo-y-marca | — | — | NO_INICIADO | — | — |
| S2 layout-y-componentes | S1 | — | NO_INICIADO | — | — |
| S3 paginas-y-contenido | S2 | S4 | NO_INICIADO | — | — |
| S4 multimedia-y-videos | S2 | S3 | NO_INICIADO | — | — |
| S5 transparencia-qa-despliegue | S3, S4 | — | NO_INICIADO | — | — |

## 5. Insumos externos NO bloqueantes

| Insumo | Bloquea a | Comportamiento si no llega |
|---|---|---|
| IDs de YouTube (8 videos) | nada | todo se publica "Próximamente" (D-05); activación posterior por videos.json |
| Confirmación de títulos v-05…v-08 | publicación final de esos 4 | se usan los títulos propuestos de docs/04 §1; RTBM corrige antes del deploy |
| Dirección/teléfonos de SEVIAH | nada | Contacto queda "En construcción" (D-06) |
| Fotos oficiales de autoridades | nada | silueta institucional "En construcción" |
| Designación del OIP | nada | bloque OIP "En construcción" en Transparencia |
| Logo vectorial propio de SEVIAH | nada | lockup tipográfico alternativo (docs/03 §2) |

## 6. Supuestos adoptados (declarados)
- **D-09**: Eleventy 3 como generador (salida HTML estático puro). Reversible a HTML plano vía
  `duda:` antes de S1-T1 si RTBM lo prefiere.
- Defaults E-18 adoptados: commits convencionales en español, un PR por tarea, evidencia de
  criterios en el PR.
- Hosting de staging: GitHub Pages (D-10); producción .gob.hn fuera de alcance del paquete.

## 7. Trazabilidad normativa
Cada regla dura de AGENTS.md §4 se sustenta en D-02 (tokens), D-04 (videos), D-07
(nomenclatura), D-11 (contenido verificable). La sección Transparencia se sustenta en D-08
(Decreto 170-2006, Art. 13). El clon estructural se sustenta en D-01.

## Changelog
- v01 (2026-07-13): paquete inicial completo (5 planes, mapa, orden, ADR, seed, inventario).
- v03 (AJUSTE-02): D-13 orientación uniforme por contenedor.
- v04 (AJUSTE-03): D-14 sección de redes sociales.
