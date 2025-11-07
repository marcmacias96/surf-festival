import type { APIRoute } from 'astro';

/**
 * API endpoint para login
 * POST /api/auth/login
 * Body: { email: string, password: string }
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  // Log inmediato para verificar que el endpoint se está ejecutando
  console.log('=== LOGIN API ENDPOINT EJECUTADO ===');
  console.error('=== LOGIN API ENDPOINT EJECUTADO (stderr) ===');
  
  // Test: responder inmediatamente para verificar que el endpoint funciona
  // Descomentar esto temporalmente para probar:
  // return new Response(JSON.stringify({ test: 'endpoint funciona' }), { 
  //   status: 200, 
  //   headers: { 'Content-Type': 'application/json' } 
  // });
  
  try {
    console.log('[Login API] ===== INICIANDO LOGIN =====');
    console.log('[Login API] Request method:', request.method);
    console.log('[Login API] Request URL:', request.url);
    
    // Importar dinámicamente para evitar errores de importación
    const { createServerClient } = await import('../../../services/supabase-server');
    
    // Validar variables de entorno primero
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('[Login API] SUPABASE_URL:', supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'NO CONFIGURADO');
    console.log('[Login API] SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Configurado' : 'NO CONFIGURADO');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('[Login API] ERROR: Variables de entorno faltantes');
      return new Response(
        JSON.stringify({ error: 'Configuración del servidor incompleta' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Parsear body
    let body;
    try {
      body = await request.json();
      console.log('[Login API] Body parseado correctamente');
    } catch (parseError) {
      console.error('[Login API] Error al parsear JSON:', parseError);
      return new Response(
        JSON.stringify({ error: 'Formato de solicitud inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const { email, password } = body;

    if (!email || !password) {
      console.log('[Login API] Email o contraseña faltantes');
      return new Response(
        JSON.stringify({ error: 'Email y contraseña son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[Login API] Credenciales recibidas para:', email);

    // Crear cliente Supabase con manejo de cookies del servidor
    let supabase;
    try {
      console.log('[Login API] Creando cliente Supabase...');
      supabase = createServerClient(cookies, request);
      console.log('[Login API] Cliente Supabase creado exitosamente');
    } catch (clientError) {
      console.error('[Login API] Error al crear cliente Supabase:', clientError);
      const errorMsg = clientError instanceof Error ? clientError.message : 'Error desconocido';
      return new Response(
        JSON.stringify({ 
          error: 'Error al inicializar cliente de autenticación',
          details: import.meta.env.DEV ? errorMsg : undefined
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Intentar login
    let data, error;
    try {
      console.log('[Login API] Intentando autenticación con Supabase...');
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      data = result.data;
      error = result.error;
      console.log('[Login API] Respuesta de Supabase recibida');
    } catch (authError) {
      console.error('[Login API] Error en signInWithPassword:', authError);
      const errorMsg = authError instanceof Error ? authError.message : 'Error desconocido';
      return new Response(
        JSON.stringify({ 
          error: 'Error al autenticar',
          details: import.meta.env.DEV ? errorMsg : undefined
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (error) {
      console.error('[Login API] Error:', error.message);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!data.session) {
      return new Response(
        JSON.stringify({ error: 'No se pudo crear la sesión' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Establecer cookies manualmente según la documentación oficial de Astro + Supabase
    // https://docs.astro.build/en/guides/backend/supabase/
    const { access_token, refresh_token } = data.session;
    
    cookies.set("sb-access-token", access_token, {
      path: "/",
      httpOnly: false, // Permitir acceso desde cliente y servidor
      secure: import.meta.env.PROD,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    cookies.set("sb-refresh-token", refresh_token, {
      path: "/",
      httpOnly: false, // Permitir acceso desde cliente y servidor
      secure: import.meta.env.PROD,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });

    console.log('[Login API] Login exitoso para:', email);
    console.log('[Login API] Cookies establecidas correctamente');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Login exitoso'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    console.error('[Login API] Error inesperado:', e);
    const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
    const errorStack = e instanceof Error ? e.stack : undefined;
    console.error('[Login API] Stack trace:', errorStack);
    return new Response(
      JSON.stringify({ 
        error: 'Error interno del servidor',
        details: import.meta.env.DEV ? errorMessage : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
