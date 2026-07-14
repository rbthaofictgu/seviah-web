# ENTREGA — Sitio web institucional SEVIAH (seviah-web)

**Para:** RTBM · **Fecha:** 2026-07-14 · **Norma:** E-18 · **Planes ejecutados:** S1–S5.

Sitio estático (Eleventy 3) que clona la estructura de un portal gubernamental con la
identidad propia de SEVIAH. Construye en verde desde clon limpio, pasa el QA integral
(ver [`qa/REPORTE-QA.md`](qa/REPORTE-QA.md)) y queda listo para publicar.

## 1. URL de staging (GitHub Pages)

### ✅ EN VIVO: https://rbthaofictgu.github.io/seviah-web/

Repositorio: `github.com/rbthaofictgu/seviah-web` (privado). El workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) reconstruye y republica el sitio
en **GitHub Pages** en cada push a `main` (Source: GitHub Actions; Pages ya habilitado).

Verificado en vivo (2026-07-14): Inicio `200`, `grep SEVIAH` = 12, CSS/favicon/rutas internas
`200` (prefijo `/seviah-web/` aplicado automáticamente por `PATH_PREFIX`), y los 5 embeds reales
de YouTube presentes en `/multimedia/`.

- **Dominio propio / usuario-Pages (raíz):** definir la variable de repositorio
  `PATH_PREFIX = "/"` (Settings → Secrets and variables → Actions → Variables) y el `CNAME`.
- **Producción en dominio .gob.hn:** fuera de alcance (trámite institucional, D-10).

## 2. Estado de cada sección

| Ruta | Estado | Notas |
|------|--------|-------|
| `/` Inicio | ✅ Completa | Hero, destacados, últimas noticias, franja de videos |
| `/nosotros/` | ✅ Completa | Misión, visión, 5 pilares, base legal |
| `/autoridades/` | 🟡 Parcial | Datos de las 2 autoridades; **retratos y organigrama En construcción** |
| `/programas/` | ✅ Completa | 4 programas; cifras como declaraciones (D-11) |
| `/sistemas/` | 🟡 Parcial | SIGEBO y SIGEPO; **portales ciudadanos En construcción** |
| `/noticias/` | ✅ Completa | 6 notas con cuerpo; enlazan sus videos |
| `/multimedia/` | 🟡 Parcial | **5 videos reales publicados; v-06, v-07, v-08 En construcción (Próximamente)** |
| `/transparencia/` | 🟡 Parcial | Enlaces IAIP; **OIP y las 7 categorías del Art. 13 En construcción** |
| `/contacto/` | 🟡 Parcial | Facebook enlazado; **dirección, teléfonos y formulario En construcción** |

## 3. Pendientes humanos (para completar antes del lanzamiento)

1. **Videos de YouTube.** Faltan 3 IDs: `v-06-reunion-directiva`, `v-07-sesion-planificacion`,
   `v-08-seviah-en-accion`. Además, **confirmar los títulos/descripciones de v-05…v-08**
   (propuestas derivadas de análisis de fotogramas) y validar que las personas que aparecen
   pueden mostrarse públicamente. Guía y flujo de activación:
   [`docs/planes/INSTRUCCIONES-YOUTUBE.md`](docs/planes/INSTRUCCIONES-YOUTUBE.md) y la sección
   **Activar videos** del [`README.md`](README.md) (`node scripts/set-video-id.mjs <slug> <id>`).
   *(Ya publicados: v-01…v-05 con IDs reales.)*
2. **Contacto.** Dirección física y **teléfono(s)** oficiales de SEVIAH (hoy "En construcción").
3. **Autoridades.** Fotografías oficiales de la Secretaria y la Subsecretaria (hoy silueta).
4. **Transparencia — OIP.** Designación oficial del **Oficial de Información Pública (OIP)** y
   sus datos de contacto; y la documentación de oficio del Art. 13 (Decreto 170-2006).
5. **Canal de YouTube.** Enlazar "Suscríbete" cuando el canal exista (ver INSTRUCCIONES-YOUTUBE).

## 4. Cómo trabajar el repo

```bash
npm ci
npx @11ty/eleventy          # build -> _site/
npx @11ty/eleventy --serve  # http://localhost:8080
```

Fuentes de verdad en [`docs/`](docs/) (ADR D-01…D-11, contenido seed, identidad, videos) y el
tablero de avance en [`docs/planes/ESTADO.md`](docs/planes/ESTADO.md). Regla de oro: lo que no
esté documentado no se inventa — se marca **En construcción** (D-06).
