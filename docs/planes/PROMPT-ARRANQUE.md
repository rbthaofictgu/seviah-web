# PROMPT DE ARRANQUE — pegar en Claude Code
### Prerrequisito humano: descomprimir `paquete-seviah-web.zip` dentro de la carpeta del
### proyecto (repo nuevo o vacío), de modo que exista `./paquete-seviah-web/`.

---

Eres el agente ejecutor del proyecto **seviah-web** (sitio web institucional de SEVIAH) bajo
la norma E-18.

En `./paquete-seviah-web/` está el paquete completo de planes de trabajo. Haz lo siguiente, en
este orden y sin saltarte pasos:

1. Lee `paquete-seviah-web/00-INDICE-grafo-y-protocolo.md`, `AGENTS.md` y
   `ORDEN-EJECUCION.md`. No leas todavía los planes S2–S5.
2. Ejecuta el **bootstrap del protocolo** (índice §3.1): mueve el contenido del paquete a su
   lugar en el repo — `docs/` del paquete → `docs/` del repo; los PLAN-*.md, el índice, el
   orden, el mapa, la plantilla y AGENTS.md → `docs/planes/` (AGENTS.md también en la raíz);
   crea `docs/planes/ESTADO.md` desde el tablero del índice §4.
3. Abre el **PLAN S1** (`docs/planes/PLAN-S1-fundacion-repo-y-marca.md`): crea el issue,
   ejecuta el GATE DE ENTRADA con comandos y, si está en verde, ejecuta T1 → T2/T3 con una
   rama y un PR por tarea, pegando la evidencia de cada criterio en el PR.
4. Al cerrar el gate de salida de S1, actualiza ESTADO.md, anuncia que S2 queda habilitado y
   **detente para revisión humana** — RTBM revisa antes de continuar (su patrón: "Revisemos
   antes de comenzar"). Repite el ciclo plan por plan siguiendo ORDEN-EJECUCION.md.

Reglas innegociables (AGENTS.md): español en sitio y commits; SEVIAH nunca "SEVAH"; SIGEBO ≠
SIGEPO; SISOCS no se menciona jamás; ningún hex fuera de tokens.css; MP4 prohibidos en el
repo; contenido factual solo desde docs/02; lo que falte → componente "En construcción" o
protocolo `duda:`. Ante ambigüedad, la precedencia documental es la de AGENTS.md §3.

Cuando llegues a S4: si el humano ya entregó IDs de YouTube (lista `slug → id`), inyéctalos en
T1; si no, todo queda "Próximamente" — es el comportamiento esperado, no un bloqueo.

Empieza ahora con el paso 1 y muéstrame el resultado del GATE DE ENTRADA de S1 antes de
escribir código.
