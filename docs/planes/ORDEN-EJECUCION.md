# ORDEN DE EJECUCIÓN — Sitio web institucional SEVIAH
### Acompaña al índice y al MAPA-PARALELIZACION · 2026-07-13

## 1. Orden canónico con UN agente (secuencia total recomendada)

| # | Ejecutar | Tipo | Por qué en esta posición |
|---|---|---|---|
| 1 | PLAN-S1 | espina / fundacional | siembra el repo, tokens de marca y CI; todo lo demás lo asume |
| 2 | PLAN-S2 | espina / contratos | congela layout, componentes y esquema videos.json; abre los frentes |
| 3 | PLAN-S3 | frente de dominio | camino crítico funcional: sin páginas no hay sitio revisable |
| 4 | PLAN-S4 | frente de dominio | videoteca sobre contratos ya congelados; no bloquea a S3 |
| 5 | PLAN-S5 | convergencia | transparencia legal + QA integral + despliegue; cierra el paquete |

## 2. Bifurcaciones con 2+ agentes
- **Al cerrar S2**: abrir **S3 (agente A)** y **S4 (agente B)** en paralelo. Con un solo
  agente: primero S3, porque es el camino crítico hacia la convergencia (S5 necesita ambos,
  pero S3 es el que produce el sitio revisable por RTBM).

Regla general: *ante duda o falta de agentes, seguir el orden canónico de §1 — nunca es
incorrecto, solo menos rápido.*

## 3. Condición de arranque de cada elemento

| Ejecutar | Puede arrancar cuando | Verificación (comando/lugar) |
|---|---|---|
| PLAN-S1 | inmediato (paquete copiado al repo) | `ls docs/planes/` muestra los planes |
| PLAN-S2 | S1 = COMPLETADO | `docs/planes/ESTADO.md` + gate de entrada del plan |
| PLAN-S3 | S2 = COMPLETADO | `docs/planes/ESTADO.md` + gate de entrada del plan |
| PLAN-S4 | S2 = COMPLETADO | `docs/planes/ESTADO.md` + gate de entrada del plan |
| PLAN-S5 | S3 y S4 = COMPLETADOS y fusionados | `docs/planes/ESTADO.md` + gate de entrada del plan |

## 4. Bloque legible por máquina (NO editar el formato)

```orden
S1
S2
S3
S4
S5
```

## 5. Registro de desviaciones
*(vacío — anotar aquí con fecha y razón cualquier ejecución fuera del orden canónico)*
