# Troubleshooting: Error "Bucket not found"

## Problema
Al intentar acceder a una imagen subida, recibes el error:
```json
{"statusCode":"404","error":"Bucket not found","message":"Bucket not found"}
```

## Solución Paso a Paso

### Paso 1: Verificar que el Bucket Existe

1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Storage** en el menú lateral
4. **Verifica que el bucket `payment-receipts` aparezca en la lista**
   - Si NO aparece, necesitas crearlo (ver `docs/GUIA_CREAR_BUCKET.md`)
   - Si aparece, continúa con el Paso 2

### Paso 2: Verificar que el Bucket es Público

1. Haz clic en el bucket `payment-receipts`
2. En la parte superior, verifica que tenga el ícono de **globo** 🌐 o que diga **Public**
3. Si NO es público:
   - Ve a **Settings** del bucket (ícono de engranaje)
   - Marca la casilla **Public bucket**
   - Guarda los cambios

### Paso 3: Verificar las Políticas RLS

1. En el bucket `payment-receipts`, ve a la pestaña **Policies**
2. **Debes tener 2 políticas:**

   **Política 1:**
   - Name: `Allow public uploads`
   - Operation: INSERT
   - Roles: `anon`, `authenticated`
   - SQL: `bucket_id = 'payment-receipts'::text`

   **Política 2:**
   - Name: `Allow public reads`
   - Operation: SELECT
   - Roles: `anon`, `authenticated`
   - SQL: `bucket_id = 'payment-receipts'::text`

3. Si faltan políticas, créalas siguiendo `docs/GUIA_CREAR_BUCKET.md`

### Paso 4: Verificar el Nombre del Bucket

El nombre debe ser exactamente `payment-receipts` (todo en minúsculas, con guión):
- ✅ Correcto: `payment-receipts`
- ❌ Incorrecto: `Payment-Receipts`, `payment_receipts`, `payment receipts`

### Paso 5: Probar Acceso Directo

Intenta acceder directamente al bucket desde el Dashboard:

1. Ve a Storage → `payment-receipts`
2. Si hay archivos subidos, deberías verlos listados
3. Haz clic en un archivo para ver su URL
4. Compara la URL con la que estás usando en tu código

### Paso 6: Verificar Variables de Entorno

Asegúrate de que las variables de entorno estén correctas en tu `.env`:

```env
PUBLIC_SUPABASE_URL=https://jutoqrvvoxrkpdwvohkf.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

**Importante:** Reinicia el servidor de desarrollo después de cambiar las variables de entorno:
```bash
npm run dev
```

## Solución Rápida: Recrear el Bucket

Si nada funciona, intenta recrear el bucket:

1. **Elimina el bucket existente** (si existe):
   - Storage → `payment-receipts` → Settings → Delete bucket

2. **Crea un nuevo bucket**:
   - Storage → New bucket
   - Name: `payment-receipts`
   - ✅ Public bucket
   - Create bucket

3. **Crea las políticas** (ver Paso 3)

4. **Prueba subir un archivo nuevo** desde el formulario

## Verificación Final

Para verificar que todo funciona:

1. Sube un archivo desde el formulario de registro
2. Verifica en Storage → `payment-receipts` que el archivo aparezca
3. Haz clic en el archivo para obtener su URL pública
4. Abre la URL en una nueva pestaña del navegador
5. Deberías ver la imagen/PDF sin errores

## Errores Comunes

### Error: "Bucket not found"
- **Causa**: El bucket no existe o tiene un nombre diferente
- **Solución**: Verifica que el bucket se llame exactamente `payment-receipts`

### Error: "new row violates policy"
- **Causa**: Las políticas RLS no están configuradas
- **Solución**: Crea las políticas INSERT y SELECT

### Error: "Access denied" o 403
- **Causa**: El bucket no es público o las políticas no permiten lectura
- **Solución**: Marca el bucket como público y crea la política SELECT

### La URL se genera pero no carga la imagen
- **Causa**: El bucket no es público
- **Solución**: Marca el bucket como público en Settings

