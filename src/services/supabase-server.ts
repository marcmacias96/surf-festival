import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

/**
 * Crea un cliente de Supabase para uso en el servidor (Astro)
 * usando @supabase/ssr para manejar cookies correctamente
 */
export function createServerClient(cookies: AstroCookies, request?: { headers: Headers }) {
  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        // Get all cookies from HTTP headers
        const allCookies: Array<{ name: string; value: string }> = [];
        const cookieHeader = request?.headers.get('cookie') || '';

        console.log('[getAll] Raw cookie header:', cookieHeader ? 'EXISTS' : 'MISSING');

        if (cookieHeader) {
          cookieHeader.split(';').forEach((cookie) => {
            const [name, ...valueParts] = cookie.trim().split('=');
            if (name && valueParts.length > 0) {
              const cookieName = name.trim();
              const cookieValue = decodeURIComponent(valueParts.join('='));

              // Try to get the cookie value from Astro cookies first (more reliable)
              // If not available, use the header value
              try {
                const astroCookieValue = cookies.get(cookieName);
                const finalValue = astroCookieValue?.value || cookieValue;
                allCookies.push({
                  name: cookieName,
                  value: finalValue
                });

                // Log only Supabase cookies
                if (cookieName.startsWith('sb-')) {
                  console.log(`[getAll] Found cookie: ${cookieName} (length: ${finalValue.length})`);
                }
              } catch {
                // Fallback to header value if Astro cookies fails
                allCookies.push({
                  name: cookieName,
                  value: cookieValue
                });
              }
            }
          });
        }

        console.log(`[getAll] Total cookies found: ${allCookies.length}`);
        return allCookies;
      },
      setAll(cookiesToSet) {
        // Establecer cookies usando Astro cookies API
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, {
            path: options?.path || '/',
            httpOnly: options?.httpOnly ?? true,
            secure: options?.secure ?? import.meta.env.PROD,
            sameSite: (options?.sameSite as 'lax' | 'strict' | 'none') || 'lax',
            maxAge: options?.maxAge,
          });
        });
      },
    },
  });
}

