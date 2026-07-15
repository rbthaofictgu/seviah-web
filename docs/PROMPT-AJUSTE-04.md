# PROMPT-AJUSTE-04 — Correcciones post-construcción: estructura de Inicio, preloader,
# animaciones, logos nuevos y miniaturas de video
### Enmienda E-18 (modo delta) · 2026-07-15 · pegar en Claude Code en el repo seviah-web

---

Eres el agente del proyecto **seviah-web** (norma E-18). Aplica la **ENMIENDA AJUSTE-04**,
que corrige 5 defectos reportados por el usuario tras revisar el sitio construido. Trabaja en
la rama `ajuste-04/correcciones-revision-1` con un PR por defecto corregido (D1…D5) o un PR
único con commits separados por defecto, e incluye evidencia (capturas/comandos) por cada uno.

## D1 — La home no sigue el patrón estructural clonado
**Reporte:** los colores coinciden pero la estructura de Inicio difiere del patrón de
www.sit.gob.hn que se decidió clonar (D-01).
**Corrección:** alinear `src/index.njk` estrictamente a la secuencia documentada en
docs/02 §1: (1) hero/slider full-width con imagen de portada y titular; (2) sección
**"Destacados"** como carrusel Swiper con flechas de navegación laterales visibles; (3)
sección **"Noticias"** en grid de cards con botón **"Mostrar Más"** centrado bajo el grid;
(4) franja de videos institucionales (solo verticales, D-13); (5) banda de redes (D-14, si
está aplicado); (6) footer. Antes de editar, lista la estructura actual de la home
sección por sección vs. la esperada y muéstramela — corrige solo las divergencias.
**Criterio:** en `_site/index.html` el orden de aparición de los bloques es el documentado
(script en el PR que extraiga los ids/clases de sección en orden y lo demuestre) y el carrusel
de Destacados tiene flechas (`grep -c "swiper-button-next" _site/index.html` → ≥1).

## D2 — Falta el preloader (lo más atractivo del sitio de referencia)
**Reporte:** el sitio de la SIT tiene un loader de entrada que no se replicó.
**Regla:** PROHIBIDO copiar o descargar el loader/activos de sit.gob.hn (D-03: los activos de
terceros no se toman). Se crea un **preloader institucional propio de SEVIAH, mejor que el de
referencia**:
- Overlay full-screen fondo `--sev-dorado` que muestra el **escudo SEVIAH en blanco**
  (logo-seviah del repo) con animación: pulso suave de escala (1→1.06→1) + anillo/borde
  circular dorado-claro girando alrededor (spinner fino), y el lema "Construyendo un mejor
  futuro para Honduras" en Georgia blanco con fade-in.
- Desaparece con fade-out (400ms) en `window load` o máximo a los 2.5s (failsafe), y **no se
  repite en la misma sesión** (sessionStorage) para no castigar la navegación interna.
- Accesible: `aria-hidden`, respeta `prefers-reduced-motion` (si está activo: sin animación,
  desvanecido inmediato).
**Criterio:** `grep -c "preloader" _site/index.html` → ≥1; `grep -c "prefers-reduced-motion"
src/assets/css/main.css` → ≥1; video corto o capturas secuenciales del preloader en el PR;
presente en todas las páginas (está en el layout base).

## D3 — Faltan efectos y animaciones (mejora sobre el sitio de referencia)
**Reporte:** el sitio se ve estático; se autoriza superarlo con animaciones sobrias.
**Corrección:** añadir **AOS** (Animate On Scroll) vía CDN (permitido por D-03) con
`data-aos="fade-up"` y delays escalonados en: cards de Destacados, cards de Noticias, pilares
de Nosotros, fichas de Programas/Sistemas, bloques de la videoteca y banda de redes. Además:
elevación con sombra en hover de todas las cards (transición 200ms), subrayado animado en los
enlaces del navbar, y botones con transición de color dorado→navy. Si la home tiene cifras
(p. ej. pilares), contador animado con IntersectionObserver es opcional. TODO respeta
`prefers-reduced-motion` (AOS se inicializa con `disable` en ese caso). Sobriedad
institucional: duraciones 400–600ms, sin rebotes ni parallax agresivo.
**Criterio:** `grep -c "data-aos" _site/index.html` → ≥4; `grep -c "aos" _site/index.html`
(CSS+JS del CDN) → ≥2; inicialización condicionada a reduced-motion visible en el JS del repo.

## D4 — El sitio sigue usando los logos viejos
**Reporte:** los logos nuevos ya están dentro de la carpeta del sitio; solo falta apuntar a
ellos. Fuente original adicional del usuario (Windows):
`G:\Mi unidad\1.-PROYECTOS\2.-YT\000.-SEVIAH\SitioWeb\Inputs\Logos\Logo.jpg` → en WSL:
`/mnt/g/Mi unidad/1.-PROYECTOS/2.-YT/000.-SEVIAH/SitioWeb/Inputs/Logos/Logo.jpg`.
**Corrección:**
1. Localiza los activos nuevos en el repo: `find . -path ./node_modules -prune -o -iname
   "*logo*" -print -o -iname "favicon*" -print` y muéstrame qué encontraste.
2. Si están las variantes procesadas (logo-seviah-dorado.png, logo-seviah-blanco.png,
   favicon-512/192/32.png): muévelas/cópialas a `src/assets/img/` y apunta TODO a ellas:
   header (variante blanca: escudo dorado sobre barra blanca), footer (variante dorada),
   preloader de D2, `<link rel="icon">` + `apple-touch-icon` + `og:image` en el head.
3. Si solo existe `Logo.jpg`: genera las variantes con ImageMagick —
   `convert Logo.jpg -quality 95 logo-seviah-dorado.png`;
   `convert Logo.jpg -colorspace Gray -threshold 75% -negate -fuzz 10% -fill "#AD8411"
   -opaque black PNG24:logo-seviah-blanco.png`;
   `convert Logo.jpg -gravity north -crop 62%x62%+0+30 +repage -resize 512x512 favicon-512.png`
   (+ resize 192 y 32) — verifica visualmente la variante blanca antes de usarla.
4. Elimina del repo y de `_site` toda referencia a los logos/lockups viejos.
**Criterio:** `grep -c "logo-seviah-blanco" _site/index.html` → ≥1; `grep -c "favicon" 
_site/index.html` → ≥2; `grep -rc "lockup\|logo-viejo\|Logo_Gobierno" _site/*.html | grep -v
":0" | wc -l` → 0 en headers/footers (Logo_Gobierno.png puede permanecer solo si docs/03 lo
asigna a la franja de gobierno del footer); captura del header y footer nuevos en el PR.

## D5 — La card del video "Agradecimiento del alcalde de Yauyupe" muestra un fondo azul vacío
**Reporte:** en "Videos institucionales" la card del destacado horizontal (v-02, patrón
D-13-b: card-enlace a la videoteca) aparece con un placeholder azul con icono de cinta, sin
imagen del video.
**Causa esperada:** la card no consume la miniatura del video.
**Corrección:** las cards-enlace de video (y opcionalmente las tarjetas de la videoteca antes
del click) usan la **miniatura oficial de YouTube**, construida desde el `youtube_id` del
contrato: `https://i.ytimg.com/vi/{youtube_id}/hqdefault.jpg` (fallback si se quiere mayor
resolución: intentar `maxresdefault.jpg` con `onerror` → `hqdefault.jpg`). Sobre la miniatura:
overlay oscuro sutil + botón de play circular dorado centrado + la etiqueta "VIDEO ·
<playlist>" existente. `alt` descriptivo con el título del video. Verifica además que el
embed de v-02 (`3WLJz0PzMQI`) reproduce correctamente en /multimedia/.
**Criterio:** `grep -c "i.ytimg.com/vi/3WLJz0PzMQI" _site/index.html` → ≥1; captura de la
card con miniatura visible en el PR; `npx linkinator` sobre la home sin rotos nuevos.

## Registro de la enmienda
- `docs/01-ADR-decisiones.md` → **D-15 (AJUSTE-04):** preloader institucional propio (D2),
  paquete de animaciones sobrias con AOS + reduced-motion (D3), miniaturas i.ytimg.com por
  youtube_id en cards de video (D5). D1 y D4 no son decisiones nuevas: son cumplimiento de
  D-01 y D-12.
- `00-INDICE...` → Changelog: `v05 (AJUSTE-04): correcciones revisión 1 — estructura home,
  preloader, animaciones, logos nuevos, miniaturas.`

## Validación global de cierre
`npx @11ty/eleventy` verde · `npx html-validate "_site/**/*.html"` → 0 errores · ningún hex
nuevo fuera de tokens.css · `grep -rci "SISOCS" _site/ | grep -v ":0" | wc -l` → 0 · capturas
finales desktop + móvil (390px) de Inicio completa en el PR.

Empieza con el inventario de D1 (estructura actual vs. esperada) y el `find` de D4, y
muéstrame ambos ANTES de editar código.
