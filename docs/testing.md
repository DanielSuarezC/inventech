# Testing — INVENTECH S.A.S.

## Estado actual

- `npm run build` (development y production) — **PASS**, sin errores de
  compilación ni de plantillas (Angular `strictTemplates: true`).
- `npm test` (Karma + Jasmine, ChromeHeadless) — **PASS** (2/2 specs:
  `AppComponent` crea correctamente y renderiza `app-shell`).
- Cobertura de unit tests más allá del smoke test de `AppComponent`: **pendiente**
  (ver Fase 16 en `implementation-plan.md`). Los servicios de Supabase
  (`ProductsService`, `SalesService`, `InventoryMovementsService`, `AuthService`)
  aún no tienen specs con mocks del cliente Supabase.

## Casos de prueba manuales/funcionales definidos (a ejecutar contra un
proyecto Supabase real una vez configuradas las credenciales)

### Autenticación

- **TEST-AUTH-001** — Login con credenciales válidas. Esperado: usuario
  autenticado, redirección a `/acceso/panel`.
- **TEST-AUTH-002** — Login con credenciales inválidas. Esperado: mensaje de
  error visible, sin acceso.
- **TEST-AUTH-003** — Usuario no autenticado intenta acceder a
  `/aplicativos/inventario`, `/pos` o `/scanner`. Esperado: redirección a
  `/acceso/login` (guard `authGuard`).
- **TEST-AUTH-004** — Usuario autenticado intenta acceder a `/acceso/login` o
  `/acceso/registro`. Esperado: redirección a `/acceso/panel` (guard
  `guestGuard`).
- **TEST-AUTH-005** — Registro con correo ya usado. Esperado: mensaje de error
  de Supabase Auth mostrado en la UI, sin cuenta duplicada.
- **TEST-AUTH-006** — Recuperar contraseña con correo existente. Esperado:
  mensaje de confirmación (sin revelar si el correo existe o no, delegado a
  Supabase).

### RLS / Seguridad de datos

- **TEST-RLS-001** — Usuario A crea un producto; Usuario B intenta leerlo vía
  API directa. Esperado: Supabase (RLS) bloquea el acceso (0 filas).
- **TEST-RLS-002** — Usuario A intenta actualizar un producto de Usuario B por
  ID conocido. Esperado: 0 filas afectadas por política RLS.
- **TEST-RLS-003** — Intento de insertar `sale_items` directamente desde el
  cliente (sin pasar por `create_sale`). Esperado: rechazado, no existe
  política de `insert` para `sale_items`.

### Inventario

- **TEST-INV-001** — Crear producto con `cost_price > sale_price` (siendo
  `sale_price > 0`). Esperado: rechazado por el `check constraint`
  `cost_not_greater_than_sale`.
- **TEST-INV-002** — Registrar movimiento de salida (`out`) mayor al stock
  disponible. Esperado: la función `register_inventory_movement` lanza
  excepción y no se modifica el stock.
- **TEST-INV-003** — Producto con `stock <= min_stock` muestra la insignia
  "Stock bajo" en la tabla de inventario.

### POS

- **TEST-POS-001** — Flujo completo: agregar 2 productos distintos al carrito,
  confirmar venta. Esperado: venta creada con `transaction_number`, stock de
  ambos productos descontado, carrito vaciado.
- **TEST-POS-002** — Intentar vender más unidades que el stock disponible.
  Esperado: la función `create_sale` revierte toda la transacción (ninguna
  línea se aplica) y se muestra el error.
- **TEST-POS-003** — Producto con `track_inventory = false` se puede vender sin
  límite de stock y sin generar movimiento de inventario.

### Scanner

- **TEST-SCN-001** — Escanear un SKU existente. Esperado: se muestra el
  producto encontrado y se registra un `scanner_event` con
  `resolved_product_id` no nulo.
- **TEST-SCN-002** — Escanear un código inexistente. Esperado: mensaje "no
  encontrado" y `scanner_event` con `resolved_product_id = null`.
- **TEST-SCN-003** — Desde un resultado de escaneo, registrar entrada de stock
  (+1) y confirmar que el inventario refleja el cambio.

### Presentación interactiva

- **TEST-PRES-001** — Navegar con flecha derecha/izquierda avanza/retrocede
  slides.
- **TEST-PRES-002** — `Home`/`End` saltan a la primera/última slide.
- **TEST-PRES-003** — Activar "Modo presentación" entra en fullscreen; `Esc`
  sale del modo presentación.
- **TEST-PRES-004** — El índice permite saltar a cualquier slide por clic.
- **TEST-PRES-005** — La vista "Documento completo" muestra toda la
  información de forma lineal, sin necesidad del modo presentación.

## Cómo ejecutar

```
npm install
npm run build            # build de verificación (dev)
npm run build -- --configuration production
npm test -- --watch=false --browsers=ChromeHeadless
```

Los casos TEST-AUTH-*, TEST-RLS-*, TEST-INV-*, TEST-POS-* y TEST-SCN-* requieren
un proyecto Supabase real con `supabase/schema.sql` aplicado y las credenciales
configuradas en `src/environments/environment.development.ts`.
