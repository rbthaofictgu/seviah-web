# Identidad visual · Sitio web institucional SEVIAH
### v1 · 2026-07-13 · Fuente de verdad de marca para S1 y S2 (implementa D-02)

## 1. Tokens (obligatorios en `src/assets/css/tokens.css`)

```css
:root {
  /* Paleta institucional Gobierno de Honduras 2026-2030 */
  --sev-dorado: #AD8411;        /* color primario de marca */
  --sev-navy: #273A7F;          /* acento institucional */
  --sev-oscuro: #231F20;        /* texto principal / fondos oscuros */
  --sev-blanco: #FFFFFF;

  /* Derivados permitidos (únicos tintes calculados admitidos) */
  --sev-dorado-suave: #F5EEDC;  /* fondos de sección */
  --sev-crema: #FAF7F0;         /* fondo alterno tarjetas */
  --sev-gris-linea: #E5E0D5;    /* bordes sutiles */
  --sev-verde-inst: #1F4D36;    /* verde institucional del arte Misión/Visión (uso secundario) */

  /* Tipografía */
  --sev-serif: Georgia, 'Times New Roman', serif;              /* titulares y cuerpo editorial */
  --sev-sans: -apple-system, 'Segoe UI', Roboto, sans-serif;   /* UI auxiliar (nav, botones, tablas) */
  --sev-mono: ui-monospace, 'Cascadia Mono', monospace;        /* solo datos técnicos */
}
```

Regla dura: **ningún hex fuera de tokens.css** (QA: `grep` en S5). Bootstrap se sobreescribe
vía variables propias, no editando su CSS.

## 2. Uso de la marca

- Escudo nacional sobre **fondo blanco** (composición a respetar) o versión **blanca sobre
  fondo dorado** para bloques de alto impacto (hero, franjas).
- Header: franja superior dorada delgada (marca gobierno) + barra blanca con escudo + nombre
  "SECRETARÍA DE VIVIENDA Y ASENTAMIENTOS HUMANOS / SEVIAH" en Georgia.
- Insumo gráfico: `docs/Logo_Gobierno.png` (escudo/marca gobierno). El logotipo propio de
  SEVIAH con estrellas (arte Misión/Visión) se replica tipográficamente si no hay archivo
  vectorial: nombre en Georgia + sigla SEVIAH en dorado + fila de 5 estrellas (★) doradas.
- Los íconos de pilares (casa, personas, apretón de manos, hoja, escudo-check) se resuelven
  con Font Awesome 6 en dorado sobre círculo crema.

## 3. Composición por página

- **Hero (Inicio):** Swiper full-width, overlay degradado `--sev-oscuro` 60%→0, titular Georgia
  blanco, CTA dorado. Alturas: 72vh desktop / 60vh móvil.
- **Destacados:** carrusel Swiper de cards (icono dorado, título navy, texto oscuro) — replica
  el patrón "Destacados" de la SIT.
- **Noticias:** grid de cards 3/2/1 columnas (desktop/tablet/móvil) con botón "Mostrar Más"
  (dorado, hover navy).
- **"En construcción":** tarjeta crema con borde dorado discontinuo, icono `fa-person-digging`,
  texto: "Sección en construcción — Estamos preparando esta información para usted."
- **Video embed:** wrapper `aspect-ratio:16/9` (horizontal) o `aspect-ratio:9/16` con máx.
  420px de ancho (vertical), borde-radio 12px, sombra suave; estado "Próximamente" = misma
  caja con fondo `--sev-oscuro`, icono `fa-clapperboard` dorado y título del video.
- **Bloques de videos por formato (D-13, AJUSTE-02):** ningún contenedor de videos mezcla
  orientaciones. /multimedia/ se compone de dos bloques: "Videos" (grid de tarjetas 16:9) y
  "SEVIAH Shorts" (fila/carrusel de tarjetas 9:16 de altura uniforme, máx. 420px por tarjeta);
  el filtro por playlist opera dentro de cada bloque y un bloque sin resultados se oculta
  completo. La franja de videos de Inicio muestra solo destacados verticales; los destacados
  horizontales se promocionan con una card de noticia enlazada a /multimedia/.

## 4. Accesibilidad y responsive

- Contraste AA mínimo: texto oscuro sobre crema/blanco; blanco sobre navy/oscuro; **no** texto
  dorado sobre blanco en cuerpos (solo titulares grandes ≥24px).
- Breakpoints Bootstrap estándar; verificación obligatoria en viewport iPhone 390×844 (S5).
- `alt` en toda imagen; `title` en todo iframe; navegación operable por teclado.
