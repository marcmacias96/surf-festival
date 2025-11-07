-- ============================================
-- Políticas de Storage para payment-receipts
-- ============================================
-- Ejecutar en el SQL Editor de Supabase Dashboard
-- Esto asegura que los archivos sean accesibles públicamente

-- IMPORTANTE: Primero asegúrate de que el bucket 'payment-receipts' existe
-- y está marcado como PÚBLICO en Storage → Settings

-- 1. Eliminar políticas existentes si las hay (opcional, para empezar limpio)
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- 2. Política para INSERT (subir archivos) - Ya funciona si se subió la imagen
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'payment-receipts'
);

-- 3. Política para SELECT (leer archivos) - ESTA ES LA QUE FALTA
CREATE POLICY "Allow public reads"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'payment-receipts'
);

-- 4. Verificar que las políticas se crearon correctamente
SELECT 
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname IN ('Allow public uploads', 'Allow public reads');

