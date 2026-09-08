# Arquitectura — INVENTECH S.A.S.

## Stack

- Angular 17 (standalone components, sin NgModules), TypeScript estricto.
- Tailwind CSS para estilos utilitarios sobre design tokens propios.
- Supabase: Auth, PostgreSQL, Row Level Security, Storage.
- Enrutamiento con lazy loading por feature (`loadComponent` / `loadChildren`).
- Sin backend propio: Supabase es el único backend. No se recrea el backend
  NestJS de la referencia app-lector (ver [[decisions]] D-002).

## Estructura de carpetas

```
src/app/
├── core/                     # servicios singleton, guards, interceptors, modelos transversales
│   ├── supabase/             # cliente Supabase, servicio de sesión
│   ├── auth/                 # AuthService, guards (authGuard, guestGuard)
│   ├── models/               # interfaces TS compartidas (Product, Sale, ...)
│   └── error/                # manejo centralizado de errores (interceptor + servicio de notificación)
├── shared/                   # UI reutilizable, sin lógica de negocio
│   └── ui/                   # button, card, badge, input, modal, table, alert, empty-state, loading
├── layout/                   # shell de la app: header, nav, footer, layout con router-outlet
├── features/
│   ├── home/                 # landing
│   ├── company/              # identidad + presentación interactiva
│   │   └── presentation/     # Presentation Engine reutilizable (slides, keyboard nav, progreso)
│   ├── catalog/               # catálogo de productos y servicios
│   ├── auth/                  # login, registro, recuperar contraseña
│   ├── inventory/              # dashboard, productos, categorías, movimientos
│   ├── pos/                    # punto de venta
│   ├── scanner/                 # simulación lector de código de barras
│   └── regulations/            # centro documental/normativo
└── app.routes.ts
```

## Contenido dinámico vs. presentación

Los datos empresariales (misión, visión, valores, DOFA, organigrama, slides de
presentación, catálogo) se modelan como datos TypeScript tipados en
`core/models` + `core/data` (constantes exportadas, fieles a los documentos
fuente), consumidos por componentes de presentación puramente declarativos.
Esto permite actualizar contenido sin tocar la plantilla visual, cumpliendo
§25 de la instrucción maestra.

Modelos principales: `CompanyProfile`, `PresentationSlide`, `Product`,
`ProductFeature`, `Value`, `Objective`, `OrgRole`, `SwotItem`.

## Presentation Engine

Componente standalone reutilizable (`features/company/presentation/`) que
recibe una lista tipada de `PresentationSlide[]` y expone:

- navegación siguiente/anterior (botones + flechas de teclado + `Home`/`End`);
- indicador de progreso (barra + "slide N de M");
- índice/tabla de contenido navegable;
- modo presentación (fullscreen API del navegador) con salida por `Esc`;
- transiciones CSS (fade/slide) respetando `prefers-reduced-motion`;
- responsive (grid de slides se adapta a columnas en mobile).

No depende de datos de InvenTech: es agnóstico al contenido, consume slides
tipadas.

## Supabase — modelo de datos (propuesta del Architect)

Tablas (esquema `public`, todas con RLS activo):

- `profiles` (id = auth.uid(), full_name, role, created_at)
- `categories` (id, name, description, created_by)
- `products` (id, name, sku, description, category_id, cost_price, sale_price,
  track_inventory, min_stock, created_by)
- `inventory_movements` (id, product_id, type[in|out|adjustment], quantity,
  stock_after, source, notes, created_by, created_at)
- `sales` (id, transaction_number, total, payment_method, created_by, created_at)
- `sale_items` (id, sale_id, product_id, quantity, unit_price, subtotal)
- `documents` (id, title, category, description, url, published_at)
- `document_categories` (id, name)
- `scanner_events` (id, barcode, source[manual|keyboard-scanner], resolved_product_id, created_by, created_at)

Reglas de seguridad (ver `docs/security.md` para detalle de políticas RLS):

- Todo usuario autenticado puede leer catálogo/documentos públicos.
- Solo el dueño (`created_by = auth.uid()`) o rol `admin` puede escribir en
  inventario/ventas propias en este prototipo SaaS de un solo tenant lógico
  por usuario autenticado (no hay multi-tenant real en el prototipo).
- El frontend nunca es la capa de autorización: toda regla se replica en
  políticas RLS de PostgreSQL.

## Variables de entorno

`src/environments/environment.ts` y `environment.development.ts` exponen
`supabaseUrl` y `supabaseAnonKey` (clave pública `anon`, segura de exponer con
RLS activo). Nunca se usa la `service_role key` en el frontend.

## Decisión: sin NgModules

Angular 17 + standalone components reduce boilerplate y es el estilo
recomendado por el framework en esta versión; coherente con "arquitectura
limpia y escalable" pedida por la instrucción maestra.
