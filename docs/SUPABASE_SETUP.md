# Configuración de Supabase para San Mateo Longboard Festival

Esta guía explica cómo configurar Supabase para el formulario de registro del festival.

## Requisitos Previos

- Proyecto de Supabase creado
- Credenciales de acceso (URL y Anon Key)

## Credenciales Configuradas

Las credenciales ya están configuradas en el archivo `.env`:
- **URL**: `https://jutoqrvvoxrkpdwvohkf.supabase.co`
- **Anon Key**: Configurada en `.env`

## Pasos de Configuración

### 1. Crear la Tabla de Registros

1. Accede al Dashboard de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **SQL Editor** en el menú lateral
4. Abre el archivo `supabase-setup.sql` de este proyecto
5. Copia y pega todo el contenido en el SQL Editor
6. Haz clic en **Run** o presiona `Ctrl+Enter` (o `Cmd+Enter` en Mac)

El script creará:
- La tabla `registrations` con todos los campos necesarios
- Índices para optimizar búsquedas
- Función y trigger para actualizar `updated_at` automáticamente
- Políticas RLS (Row Level Security)

### 2. Verificar la Configuración

Después de ejecutar el script, verifica que:

1. **Tabla creada**: Ve a **Table Editor** y confirma que existe `registrations`
2. **RLS habilitado**: En la tabla, verifica que **RLS** esté activado (toggle verde)
3. **Políticas creadas**: Ve a **Authentication > Policies** y verifica las políticas:
   - `Allow public insertions` (INSERT)
   - `Allow public read` (SELECT)

### 3. Estructura de la Tabla

La tabla `registrations` tiene la siguiente estructura:

| Campo | Tipo | Descripción | Restricciones |
|-------|------|-------------|---------------|
| `id` | UUID | Identificador único | Primary Key, auto-generado |
| `name` | TEXT | Nombre completo | NOT NULL |
| `email` | TEXT | Correo electrónico | NOT NULL, UNIQUE |
| `phone` | TEXT | Teléfono | NOT NULL |
| `category` | TEXT | Categoría de competencia | NOT NULL, CHECK (valores permitidos) |
| `age` | INTEGER | Edad del participante | NOT NULL, CHECK (8-100) |
| `created_at` | TIMESTAMP | Fecha de creación | NOT NULL, auto-generado |
| `updated_at` | TIMESTAMP | Fecha de actualización | NOT NULL, auto-actualizado |

**Categorías permitidas:**
- `Open Hombres`
- `Open Mujeres`
- `Mujeres Intermedio`
- `Mujeres Principiante`
- `Niños`

### 4. Políticas de Seguridad (RLS)

Se han configurado las siguientes políticas:

#### INSERT (Inserción)
- **Nombre**: `Allow public insertions`
- **Permiso**: Cualquier usuario (anon o authenticated) puede insertar registros
- **Uso**: Permite que el formulario público funcione sin autenticación

#### SELECT (Lectura)
- **Nombre**: `Allow public read`
- **Permiso**: Cualquier usuario puede leer registros
- **Nota**: Si necesitas restringir el acceso, modifica esta política

### 5. Variables de Entorno

El proyecto usa las siguientes variables de entorno. **Debes crear el archivo `.env` manualmente** en la raíz del proyecto:

**Crear archivo `.env` en la raíz del proyecto:**

```bash
# En la raíz del proyecto, crea el archivo .env con este contenido:
PUBLIC_SUPABASE_URL=https://jutoqrvvoxrkpdwvohkf.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1dG9xcnZ2b3hya3Bkd3ZvaGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Njg2MDQsImV4cCI6MjA3ODA0NDYwNH0.h5eYQJp34RAsxn3YNhdHaoQRlf99qiKFQCqlLtJQhcs
```

**O ejecuta este comando en la terminal:**

```bash
cat > .env << 'EOF'
PUBLIC_SUPABASE_URL=https://jutoqrvvoxrkpdwvohkf.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1dG9xcnZ2b3hya3Bkd3ZvaGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Njg2MDQsImV4cCI6MjA3ODA0NDYwNH0.h5eYQJp34RAsxn3YNhdHaoQRlf99qiKFQCqlLtJQhcs
EOF
```

**Importante:**
- Estas variables deben estar en el archivo `.env` en la raíz del proyecto
- El archivo `.env` está en `.gitignore` y no se sube al repositorio
- Usa `.env.example` como template para otros desarrolladores
- **Reinicia el servidor de desarrollo** después de crear/modificar el archivo `.env`

### 6. Probar la Integración

Para verificar que todo funciona:

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre el formulario de registro en el navegador
3. Completa el formulario con datos de prueba
4. Envía el formulario
5. Verifica en Supabase Dashboard > Table Editor que el registro se creó correctamente

### 7. Verificar Registros en Supabase

1. Ve a **Table Editor** en el Dashboard de Supabase
2. Selecciona la tabla `registrations`
3. Deberías ver todos los registros creados
4. Puedes filtrar, ordenar y exportar los datos desde aquí

## Troubleshooting

### Error: "relation 'registrations' does not exist"

**Solución**: Ejecuta el script SQL `supabase-setup.sql` en el SQL Editor de Supabase.

### Error: "new row violates row-level security policy"

**Solución**: Verifica que las políticas RLS estén creadas correctamente. Ve a **Authentication > Policies** y confirma que existe la política `Allow public insertions`.

### Error: "duplicate key value violates unique constraint"

**Solución**: Este es el comportamiento esperado. El email ya está registrado. El formulario mostrará un mensaje de error al usuario.

### Error: "check constraint violation"

**Solución**: Verifica que:
- La categoría sea una de las permitidas
- La edad esté entre 8 y 100 años

### Las variables de entorno no se cargan

**Solución**:
1. Verifica que el archivo `.env` existe en la raíz del proyecto
2. Reinicia el servidor de desarrollo (`npm run dev`)
3. Verifica que las variables empiecen con `PUBLIC_` (requerido por Astro)

### No puedo ver los registros en el Dashboard

**Solución**: 
- Verifica que la política `Allow public read` esté activa
- Si solo quieres que los administradores vean los registros, modifica o elimina esta política

## Seguridad

### Buenas Prácticas

1. **Anon Key**: La Anon Key es pública y segura para usar en el cliente gracias a RLS
2. **RLS**: Siempre mantén RLS habilitado para proteger tus datos
3. **Validación**: El formulario valida los datos tanto en el cliente (Zod) como en el servidor (Supabase constraints)
4. **Email único**: El constraint UNIQUE previene registros duplicados

### Restricciones de Seguridad

- **INSERT público**: Cualquiera puede crear registros (necesario para el formulario público)
- **SELECT público**: Cualquiera puede leer registros (considera restringir si contiene datos sensibles)
- **UPDATE/DELETE**: No están permitidos por defecto (descomenta las políticas si las necesitas)

## Próximos Pasos Opcionales

1. **Dashboard de Administración**: Crear una interfaz para ver y gestionar registros
2. **Exportación de Datos**: Agregar funcionalidad para exportar registros a CSV/Excel
3. **Notificaciones**: Configurar emails automáticos cuando alguien se registra
4. **Sistema de Pagos**: Integrar con Stripe o similar para procesar pagos
5. **Autenticación de Admin**: Crear roles de administrador para gestionar registros

## Referencias

- [Documentación de Supabase](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

