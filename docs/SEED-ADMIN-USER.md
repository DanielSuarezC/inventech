# Seed del Usuario Admin para Normatividad (Documentos)

## Pasos manuales en el Dashboard de Supabase

No se requiere instalar herramientas CLI ni usar `service_role` key. Todo se ejecuta directamente en el Dashboard.

### Paso 1: Ejecutar el SQL en el SQL Editor

Ve a tu proyecto Supabase → **SQL Editor** → **New query** y pega el siguiente SQL:

```sql
-- Extender tabla documents con metadatos
alter table public.documents
  add column if not exists document_type text,
  add column if not exists version text,
  add column if not exists author text,
  add column if not exists status text not null default 'publicado'
    check (status in ('borrador', 'publicado', 'archivado')),
  add column if not exists tags text[] not null default '{}';

-- Policies de escritura para admins en documents
create policy "Admins insertan documentos"
  on public.documents for insert
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins actualizan documentos"
  on public.documents for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins eliminan documentos"
  on public.documents for delete
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Policies de escritura para admins en document_categories
create policy "Admins insertan categorías"
  on public.document_categories for insert
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins actualizan categorías"
  on public.document_categories for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins eliminan categorías"
  on public.document_categories for delete
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
```

Haz clic en **"Run"** para ejecutar. Espera a que complete exitosamente.

### Paso 2: Crear el usuario administrador

En el Dashboard → **Authentication** → **Users** → **Add user**

Completa:
- **Email**: `administrador@gmail.com`
- **Password**: `admin` (es un prototipo; usa una contraseña segura en producción)
- Marca **Auto Confirm User** ✓

Haz clic en **"Create user"**.

El trigger automático `handle_new_user()` creará su fila en `profiles` con `role = 'user'`.

### Paso 3: Promover a admin

Vuelve al **SQL Editor** y pega:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'administrador@gmail.com');
```

Haz clic en **"Run"**.

---

## Verificar que funciona

1. **Inicia la app localmente**:
   ```bash
   npm start
   ```

2. **Inicia sesión** como `administrador@gmail.com` / `admin`

3. **En `/acceso/panel`** debe aparecer una tarjeta extra **"Cargar documentos"** con un enlace "Ir a documentos →"

4. **Haz clic** en ese enlace → acceso a `/acceso/panel/documentos`

5. **Crea un documento de prueba**:
   - Título: "Política de privacidad"
   - Categoría: (la que prefieras)
   - URL: `https://www.example.com/privacy`
   - Estado: "Publicado"
   - Haz clic en **"Crear"**

6. **El documento debe aparecer** en `/normatividad` (página pública)

7. **Como usuario normal** (crea otra cuenta o cierra sesión):
   - No verás la tarjeta "Cargar documentos" en `/acceso/panel`
   - Si intentas entrar a `/acceso/panel/documentos`, serás redirigido a `/acceso/panel`
   - Pero SÍ puedes ver los documentos publicados en `/normatividad`

---

## Seguridad

- La contraseña `admin` jamás se expondrá en el código — solo en el Dashboard de Supabase
- El rol `admin` se verifica únicamente en el servidor (Supabase RLS) — no se confía en el cliente
- Los `adminGuard` y `ProfileService` previenen que usuarios normales vean la UI de admin, pero la seguridad real la proporciona RLS
- Sin el rol admin en `profiles`, los intentos de insert/update/delete en `documents` fallarán en RLS, incluso si alguien manipulase el frontend

---

## Notas

- El cargue de documentos es **solo URL externa** (Google Drive, etc.). No se sube archivo binario a Supabase Storage.
- Para cambiar la contraseña del admin: Authentication → Users → Click en el usuario → Reset password
- Para crear más admins: repite Paso 2 (con otro email) + Paso 3 (actualiza el WHERE)
