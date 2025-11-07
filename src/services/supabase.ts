import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * SINGLETON PATTERN - Cliente de Supabase para el navegador
 * Esta clase garantiza una única instancia del cliente Supabase en toda la aplicación
 */
class SupabaseBrowserClient {
  private static instance: SupabaseClient | null = null;

  private constructor() {
    // Constructor privado para prevenir instanciación directa
  }

  /**
   * Obtiene la instancia singleton del cliente Supabase para el navegador
   * @returns Instancia única del cliente Supabase
   */
  public static getInstance(): SupabaseClient {
    if (!SupabaseBrowserClient.instance) {
      const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
      const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

      if (!import.meta.env.PUBLIC_SUPABASE_URL || !import.meta.env.PUBLIC_SUPABASE_ANON_KEY) {
        console.warn('[Supabase Browser] Credentials not found. Please set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY in your .env file');
      }

      // Crear la única instancia del cliente
      SupabaseBrowserClient.instance = createBrowserClient(supabaseUrl, supabaseAnonKey);
      console.log('[Supabase Browser] Singleton instance created');
    }

    return SupabaseBrowserClient.instance;
  }

  /**
   * Resetea la instancia singleton (útil para testing)
   * @internal
   */
  public static resetInstance(): void {
    SupabaseBrowserClient.instance = null;
  }
}

/**
 * Instancia singleton del cliente Supabase para el navegador
 * Maneja cookies automáticamente y mantiene el estado de autenticación
 *
 * @example
 * ```typescript
 * import { supabase } from './services/supabase';
 *
 * // Login
 * const { data, error } = await supabase.auth.signInWithPassword({
 *   email: 'user@example.com',
 *   password: 'password'
 * });
 *
 * // Query
 * const { data: registrations } = await supabase
 *   .from('registrations')
 *   .select('*');
 * ```
 */
export const supabase = SupabaseBrowserClient.getInstance();

