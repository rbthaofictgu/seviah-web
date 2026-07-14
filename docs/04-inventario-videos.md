# Inventario de videos institucionales · SEVIAH
### v1 · 2026-07-13 · Fuente de verdad para S4 (puebla videos.json) e INSTRUCCIONES-YOUTUBE.md

> Los `youtube_id` se completan cuando RTBM suba los videos al canal (tarea humana, no bloquea
> la construcción del sitio — D-04/D-05). Los títulos/descr. de los videos "sin contexto" son
> **propuestas derivadas del análisis de fotogramas** y deben ser confirmados o corregidos por
> RTBM antes de publicar. Formato vertical ≠ 16:9: ver nota §3.

## 1. Inventario (8 videos)

| slug | Archivo origen | Título propuesto | Playlist | Formato | youtube_id |
|---|---|---|---|---|---|
| v-01-presentacion | Video-Presentacion-Seviah.mp4 | SEVIAH — Presentación institucional | Institucional | horizontal | *(pendiente)* |
| v-02-donacion-vivienda | CasaQuedama-Se-le-Donara-Vivienda.mp4 | Familia afectada por incendio recibirá vivienda donada | SEVIAH en Acción | horizontal | *(pendiente)* |
| v-03-congreso-riesgos | CONGRESO-SISTEMA-MUNICIPAL-RIESGOS.mp4 | Congreso del Sistema Municipal de Gestión de Riesgos | Eventos | horizontal | *(pendiente)* |
| v-04-san-marcos | SOCIALIZAICON-PROYECTO-MEJORA-DE-VIVIENDAS-SAN-MARCOS-DE-COLON-CHOLUTECA.mp4 | Socialización del Proyecto de Mejoramiento de Viviendas — San Marcos de Colón, Choluteca | Programas | horizontal | *(pendiente)* |
| v-05-mesa-tecnica | REUNION-TRABAJO-SINCONTEXTO.mp4 | Mesa técnica de trabajo institucional *(por confirmar)* | SEVIAH en Acción | **vertical** | *(pendiente)* |
| v-06-reunion-directiva | REUNION-TRABJAO-SINCONTEXTO.mp4 | Reunión de trabajo con equipo directivo *(por confirmar)* | SEVIAH en Acción | **vertical** | *(pendiente)* |
| v-07-sesion-planificacion | Runion-de-Trabajo-SinContextro.mp4 | Sesión ejecutiva de planificación *(por confirmar)* | SEVIAH en Acción | horizontal | *(pendiente)* |
| v-08-seviah-en-accion | SEVIAH-EN-ACCION-SINCONTEXTO.mp4 | SEVIAH en Acción — trabajo en territorio *(por confirmar)* | SEVIAH en Acción | horizontal | *(pendiente)* |

`destacado: true` inicial: v-01 (franja de Inicio) y v-04 (programas).

## 2. Análisis de fotogramas de los videos "sin contexto" (base de las propuestas)

- **v-05 (28 s, vertical):** sala de reuniones institucional; una funcionaria expone de pie
  junto a una pantalla ante un equipo sentado alrededor de la mesa de trabajo. Lectura: mesa
  técnica / presentación interna.
- **v-06 (33 s, vertical):** sesión de trabajo en sala de juntas; participantes alrededor de
  la mesa en actitud de discusión/seguimiento. Lectura: reunión de coordinación directiva.
- **v-07 (39 s, horizontal):** sala de juntas amplia con mesa larga y pantalla al frente;
  varios asistentes en sesión formal. Lectura: sesión ejecutiva/planificación.
- **v-08 (40 s, horizontal):** secuencias de actividad fuera de oficina (terreno/actividades
  institucionales). Lectura: montaje tipo "SEVIAH en acción".

**Pendiente de RTBM:** confirmar para cada uno — (a) tema/proyecto de la reunión, (b) lugar y
fecha, (c) si aparecen autoridades que deban nombrarse o personas que NO deban aparecer
públicamente. Sin esa confirmación, los cuatro se publican con título genérico y descripción
breve, o se retienen.

## 3. Descripciones YouTube propuestas (plantilla)

```
[TÍTULO]
Secretaría de Vivienda y Asentamientos Humanos (SEVIAH) — Gobierno de la República de Honduras.
[1-2 frases del contenido: qué, dónde, cuándo.]
Construyendo un mejor futuro para Honduras.
Más información: [URL del sitio] · Facebook: facebook.com/seviah.hn
#SEVIAH #Vivienda #Honduras
```

## 4. Nota de formato vertical (v-05, v-06)

Los videos verticales se suben a YouTube igual (YouTube los soporta y en <60 s pueden
publicarse además como Shorts). En el sitio, el componente de embed detecta
`formato: "vertical"` y usa wrapper `aspect-ratio: 9/16` con ancho máximo 420px centrado, en
lugar del 16:9 estándar.

## 5. Contrato videos.json (referencia — definición canónica en S2)

```json
{
  "slug": "v-01-presentacion",
  "titulo": "SEVIAH — Presentación institucional",
  "descripcion": "…",
  "playlist": "Institucional",
  "fecha": "2026-07",
  "formato": "horizontal",
  "youtube_id": "",
  "destacado": true
}
```
