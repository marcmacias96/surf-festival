import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { AstroCookies } from 'astro';

/**
 * SINGLETON CONFIGURATION
 * Configuración centralizada de Supabase para el servidor
 */
class SupabaseServerConfig {
  private static instance: SupabaseServerConfig;

  public readonly url: string;
  public readonly anonKey: string;

  private constructor() {
    this.url = import.meta.env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    this.anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

    if (!import.meta.env.PUBLIC_SUPABASE_URL || !import.meta.env.PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('[Supabase Server] Credentials not found. Please set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY in your .env file');
    }
  }

  public static getInstance(): SupabaseServerConfig {
    if (!SupabaseServerConfig.instance) {
      SupabaseServerConfig.instance = new SupabaseServerConfig();
    }
    return SupabaseServerConfig.instance;
  }
}

/**
 * Obtiene la instancia singleton de la configuración de Supabase
 */
export const supabaseConfig = SupabaseServerConfig.getInstance();

/**
 * Crea un cliente de Supabase para uso en el servidor (Astro)
 * usando @supabase/ssr para manejar cookies correctamente
 *
 * NOTA: Aunque esta función crea instancias por request (necesario para SSR),
 * la configuración (URL, keys) se gestiona mediante singleton
 *
 * @param cookies - Objeto de cookies de Astro
 * @param request - Request object con headers (opcional, puede ser Request o { headers: Headers })
 * @returns Cliente de Supabase configurado para el servidor
 */
export function createServerClient(
  cookies: AstroCookies, 
  request?: Request | { headers: Headers }
): SupabaseClient {
  try {
    // Validar configuración
    if (!supabaseConfig.url || supabaseConfig.url === 'https://placeholder.supabase.co') {
      throw new Error('PUBLIC_SUPABASE_URL no está configurado');
    }
    if (!supabaseConfig.anonKey || supabaseConfig.anonKey === 'placeholder-key') {
      throw new Error('PUBLIC_SUPABASE_ANON_KEY no está configurado');
    }

    // Obtener headers del request (puede ser Request o { headers: Headers })
    const headers = request instanceof Request 
      ? request.headers 
      : request?.headers || new Headers();

    console.log('[Supabase Server] Creando cliente con URL:', supabaseConfig.url.substring(0, 30) + '...');

    return createSupabaseServerClient(supabaseConfig.url, supabaseConfig.anonKey, {
    cookies: {
      getAll() {
        // Obtener cookies del header del request
        const allCookies: Array<{ name: string; value: string }> = [];
        const cookieHeader = headers.get('cookie') || '';

        if (cookieHeader) {
          cookieHeader.split(';').forEach((cookie) => {
            const [name, ...valueParts] = cookie.trim().split('=');
            if (name && valueParts.length > 0) {
              const cookieName = name.trim();
              const cookieValue = decodeURIComponent(valueParts.join('='));
              allCookies.push({
                name: cookieName,
                value: cookieValue
              });
            }
          });
        }

        console.log(`[Supabase Server] Total cookies from header: ${allCookies.length}`);
        return allCookies;
      },
      setAll(cookiesToSet) {
        // Set cookies with proper configuration for Supabase Auth SSR
        cookiesToSet.forEach(({ name, value, options }) => {
          // Prepare cookie options
          const cookieOptions: any = {
            path: options?.path || '/',
            httpOnly: false, // Must be false for SSR to work properly with browser client
            secure: options?.secure ?? import.meta.env.PROD,
            sameSite: (options?.sameSite as 'lax' | 'strict' | 'none') || 'lax',
          };

          // Add maxAge if defined
          if (options?.maxAge !== undefined) {
            cookieOptions.maxAge = options.maxAge;
          }

          console.log(`[Supabase Server] Setting cookie: ${name}`);
          cookies.set(name, value, cookieOptions);
        });
      },
    },
  });
  } catch (error) {
    console.error('[Supabase Server] Error al crear cliente:', error);
    throw error;
  }
}

