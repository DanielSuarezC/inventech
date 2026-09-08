# INVENTECH S.A.S. — Plataforma web

Sitio corporativo, presentación empresarial interactiva, catálogo de
productos y plataforma SaaS sintética (inventario, punto de venta y lector de
códigos de barras) de INVENTECH S.A.S.

Empresa ficticia desarrollada con fines académicos (Taller de Creación de
Empresa — SENA). Stack: Angular 17 (standalone components), TypeScript
estricto, Tailwind CSS y Supabase (Auth, PostgreSQL, RLS).

## Documentación del proyecto

- [`docs/requirements-matrix.md`](docs/requirements-matrix.md) — trazabilidad requisito → implementación.
- [`docs/architecture.md`](docs/architecture.md) — arquitectura técnica y modelo de datos.
- [`docs/design-system.md`](docs/design-system.md) — tokens de marca y componentes UI.
- [`docs/implementation-plan.md`](docs/implementation-plan.md) — fases y estado del proyecto.
- [`docs/decisions.md`](docs/decisions.md) — conflictos entre documentos fuente y cómo se resolvieron.
- [`docs/security.md`](docs/security.md) — modelo de seguridad y RLS.
- [`docs/testing.md`](docs/testing.md) — casos de prueba y estado de la suite.

## Requisitos

- Node.js 18+ (probado con Node 24; ver advertencia de compatibilidad del CLI).
- Una cuenta y proyecto en [Supabase](https://supabase.com) (gratis) para
  Auth/Inventario/POS/Scanner/Normatividad.

## Puesta en marcha

```bash
npm install
```

### 1. Configurar Supabase

1. Crea un proyecto en Supabase.
2. En el **SQL Editor**, ejecuta el contenido completo de
   [`supabase/schema.sql`](supabase/schema.sql) (tablas, RLS y funciones RPC).
3. Copia la **Project URL** y la **anon public key** desde
   *Project Settings → API*.
4. Pégalas en `src/environments/environment.development.ts` (desarrollo) y
   `src/environments/environment.ts` (producción):

```ts
export const environment = {
  production: false,
  supabaseUrl: 'https://TU-PROYECTO.supabase.co',
  supabaseAnonKey: 'TU-ANON-KEY',
};
```

> La `anon key` es segura de exponer en el frontend porque todas las tablas
> tienen Row Level Security activo (ver `docs/security.md`). **Nunca** uses la
> `service_role key` en el frontend.

### 2. Ejecutar en desarrollo

```bash
npm start
```

Navega a `http://localhost:4200/`.

### 3. Build de producción

```bash
npm run build
```

Los artefactos quedan en `dist/inventech`.

### 4. Pruebas

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## Estructura del proyecto

Ver [`docs/architecture.md`](docs/architecture.md) para el detalle completo de
`src/app/core`, `src/app/shared`, `src/app/layout` y `src/app/features`.

## Alcance del prototipo

Este es un prototipo académico/SaaS sintético de un solo tenant lógico por
usuario autenticado (cada usuario ve únicamente su propio inventario y sus
propias ventas), no un sistema multi-empresa real. Ver
[`docs/decisions.md`](docs/decisions.md) para las decisiones e interpretaciones
tomadas cuando los documentos fuente requerían aclaración.
