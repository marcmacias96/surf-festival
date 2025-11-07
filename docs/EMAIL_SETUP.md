# Configuración de Sistema de Emails con Tickets

Esta guía explica cómo configurar el sistema de envío automático de emails con tickets de registro cuando una inscripción es aprobada.

## Arquitectura

El sistema utiliza:
- **Supabase Edge Functions**: Para ejecutar el código de envío de emails
- **Resend**: Servicio externo para el envío de emails transaccionales
- **HTML/CSS Embebido**: Plantilla de ticket que replica el diseño del escudo del logo

## Requisitos Previos

1. Proyecto de Supabase configurado
2. Cuenta en [Resend](https://resend.com) (gratuita hasta 3,000 emails/mes)
3. Supabase CLI instalado (para desplegar Edge Functions)

## Paso 1: Crear Cuenta en Resend

1. Ve a [https://resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Verifica tu email

## Paso 2: Obtener API Key de Resend

1. Una vez en el dashboard de Resend, ve a **API Keys**
2. Haz clic en **Create API Key**
3. Dale un nombre descriptivo (ej: "San Mateo Festival")
4. Selecciona permisos: **Sending access**
5. Copia la API Key (solo se muestra una vez, guárdala de forma segura)

## Paso 3: Configurar Dominio de Email (Opcional pero Recomendado)

Para producción, es recomendable usar un dominio verificado:

1. En Resend, ve a **Domains**
2. Haz clic en **Add Domain**
3. Ingresa tu dominio (ej: `sanmateolongfest.com`)
4. Resend te dará registros DNS para agregar:
   - **SPF Record**: Para autenticación
   - **DKIM Record**: Para firma de emails
   - **DMARC Record**: Para políticas de email
5. Agrega estos registros en tu proveedor de DNS
6. Espera a que Resend verifique el dominio (puede tomar hasta 24 horas)

**Nota**: Para desarrollo/pruebas, puedes usar el dominio de prueba de Resend: `onboarding@resend.dev`

## Paso 4: Instalar Supabase CLI

Si aún no lo tienes instalado:

```bash
# macOS
brew install supabase/tap/supabase

# Windows (con Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
npm install -g supabase
```

## Paso 5: Inicializar Supabase en el Proyecto

1. En la raíz del proyecto, ejecuta:
```bash
supabase init
```

Esto creará una carpeta `supabase/` si no existe.

## Paso 6: Configurar Variables de Entorno en Supabase

1. Ve al Dashboard de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Project Settings** > **Edge Functions**
4. En la sección **Secrets**, agrega las siguientes variables:

   - **RESEND_API_KEY**: Tu API Key de Resend
   - **RESEND_FROM_EMAIL**: El email desde el cual enviar (ej: `noreply@sanmateolongfest.com` o `onboarding@resend.dev` para pruebas)

**Alternativamente**, puedes usar la CLI:

```bash
supabase secrets set RESEND_API_KEY=tu_api_key_aqui
supabase secrets set RESEND_FROM_EMAIL=noreply@tudominio.com
```

## Paso 7: Desplegar la Edge Function

1. Asegúrate de estar autenticado en Supabase CLI:
```bash
supabase login
```

2. Vincula tu proyecto local con tu proyecto de Supabase:
```bash
supabase link --project-ref tu-project-ref
```

   Puedes encontrar tu `project-ref` en la URL de tu proyecto: `https://supabase.com/dashboard/project/[project-ref]`

3. Despliega la Edge Function:
```bash
supabase functions deploy send-ticket-email
```

4. Verifica que la función se desplegó correctamente:
```bash
supabase functions list
```

Deberías ver `send-ticket-email` en la lista.

## Paso 8: Verificar la Configuración

1. En el Dashboard de Supabase, ve a **Edge Functions**
2. Deberías ver `send-ticket-email` en la lista
3. Haz clic en la función para ver logs y detalles

## Paso 9: Probar el Sistema

1. Asegúrate de que tu aplicación esté corriendo:
```bash
npm run dev
```

2. Ve al panel de administración (`/admin`)
3. Aprueba una inscripción existente
4. Verifica los logs en:
   - Consola del navegador (para ver logs del endpoint)
   - Dashboard de Supabase > Edge Functions > send-ticket-email > Logs
   - Dashboard de Resend > Emails (para ver emails enviados)

5. Revisa el email del participante (incluyendo spam)

## Estructura de Archivos

```
supabase/
  functions/
    send-ticket-email/
      index.ts              # Código principal de la Edge Function
      ticket-template.ts    # Plantilla HTML del ticket

src/
  services/
    email.ts                # Servicio helper para invocar la Edge Function
  pages/
    api/
      registrations/
        update-status.ts    # Endpoint modificado para enviar emails
```

## Troubleshooting

### Error: "RESEND_API_KEY no está configurada"

**Solución**: Verifica que hayas configurado el secret en Supabase:
```bash
supabase secrets list
```

### Error: "Failed to send email"

**Posibles causas**:
1. API Key inválida o expirada
2. Dominio no verificado (si usas dominio personalizado)
3. Email de remitente no autorizado

**Solución**: 
- Verifica la API Key en Resend Dashboard
- Si usas dominio personalizado, asegúrate de que esté verificado
- Para pruebas, usa `onboarding@resend.dev` como remitente

### Email no llega

**Verificaciones**:
1. Revisa la carpeta de spam
2. Verifica en Resend Dashboard > Emails que el email se envió
3. Revisa los logs de la Edge Function en Supabase Dashboard
4. Verifica que el email del destinatario sea válido

### Edge Function no se despliega

**Solución**:
1. Verifica que estés autenticado: `supabase login`
2. Verifica que el proyecto esté vinculado: `supabase link`
3. Revisa que los archivos estén en `supabase/functions/send-ticket-email/`

## Personalización del Ticket

Para modificar el diseño del ticket, edita el archivo:
- `supabase/functions/send-ticket-email/ticket-template.ts`

La función `generateTicketHTML()` contiene todo el HTML/CSS del ticket. Puedes modificar:
- Colores
- Estilos
- Información mostrada
- Layout

**Nota**: Los emails HTML tienen limitaciones. Usa tablas para layout y CSS inline para mejor compatibilidad.

## Variables de Entorno Locales (Opcional)

Para desarrollo local, puedes crear un archivo `.env.local`:

```env
RESEND_API_KEY=tu_api_key_aqui
RESEND_FROM_EMAIL=noreply@tudominio.com
```

Sin embargo, las Edge Functions de Supabase usan los secrets configurados en el dashboard, no variables de entorno locales.

## Costos

- **Resend**: Gratis hasta 3,000 emails/mes, luego $20/mes por 50,000 emails
- **Supabase Edge Functions**: Incluido en el plan gratuito (500,000 invocaciones/mes)

## Seguridad

- **Nunca** commits la API Key de Resend al repositorio
- Usa Supabase Secrets para almacenar credenciales
- Verifica el dominio de email para mejor deliverability
- Los emails se envían solo cuando el estado cambia a `approved`

## Próximos Pasos

- Configurar webhooks de Resend para tracking de emails
- Agregar retry logic para fallos de envío
- Implementar cola de emails para alta concurrencia
- Agregar analytics de apertura/clics

---

**Última actualización**: Diciembre 2024

