# PLANTILLA — Plan de trabajo por scope (norma E-18 generalizada)
> Todo plan generado DEBE seguir esta anatomía exacta. Sustituir <marcadores>.

---

```yaml
plan: S<n>
nombre: <slug-del-scope>
depende_de: [<S...>]      # vacío solo para el plan fundacional
paralelo_con: [<S...>]    # DERIVADO del MAPA-PARALELIZACION (simétrico) — nunca inventado aquí
tareas: <3-7>
estado: NO_INICIADO       # NO_INICIADO | EN_CURSO | COMPLETADO
```

# PLAN S<n> — <nombre>
> Prompt ejecutable por agente (Claude Code / Codex). Norma E-18. <Nota de posición en el grafo:
> espina / paralelo con Sx según MAPA-PARALELIZACION / convergencia>.

## GATE DE ENTRADA
- [ ] <verificación con comando: issues de prerequisitos cerrados, ESTADO.md, build reproducible...>
- [ ] <insumo presente: fixtures, DDL, credenciales o su alternativa documentada>

Si algo falla: **reporta y detente**. (Los insumos "no bloqueantes" se listan aparte con su
comportamiento por defecto si faltan.)

## Objetivo del scope
<1 párrafo: qué existe al terminar que antes no existía.>

## Contexto y fuentes
<PUNTEROS a docs/ con sección exacta y a decisiones (D-nn/E-nn) que este plan implementa.
Nunca volcar contenido de los documentos.>

## Reglas del plan
- Directorios propios: <lista exacta — es lo que habilita la paralelización segura>.
- Prohibido: <qué NO tocar; decisiones que no se pueden "mejorar"; alcance excluido>.

## Tareas

### T1 — <título imperativo>
**Prerequisito interno:** <Tn | ninguno>
**Alcance:** <qué entra y qué NO entra, explícito>
**Contexto:** <punteros específicos>
**Entradas:** <artefactos que consume> · **Salidas:** <artefactos que produce, rutas exactas>
**Criterios de aceptación (todos en verde):**
- [ ] `<comando exacto>` → <resultado observable esperado>
- [ ] `<comando exacto>` → <resultado observable esperado>
**Commit/PR:** rama `s<n>/tarea-1-<slug>`, commits convencionales, 1 PR por tarea.

<... T2–T7 igual, en orden topológico interno; marcar "paralelizable con Tx" solo si el
MAPA-PARALELIZACION §5 lo respalda ...>

## GATE DE SALIDA (declara S<n> = COMPLETADO)
- [ ] <verificación integral reproducible desde clon limpio, con comandos>
- [ ] Suite del plan verde en CI; evidencias pegadas en los PRs.
- [ ] `ESTADO.md` actualizado; issue cerrado con evidencia. <Anunciar qué planes quedan habilitados.>

## Protocolo GitHub
Issue `[PLAN S<n>] <nombre>` etiqueta `plan:s<n>`; checklist = tareas; una rama/PR por tarea;
cierre solo con gate de salida en verde.
