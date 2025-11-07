# Guía Visual: Crear Bucket payment-receipts en Supabase

## Paso 1: Acceder al Dashboard de Supabase

1. Ve a https://supabase.com/dashboard
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto: **jutoqrvvoxrkpdwvohkf**

## Paso 2: Crear el Bucket

1. En el menú lateral izquierdo, haz clic en **Storage**
   - Verás una lista de buckets (si ya tienes alguno) o un mensaje indicando que no hay buckets

2. Haz clic en el botón **New bucket** (arriba a la derecha)

3. Se abrirá un modal. Configura lo siguiente:
   - **Name**: Escribe exactamente `payment-receipts` (sin espacios, con guión)
   - **Public bucket**: ✅ **Marca esta casilla** (MUY IMPORTANTE)
     - Esto permite que los archivos sean accesibles públicamente sin autenticación
   - **File size limit**: Opcional, puedes dejarlo en blanco o poner `5242880` (5MB)
   - **Allowed MIME types**: Opcional, puedes dejarlo en blanco

4. Haz clic en **Create bucket**

✅ **¡Listo!** El bucket `payment-receipts` debería aparecer en tu lista de buckets.

## Paso 3: Configurar Políticas de Storage (RLS)

Las políticas controlan quién puede subir y leer archivos. Necesitamos dos políticas:

### Política 1: Permitir Subida de Archivos (INSERT)

1. Haz clic en el bucket `payment-receipts` que acabas de crear
2. Ve a la pestaña **Policies** (arriba)
3. Haz clic en **New Policy**
4. Selecciona **Create a policy from scratch**
5. Configura:
   - **Policy name**: `Allow public uploads`
   - **Allowed operation**: Selecciona **INSERT**
   - **Target roles**: Selecciona `anon` y `authenticated` (marca ambas)
   - **Policy definition**: Copia y pega esto:
   ```sql
   bucket_id = 'payment-receipts'::text
   ```
6. Haz clic en **Review** y luego en **Save policy**

### Política 2: Permitir Lectura de Archivos (SELECT)

1. En la misma pestaña **Policies**, haz clic en **New Policy** nuevamente
2. Selecciona **Create a policy from scratch**
3. Configura:
   - **Policy name**: `Allow public reads`
   - **Allowed operation**: Selecciona **SELECT**
   - **Target roles**: Selecciona `anon` y `authenticated` (marca ambas)
   - **Policy definition**: Copia y pega esto:
   ```sql
   bucket_id = 'payment-receipts'::text
   ```
4. Haz clic en **Review** y luego en **Save policy**

## Paso 4: Verificar Configuración

Para verificar que todo está bien:

1. El bucket `payment-receipts` debe aparecer en la lista de Storage
2. Debe tener el ícono de "globo" 🌐 indicando que es público
3. En la pestaña **Policies** deben aparecer 2 políticas:
   - `Allow public uploads` (INSERT)
   - `Allow public reads` (SELECT)

## ✅ Listo para Usar

Una vez completados estos pasos, el bucket está listo para recibir comprobantes de pago desde el formulario de registro.

## Notas Importantes

- **Bucket público**: Es necesario marcarlo como público para que el admin pueda ver los comprobantes sin autenticación
- **Políticas**: Sin las políticas RLS, no se podrán subir archivos desde el formulario
- **Seguridad**: Aunque el bucket es público, solo se pueden subir archivos desde la aplicación (gracias a las políticas)

## Troubleshooting

### No puedo ver el botón "New bucket"
- Asegúrate de estar en la sección **Storage** del menú lateral
- Verifica que tengas permisos de administrador en el proyecto

### Error al crear el bucket
- Verifica que el nombre sea exactamente `payment-receipts` (sin espacios)
- Asegúrate de que no exista otro bucket con el mismo nombre

### Error "new row violates policy" al subir archivo
- Verifica que ambas políticas estén creadas correctamente
- Asegúrate de que el bucket esté marcado como público
- Revisa que las políticas tengan los roles `anon` y `authenticated` seleccionados

