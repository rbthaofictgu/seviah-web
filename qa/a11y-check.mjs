// qa/a11y-check.mjs — Accesibilidad WCAG 2.0/2.1 A y AA sobre las 9 rutas (S5-T2).
// Motor: axe-core (el mismo que usan pa11y y Lighthouse) vía Playwright.
// Requiere: npm i -D playwright @axe-core/playwright axe-core && npx playwright install chromium
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "_site");
const RUTAS = ["/", "/nosotros/", "/autoridades/", "/programas/", "/sistemas/", "/noticias/", "/multimedia/", "/transparencia/", "/contacto/"];
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".json": "application/json" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  fs.readFile(path.join(ROOT, p), (err, data) => {
    if (err) { res.writeHead(404); res.end("404"); return; }
    res.writeHead(200, { "content-type": MIME[path.extname(p)] || "application/octet-stream" });
    res.end(data);
  });
});
await new Promise((r) => server.listen(8096, r));

// El preloader (D-15) cubre la página ~3s y sale con un fundido de 400ms. Analizar
// durante ese fundido hacía que axe midiera el lema a media opacidad y reportara un
// falso contraste 1.31:1 (en firme es navy sobre blanco). Se espera al estado estable.
async function esperarCargador(page) {
  await page.waitForFunction(
    () => {
      const c = document.querySelector(".sev-cargador");
      return !c || getComputedStyle(c).opacity === "0";
    },
    null,
    { timeout: 15000 },
  );
  await page.waitForTimeout(200);
}

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext();
let total = 0;
const detalle = [];
for (const ruta of RUTAS) {
  const page = await ctx.newPage();
  await page.goto("http://localhost:8096" + ruta, { waitUntil: "networkidle" });
  await esperarCargador(page);
  // Se excluye el contenido interno de los iframes: es el reproductor de YouTube
  // (markup de terceros fuera de nuestro control). Nuestros iframes llevan `title`.
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .exclude("iframe")
    .analyze();
  const serias = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  total += serias.length;
  console.log(`${serias.length === 0 ? "OK " : "XX "} ${ruta.padEnd(16)} violaciones serias/críticas: ${serias.length}${violations.length ? "  (total axe: " + violations.length + ")" : ""}`);
  for (const v of violations) {
    detalle.push({ ruta, id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help });
  }
  await page.close();
}
await browser.close();
server.close();

if (detalle.length) {
  console.log("\n--- Hallazgos axe (todos los impactos) ---");
  for (const d of detalle) console.log(`  [${d.impact}] ${d.ruta} · ${d.id} (${d.nodes}) — ${d.help}`);
}
console.log("\nRESULTADO:", total === 0 ? "0 violaciones serias/críticas en 9/9 rutas" : `${total} violaciones serias/críticas`);
process.exit(total === 0 ? 0 : 1);
