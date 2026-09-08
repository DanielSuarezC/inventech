# Seguridad — INVENTECH S.A.S.

Principio rector: **el frontend nunca es la capa de autorización**. Toda regla
de acceso relevante está respaldada por Row Level Security (RLS) en
PostgreSQL, no solo por guards de Angular.

## Autenticación

- Supabase Auth gestiona registro, login, logout, recuperación y actualización
  de contraseña (`core/auth/auth.service.ts`).
- `authGuard` y `guestGuard` (`core/auth/auth.guard.ts`) protegen rutas en el
  cliente **como mejora de UX**, no como control de seguridad real: la
  protección real está en las políticas RLS de cada tabla.
- Las contraseñas nunca se almacenan ni se procesan fuera de Supabase Auth.

## Secretos y variables de entorno

- `src/environments/*.ts` solo contienen `supabaseUrl` y `supabaseAnonKey`
  (clave pública `anon`). Nunca se incluye la `service_role key` en el
  frontend — esa clave, de usarse en el futuro para tareas administrativas,
  debe vivir únicamente en un entorno de servidor controlado, nunca en el
  bundle de Angular.
- La clave `anon` es segura de exponer en el navegador **siempre y cuando**
  existan políticas RLS correctas en todas las tablas (ver
  `supabase/schema.sql`); sin RLS, la clave anon otorgaría acceso de lectura o
  escritura sin restricciones.

## Row Level Security (resumen — detalle en `supabase/schema.sql`)

| Tabla | Política |
|-------|----------|
| `profiles` | El usuario solo lee/edita su propio perfil (`auth.uid() = id`). |
| `categories`, `products`, `inventory_movements`, `sales`, `scanner_events` | El usuario solo puede leer/escribir sus propios registros (`auth.uid() = created_by`). Este prototipo es de un solo tenant lógico por usuario, no multi-empresa. |
| `sale_items` | Solo `select`, condicionado a que la venta padre pertenezca al usuario. No existe política de `insert`/`update`/`delete` desde el cliente: los ítems solo se crean dentro de la función `create_sale` (`security definer`), evitando que un cliente inserte ítems de venta arbitrarios o manipule totales. |
| `documents`, `document_categories` | Lectura abierta a cualquier usuario autenticado (`auth.role() = 'authenticated'`). Sin política de escritura desde el cliente: se administran desde el panel de Supabase. |

## Operaciones críticas como funciones `security definer`

`register_inventory_movement` y `create_sale` se implementan como funciones
PL/pgSQL para:

1. Garantizar **atomicidad** (lectura y escritura de stock en una sola
   transacción con `for update`, evitando condiciones de carrera).
2. Evitar que el cliente pueda calcular o falsificar `stock_after` o `total`
   directamente — esos valores siempre se calculan en el servidor.
3. Revertir toda la operación si alguna validación falla (stock insuficiente,
   producto no encontrado, producto de otro usuario).

## Superficie de XSS / contenido dinámico

- El visor de documentos normativos (`RegulationsComponent`) usa
  `DomSanitizer.bypassSecurityTrustResourceUrl` para incrustar la URL del
  documento en un `<iframe>`. Esto es seguro en este diseño porque **las URLs
  provienen exclusivamente de la tabla `documents`, cuya escritura está
  restringida a administradores desde el panel de Supabase** — nunca de un
  formulario expuesto a usuarios finales. Si en el futuro se habilita edición
  de documentos desde la UI, esa entrada deberá validarse (lista blanca de
  dominios) antes de sanitizarse.
- No se usa `innerHTML` ni `bypassSecurityTrustHtml` en ningún componente.

## Normatividad / Google Drive (ver también `docs/decisions.md`)

- No se integra la API de Google Drive con credenciales de service account en
  el frontend. El campo `documents.url` almacena enlaces públicos/compartidos
  ya generados fuera de la aplicación (o URLs de Supabase Storage).
- Si en el futuro se requiere integración directa con la API de Drive, esa
  lógica debe vivir en una función de servidor (Supabase Edge Function) que
  guarde la service account key como secreto de servidor, nunca en el bundle
  de Angular.

## Pendiente de revisión (Fase 15 del plan de implementación)

- Rate limiting / protección contra fuerza bruta en login: delegado a
  Supabase Auth por defecto; no se ha configurado un límite adicional.
- Revisión de políticas RLS con pruebas automatizadas (`TEST-RLS-*` en
  `docs/testing.md`) contra un proyecto Supabase real: pendiente de ejecutar.
- Content Security Policy del `index.html`: no configurada aún; recomendado
  antes de producción real.
