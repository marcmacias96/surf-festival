import type { APIRoute } from 'astro';
import { sendTicketEmail } from '../../../services/email';
import type { RegistrationStatus } from '../../../services/registration';
import { createServerClient } from '../../../services/supabase-server';

/**
 * API endpoint para actualizar el estado de una inscripción
 * POST /api/registrations/update-status
 * Body: { registrationId: string, status: 'pending' | 'approved' | 'rejected' }
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    console.log('[Update Status API] ===== INICIANDO ACTUALIZACIÓN DE ESTADO =====');
    
    // Verificar autenticación
    const supabase = createServerClient(cookies, request);
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error('[Update Status API] No autenticado:', sessionError?.message);
      return new Response(
        JSON.stringify({ error: 'No autorizado. Debes estar autenticado.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[Update Status API] Usuario autenticado:', session.user.id);

    // Parsear body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Body inválido. Se espera JSON.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { registrationId, status } = body;

    // Validar campos requeridos
    if (!registrationId || !status) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos requeridos: registrationId y status' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar que el estado sea válido
    const validStatuses: RegistrationStatus[] = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return new Response(
        JSON.stringify({ error: `Estado inválido. Debe ser uno de: ${validStatuses.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[Update Status API] Actualizando inscripción:', { registrationId, status });

    // Actualizar el estado en Supabase
    const { data, error } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', registrationId)
      .select()
      .single();

    if (error) {
      console.error('[Update Status API] Error al actualizar:', error.message);
      return new Response(
        JSON.stringify({ error: error.message || 'Error al actualizar el estado' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!data) {
      return new Response(
        JSON.stringify({ error: 'No se encontró la inscripción' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[Update Status API] Estado actualizado exitosamente');

    // Si la inscripción fue aprobada, enviar email con ticket
    if (status === 'approved') {
      console.log('[Update Status API] Inscripción aprobada, enviando email con ticket...');
      
      // Enviar email de forma asíncrona (no bloquea la respuesta)
      sendTicketEmail({
        name: data.name,
        email: data.email,
        category: data.category,
        registrationId: data.id,
      }).then((result) => {
        if (result.success) {
          console.log('[Update Status API] Email enviado exitosamente. Message ID:', result.messageId);
        } else {
          console.error('[Update Status API] Error al enviar email:', result.error);
          // No lanzamos error aquí para no afectar la actualización del estado
        }
      }).catch((error) => {
        console.error('[Update Status API] Error inesperado al enviar email:', error);
        // No lanzamos error aquí para no afectar la actualización del estado
      });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        registration: data 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('[Update Status API] Error inesperado:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return new Response(
      JSON.stringify({ 
        error: 'Error al procesar la solicitud',
        details: import.meta.env.DEV ? errorMessage : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

