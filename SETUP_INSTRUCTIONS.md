# Instrucciones Rápidas de Configuración - Supabase

## Paso 1: Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto con este contenido:

```env
PUBLIC_SUPABASE_URL=https://jutoqrvvoxrkpdwvohkf.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1dG9xcnZ2b3hya3Bkd3ZvaGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Njg2MDQsImV4cCI6MjA3ODA0NDYwNH0.h5eYQJp34RAsxn3YNhdHaoQRlf99qiKFQCqlLtJQhcs
```

**O ejecuta este comando:**

```bash
cat > .env << 'EOF'
PUBLIC_SUPABASE_URL=https://jutoqrvvoxrkpdwvohkf.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1dG9xcnZ2b3hya3Bkd3ZvaGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Njg2MDQsImV4cCI6MjA3ODA0NDYwNH0.h5eYQJp34RAsxn3YNhdHaoQRlf99qiKFQCqlLtJQhcs
EOF
```

## Paso 2: Ejecutar SQL en Supabase

1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **SQL Editor**
4. Abre el archivo `supabase-setup.sql` de este proyecto
5. Copia todo el contenido y pégalo en el SQL Editor
6. Haz clic en **Run**

## Paso 3: Verificar configuración

1. Ve a **Table Editor** en Supabase Dashboard
2. Confirma que existe la tabla `registrations`
3. Verifica que **RLS** esté habilitado (toggle verde)

## Paso 4: Probar

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre el formulario de registro en el navegador
3. Completa y envía el formulario
4. Verifica en Supabase Dashboard que el registro se creó

## ¿Problemas?

Consulta `docs/SUPABASE_SETUP.md` para troubleshooting detallado.

