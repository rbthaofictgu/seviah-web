# ADENDA AL PROMPT-AJUSTE-04 — Imágenes del carrusel (D1) y loader (D2)
### 2026-07-15 · pegar en Claude Code A CONTINUACIÓN del PROMPT-AJUSTE-04 (lo complementa)

---

Complementa la ENMIENDA AJUSTE-04 con precisiones del usuario. Aplica junto con ella en la
misma rama `ajuste-04/correcciones-revision-1`.

## D1 (complemento) — Imágenes reales para el hero/carrusel

El humano importó a `src/assets/img/hero/` un set de **12 imágenes institucionales**
(fotogramas 1600×900 de videos oficiales de SEVIAH — material propio, sin problema de
derechos):
- `hero-emergencia-01..06.jpg` — atención a familia afectada por incendio (Yauyupe):
  escenas de la vivienda afectada y la atención en campo.
- `hero-congreso-01..06.jpg` — Congreso Municipal Sobre Gestión de Riesgos: escenas del
  evento/auditorio.

Instrucciones:
1. Verifica que están: `ls src/assets/img/hero/ | wc -l` → 12. Si no, avisa al humano y
   detén D1 (el resto de la enmienda continúa).
2. **Selecciona la mejor imagen de cada grupo** (nítida, sin rostros en primer plano
   protagonista, composición con aire para el titular) y construye el carrusel con **3
   slides**:
   - Slide 1 (portada): la mejor `hero-congreso-*` con titular "Construyendo un mejor futuro
     para Honduras" + CTA "Conozca nuestros programas" → /programas/.
   - Slide 2: la mejor `hero-emergencia-*` con titular "Atención cercana y responsable" +
     CTA "SEVIAH en Acción" → /multimedia/.
   - Slide 3: fondo dorado institucional con el escudo blanco (logo-seviah-dorado como
     composición, sin foto) con titular "Vivienda digna para todos" + CTA → /nosotros/.
3. Tratamiento obligatorio (docs/03 §3): overlay degradado `--sev-oscuro` 60%→0 sobre las
   fotos para legibilidad del titular Georgia blanco; `alt` descriptivo por slide;
   `loading="eager"` solo en la primera, `lazy` en el resto; las imágenes se sirven tal cual
   (ya vienen optimizadas a 1600×900, no re-comprimir).
4. Deja las 10 imágenes no usadas en la carpeta (reserva editorial) y lista en el PR cuáles
   elegiste y por qué (1 línea c/u).
5. **Nota de calidad para ENTREGA.md**: estas imágenes provienen de video 1024×576
   reescalado — calidad interina aceptable bajo overlay. Recomendación registrada: sustituir
   por fotografías originales de alta resolución de la página de Facebook de SEVIAH
   (material institucional propio) cuando comunicaciones las facilite; el reemplazo es
   drop-in (mismos nombres de archivo).

## D2 (precisión) — El loader replica el EFECTO del de la SIT, con el logo SEVIAH

El humano quiere específicamente **el mismo efecto de animación** que tiene el preloader de
www.sit.gob.hn, aplicado al logo de SEVIAH. Regla intacta: ni el archivo gráfico ni los
assets de la SIT se descargan al repo (D-03); lo que se replica es la **técnica de
animación**, reimplementada con CSS propio y nuestro logo.

Procedimiento:
1. Inspecciona el mecanismo real: `curl -sL https://www.sit.gob.hn/ -A "Mozilla/5.0" | head -c 200000`
   y localiza el markup del preloader; descarga a /tmp (NO al repo) la hoja CSS/JS que lo
   anima y extrae: tipo de animación (giro, pulso, trazado/draw SVG, barra, fade), duración,
   easing y coreografía de salida (fade del overlay, slide, etc.).
2. Reporta al humano en 3-4 líneas qué efecto usa la SIT (antes de implementar).
3. Reimplementa **la misma coreografía** con CSS/keyframes escritos desde cero aplicada al
   logo SEVIAH (`logo-seviah-blanco` sobre overlay dorado o `logo-seviah-dorado` según
   contraste del efecto), manteniendo los extras ya definidos en AJUSTE-04-D2: failsafe 2.5s,
   una vez por sesión (sessionStorage), `prefers-reduced-motion`.
4. Si el sitio de la SIT bloquea el curl o el loader se genera por JS ofuscado: implementa el
   plan B de AJUSTE-04-D2 (pulso + anillo giratorio) y solicita al humano un video corto de
   pantalla del loader de la SIT para calibrar el efecto en una iteración posterior.

## D5 (confirmación) — Sin cambios
El humano confirma que las previsualizaciones de video funcionaban antes del refactor de
orientación; la corrección de AJUSTE-04-D5 (miniatura i.ytimg.com por youtube_id + overlay
play) es la vía: restituye la previsualización visual en las cards manteniendo la retícula
uniforme de D-13. Aplícala tal cual.
