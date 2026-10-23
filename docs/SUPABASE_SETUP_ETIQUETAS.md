# Supabase para el editor de etiquetas

## Qué habilita
Supabase PostgreSQL es el catálogo central; Storage guarda las fotografías en un bucket privado; Realtime notifica cambios a las otras sesiones autorizadas. IndexedDB permanece como copia local. Las operaciones normales no usan IA ni tokens de IA.

## 1. Crear las tablas y el bucket
En Supabase Dashboard abre **SQL Editor**, crea una consulta y ejecuta todo el contenido de `supabase/migrations/20261022000000_labels.sql` de este repositorio. Deben quedar creados `label_products`, `label_editor_access` y el bucket privado `label-images`.

## 2. Conectar el primer equipo
Desde Supabase, copia **Project URL** y **Publishable key** (o la clave pública heredada **anon**). En el editor pega esos datos, escribe correo y contraseña, y pulsa **Guardar conexión e iniciar sesión**. La URL y clave quedan guardadas localmente en ese navegador. Nunca uses `service_role` ni claves secretas en la página pública.

## 3. Registrar y autorizar al propietario
Pulsa **Crear cuenta** desde el editor. Si se requiere confirmación de correo, confírmala y después inicia sesión. En Supabase SQL Editor ejecuta esto sustituyendo el correo por el que registraste:

```sql
insert into public.label_editor_access (user_id,email,is_admin)
select id,email,true from auth.users
where lower(email)=lower('TU_CORREO@DOMINIO.COM')
on conflict (user_id) do update
set is_admin=true,email=excluded.email;
```

Vuelve a iniciar sesión en el editor. Sin esta autorización, la sesión no puede leer ni modificar el catálogo. Para autorizar otros usuarios, registra/invita sus cuentas y ejecuta el mismo SQL con su correo e `is_admin=false`.

## 4. Cargar el catálogo existente
En el equipo que tenga el catálogo correcto, inicia sesión y pulsa **Subir catálogo local a la nube**. Confirma la carga. Si ya hay productos en la nube, la aplicación pide una confirmación extra antes de reemplazar el catálogo compartido. No uses esa acción desde otro equipo si no quieres sustituir el catálogo de todos.

## 5. Sincronizar otra ciudad
Abre el mismo enlace desde la otra computadora, configura la misma Project URL y clave pública, e inicia sesión con una cuenta autorizada. La aplicación cargará productos y fotografías de Supabase. Cambios posteriores se guardan en la nube y se reflejan en las demás sesiones mediante Realtime.

## Seguridad y alcance
- Lectura/escritura protegida por RLS y una lista explícita de usuarios permitidos.
- Fotografías en un bucket privado.
- URL y clave pública se configuran una vez por navegador; credenciales de usuario se guardan en el sistema de autenticación de Supabase.
- Hay que ejecutar el SQL y autorizar una cuenta en un proyecto Supabase real antes de poder probar la sincronización.
