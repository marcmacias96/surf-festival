-- ============================================
-- San Mateo Longboard Festival - Migration
-- Agregar comprobantes de pago y estados de validación
-- ============================================
-- Ejecutar en el SQL Editor de Supabase Dashboard después de supabase-setup.sql

-- 1. Agregar columna para URL del comprobante de pago
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS payment_receipt_url TEXT;

-- 2. Agregar columna para estado de validación
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' NOT NULL 
CHECK (status IN ('pending', 'approved', 'rejected'));

-- 3. Crear índice para búsquedas por estado
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);

-- 4. Crear índice para búsquedas por estado y categoría (útil para admin)
CREATE INDEX IF NOT EXISTS idx_registrations_status_category ON public.registrations(status, category);

-- 5. Actualizar política RLS para permitir UPDATE de status (solo para admin)
-- Nota: En producción, esto debería estar restringido a usuarios autenticados con rol admin
-- Por ahora permitimos UPDATE público para desarrollo, pero deberías restringirlo después
DROP POLICY IF EXISTS "Allow status updates" ON public.registrations;
CREATE POLICY "Allow status updates"
    ON public.registrations
    FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- 6. Política para permitir UPDATE de payment_receipt_url durante inserción
-- (ya está cubierta por la política de INSERT existente)

-- Verificar cambios
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'registrations'
  AND column_name IN ('payment_receipt_url', 'status')
ORDER BY ordinal_position;

