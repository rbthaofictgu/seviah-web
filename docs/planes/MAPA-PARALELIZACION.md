# MAPA DE PARALELIZACIÓN — Sitio web institucional SEVIAH
### Generado por planificador-e18 · 2026-07-13 · acompaña al índice v01

## 1. Veredicto ejecutivo
**Paralelización parcial.** El único par viable es **S3 ∥ S4** (ambos dependen solo de S2,
territorios disjuntos, contratos congelados por S2). El resto del grafo es una cadena
(S1 → S2 → … → S5). Máximo útil: **2 agentes**, y solo durante la ola 1. Con un solo agente el
proyecto sigue siendo perfectamente ejecutable en el orden canónico (ORDEN-EJECUCION §1).

## 2. Olas de ejecución

| Ola | Planes simultáneos | Agentes máx. | Se abre cuando | Notas |
|---|---|---|---|---|
| 0 | S1 → S2 (secuencial) | 1 | inmediato | espina obligatoria; S2 congela los contratos |
| 1 | S3 ∥ S4 | 2 | GATE de salida S2 en verde | único paralelismo del proyecto |
| 2 | S5 | 1 | S3 y S4 COMPLETADOS y fusionados | convergencia y cierre |

```
S1 ──► S2 ──┬──► S3 ──┐
            │         ├──► S5
            └──► S4 ──┘
   (ola 0)    (ola 1)   (ola 2)
```

## 3. Matriz de viabilidad por par (solo pares relevantes)

| Par | ¿Grafo lo permite? | ¿Directorios disjuntos? | ¿Contratos compartidos estables? | Veredicto | Condiciones |
|---|---|---|---|---|---|
| S3 ∥ S4 | Sí (ambos dependen solo de S2) | Sí: S3 = páginas + contenido/noticias.json (solo LEE videos.json); S4 = multimedia/ + videos.json + scripts/ | Sí: layout, parciales y esquema videos.json congelados en el gate de salida de S2 | ✅ VIABLE | S3 nunca escribe videos.json; S4 nunca toca páginas ni parciales |
| S2 ∥ S3/S4 | No (dependen de S2) | — | — | ❌ NO | precedencia |
| S5 ∥ cualquiera | No (depende de S3 y S4) | — | — | ❌ NO | convergencia |

**Criterios de viabilidad (los tres se cumplen para S3 ∥ S4):**
1. Grafo: ninguno depende del otro, directa ni transitivamente.
2. Territorio: intersección de directorios propios = ∅ (videos.json es escritura exclusiva
   de S4; S3 solo lo consume en lectura).
3. Contratos: layout base, parciales de componentes y esquema videos.json quedan congelados
   por S2 (plan ya COMPLETADO al abrirse la ola 1).

## 4. Archivos compartidos inevitables y su protocolo

| Archivo | Quiénes lo tocan | Protocolo de conflicto |
|---|---|---|
| `docs/planes/ESTADO.md` | todos al abrir/cerrar | rebase trivial; gana el merge más reciente |
| `README.md` | S1 (crea), S4-T3 (sección "Activar videos") | S4 añade sección al final; nunca reescribe |
| `src/assets/css/main.css` | S2 (crea y cierra) | S3/S4 NO lo tocan; estilos de página van en la propia página o se reporta `duda:` |

## 5. Paralelización DENTRO de cada plan (nivel tarea)

| Plan | Tareas paralelizables | Condición |
|---|---|---|
| S1 | T3 ∥ T2 | ambas dependen solo de T1; CI no toca assets |
| S2 | secuencial (T1→T2→T3) | cada tarea consume la anterior |
| S3 | T1 ∥ T2 ∥ T3 | independientes entre sí (T1 usa stub de noticias.json que T3 completa); T4 exige las tres |
| S4 | secuencial (T1→T2→T3) | cadena sobre videos.json |
| S5 | secuencial (T1→T2→T3) | QA exige transparencia; deploy exige QA |

## 6. Recomendación operativa
- **Agentes recomendados: 1** (RTBM revisa cada PR antes de aprobar — su patrón declarado es
  revisar antes de ejecutar; 2 agentes solo si hay capacidad real de revisar dos PRs en
  paralelo durante la ola 1).
- Con 1 agente en la ola 1: primero **S3** (camino crítico funcional — sin páginas no hay
  sitio que enseñar), luego S4.
- Señales para degradar a secuencial: conflictos de merge en main durante la ola 1, o
  reapertura del contrato videos.json (eso exige enmienda E-18, no un parche).

## 7. Sincronización con los planes
S3 declara `paralelo_con: [S4]` y S4 declara `paralelo_con: [S3]` (simétrico ✔). Ningún otro
plan declara paralelismo ✔. Verificado por `validar_planes.py`.
