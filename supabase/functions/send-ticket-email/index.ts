import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const RESEND_FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'noreply@sanmateolongfest.com';

interface RequestBody {
  name: string;
  email: string;
  category: string;
  registrationId: string;
  status: 'approved' | 'rejected';
  rejectionReason?: string;
}

interface ResendResponse {
  id?: string;
  error?: {
    message: string;
  };
}

serve(async (req) => {
  console.log('[Send Ticket Email] ===== INICIANDO FUNCIÓN =====');
  console.log('[Send Ticket Email] Método:', req.method);
  console.log('[Send Ticket Email] URL:', req.url);
  
  // Solo permitir POST
  if (req.method !== 'POST') {
    console.log('[Send Ticket Email] Método no permitido:', req.method);
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Verificar configuración de variables de entorno
    console.log('[Send Ticket Email] Verificando configuración...');
    console.log('[Send Ticket Email] RESEND_API_KEY configurada:', !!RESEND_API_KEY);
    console.log('[Send Ticket Email] RESEND_FROM_EMAIL:', RESEND_FROM_EMAIL);
    
    if (!RESEND_API_KEY) {
      console.error('[Send Ticket Email] ERROR: RESEND_API_KEY no está configurada');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parsear el body
    console.log('[Send Ticket Email] Parseando body...');
    let body: RequestBody;
    try {
      const bodyText = await req.text();
      console.log('[Send Ticket Email] Body recibido (primeros 200 chars):', bodyText.substring(0, 200));
      body = JSON.parse(bodyText);
    } catch (parseError) {
      console.error('[Send Ticket Email] ERROR al parsear body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body', details: parseError instanceof Error ? parseError.message : 'Unknown error' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const { name, email, category, registrationId, status, rejectionReason } = body;
    console.log('[Send Ticket Email] Datos recibidos:', {
      name,
      email,
      category,
      registrationId: registrationId ? `${registrationId.substring(0, 8)}...` : 'undefined',
      status,
      rejectionReason: rejectionReason ? `${rejectionReason.substring(0, 50)}...` : 'undefined'
    });

    // Validar campos requeridos
    if (!name || !email || !category || !registrationId || !status) {
      console.error('[Send Ticket Email] ERROR: Campos faltantes:', {
        name: !!name,
        email: !!email,
        category: !!category,
        registrationId: !!registrationId,
        status: !!status
      });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, category, registrationId, status' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar que el estado sea válido
    if (status !== 'approved' && status !== 'rejected') {
      console.error('[Send Ticket Email] ERROR: Estado inválido:', status);
      return new Response(
        JSON.stringify({ error: 'Invalid status. Must be "approved" or "rejected"' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Si es rechazo, validar que haya motivo
    if (status === 'rejected' && !rejectionReason) {
      console.error('[Send Ticket Email] ERROR: Motivo de rechazo faltante');
      return new Response(
        JSON.stringify({ error: 'Missing required field: rejectionReason (required when status is "rejected")' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[Send Ticket Email] Validación exitosa. Preparando email para:', email);

    // Formatear el ID para mostrar (primeros 8 caracteres)
    const shortId = registrationId.substring(0, 8).toUpperCase();
    console.log('[Send Ticket Email] ID formateado:', shortId);

    // Generar contenido HTML según el estado
    console.log('[Send Ticket Email] Generando contenido HTML para estado:', status);
    const emailContent = status === 'approved' 
      ? generateApprovalEmail(name, category, shortId)
      : generateRejectionEmail(name, category, shortId, rejectionReason || '');

    console.log('[Send Ticket Email] Contenido HTML generado. Longitud:', emailContent.length, 'caracteres');
    
    // Preparar payload para Resend según el estado
    const subject = status === 'approved' 
      ? '✅ Inscripción Aprobada - San Mateo Longboard Festival'
      : '❌ Inscripción Rechazada - San Mateo Longboard Festival';
    
    const resendPayload = {
      from: RESEND_FROM_EMAIL,
      to: [email],
      subject,
      html: emailContent,
    };
    
    console.log('[Send Ticket Email] Payload para Resend:', {
      from: resendPayload.from,
      to: resendPayload.to,
      subject: resendPayload.subject,
      htmlLength: resendPayload.html.length
    });

    // Enviar email usando Resend API
    console.log('[Send Ticket Email] Enviando request a Resend API...');
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(resendPayload),
    });

    console.log('[Send Ticket Email] Respuesta de Resend recibida. Status:', resendResponse.status, resendResponse.statusText);
    console.log('[Send Ticket Email] Headers de respuesta:', Object.fromEntries(resendResponse.headers.entries()));

    let resendData: ResendResponse;
    try {
      const responseText = await resendResponse.text();
      console.log('[Send Ticket Email] Body de respuesta (primeros 500 chars):', responseText.substring(0, 500));
      resendData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('[Send Ticket Email] ERROR al parsear respuesta de Resend:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to parse Resend response',
          details: parseError instanceof Error ? parseError.message : 'Unknown error',
          status: resendResponse.status,
          statusText: resendResponse.statusText
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[Send Ticket Email] Datos parseados de Resend:', resendData);

    if (!resendResponse.ok) {
      console.error('[Send Ticket Email] ERROR: Resend retornó error');
      console.error('[Send Ticket Email] Status:', resendResponse.status);
      console.error('[Send Ticket Email] Error details:', resendData.error);
      console.error('[Send Ticket Email] Response completa:', JSON.stringify(resendData, null, 2));
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send email',
          details: resendData.error?.message || 'Unknown error from Resend',
          resendStatus: resendResponse.status,
          resendResponse: resendData
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[Send Ticket Email] Email enviado exitosamente. ID:', resendData.id);

    return new Response(
      JSON.stringify({ 
        success: true,
        messageId: resendData.id 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('[Send Ticket Email] Error inesperado:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: errorMessage 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Genera el contenido HTML para email de aprobación
 */
function generateApprovalEmail(name: string, category: string, shortId: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #000;">¡Tu inscripción ha sido aprobada!</h2>
  
  <p>Hola <strong>${escapeHtml(name)}</strong>,</p>
  
  <p>Nos complace informarte que tu inscripción para el <strong>San Mateo Longboard Festival</strong> ha sido aprobada.</p>
  
  <div style="background-color: #f5f5f5; border-left: 4px solid #000; padding: 15px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #000;">Detalles de tu inscripción:</h3>
    <p style="margin: 5px 0;"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
    <p style="margin: 5px 0;"><strong>Categoría:</strong> ${escapeHtml(category)}</p>
    <p style="margin: 5px 0;"><strong>ID de Registro:</strong> <code style="background-color: #e0e0e0; padding: 2px 6px; border-radius: 3px;">${shortId}</code></p>
    <p style="margin: 5px 0;"><strong>Fecha del Evento:</strong> Diciembre 2025</p>
  </div>
  
  <p>Presenta este email el día del evento para confirmar tu participación.</p>
  
  <p>Si tienes alguna pregunta, no dudes en contactarnos:</p>
  <p style="margin: 10px 0;">
    📧 Email: sanmateolongfestival@gmail.com<br>
    📱 WhatsApp: +593 96 931 0187
  </p>
  
  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
  
  <p style="font-size: 12px; color: #666;">
    San Mateo Longboard Festival - III Edición 2025
  </p>
</body>
</html>
  `.trim();
}

/**
 * Genera el contenido HTML para email de rechazo
 */
function generateRejectionEmail(name: string, category: string, shortId: string, rejectionReason: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #000;">Actualización sobre tu inscripción</h2>
  
  <p>Hola <strong>${escapeHtml(name)}</strong>,</p>
  
  <p>Lamentamos informarte que tu inscripción para el <strong>San Mateo Longboard Festival</strong> no ha sido aprobada en esta ocasión.</p>
  
  <div style="background-color: #f5f5f5; border-left: 4px solid #000; padding: 15px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #000;">Detalles de tu inscripción:</h3>
    <p style="margin: 5px 0;"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
    <p style="margin: 5px 0;"><strong>Categoría:</strong> ${escapeHtml(category)}</p>
    <p style="margin: 5px 0;"><strong>ID de Registro:</strong> <code style="background-color: #e0e0e0; padding: 2px 6px; border-radius: 3px;">${shortId}</code></p>
  </div>
  
  <div style="background-color: #fff3cd; border-left: 4px solid #ff9800; padding: 15px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #000;">Motivo del rechazo:</h3>
    <p style="margin: 0; color: #333;">${escapeHtml(rejectionReason)}</p>
  </div>
  
  <p>Si tienes alguna pregunta o deseas más información sobre esta decisión, no dudes en contactarnos:</p>
  <p style="margin: 10px 0;">
    📧 Email: sanmateolongfestival@gmail.com<br>
    📱 WhatsApp: +593 96 931 0187
  </p>
  
  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
  
  <p style="font-size: 12px; color: #666;">
    San Mateo Longboard Festival - III Edición 2025
  </p>
</body>
</html>
  `.trim();
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

