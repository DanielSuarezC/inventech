# Plan de Implementación — INVENTECH S.A.S.

Ciclo por fase: IMPLEMENT → REVIEW → TEST → DEBUG → REVIEW → TEST → APPROVE.
No se avanza de fase con bloqueos críticos abiertos.

## PROJECT STATUS (vivo — actualizar en cada iteración)

```
Phase: 11 — Inventario (implementado, pendiente de probar contra Supabase real)
Completed:
  Fase 1  — Análisis documental (requirements-matrix.md, decisions.md)
  Fase 2  — Arquitectura (architecture.md, estructura de carpetas)
  Fase 3  — Design system (Tailwind + tokens de marca + tipografía)
  Fase 4  — Layout / navegación (header, footer, shell, rutas raíz)
  Fase 5  — Home (landing con propuesta de valor y CTA)
  Fase 6  — Identidad empresarial (todas las subsecciones de ITCE §2-9,11)
  Fase 7  — Presentación interactiva (Presentation Engine + 14 slides)
  Fase 8  — Catálogo (POS Cloud + ScanPro IoT, con relación de dependencia)
  Fase 9  — Supabase (cliente, environment, esquema SQL completo con RLS y RPCs)
  Fase 10 — Autenticación (login, registro, recuperar/restablecer, guards, panel)
  Fase 11 — Inventario (CRUD completo sobre Supabase, con función RPC atómica)
  Fase 12 — POS (carrito + venta real vía RPC create_sale)
  Fase 13 — Scanner (input de teclado + búsqueda por SKU + conexión a inventario/POS)
  Fase 14 — Normatividad (listado + filtro + visor embebido, datos desde Supabase)
Pending:
  Fase 15 — Seguridad (auditoría manual hecha en security.md; falta probar RLS contra proyecto real)
  Fase 16 — Testing (solo smoke test de AppComponent; faltan specs de servicios/componentes)
  Fases 17-20 — Auditorías finales, correcciones, build final
Blocked: Ninguno. Requiere que el usuario cree un proyecto Supabase real y
  pegue sus credenciales en src/environments/*.ts, y ejecute supabase/schema.sql,
  para que Auth/Inventario/POS/Scanner/Normatividad funcionen con datos reales
  (hoy compilan y renderizan correctamente pero las llamadas a Supabase
  fallarán hasta configurar credenciales válidas).
Reviewer: Auto-revisión aplicada durante la construcción (ver docs/decisions.md
  D-001 a D-006); revisión externa/formal aún no ejecutada.
Tester: npm run build (dev y prod) = PASS. npm test (Karma/ChromeHeadless) = PASS (2/2).
  Casos funcionales de docs/testing.md aún no ejecutados contra Supabase real.
Designer: Tokens de marca aplicados en todos los componentes construidos
  (colores, tipografía, componentes shared/ui); auditoría visual formal (Fase 18) pendiente.
Security: Ver docs/security.md — RLS y funciones RPC diseñadas e implementadas
  en supabase/schema.sql; validación contra proyecto real pendiente.
```

## Fases

1. **Análisis documental** — Completado. Ver `requirements-matrix.md`, `decisions.md`.
2. **Arquitectura** — Completado. Ver `architecture.md`.
3. **Design System** — Tokens Tailwind + tipografía + wordmark. En progreso.
4. **Layout / navegación** — Header, footer, nav responsive, rutas raíz lazy.
5. **Home** — Landing con propuesta de valor y CTA.
6. **Identidad empresarial** — Todas las subsecciones de ITCE §2-9,11.
7. **Presentación interactiva** — Presentation Engine + slides de la identidad.
8. **Catálogo** — POS Cloud + ScanPro IoT (ver D-003).
9. **Supabase** — Cliente, environment, esquema SQL, RLS, seed.
10. **Autenticación** — Login/registro/recuperación/guards/sesión.
11. **Inventario** — CRUD real sobre Supabase.
12. **POS** — Carrito + venta real, descuenta stock.
13. **Scanner** — Input simulado de código de barras conectado a POS/inventario.
14. **Normatividad** — Listado + visor documental.
15. **Seguridad** — Revisión RLS, secretos, XSS, rutas.
16. **Testing** — Unit + integración (ver `testing.md`).
17. **Auditoría documental** — Comparación documento vs. implementación.
18. **Auditoría visual** — Revisión de marca en todas las vistas.
19. **Correcciones** — Resultado de auditorías 17-18.
20. **Build final** — `npm install && npm run build` limpio + reporte final.

## Nota de alcance

Este es un prototipo académico/SaaS sintético de un solo tenant lógico por
usuario autenticado (no multi-empresa real), consistente con el carácter
"ficticio" de INVENTECH S.A.S. declarado en el documento fuente.
