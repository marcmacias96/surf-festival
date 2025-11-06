import { supabase } from './supabase';
import { registrationSchema, type RegistrationData } from '../utils/validation';

export async function createRegistration(data: RegistrationData) {
  // Validar datos con Zod
  const validated = registrationSchema.parse(data);

  // Insertar en Supabase
  const { data: result, error } = await supabase
    .from('registrations')
    .insert([validated])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return result;
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('registrations')
    .select('email')
    .eq('email', email)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    throw new Error(error.message);
  }

  return !!data;
}

