# Configuración de Supabase para InvenTech

## Problema

Cuando un usuario nuevo llega a `/normatividad`, no ve documentos porque la tabla de documentos no existe o está vacía en la base de datos.

## Solución

### Paso 1: Acceder al SQL Editor de Supabase

1. Ve a [supabase.com](https://supabase.com) y entra a tu proyecto
2. En el menú izquierdo, busca **SQL Editor**
3. Click en **New Query**

### Paso 2: Ejecutar el script de configuración

1. Copia todo el contenido del archivo `supabase-setup.sql`
2. Pégalo en el SQL Editor
3. Click en el botón **Run** (o presiona `Ctrl + Enter`)

Esto:
- ✅ Crea la tabla `documents`
- ✅ Crea la tabla `document_categories`
- ✅ Agrega 5 documentos de ejemplo (publicados)
- ✅ Configura Row Level Security (RLS)
- ✅ Permite que cualquiera vea documentos publicados
- ✅ Permite que solo admins editen documentos

### Paso 3: Verificar que funcionó

1. Ve a la página `/normatividad` en tu aplicación
2. Deberías ver 5 documentos de ejemplo en una vista de grid
3. Haz click en "Abrir documento" para verificar que los links funcionan

## Notas importantes

- **Los links de ejemplo en `supabase-setup.sql` son ficticios** (`1example`, `2example`, etc.)
- Debes **reemplazarlos con links reales** a tus documentos en Google Drive o Supabase Storage
- Solo se muestran documentos con `status = 'publicado'`
- Los documentos se mostrarán en orden más recientes primero

## Cómo agregar más documentos

### Opción 1: Desde la aplicación (si estás logueado como admin)

1. Ve a `/acceso/panel/documentos`
2. Completa el formulario "Nuevo documento"
3. Asegúrate de cambiar el estado a "Publicado"
4. Click en "Crear"

### Opción 2: Directamente en Supabase

1. Ve a **Table Editor** → `documents`
2. Click en **Insert row**
3. Completa los campos
4. Asegúrate de que `status = 'publicado'`

## Estructura de datos

### documents

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| title | TEXT | Título del documento |
| category | TEXT | Categoría (ej: "Políticas") |
| description | TEXT | Descripción breve |
| url | TEXT | Link al documento (Google Drive, etc) |
| document_type | TEXT | Tipo (PDF, Word, etc) |
| version | TEXT | Versión del documento |
| author | TEXT | Autor/Responsable |
| status | TEXT | 'borrador', 'publicado', 'archivado' |
| tags | TEXT[] | Array de etiquetas para búsqueda |
| published_at | TIMESTAMP | Fecha de publicación |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de última actualización |

### document_categories

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único |
| name | TEXT | Nombre de la categoría |
| created_at | TIMESTAMP | Fecha de creación |

## Seguridad

- ✅ Solo documentos "publicados" son visibles para usuarios anónimos
- ✅ Las políticas RLS previenen que usuarios sin permiso editen documentos
- ✅ Solo admins pueden crear/editar/eliminar documentos

## Solucionar problemas

### "Permission denied" error

Asegúrate de que:
1. Tu usuario es admin
2. El RLS está configurado correctamente
3. Ejecutaste el script completo sin errores

### No se ven documentos

Verifica:
1. Que los documentos tienen `status = 'publicado'`
2. Que existen en la tabla `documents`
3. La conexión de Supabase está funcionando

### Los links no funcionan

Los links de ejemplo son ficticios. Debes reemplazarlos con:
- Links reales de Google Drive (con acceso público)
- URLs de Supabase Storage
- Cualquier servidor donde alojes los PDFs
