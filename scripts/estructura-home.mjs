// estructura-home.mjs — Evidencia AJUSTE-04-D1: extrae, en orden de aparición, los bloques
// estructurales de _site/index.html y los compara con la secuencia documentada (docs/02 §1).
// Uso: node scripts/estructura-home.mjs
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../_site/index.html", import.meta.url), "utf8");

// Marcadores de bloque en el orden esperado por la enmienda AJUSTE-04-D1.
const esperado = [
  ["hero/slider full-width", /<section class="hero">/],
  ["Destacados (carrusel Swiper con flechas)", /<h2 class="section-title">Destacados<\/h2>[\s\S]*?swiper-button-next/],
  ["Noticias (grid + botón 'Mostrar Más')", /<h2 class="section-title">Noticias<\/h2>[\s\S]*?Mostrar M/],
  ["Franja de videos institucionales (verticales, D-13)", /<h2 class="section-title">Videos institucionales<\/h2>/],
  ["Banda de redes (D-14)", /<section class="redes-banda">/],
  ["Footer institucional", /<footer class="site-footer">/]
];

let cursor = 0, ok = true;
for (const [nombre, patron] of esperado) {
  const m = html.slice(cursor).search(patron);
  if (m === -1) { console.log(`✗ FALTA o fuera de orden: ${nombre}`); ok = false; continue; }
  cursor += m + 1;
  console.log(`✓ ${String(esperado.findIndex(([n]) => n === nombre) + 1)}. ${nombre} (offset ${cursor})`);
}
console.log(ok ? "\nSecuencia de la home CONFORME a docs/02 §1 / AJUSTE-04-D1."
  : "\nSecuencia NO conforme.");
process.exit(ok ? 0 : 1);
