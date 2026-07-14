#!/usr/bin/env node
// set-video-id.mjs — Activa un video inyectando su ID de YouTube en videos.json (D-05).
// Uso:  node scripts/set-video-id.mjs <slug> <youtube_id>
//   - <youtube_id> vacío ("") restablece el video al estado "Próximamente".
// Valida que el slug exista y que el ID tenga el formato de YouTube (11 caracteres).
import { readFileSync, writeFileSync } from "node:fs";

const DATA = new URL("../src/_data/videos.json", import.meta.url);
const ID_RE = /^[A-Za-z0-9_-]{11}$/;

const [slug, rawId] = process.argv.slice(2);
if (!slug) {
  console.error("Uso: node scripts/set-video-id.mjs <slug> <youtube_id>");
  process.exit(1);
}
const id = rawId === undefined ? "" : rawId;
if (id !== "" && !ID_RE.test(id)) {
  console.error(`ID de YouTube inválido: "${id}". Debe tener 11 caracteres [A-Za-z0-9_-], o "" para "Próximamente".`);
  process.exit(1);
}

const videos = JSON.parse(readFileSync(DATA, "utf8"));
const video = videos.find((v) => v.slug === slug);
if (!video) {
  console.error(`Slug no encontrado: "${slug}". Slugs disponibles:\n  ${videos.map((v) => v.slug).join("\n  ")}`);
  process.exit(1);
}

const antes = video.youtube_id;
video.youtube_id = id;
writeFileSync(DATA, JSON.stringify(videos, null, 2) + "\n");

if (id === "") {
  console.log(`✓ ${slug}: youtube_id borrado (antes: "${antes}") → estado "Próximamente".`);
} else {
  console.log(`✓ ${slug}: youtube_id = "${id}" (antes: "${antes}"). Reconstruye con: npx @11ty/eleventy`);
}
