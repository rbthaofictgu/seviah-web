```yaml
plan: S1
nombre: fundacion-repo-y-marca
depende_de: []
paralelo_con: []
tareas: 3
estado: NO_INICIADO
```

# PLAN S1 — Fundación del repo y marca
> Prompt ejecutable por agente (Claude Code). Norma E-18. Plan fundacional de la espina:
> nada existe antes; todo lo demás lo asume.

## GATE DE ENTRADA
- [ ] `node --version` → v20+ disponible; `git --version` responde.
- [ ] El paquete E-18 está en el repo destino: `ls docs/planes/` muestra los PLAN-S*.md, y
      `ls docs/` muestra 01-ADR, 02-mapa, 03-identidad, 04-inventario y `Logo_Gobierno.png`.
- [ ] Insumo NO bloqueante: logo vectorial propio de SEVIAH — si no existe, aplicar la
      alternativa tipográfica de docs/03 §2 sin preguntar.

Si algo bloqueante falla: **reporta y detente.**

## Objetivo del scope
Al terminar existe un repositorio Eleventy 3 que construye en verde, con la estructura de
directorios de AGENTS.md §2, los tokens de marca de SEVIAH aplicables, los activos gráficos
base y CI mínima — el terreno sobre el que S2 monta layout y componentes.

## Contexto y fuentes
Implementa **D-02, D-03, D-09, D-10** (docs/01). Identidad: docs/03 §1-§2. Estructura:
AGENTS.md §2. No consume contenido de docs/02 (eso es S3).

## Reglas del plan
- Directorios propios: raíz del repo (package.json, .eleventy.js, .gitignore, README.md),
  `src/assets/`, `docs/planes/ESTADO.md`, `.github/workflows/`.
- Prohibido: crear páginas o layouts (territorio S2/S3); añadir dependencias fuera de
  `@11ty/eleventy` y devtools de validación; hex fuera de tokens.css.

## Tareas

### T1 — Inicializar repo Eleventy con estructura y tablero
**Prerequisito interno:** ninguno
**Alcance:** `git init` (si aplica), `package.json` con Eleventy 3, `.eleventy.js` (input
`src`, output `_site`, passthrough de `src/assets`), `.gitignore` (`node_modules`, `_site`),
árbol de directorios de AGENTS.md §2 con `.gitkeep`, `docs/planes/ESTADO.md` copiado del
tablero del índice, y una `src/index.njk` provisional mínima ("SEVIAH — sitio en construcción")
solo para probar el build. NO entra: layout real, tokens.
**Contexto:** D-09; AGENTS.md §2 y §6.
**Entradas:** paquete E-18 en docs/ · **Salidas:** repo construible; `_site/index.html`.
**Criterios de aceptación (todos en verde):**
- [ ] `npm install && npx @11ty/eleventy` → build sin errores y `test -f _site/index.html` → existe.
- [ ] `git log --oneline | head -1` → commit inicial convencional presente.
- [ ] `cat docs/planes/ESTADO.md` → tabla con S1..S5 y S1=EN_CURSO.
**Commit/PR:** rama `s1/tarea-1-bootstrap`, commits convencionales, 1 PR.

### T2 — Tokens de marca y activos gráficos base
**Prerequisito interno:** T1
**Alcance:** `src/assets/css/tokens.css` exactamente con los tokens de docs/03 §1;
optimización e incorporación de `docs/Logo_Gobierno.png` a `src/assets/img/` (más favicon
derivado); lockup tipográfico SEVIAH (docs/03 §2 alternativa) como parcial SVG o HTML/CSS en
`src/assets/img/`; `src/assets/css/main.css` vacío salvo import de tokens. NO entra: estilos
de componentes (S2).
**Contexto:** D-02; docs/03 §1-§2.
**Entradas:** docs/Logo_Gobierno.png · **Salidas:** tokens.css, img/ con logo+favicon, main.css.
**Criterios de aceptación (todos en verde):**
- [ ] `grep -c -- "--sev-dorado: #AD8411" src/assets/css/tokens.css` → 1 (y navy/oscuro presentes).
- [ ] `grep -rEn "#[0-9a-fA-F]{3,8}\b" src/assets/css --include="*.css" | grep -v tokens.css | wc -l` → 0.
- [ ] `test -f src/assets/img/logo-gobierno.png && test -f src/assets/img/favicon.png` → ambos existen y `npx @11ty/eleventy` los copia a `_site/assets/img/`.
**Commit/PR:** rama `s1/tarea-2-tokens-y-activos`.

### T3 — CI mínima y README
**Prerequisito interno:** T1 (paralelizable con T2 — MAPA §5)
**Alcance:** workflow `.github/workflows/build.yml` que en push/PR ejecuta `npm ci` + build +
`html-validate` sobre `_site`; README.md con: qué es el repo, comandos canónicos (AGENTS.md §6)
y puntero al paquete E-18. NO entra: despliegue a Pages (S5).
**Contexto:** D-10; AGENTS.md §6.
**Entradas:** repo de T1 · **Salidas:** build.yml, README.md.
**Criterios de aceptación (todos en verde):**
- [ ] `npx html-validate "_site/**/*.html"` local → 0 errores.
- [ ] PR de prueba muestra el workflow en verde (evidencia: captura/URL del run en el PR).
- [ ] Ruptura deliberada en rama descartable (HTML inválido) → run en rojo (evidencia en PR).
**Commit/PR:** rama `s1/tarea-3-ci-readme`.

## GATE DE SALIDA (declara S1 = COMPLETADO)
- [ ] Clon limpio en carpeta temporal: `git clone . /tmp/s1 && cd /tmp/s1 && npm ci && npx @11ty/eleventy` → verde.
- [ ] CI verde en main; evidencias en los 3 PRs.
- [ ] `docs/planes/ESTADO.md` → S1=COMPLETADO. Anunciar: **queda habilitado S2**.

## Protocolo GitHub
Issue `[PLAN S1] fundacion-repo-y-marca` etiqueta `plan:s1`; checklist = T1-T3; una rama/PR por
tarea; cierre solo con gate de salida en verde.
