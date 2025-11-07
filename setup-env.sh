#!/bin/bash
# Script para configurar variables de entorno de Supabase

echo "Configurando variables de entorno para Supabase..."

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    cat > .env << 'ENVFILE'
PUBLIC_SUPABASE_URL=https://jutoqrvvoxrkpdwvohkf.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1dG9xcnZ2b3hya3Bkd3ZvaGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Njg2MDQsImV4cCI6MjA3ODA0NDYwNH0.h5eYQJp34RAsxn3YNhdHaoQRlf99qiKFQCqlLtJQhcs
ENVFILE
    echo "✓ Archivo .env creado"
else
    echo "⚠ Archivo .env ya existe. Verifica que contenga las variables correctas."
fi

# Crear archivo .env.example
cat > .env.example << 'ENVEXAMPLE'
PUBLIC_SUPABASE_URL=your-supabase-project-url
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
ENVEXAMPLE
echo "✓ Archivo .env.example creado"

echo ""
echo "✅ Configuración completada!"
echo ""
echo "Próximos pasos:"
echo "1. Ejecuta el script SQL en Supabase Dashboard (supabase-setup.sql)"
echo "2. Reinicia el servidor de desarrollo: npm run dev"
echo "3. Prueba el formulario de registro"
