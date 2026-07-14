// qa/responsive-check.mjs — QA responsive de las 9 rutas del sitio (S5-T2).
// Sirve _site, mide document.documentElement.scrollWidth en móvil (390x844) y escritorio
// (1366x768), y guarda capturas en qa/capturas/. Salida: tabla + JSON. Código de salida 1 si
// alguna ruta desborda su viewport.
//
// Requiere: npm i -D playwright && npx playwright install chromium
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "_site");
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "capturas");
fs.mkdirSync(OUT, { recursive: true });

const RUTAS = ["/", "/nosotros/", "/autoridades/", "/programas/", "/sistemas/", "/noticias/", "/multimedia/", "/transparencia/", "/contacto/"];
const VIEWPORTS = [
  { nombre: "movil", width: 390, height: 844 },
  { nombre: "escritorio", width: 1366, height: 768 }
];
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  fs.readFile(path.join(ROOT, p), (err, data) => {
    if (err) { res.writeHead(404); res.end("404"); return; }
    res.writeHead(200, { "content-type": MIME[path.extname(p)] || "application/octet-stream" });
    res.end(data);
  });
});
await new Promise((r) => server.listen(8097, r));

const browser = await chromium.launch({ headless: true });
const resultados = [];
let ok = true;
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  for (const ruta of RUTAS) {
    const page = await ctx.newPage();
    await page.goto("http://localhost:8097" + ruta, { waitUntil: "networkidle" });
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    const pasa = sw <= vp.width;
    if (!pasa) ok = false;
    const slug = ruta === "/" ? "inicio" : ruta.replace(/\//g, "-").replace(/^-|-$/g, "");
    await page.screenshot({ path: path.join(OUT, `${slug}-${vp.nombre}.png`), fullPage: true });
    resultados.push({ ruta, viewport: vp.nombre, scrollWidth: sw, limite: vp.width, pasa });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
server.close();

for (const r of resultados) {
  console.log(`${r.pasa ? "OK " : "XX "} ${r.viewport.padEnd(10)} ${r.ruta.padEnd(16)} scrollWidth=${r.scrollWidth} (<= ${r.limite})`);
}
console.log("\nRESULTADO:", ok ? "9/9 en ambos viewports SIN desborde" : "DESBORDE DETECTADO");
console.log("JSON:", JSON.stringify({ ok, resultados }));
process.exit(ok ? 0 : 1);
