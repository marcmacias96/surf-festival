import { supabaseConfig } from './supabase-server';

export interface SendTicketEmailParams {
  name: string;
  email: string;
  category: string;
  registrationId: string;
}

/**
 * Envía un email con el ticket de registro usando la Edge Function de Supabase
 */
export async function sendTicketEmail(params: SendTicketEmailParams): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const { name, email, category, registrationId } = params;

    // Validar campos requeridos
    if (!name || !email || !category || !registrationId) {
      throw new Error('Missing required fields: name, email, category, registrationId');
    }

    // Construir la URL de la Edge Function
    const functionUrl = `${supabaseConfig.url}/functions/v1/send-ticket-email`;

    console.log('[Email Service] ===== INVOCANDO EDGE FUNCTION =====');
    console.log('[Email Service] URL:', functionUrl);
    console.log('[Email Service] Supabase URL:', supabaseConfig.url);
    console.log('[Email Service] Datos a enviar:', {
      name,
      email,
      category,
      registrationId: registrationId ? `${registrationId.substring(0, 8)}...` : 'undefined'
    });

    // Preparar payload
    const payload = {
      name,
      email,
      category,
      registrationId,
    };
    
    console.log('[Email Service] Payload completo:', JSON.stringify(payload, null, 2));

    // Invocar la Edge Function
    console.log('[Email Service] Enviando request...');
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseConfig.anonKey}`,
      },
      body: JSON.stringify(payload),
    });

    console.log('[Email Service] Respuesta recibida. Status:', response.status, response.statusText);
    console.log('[Email Service] Headers de respuesta:', Object.fromEntries(response.headers.entries()));

    let data: any;
    try {
      const responseText = await response.text();
      console.log('[Email Service] Body de respuesta (primeros 500 chars):', responseText.substring(0, 500));
      data = JSON.parse(responseText);
      console.log('[Email Service] Datos parseados:', JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.error('[Email Service] ERROR al parsear respuesta:', parseError);
      return {
        success: false,
        error: `Failed to parse response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`,
      };
    }

    if (!response.ok) {
      console.error('[Email Service] ERROR: Edge Function retornó error');
      console.error('[Email Service] Status:', response.status);
      console.error('[Email Service] Error details:', data.error || data.details);
      console.error('[Email Service] Response completa:', JSON.stringify(data, null, 2));
      
      return {
        success: false,
        error: data.error || data.details || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    console.log('[Email Service] Email enviado exitosamente. Message ID:', data.messageId);

    return {
      success: true,
      messageId: data.messageId,
    };

  } catch (error) {
    console.error('[Email Service] Error inesperado:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: errorMessage,
    };
  }
}

