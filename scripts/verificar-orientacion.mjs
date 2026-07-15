// scripts/verificar-orientacion.mjs — Verificación de D-13 (AJUSTE-02): orientación
// uniforme por contenedor de video. Sirve _site, y con Chromium comprueba:
//   1. /multimedia/ tiene exactamente un contenedor data-formato="horizontal" y uno
//      data-formato="vertical".
//   2. Dentro de cada [data-formato] solo hay wrappers de su aspecto (aspect-ratio
//      computado 16/9 vs 9/16) y ningún wrapper del formato contrario.
//   3. El filtro por playlist opera dentro de cada bloque y un bloque sin resultados
//      se oculta completo (se prueba cada playlist y "Todas").
//   4. En Inicio, la franja de videos contiene solo wrappers 9:16 (0 de 16:9) y existe
//      la card-enlace a /multimedia/ para el destacado horizontal.
// Además guarda capturas de evidencia (desktop 1366px y móvil 390px) en qa/capturas/.
// Salida: líneas PASS/FAIL; código de salida 1 si algo falla.
//
// Requiere: npm i -D playwright && npx playwright install chromium
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "_site");
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "qa", "capturas");
fs.mkdirSync(OUT, { recursive: true });

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
await new Promise((r) => server.listen(8098, r));

const checks = [];
const check = (nombre, pasa, detalle = "") => {
  checks.push({ nombre, pasa });
  console.log(`${pasa ? "PASS" : "FAIL"}  ${nombre}${detalle ? " — " + detalle : ""}`);
};

// Razón de aspecto de un elemento a partir de su caja renderizada.
const razonDe = (el) => {
  const r = el.getBoundingClientRect();
  return r.height ? r.width / r.height : 0;
};

// Se permiten los CDN de D-03 (Bootstrap/Swiper/Font Awesome) para que el layout sea el
// real; YouTube queda bloqueado para que los iframes sean cajas oscuras deterministas.
const PERMITIDOS = /^https?:\/\/(localhost|cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com)/;
const soloCdn = (route) => (PERMITIDOS.test(route.request().url()) ? route.continue() : route.abort());

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
await ctx.route(/^https?:\/\//, soloCdn);
const page = await ctx.newPage();

// ---------- /multimedia/ ----------
await page.goto("http://localhost:8098/multimedia/", { waitUntil: "load" });

const bloques = await page.evaluate(() => {
  const razon = (el) => {
    const r = el.getBoundingClientRect();
    return r.height ? r.width / r.height : 0;
  };
  return [...document.querySelectorAll("[data-formato]")].map((b) => ({
    formato: b.getAttribute("data-formato"),
    wrappersHorizontales: b.querySelectorAll(".video-embed--horizontal").length,
    wrappersVerticales: b.querySelectorAll(".video-embed--vertical").length,
    razones: [...b.querySelectorAll(".video-embed__frame")].map(razon)
  }));
});

const hor = bloques.filter((b) => b.formato === "horizontal");
const ver = bloques.filter((b) => b.formato === "vertical");
check("multimedia: 1 contenedor data-formato=horizontal", hor.length === 1, `hay ${hor.length}`);
check("multimedia: 1 contenedor data-formato=vertical", ver.length === 1, `hay ${ver.length}`);

const APAISADO = 16 / 9, RETRATO = 9 / 16, TOL = 0.02;
for (const b of bloques) {
  const esperada = b.formato === "horizontal" ? APAISADO : RETRATO;
  const contrarios = b.formato === "horizontal" ? b.wrappersVerticales : b.wrappersHorizontales;
  const propios = b.formato === "horizontal" ? b.wrappersHorizontales : b.wrappersVerticales;
  check(`multimedia[${b.formato}]: sin wrappers del formato contrario`, contrarios === 0, `${contrarios} contrarios`);
  check(`multimedia[${b.formato}]: al menos un video propio`, propios > 0, `${propios} propios`);
  const desviadas = b.razones.filter((r) => Math.abs(r - esperada) > esperada * TOL);
  check(`multimedia[${b.formato}]: aspect-ratio renderizado uniforme (${b.formato === "horizontal" ? "16/9" : "9/16"})`,
    desviadas.length === 0, `razones=${b.razones.map((r) => r.toFixed(3)).join(",")}`);
}

// Filtro por playlist dentro de cada bloque; bloque sin resultados se oculta completo.
const playlists = await page.$$eval("[data-playlist-filtro]", (bs) =>
  bs.map((b) => b.getAttribute("data-playlist-filtro")));
for (const pl of playlists) {
  await page.click(`[data-playlist-filtro="${pl}"]`);
  const estado = await page.evaluate((val) => {
    return [...document.querySelectorAll("[data-formato]")].map((b) => {
      const visibles = [...b.querySelectorAll("[data-playlist]")].filter((c) => !c.hidden);
      return {
        formato: b.getAttribute("data-formato"),
        oculto: b.hidden,
        visibles: visibles.length,
        ajenas: visibles.filter((c) => val !== "todas" && c.getAttribute("data-playlist") !== val).length
      };
    });
  }, pl);
  for (const e of estado) {
    check(`filtro "${pl}" en bloque ${e.formato}: sin tarjetas de otra playlist`, e.ajenas === 0, `${e.ajenas} ajenas`);
    check(`filtro "${pl}" en bloque ${e.formato}: bloque vacío ⇒ oculto`,
      e.visibles > 0 ? !e.oculto : e.oculto, `visibles=${e.visibles}, oculto=${e.oculto}`);
  }
}
// Recarga para capturar el estado inicial limpio (sin scroll residual de los clics).
await page.goto("http://localhost:8098/multimedia/", { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(OUT, "ajuste02-multimedia-escritorio.png"), fullPage: true });

// ---------- Inicio (franja de videos) ----------
await page.goto("http://localhost:8098/", { waitUntil: "load" });
const franja = await page.evaluate(() => {
  const fila = document.querySelector('[data-formato="vertical"]');
  const seccion = fila ? fila.closest("section") : null;
  if (!seccion) return null;
  const razon = (el) => {
    const r = el.getBoundingClientRect();
    return r.height ? r.width / r.height : 0;
  };
  return {
    horizontales: seccion.querySelectorAll(".video-embed--horizontal").length,
    verticales: seccion.querySelectorAll(".video-embed--vertical").length,
    razones: [...seccion.querySelectorAll(".video-embed__frame")].map(razon),
    cardEnlace: !!seccion.querySelector('a.card-noticia__link[href$="/multimedia/"]')
  };
});
check("inicio: existe la franja de videos (data-formato=vertical)", !!franja);
if (franja) {
  check("inicio[franja]: 0 wrappers 16:9", franja.horizontales === 0, `${franja.horizontales} horizontales`);
  check("inicio[franja]: solo wrappers 9:16", franja.verticales > 0 &&
    franja.razones.every((r) => Math.abs(r - RETRATO) <= RETRATO * TOL),
    `razones=${franja.razones.map((r) => r.toFixed(3)).join(",")}`);
  check("inicio[franja]: card-enlace a /multimedia/ para el destacado horizontal", franja.cardEnlace);
}
const seccionFranja = page.locator('section:has([data-formato="vertical"])');
await seccionFranja.screenshot({ path: path.join(OUT, "ajuste02-franja-inicio-escritorio.png") });
await page.close();
await ctx.close();

// Capturas móviles (390px) de evidencia.
const ctxMovil = await browser.newContext({ viewport: { width: 390, height: 844 } });
await ctxMovil.route(/^https?:\/\//, soloCdn);
const pm = await ctxMovil.newPage();
await pm.goto("http://localhost:8098/multimedia/", { waitUntil: "load" });
await pm.screenshot({ path: path.join(OUT, "ajuste02-multimedia-movil.png"), fullPage: true });
await pm.goto("http://localhost:8098/", { waitUntil: "load" });
await pm.locator('section:has([data-formato="vertical"])').screenshot({ path: path.join(OUT, "ajuste02-franja-inicio-movil.png") });
await pm.close();
await ctxMovil.close();
await browser.close();
server.close();

const ok = checks.every((c) => c.pasa);
console.log(`\nRESULTADO: ${ok ? "PASS" : "FAIL"} (${checks.filter((c) => c.pasa).length}/${checks.length} verificaciones)`);
console.log("Capturas: qa/capturas/ajuste02-*.png");
process.exit(ok ? 0 : 1);
