import type { FormEvent } from 'react';
import { useState } from 'react';
import { supabase } from '../../services/supabase';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Login directo con Supabase desde el cliente
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      console.log('Login successful, session:', data.session);

      if (data.session) {
        // Esperar un momento para que las cookies se establezcan
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Redirigir al admin después del login exitoso
        window.location.href = '/admin';
      } else {
        setError('No se pudo crear la sesión');
        setLoading(false);
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Error al procesar el formulario';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-error-light/20 border-2 border-error rounded-md p-4">
          <p className="font-body text-sm text-error font-medium">{error}</p>
        </div>
      )}

      {/* Campo Email */}
      <div>
        <label 
          htmlFor="email" 
          className="block font-heading text-sm font-semibold uppercase tracking-wide text-black mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full px-5 py-4 border-[3px] rounded-md font-body text-base bg-white-warm text-dark border-black focus:outline-none focus:border-yellow focus:shadow-[0_0_0_3px_rgba(255,215,0,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="admin@festival.com"
        />
      </div>

      {/* Campo Password */}
      <div>
        <label 
          htmlFor="password" 
          className="block font-heading text-sm font-semibold uppercase tracking-wide text-black mb-2"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="w-full px-5 py-4 border-[3px] rounded-md font-body text-base bg-white-warm text-dark border-black focus:outline-none focus:border-yellow focus:shadow-[0_0_0_3px_rgba(255,215,0,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="••••••••"
        />
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white-warm px-6 py-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] font-heading text-base font-bold uppercase tracking-wide hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}

