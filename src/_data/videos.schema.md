# Esquema `videos.json` — contrato congelado en S2 (D-05)

`src/_data/videos.json` es un **array de objetos**. Es el contrato entre S3 (lo consume) y S4
(lo puebla). No se renombran campos ni se rompe el esquema sin enmienda E-18.

| Campo         | Tipo    | Obligatorio | Descripción |
|---------------|---------|-------------|-------------|
| `slug`        | string  | sí          | Identificador estable `v-0N-...` (p. ej. `v-01-presentacion`). |
| `titulo`      | string  | sí          | Título público del video. |
| `descripcion` | string  | sí          | Descripción breve (1-2 frases). |
| `playlist`    | string  | sí          | Una de: `Institucional`, `Programas`, `Eventos`, `SEVIAH en Acción`. |
| `fecha`       | string  | sí          | `AAAA-MM` (mes de publicación). |
| `formato`     | string  | sí          | `horizontal` (16:9) o `vertical` (9:16). |
| `youtube_id`  | string  | sí          | ID de YouTube (11 caracteres). **Vacío `""` ⇒ estado "Próximamente"** (sin iframe). |
| `destacado`   | boolean | sí          | `true` ⇒ aparece en la franja de destacados de Inicio. |
| `ejemplo`     | boolean | no          | Marca el registro de muestra de S2. **Ausente en los registros reales de S4.** |

## Comportamiento

- El parcial `src/_includes/video-embed.njk` recibe un objeto de este esquema.
- Con `youtube_id` no vacío renderiza `https://www.youtube-nocookie.com/embed/<id>?rel=0`
  (lazy, con `title`, `allowfullscreen`), en wrapper 16:9 o 9:16 según `formato`.
- Con `youtube_id` vacío renderiza el estado **"Próximamente"** (D-05).

## Activación

Inyectar los IDs (`slug → youtube_id`) es la **única** edición necesaria para activar los
videos. Ver `docs/planes/INSTRUCCIONES-YOUTUBE.md` §5 y `scripts/set-video-id.mjs`.

## Registro de ejemplo (S2)

```json
[
  {
    "slug": "v-00-ejemplo",
    "titulo": "Video de ejemplo — contrato videos.json",
    "descripcion": "…",
    "playlist": "Institucional",
    "fecha": "2026-07",
    "formato": "horizontal",
    "youtube_id": "dQw4w9WgXcQ",
    "destacado": true,
    "ejemplo": true
  }
]
```
