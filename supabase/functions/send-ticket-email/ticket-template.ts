/**
 * Plantilla HTML/CSS para el ticket de registro
 * Diseño basado en el escudo del logo del festival
 */

export interface TicketData {
  name: string;
  category: string;
  registrationId: string;
  logoUrl?: string;
}

export function generateTicketHTML(data: TicketData): string {
  const { name, category, registrationId, logoUrl = 'https://sanmateolongfest.com/logo_xl.png' } = data;

  // Formatear el ID para mostrar (primeros 8 caracteres)
  const shortId = registrationId.substring(0, 8).toUpperCase();

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ticket de Registro - San Mateo Longboard Festival</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Contenedor principal del escudo -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #f5f0e8; border: 8px solid #000000; border-radius: 0 0 30px 30px; overflow: hidden;">
          
          <!-- Logo circular pequeño en la parte superior -->
          <tr>
            <td align="center" style="padding: 20px 0 10px 0;">
              <table cellpadding="0" cellspacing="0" style="background-color: #f5f0e8; border: 2px solid #000000; border-radius: 50%; width: 120px; height: 120px; display: inline-block;">
                <tr>
                  <td align="center" valign="middle" style="padding: 15px;">
                    <img src="${logoUrl}" alt="San Mateo Long Fest" style="max-width: 90px; height: auto; display: block;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Título principal -->
          <tr>
            <td align="center" style="padding: 10px 20px 5px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="font-size: 32px; font-weight: bold; color: #000000; text-transform: uppercase; letter-spacing: 2px; line-height: 1.2;">
                    <span style="color: #ff69b4;">✦</span> SAN MATEO <span style="color: #ff69b4;">✦</span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 28px; font-weight: bold; color: #000000; text-transform: uppercase; letter-spacing: 1px; padding-top: 5px;">
                    LONGBOARD FESTIVAL
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Barra de fecha -->
          <tr>
            <td align="center" style="padding: 15px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffb84d; border-radius: 8px; border: 2px solid #000000;">
                <tr>
                  <td align="center" style="padding: 12px; font-size: 18px; font-weight: bold; color: #000000; text-transform: uppercase; letter-spacing: 1px;">
                    DICIEMBRE 2025
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Línea divisoria -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top: 2px solid #000000; padding: 0;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sección ilustrativa (simplificada para email) -->
          <tr>
            <td style="background: linear-gradient(to bottom, #ffeb3b 0%, #ff9800 50%, #ff69b4 100%); padding: 30px 20px; position: relative;">
              <!-- Información del participante sobre el fondo decorativo -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(245, 240, 232, 0.95); border: 3px solid #000000; border-radius: 12px; padding: 20px;">
                <tr>
                  <td align="center" style="padding-bottom: 15px;">
                    <div style="font-size: 16px; font-weight: bold; color: #000000; text-transform: uppercase; letter-spacing: 1px;">
                      TICKET DE REGISTRO
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-top: 2px solid #000000; border-bottom: 2px solid #000000;">
                    <table width="100%" cellpadding="5" cellspacing="0">
                      <tr>
                        <td style="font-size: 14px; font-weight: bold; color: #000000; text-transform: uppercase; width: 40%;">
                          Participante:
                        </td>
                        <td style="font-size: 14px; color: #000000; font-weight: bold;">
                          ${escapeHtml(name)}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; font-weight: bold; color: #000000; text-transform: uppercase; padding-top: 8px;">
                          Categoría:
                        </td>
                        <td style="font-size: 14px; color: #000000; font-weight: bold; padding-top: 8px;">
                          ${escapeHtml(category)}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; font-weight: bold; color: #000000; text-transform: uppercase; padding-top: 8px;">
                          ID de Registro:
                        </td>
                        <td style="font-size: 14px; color: #000000; font-weight: bold; padding-top: 8px; font-family: monospace;">
                          ${shortId}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 15px;">
                    <div style="font-size: 12px; color: #000000; font-style: italic;">
                      Presenta este ticket el día del evento
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pie del escudo -->
          <tr>
            <td style="background-color: #f5f0e8; padding: 15px 20px; border-top: 2px solid #000000;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="font-size: 11px; color: #666666; line-height: 1.5;">
                    San Mateo Longboard Festival - III Edición 2025<br/>
                    Para más información: sanmateolongfestival@gmail.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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

