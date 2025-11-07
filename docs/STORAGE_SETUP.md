# Configuración de Supabase Storage para Comprobantes de Pago

Esta guía explica cómo configurar Supabase Storage para almacenar los comprobantes de pago de las inscripciones.

## Pasos de Configuración

### 1. Crear Bucket en Supabase Storage

1. Accede al Dashboard de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Storage** en el menú lateral
4. Haz clic en **New bucket**
5. Configura el bucket:
   - **Name**: `payment-receipts`
   - **Public bucket**: ✅ Activado (para que el admin pueda ver los comprobantes)
   - Haz clic en **Create bucket**

### 2. Configurar Políticas de Storage

**OPCIÓN A: Usando SQL Editor (RECOMENDADO - Más rápido)**

1. Ve a **SQL Editor** en el Dashboard de Supabase
2. Abre el archivo `supabase-storage-policies.sql` de este proyecto
3. Copia y pega todo el contenido en el SQL Editor
4. Haz clic en **Run**
5. Verifica que aparezcan 2 políticas creadas en los resultados

**OPCIÓN B: Usando la Interfaz de Policies**

1. En el bucket `payment-receipts`, ve a la pestaña **Policies**
2. Haz clic en **New Policy** y selecciona **Create a policy from scratch**

#### Política 1: Permitir subida de archivos (INSERT)
- **Policy name**: `Allow public uploads`
- **Allowed operation**: INSERT
- **Target roles**: `anon`, `authenticated`
- **Policy definition**:
```sql
bucket_id = 'payment-receipts'::text
```

#### Política 2: Permitir lectura de archivos (SELECT) - IMPORTANTE
- **Policy name**: `Allow public reads`
- **Allowed operation**: SELECT
- **Target roles**: `public` (o `anon`, `authenticated`)
- **Policy definition**:
```sql
bucket_id = 'payment-receipts'::text
```

**NOTA CRÍTICA**: La política SELECT debe usar el rol `public` para que los archivos sean realmente accesibles sin autenticación.

### 3. Configurar Límites (Opcional pero Recomendado)

En el Dashboard de Supabase:
1. Ve a **Settings** > **Storage**
2. Configura límites:
   - **File size limit**: 5 MB (5,242,880 bytes)
   - **Allowed MIME types**: `image/jpeg, image/png, image/jpg, application/pdf`

### 4. Ejecutar Migración de Base de Datos

Ejecuta el archivo `supabase-migration.sql` en el SQL Editor para agregar las columnas necesarias.

## Estructura de Archivos

Los archivos se almacenarán con la siguiente estructura:
```
payment-receipts/
  └── {registrationId}/
      └── {timestamp}-{filename}
```

Ejemplo:
```
payment-receipts/
  └── 550e8400-e29b-41d4-a716-446655440000/
      └── 1704567890-comprobante.pdf
```

## Formatos Permitidos

- **Imágenes**: JPG, JPEG, PNG
- **Documentos**: PDF
- **Tamaño máximo**: 5 MB

## Seguridad

- Los archivos son públicos para lectura (necesario para que el admin los vea)
- Solo usuarios autónimos/autenticados pueden subir archivos
- Los nombres de archivo incluyen UUID para evitar colisiones
- Validación de tipo MIME en el cliente y servidor

## Troubleshooting

### Error: "new row violates policy"
- Verifica que las políticas de Storage estén configuradas correctamente
- Asegúrate de que el bucket sea público si necesitas acceso sin autenticación

### Error: "file too large"
- Verifica el límite de tamaño en Settings > Storage
- El límite por defecto es 50MB, pero recomendamos 5MB

### Error: "invalid file type"
- Verifica que el archivo sea PDF, JPG, JPEG o PNG
- Revisa la validación en el código del formulario

