# INSTRUCCIONES — Canal de YouTube institucional SEVIAH y activación de videos en el sitio
### Tarea HUMANA (RTBM) · No bloquea la construcción del sitio · v1 · 2026-07-13

> El sitio se construye completo con placeholders "Próximamente" (D-04/D-05). Esta guía cubre:
> crear el canal correctamente, subir los 8 videos con metadata, y activarlos en el sitio con
> una sola edición. Insumo: `docs/04-inventario-videos.md`.

## Paso 1 — Crear el canal como CUENTA DE MARCA (no personal)

1. Crear (o usar) una cuenta Google institucional dedicada, p. ej. `comunicaciones.seviah@gmail.com`
   (idealmente migrar luego a correo @seviah.gob.hn cuando exista Workspace institucional).
2. En YouTube → Configuración → **Crear un canal nuevo** → "Usar un nombre de empresa u otro
   nombre" ⇒ esto crea una **cuenta de marca (Brand Account)**.
   - Nombre del canal: **SEVIAH Honduras**
   - Ventaja clave: permite agregar/quitar **administradores** sin compartir la contraseña, y el
     canal sobrevive a rotaciones de personal.
3. En "Administradores del canal" agregar al menos 2 personas (titular de comunicaciones + backup).
4. **Verificar el canal** (youtube.com/verify, por teléfono): habilita videos >15 min y
   miniaturas personalizadas.
5. Identidad del canal:
   - Avatar: escudo/logo SEVIAH sobre fondo blanco (800×800).
   - Banner: composición dorado #AD8411 con lema "Construyendo un mejor futuro para Honduras"
     (2560×1440, zona segura central 1546×423).
   - Descripción: nombre oficial completo, base legal breve (Decreto 173-2019), enlace al sitio
     y a facebook.com/seviah.hn.

## Paso 2 — Crear las 4 listas de reproducción

| Playlist | Contenido |
|---|---|
| Institucional | v-01 presentación |
| Programas | v-04 San Marcos de Colón (y futuros por programa) |
| Eventos | v-03 congreso de riesgos |
| SEVIAH en Acción | v-02, v-05, v-06, v-07, v-08 |

## Paso 3 — Subir los 8 videos con metadata

Para cada video, usar título y descripción de `docs/04-inventario-videos.md` (plantilla §3).
Configuración por video:
- **Visibilidad:** Público (o "No listado" si se quiere revisar el embed antes del anuncio).
- **Audiencia:** "No es contenido para niños".
- **Etiquetas:** SEVIAH, vivienda, Honduras, bono de vivienda, asentamientos humanos, + tema.
- **Idioma:** Español. Categoría: "Noticias y política" o "Personas y blogs".
- **Miniatura personalizada** (canal verificado): fotograma nítido + franja dorada con título
  corto en Georgia.
- Los 2 videos **verticales** (v-05, v-06) se suben normal; por durar <60 s YouTube puede
  tratarlos como Shorts — es aceptable; el embed del sitio funciona igual.
- **Importante (por confirmar antes de publicar v-05 a v-08):** validar internamente que las
  personas que aparecen pueden aparecer en material público institucional.

## Paso 4 — Obtener el ID de cada video

En la URL `https://www.youtube.com/watch?v=ABC123xyz45`, el ID es `ABC123xyz45` (11 caracteres).
Anotar los 8 IDs junto a su slug (v-01 … v-08).

## Paso 5 — Activar los videos en el sitio (única edición necesaria)

Opción A (recomendada): pasar a Claude Code la lista `slug → youtube_id` y pedirle:
> "Inyecta estos IDs en src/_data/videos.json, reconstruye y verifica los embeds."

Opción B (manual): editar `src/_data/videos.json`, llenar el campo `"youtube_id"` de cada
video, y reconstruir (`npx @11ty/eleventy`). Todo video con ID pasa automáticamente de
"Próximamente" al reproductor embebido (iframe `youtube-nocookie.com`, sin edición de HTML).

## Notas técnicas del embed (ya implementadas por el sitio — no requieren acción)

- Dominio de privacidad `www.youtube-nocookie.com` (no instala cookies hasta reproducir).
- `rel=0` (los videos sugeridos al final se limitan al propio canal).
- Wrapper responsivo 16:9 (o 9:16 para verticales), `title` accesible, `allowfullscreen`,
  carga diferida (`loading="lazy"`).

## Alternativas evaluadas (por si YouTube no fuera viable)

- **Vimeo:** sin anuncios y estética limpia, pero con costo/límites de almacenamiento — útil
  solo si se exige cero marca de terceros.
- **Embeds de Facebook (/seviah.hn):** aprovechan la audiencia existente, pero el reproductor
  es inferior y dependiente de la plataforma. Usar Facebook para difusión, YouTube como fuente
  del sitio.
