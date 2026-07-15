# ADR — Registro de decisiones · Sitio web institucional SEVIAH
### v1 · 2026-07-13 · Fuente de verdad de decisiones para todos los planes

> Formato: **Decisión · Alternativa descartada · Justificación**. Los planes citan D-nn.
> Ninguna decisión de aquí puede "mejorarse" por un agente sin protocolo `duda:`.

## D-01 — Clon estructural, no visual
**Decisión:** Replicar la **estructura y navegación** de www.sit.gob.hn (header con escudo, hero/slider, "Destacados", "Noticias" con "Mostrar Más", páginas Nosotros/Programas, subsección de transparencia, footer institucional) con la **identidad visual completa de SEVIAH**.
**Descartada:** Clon visual pixel-perfect del diseño de la SIT.
**Justificación:** Confirmado por el usuario (RTBM). Lo replicable es el patrón institucional; la identidad es propia.

## D-02 — Identidad visual SEVIAH (tokens obligatorios)
**Decisión:** Paleta institucional del Gobierno 2026-2030: dorado `#AD8411`, navy `#273A7F`, oscuro `#231F20`, sobre fondo blanco. Tipografía **Georgia** (serif de sistema, sin CDN de fuentes) con fallback `-apple-system` para UI auxiliar. Escudo nacional sobre fondo blanco o blanco sobre fondo dorado (nunca alterado). Todos los colores viven en `tokens.css` como variables CSS.
**Descartada:** Google Fonts / tipografías externas; hex sueltos en el CSS.
**Justificación:** Manual de marca del Gobierno de Honduras 2026-2030 provisto por el usuario; disciplina de tokens habilita QA por `grep`.

## D-03 — Librerías externas permitidas (CDN)
**Decisión:** Se permiten CDN: **Bootstrap 5.3** (grid/navbar), **Swiper 11** (hero y carrusel de destacados), **Font Awesome 6** (iconografía). Prohibido descargar o empotrar activos propiedad del sitio de la SIT (imágenes, SVG del logo SIT, scripts propios).
**Descartada:** Restricción "cero JS/CDN" de artefactos anteriores; empotrar librerías del sitio original.
**Justificación:** Autorización explícita del usuario para este proyecto; respeto de propiedad de activos de terceros.

## D-04 — Videos en YouTube, nunca en el repositorio
**Decisión:** Los videos institucionales se hospedan en un **canal de marca de YouTube** ("SEVIAH Honduras"). El sitio los consume mediante iframes responsivos `https://www.youtube-nocookie.com/embed/<ID>?rel=0` en wrapper 16:9 (`aspect-ratio: 16/9`), con `title` y `allowfullscreen`. Los archivos MP4 **jamás** entran al repositorio ni al hosting.
**Descartada:** Video autohospedado (`<video>` + MP4 en el servidor); embeds de Facebook como vía principal.
**Justificación:** Peso (51 MB actuales y creciendo), streaming adaptativo, cero costo de ancho de banda, práctica estándar gubernamental. Facebook (/seviah.hn) queda como refuerzo, no como fuente del sitio.

## D-05 — Contrato `videos.json` (congelado en S2)
**Decisión:** Registro central `src/_data/videos.json`: array de objetos `{slug, titulo, descripcion, playlist, fecha, youtube_id, destacado}`. Si `youtube_id` está vacío ⇒ la tarjeta se renderiza en estado **"Próximamente"** (sin iframe). Inyectar los IDs cuando existan es la única edición necesaria para activar los videos.
**Descartada:** IDs quemados en el HTML de cada página.
**Justificación:** Los videos aún no están en YouTube; el sitio debe nacer completo y activarse con una edición puntual. Este archivo es el contrato entre S3 (consume) y S4 (puebla).

## D-06 — Componente "En construcción"
**Decisión:** Toda sección sin información pública verificada usa el componente estándar `en-construccion` (icono, mensaje institucional, fecha estimada opcional). Nunca se inventa contenido para rellenar.
**Descartada:** Omitir las secciones; rellenar con lorem ipsum o datos supuestos.
**Justificación:** Instrucción del usuario; integridad de la información pública.

## D-07 — Nomenclatura institucional innegociable
**Decisión:** Nombre oficial: **Secretaría de Vivienda y Asentamientos Humanos (SEVIAH)** — nunca "SEVAH". **SIGEBO** (Sistema Integrado de Gestión del Bono de Vivienda de Interés Social) y **SIGEPO** (Sistema Integrado de Gestión de Proyectos) son **dos sistemas distintos**: prohibido conflarlos. **SISOCS no se menciona en ninguna parte del sitio.** Campo de identificación: "Número de Documento de Identificación (DNI)". Lema: "Construyendo un mejor futuro para Honduras".
**Descartada:** —
**Justificación:** Estándares del proyecto SEVIAH ya establecidos (Decreto 173-2019, logo oficial, lineamientos del engagement).

## D-08 — Cumplimiento de transparencia antes de publicar
**Decisión:** El sitio incluye sección **Transparencia** con: enlace al Portal Único de Transparencia (portalunico.iaip.gob.hn), enlace al SIELHO (sielho.iaip.gob.hn), referencia al Oficial de Información Pública (OIP — dato "En construcción" hasta designación), y esqueleto de información de oficio del Art. 13 (Decreto 170-2006). No se publica en dominio .gob.hn sin esta sección operativa.
**Descartada:** Dejar transparencia para una fase posterior al lanzamiento.
**Justificación:** Obligación legal (Ley de Transparencia y Acceso a la Información Pública) y patrón verificado en transparencia.sit.gob.hn.

## D-09 — Generador estático: Eleventy 3 *(supuesto adoptado — puede revertirse)*
**Decisión:** El sitio se construye con **Eleventy 3** (plantillas Nunjucks + datos JSON) con salida **HTML estático puro** en `_site/`. El hosting final solo recibe HTML/CSS/JS estáticos.
**Descartada:** HTML plano duplicado a mano (header/footer copiados en cada página — frágil al mantener); WordPress (requiere hosting PHP+BD y administración).
**Justificación:** Multipágina con layout compartido y contenido en datos (videos.json, noticias) exige templating; la salida sigue siendo estática y desplegable en cualquier hosting. **Si el usuario prefiere HTML plano sin tooling, se declara vía `duda:` antes de S1-T1 y S1 se ajusta.**

## D-10 — Despliegue por etapas
**Decisión:** Staging en **GitHub Pages** (rama `gh-pages` o Actions) para revisión del usuario y de SEVIAH. Producción futura en hosting institucional bajo dominio **.gob.hn** (registro vía NIC-HN/RDS-HN) — fuera del alcance de este paquete.
**Descartada:** Publicar directo a producción.
**Justificación:** RTBM revisa antes de aprobar ("Revisemos antes de comenzar"); el dominio .gob.hn requiere trámite institucional.

## D-11 — Contenido verificable y atribución
**Decisión:** Todo contenido factual del seed proviene de `docs/02-mapa-de-sitio-y-contenido-seed.md` (con fuentes). Cifras provenientes de declaraciones de prensa (meta 20,000 viviendas, déficit 1.6M) se redactan como **metas/declaraciones**, no como resultados. Misión/Visión/Valores: los provistos oficialmente por el usuario (arte institucional).
**Descartada:** Redacción libre del agente sobre datos institucionales.
**Justificación:** Sitio gubernamental: exactitud ante todo; el agente no inventa datos (regla E-18).

## D-12 — Redes sociales oficiales (AJUSTE-01)
**Decisión:** Los únicos perfiles sociales oficiales de SEVIAH son cinco: Facebook "Seviah Honduras" (facebook.com/seviah.hn), Instagram "seviah.hn" (instagram.com/seviah.hn), X "@seviah_hn" (x.com/seviah_hn), TikTok "@seviah.hn" (tiktok.com/@seviah.hn) y YouTube "@seviahn" (youtube.com/@seviahn). El footer y /contacto/ enlazan estos perfiles, sustituyendo el estado "En construcción" de redes (D-06). Todo enlace a red social lleva `rel="noopener"`, `target="_blank"` y `aria-label`. No se enlaza ninguna red fuera de estas cinco.
**Descartada:** Mantener "En construcción" para redes ya existentes; enlazar perfiles no verificados.
**Justificación:** Enmienda AJUSTE-01 (2026-07-15): perfiles verificados provistos por el usuario. Registrada retroactivamente al aplicar AJUSTE-03, que detectó su ausencia en este ADR.

## D-13 — Orientación uniforme por contenedor de video (AJUSTE-02)
**Decisión:** Todo contenedor que liste videos renderiza **un solo formato**. (a) **/multimedia/**: dos bloques separados — "Videos" (todos los `formato: "horizontal"`, grid de tarjetas 16:9) y "SEVIAH Shorts" (todos los `formato: "vertical"`, fila/carrusel de tarjetas 9:16 de altura uniforme, máx. 420px de ancho por tarjeta). El filtro por playlist aplica dentro de cada bloque; un bloque sin resultados se oculta completo. (b) **Franja de videos de Inicio** (destacados): renderiza únicamente los destacados del formato **vertical** (el dominante del inventario actual); los destacados horizontales se promocionan en Inicio como card de noticia enlazada a /multimedia/, no como reproductor mezclado en la franja. (c) Cualquier futura lista de videos hereda esta regla. Complementa D-04/D-05; no cambia el esquema de videos.json.
**Descartada:** Retícula mixta 16:9 + 9:16 en un mismo contenedor; recortar o deformar videos (letterbox artificial) para forzar un aspecto único; eliminar los videos horizontales del sitio.
**Justificación:** Enmienda AJUSTE-02 (2026-07-15): la mezcla de orientaciones en un mismo contenedor produce una retícula dispareja. Separar por formato mantiene retículas uniformes sin alterar el contrato de datos ni el parcial `video-embed`.

## D-14 — Sección "Síguenos en redes" (AJUSTE-03)
**Decisión:** Se crea el parcial reutilizable `redes-sociales.njk` con dos variantes: (a) **banda** — franja de sección con fondo `--sev-oscuro`, título "Síguenos en nuestras redes" en Georgia blanco, y las 5 redes como insignias circulares: círculo dorado `--sev-dorado`, glifo Font Awesome 6 brands en blanco, nombre/handle debajo en tipografía sans; hover: círculo navy `--sev-navy` con transición suave y leve elevación; (b) **inline** — fila compacta de iconos para footer y Contacto. La banda se coloca en **Inicio** (antes del footer) y en **/contacto/**; la variante inline sustituye los iconos sueltos del footer. Los glifos de marca provienen exclusivamente de Font Awesome 6 Free (brands) — no se descargan ni redibujan logotipos de las plataformas — y el color de las insignias es el institucional SEVIAH (no los colores corporativos de cada red), manteniendo la armonía dorado/navy/oscuro. Cada enlace lleva `aria-label`, `target="_blank"` y `rel="noopener"`. Sustituye el estado "En construcción" de redes (D-06/AJUSTE-01) por los cinco perfiles oficiales.
**Descartada:** Dejar las redes solo como iconos sueltos en el footer; usar logotipos descargados o los colores corporativos de cada plataforma; enlazar redes fuera de las cinco oficiales.
**Justificación:** Enmienda AJUSTE-03 (2026-07-15): el sitio necesita una sección de redes visible y atractiva que armonice con la identidad SEVIAH y lleve la suscripción al canal real de la Secretaría.

## D-15 — Preloader, animaciones y miniaturas de video (AJUSTE-04)
**Decisión:** (a) **Preloader institucional propio** en el layout base: overlay blanco con el escudo SEVIAH estático y, detrás, un halo circular dorado→navy que gira (1.2s lineal) bajo capas desenfocadas, con el lema en Georgia (fade-in); replica la **coreografía** del loader de www.sit.gob.hn reimplementada desde cero con CSS/tokens propios — ningún activo de la SIT entra al repo (D-03). Sale con fade de 400ms al cumplirse una **duración fija de 10s** (indicación del usuario del 2026-07-15, que deja sin efecto la salida en `window load`/2.5s del texto original) con failsafe de duración+2.5s armado en el head; se muestra **en cada página y en cada visita** (paridad con el loader de la SIT — indicación del usuario, que deja sin efecto el "una vez por sesión" del texto original de la enmienda) y respeta `prefers-reduced-motion` (estático, misma duración de 10s, retirada sin fade — antes se retiraba al cargar y se percibía como parpadeo). (b) **Paquete de animaciones sobrias**: AOS por CDN (`fade-up`, 500ms, delays escalonados, `once`) en cards, pilares, fichas, bloques de videoteca y banda de redes; elevación con sombra en hover de cards (200ms), subrayado animado del navbar y botones dorado→navy; AOS se inicializa con `disable` bajo `prefers-reduced-motion` y un bloque global anula transiciones/animaciones. (c) **Miniaturas de video**: toda card-enlace de video consume `https://i.ytimg.com/vi/{youtube_id}/hqdefault.jpg` construida desde el contrato (D-05), con velo oscuro, botón de play dorado y `alt` descriptivo. *(D1 y D4 de AJUSTE-04 no son decisiones nuevas: son cumplimiento de D-01 y D-12.)*
**Descartada:** Copiar/descargar el loader o activos de la SIT; animaciones aparatosas (rebotes, parallax); placeholder de icono sin miniatura en cards de video.
**Justificación:** Enmienda AJUSTE-04 + adenda (2026-07-15): defectos reportados por el usuario tras revisar el sitio construido; el efecto del preloader de la SIT se replica como técnica, no como activo, y las cards de video recuperan la previsualización visual que existía antes del refactor de orientación (D-13).
