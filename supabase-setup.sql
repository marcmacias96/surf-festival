-- ============================================
-- San Mateo Longboard Festival - Supabase Setup
-- ============================================
-- Este script crea la tabla de registros y configura las políticas RLS
-- Ejecutar en el SQL Editor de Supabase Dashboard

-- 1. Crear tabla de registros
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Open Hombres', 'Open Mujeres', 'Mujeres Intermedio', 'Mujeres Principiante', 'Niños')),
    age INTEGER NOT NULL CHECK (age >= 8 AND age <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 2. Crear índice para búsquedas rápidas por email
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);

-- 3. Crear índice para búsquedas por categoría
CREATE INDEX IF NOT EXISTS idx_registrations_category ON public.registrations(category);

-- 4. Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Crear trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_registrations_updated_at ON public.registrations;
CREATE TRIGGER update_registrations_updated_at
    BEFORE UPDATE ON public.registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 6. Habilitar Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 7. Crear política para INSERT: permitir inserción pública (cualquiera puede registrarse)
CREATE POLICY "Allow public insertions"
    ON public.registrations
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 8. Crear política para SELECT: solo lectura para usuarios autenticados o anónimos (opcional)
-- Si quieres que solo los administradores vean los registros, comenta esta política
CREATE POLICY "Allow public read"
    ON public.registrations
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- 9. (Opcional) Política para UPDATE: solo el mismo usuario o administradores
-- Descomentar si necesitas permitir actualizaciones
-- CREATE POLICY "Allow update own registration"
--     ON public.registrations
--     FOR UPDATE
--     TO authenticated
--     USING (auth.uid()::text = id::text)
--     WITH CHECK (auth.uid()::text = id::text);

-- 10. (Opcional) Política para DELETE: solo administradores
-- Descomentar si necesitas permitir eliminaciones
-- CREATE POLICY "Allow delete for admins"
--     ON public.registrations
--     FOR DELETE
--     TO authenticated
--     USING (auth.jwt() ->> 'role' = 'admin');

-- Verificar que todo está configurado correctamente
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'registrations';

