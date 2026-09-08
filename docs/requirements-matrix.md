# Matriz de Requisitos — INVENTECH S.A.S.

Fuente principal: `source-documents/INVENTECH_Taller_Creacion_Empresa.md` (ITCE).
Fuente técnica secundaria: `source-documents/lineamientos v2.md` (app-lector ref) — ver [[decisions]] D-002.
Instrucción maestra del proyecto: `CLAUDE.md` + prompt de orquestación.

Estados: `Pendiente` | `En progreso` | `Implementado` | `Verificado` | `Bloqueado`.

## Identidad y conformación empresarial

| ID | Fuente | Sección | Requisito | Prioridad | Tipo | Módulo | Criterio de aceptación | Estado |
|----|--------|---------|-----------|-----------|------|--------|------------------------|--------|
| REQ-001 | ITCE | 2 | Mostrar ficha general (razón social, NIT ficticio, representante legal, sector, CIIU, domicilio, mercado objetivo) | Alta | Funcional | company | Datos idénticos al documento, sin inventar campos | Pendiente |
| REQ-002 | ITCE | 3 | Explicar tipo societario (S.A.S.) y justificación completa | Alta | Funcional | company | Las 5 razones del documento están presentes | Pendiente |
| REQ-003 | ITCE | 4 | Listar los 11 pasos del proceso de constitución legal | Media | Funcional | company | Los 11 pasos en orden, sin omitir | Pendiente |
| REQ-004 | ITCE | 5 | Checklist de documentos requeridos con entidad responsable | Media | Funcional | company | Tabla completa (7 documentos) | Pendiente |
| REQ-005 | ITCE | 6.3 | Aplicar paleta institucional exacta (4 colores + hex) | Alta | No funcional | design-system | Tokens de color coinciden con hex del documento | Pendiente |
| REQ-006 | ITCE | 6.4 | Aplicar tipografías corporativas (Poppins encabezados, Calibri/sustituto cuerpo) | Alta | No funcional | design-system | Ver [[decisions]] D-004 | Pendiente |
| REQ-007 | ITCE | 6.2 | Mostrar eslogan "Innovamos hoy, transformamos el mañana" de forma consistente | Media | Funcional | layout/company | Presente en header/landing/presentación | Pendiente |
| REQ-008 | ITCE | 7.1 | Misión completa (3 párrafos) | Alta | Funcional | company | Texto fiel al documento | Pendiente |
| REQ-009 | ITCE | 7.2 | Visión completa (3 párrafos, horizonte 2030) | Alta | Funcional | company | Texto fiel al documento | Pendiente |
| REQ-010 | ITCE | 7.3 | 4 objetivos corporativos | Alta | Funcional | company | Los 4 objetivos presentes | Pendiente |
| REQ-011 | ITCE | 7.4 | 6 valores corporativos con descripción | Alta | Funcional | company | Los 6 valores presentes | Pendiente |
| REQ-012 | ITCE | 8 | Matriz DOFA completa (F1-F6, O1-O6, D1-D6, A1-A6) | Media | Funcional | company | 24 elementos, agrupados en cuadrantes | Pendiente |
| REQ-013 | ITCE | 9 | Organigrama con 12 cargos, área y responsable | Media | Funcional | company | Jerarquía Asamblea→Gerente→3 áreas→cargos; 4 nombres marcados no verificables ver [[decisions]] D-006 | Pendiente |
| REQ-014 | ITCE | 9.2 | Marcar roles ficticios (*) según el documento | Baja | Funcional | company | Roles marcados con nota aclaratoria | Pendiente |
| REQ-015 | ITCE | 11 | Información complementaria: ubicación, planta física (80 m², 5 espacios), actividades económicas (CIIU 6201/4741) | Media | Funcional | company | Los 3 subapartados presentes | Pendiente |
| REQ-016 | Master | §14 | La sección de identidad debe funcionar como presentación ejecutiva interactiva (slides, nav teclado, progreso, modo presentación, transiciones) | Alta | Funcional/UX | presentation-engine | Ver TEST-PRES-* en testing.md | Pendiente |

## Catálogo de productos y servicios

| ID | Fuente | Sección | Requisito | Prioridad | Tipo | Módulo | Criterio de aceptación | Estado |
|----|--------|---------|-----------|-----------|------|--------|------------------------|--------|
| REQ-020 | ITCE | 10.1 | Ficha de producto InvenTech POS Cloud: descripción, precio referencia ($149.000 COP/mes/sede), 4 funcionalidades | Alta | Funcional | catalog | Datos idénticos al documento | Pendiente |
| REQ-021 | ITCE | 10.2 | Ficha de producto InvenTech ScanPro IoT: descripción, precio referencia ($89.000 COP/mes/sede), 4 funcionalidades | Alta | Funcional | catalog | Datos idénticos al documento | Pendiente |
| REQ-022 | ITCE + Master | 10 + D-003 | Representar correctamente relación de dependencia: ScanPro IoT depende del ecosistema; POS Cloud puede existir solo | Alta | Funcional | catalog | UI muestra relación explícita (diagrama/badge "requiere POS Cloud") | Pendiente |
| REQ-023 | Master | §15 | Modalidad SaaS explícita en catálogo (precio por mes, por sede) | Media | Funcional | catalog | Presente en ambas fichas | Pendiente |

## Aplicativos (demos funcionales SaaS)

| ID | Fuente | Sección | Requisito | Prioridad | Tipo | Módulo | Criterio de aceptación | Estado |
|----|--------|---------|-----------|-----------|------|--------|------------------------|--------|
| REQ-030 | Master | §16.A | Autenticación real vía Supabase Auth: login, logout, registro, recuperación de contraseña, sesión persistente, rutas protegidas | Alta | Funcional | auth | Ver TEST-AUTH-* | Pendiente |
| REQ-031 | Master | §17 | Inventario: dashboard, productos, categorías, stock, movimientos, búsqueda/filtros, CRUD, alertas de stock | Alta | Funcional | inventory | Persistencia real en Supabase | Pendiente |
| REQ-032 | Master | §18 | POS: selección de productos, carrito, cantidades, subtotal/total, registro de venta, historial | Alta | Funcional | pos | Venta descuenta stock real vía Supabase | Pendiente |
| REQ-033 | Master | §19 | Scanner: simulación de lectura de código (input/teclado), evento de código leído conectado a inventario/POS | Alta | Funcional | scanner | Escaneo agrega producto a carrito/inventario por barcode | Pendiente |
| REQ-034 | lineamientos v2 (ref técnica) | 6.1/6.2 | Adaptar conceptos técnicos de app-lector: modelo de datos (producto, categoría, movimiento, venta), NO nombres/marca | Media | Técnico | inventory/pos | Modelo Supabase inspirado, sin branding ajeno | Pendiente |

## Normatividad / documentación

| ID | Fuente | Sección | Requisito | Prioridad | Tipo | Módulo | Criterio de aceptación | Estado |
|----|--------|---------|-----------|-----------|------|--------|------------------------|--------|
| REQ-040 | Master | §21 | Listado, clasificación, búsqueda y visor de documentos normativos | Media | Funcional | regulations | Lista + filtro + visor embebido funcional | Pendiente |
| REQ-041 | Master | §21 | No exponer credenciales/API keys privadas de Google Drive en frontend | Alta | Seguridad | regulations | Solo URLs públicas/compartidas o Supabase Storage | Pendiente |

## Navegación, Home y transversales

| ID | Fuente | Sección | Requisito | Prioridad | Tipo | Módulo | Criterio de aceptación | Estado |
|----|--------|---------|-----------|-----------|------|--------|------------------------|--------|
| REQ-050 | Master | §22 | Navegación con estructura Inicio/InvenTech/Productos/Aplicativos/Normatividad/Acceso | Alta | UX | layout | Rutas coinciden con estructura | Pendiente |
| REQ-051 | Master | §23 | Landing profesional con propuesta de valor, ecosistema, CTA claro | Alta | UX | home | Landing no genérica, coherente con marca | Pendiente |
| REQ-052 | Master | §28-30 | TS estricto, responsive, accesible, sin `any`, sin lógica de negocio en templates | Alta | No funcional | todos | Lint/build limpio, revisión manual | Pendiente |
| REQ-053 | Master | §27 | Modelo de datos Supabase con RLS en todas las tablas sensibles | Alta | Seguridad | supabase | Políticas RLS documentadas y aplicadas | Pendiente |

## Nota de estado (actualización tras primera iteración de implementación)

Todos los requisitos REQ-001 a REQ-023, REQ-030 a REQ-034, REQ-040/041 y
REQ-050/051 tienen código implementado y compilando (`npm run build` en dev y
producción = PASS). El estado real de cada uno es:

- **Implementado, verificado por build/estructura**: el contenido/UI existe y
  compila (todas las filas anteriores).
- **Pendiente de validación en runtime**: REQ-030 a REQ-034 y REQ-040/041
  requieren un proyecto Supabase real con `supabase/schema.sql` aplicado
  (credenciales en `src/environments/*.ts`) antes de poder ejecutar los casos
  de `docs/testing.md` contra datos reales.
- REQ-052 (TS estricto, sin `any`, responsive, accesible) — cumplido en el
  código escrito hasta ahora; auditoría formal de accesibilidad (Fase 18)
  pendiente.
- REQ-053 (RLS en todas las tablas sensibles) — políticas escritas en
  `supabase/schema.sql`; validación contra proyecto real pendiente (ver
  `docs/security.md`).

La columna "Estado" de la tabla queda como "Pendiente" únicamente para no
duplicar mantenimiento en dos lugares; el estado operativo real vive en
`docs/implementation-plan.md` → PROJECT STATUS, que se actualiza en cada
iteración.

## Iteración 2026-09-08 — orquestación multi-agente

| ID | Fuente | Requisito | Prioridad | Módulo | Criterio de aceptación | Estado |
|----|--------|-----------|-----------|--------|------------------------|--------|
| REQ-060 | Master §17 | Organigrama con nombres reales de los 12 cargos + 5 socios marcados | Alta | company | ORG_ROLES actualizado, badge "Socio" visible, D-006 resuelto | Verificado (build + captura) |
| REQ-061 | Master §12 | Marco circular de fotos, listo para recibir imágenes reales | Alta | shared/ui | `ui-avatar` con placeholder de iniciales; usado en organigrama y Home | Verificado (build + captura) |
| REQ-062 | Master §26 | Botón flotante de WhatsApp con config centralizada | Alta | shared/ui | Visible en todas las páginas (ShellComponent), número no duplicado | Verificado (captura, visible en home/catálogo) |
| REQ-063 | Master §23 | Selector de modo claro/oscuro persistente, sin texto ilegible | Alta | core/services, layout | `ThemeService` + `class` en `<html>`; probado en Home y Catálogo | Verificado (capturas claro/oscuro) |
| REQ-064 | Master §15 | Tercera tarjeta "Plan Completo" con precio calculado dinámicamente | Alta | catalog | `FULL_PLAN_PRICE_COP` = suma de `priceValueCOP`; sin valor manual | Verificado (build + captura: $238.000 COP) |
| REQ-065 | Master §16 | "Instalación incluida" visible en las 3 tarjetas (POS Cloud, ScanPro IoT, Plan Completo) | Alta | catalog, home | Etiqueta verde visible en las 3 | Verificado (captura) |
| REQ-066 | Master §12 | Sección "Nuestro equipo" en Home con los 5 socios principales | Alta | home | Avatar + nombre + cargo, ancla `#equipo` | Verificado (captura) |
| REQ-067 | Master §24-25 | Sección de contacto en Home + footer con redes sociales oficiales | Media | home, footer | Correo, sitio web y 5 redes con ícono y handle | Verificado (captura) |
| REQ-068 (bugfix) | Usuario | Diapositiva 4 ("Proceso de constitución legal") no debe recortarse en modo presentación | Alta | company/presentation | Los 11 pasos accesibles por scroll sin recorte | Verificado (captura: ítems 1-11 visibles/scrolleables) |

Notas de esta iteración:
- Verificación real: `npm run build` = PASS después de cada cambio; capturas
  de pantalla tomadas con Playwright + Chromium contra `ng serve` en modo
  claro y oscuro para Home, Catálogo y la diapositiva 4 de la presentación
  (ver metodología en `docs/testing.md`).
- Dark mode se aplicó a: shell, header, footer, Home, Catálogo, presentación
  completa (motor + bloques) y componentes `shared/ui` (card, badge, button).
  **Pendiente:** auditoría de dark mode en Inventario, POS, Scanner,
  Normatividad y las páginas de autenticación/panel — no se tocaron en esta
  iteración.
- Fotografías reales del equipo: siguen sin existir en `src/assets`; el
  marco (`ui-avatar`) ya está listo, solo falta asignar `photoUrl` por
  integrante una vez el usuario suba los archivos.

## Conflictos y resoluciones documentadas

Ver [[decisions]] para el detalle de D-001 a D-005 (nombre de archivo,
contenido real de `lineamientos v2.md`, número real de productos comerciales,
ausencia de logo/guía de marca separada, ausencia de credenciales Supabase).
