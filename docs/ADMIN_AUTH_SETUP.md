# Configuración de Autenticación Admin con Supabase Auth

Esta guía explica cómo configurar la autenticación para el panel de administración usando Supabase Auth.

## Pasos de Configuración

### 1. Habilitar Autenticación Email/Password en Supabase

1. Accede al Dashboard de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Authentication** en el menú lateral
4. Ve a la pestaña **Providers**
5. Busca **Email** en la lista de proveedores
6. Haz clic en **Enable Email provider**
7. Asegúrate de que **Enable Email provider** esté activado
8. Guarda los cambios

### 2. Crear Usuario Admin

Tienes dos opciones para crear el usuario admin:

#### Opción A: Desde el Dashboard (Recomendado)

1. Ve a **Authentication** > **Users**
2. Haz clic en **Add user** > **Create new user**
3. Completa el formulario:
   - **Email**: El email que usarás para iniciar sesión (ej: `admin@festival.com`)
   - **Password**: Una contraseña segura
   - **Auto Confirm User**: ✅ Marca esta casilla (importante para que pueda iniciar sesión inmediatamente)
4. Haz clic en **Create user**

#### Opción B: Desde SQL Editor

1. Ve a **SQL Editor**
2. Ejecuta este SQL (reemplaza el email y contraseña):

```sql
-- Crear usuario admin
-- NOTA: Esto requiere que tengas habilitada la extensión de auth
-- La forma más fácil es usar el Dashboard como en la Opción A
```

**Recomendación**: Usa la Opción A (Dashboard) ya que es más simple y segura.

### 3. Verificar Configuración

1. Ve a **Authentication** > **Users**
2. Confirma que tu usuario admin aparece en la lista
3. Verifica que el email esté confirmado (columna "Confirmed")

### 4. Probar el Login

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Intenta acceder a `/admin`
3. Deberías ser redirigido a `/admin/login`
4. Ingresa el email y contraseña del usuario admin
5. Deberías ser redirigido a `/admin` después del login exitoso

## Estructura de Archivos

- `src/services/auth.ts` - Servicios de autenticación usando Supabase Auth
- `src/pages/admin/login.astro` - Página de login
- `src/pages/admin/logout.astro` - Endpoint para cerrar sesión
- `src/pages/admin.astro` - Panel protegido que verifica autenticación

## Flujo de Autenticación

1. Usuario intenta acceder a `/admin`
2. Sistema verifica sesión con `getSession()`
3. Si NO hay sesión → Redirige a `/admin/login`
4. Usuario ingresa credenciales en el formulario
5. Sistema llama a `login()` con `supabase.auth.signInWithPassword()`
6. Si las credenciales son correctas → Crea sesión y redirige a `/admin`
7. Si son incorrectas → Muestra error en el formulario
8. Usuario puede cerrar sesión desde el botón "Cerrar Sesión" en el header

## Seguridad

- Las contraseñas se almacenan de forma segura en Supabase (hash bcrypt)
- La sesión se maneja automáticamente por Supabase Auth
- Las cookies de sesión son seguras y httpOnly
- No es necesario manejar tokens manualmente

## Troubleshooting

### Error: "Invalid login credentials"
- Verifica que el email y contraseña sean correctos
- Asegúrate de que el usuario esté confirmado (Auto Confirm User)
- Verifica que el proveedor Email esté habilitado

### Error: "Email not confirmed"
- Ve a Authentication > Users
- Encuentra tu usuario y verifica que esté confirmado
- Si no lo está, puedes confirmarlo manualmente o recrear el usuario con "Auto Confirm User"

### No redirige después del login
- Verifica que la función `login()` esté funcionando correctamente
- Revisa la consola del navegador para errores
- Asegúrate de que las variables de entorno de Supabase estén configuradas

### La sesión se pierde al recargar
- Esto puede ser normal si las cookies no están configuradas correctamente
- Verifica que estés usando el mismo dominio
- En desarrollo, asegúrate de usar `localhost` consistentemente

## Crear Usuarios Adicionales

Para agregar más usuarios admin:

1. Ve a Authentication > Users
2. Haz clic en **Add user** > **Create new user**
3. Completa el formulario con email y contraseña
4. Marca **Auto Confirm User**
5. Haz clic en **Create user**

Cada usuario puede iniciar sesión con su propio email y contraseña.

