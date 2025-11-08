import { supabase } from './supabase';
import { registrationSchema, type RegistrationData } from '../utils/validation';

export interface CreateRegistrationData extends RegistrationData {
  payment_receipt_url?: string;
}

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface Registration extends RegistrationData {
  id: string;
  payment_receipt_url?: string | null;
  status: RegistrationStatus;
  created_at: string;
  updated_at: string;
}

export async function getRegistrationByEmail(email: string): Promise<Registration | null> {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    throw new Error(error.message);
  }

  return data || null;
}

export async function createRegistration(data: CreateRegistrationData) {
  // Validar datos con Zod (sin payment_receipt_url, se agrega después)
  const { payment_receipt_url, ...registrationData } = data;
  const validated = registrationSchema.parse(registrationData);

  // Verificar si existe un registro con este email
  const existingRegistration = await getRegistrationByEmail(validated.email);

  if (existingRegistration) {
    // Si existe un registro rechazado, actualizarlo
    if (existingRegistration.status === 'rejected') {
      // Preparar datos para actualización
      const updateData: any = {
        ...validated,
        status: 'pending' // Cambiar estado a pending
      };

      // Agregar URL del comprobante si existe
      if (payment_receipt_url) {
        updateData.payment_receipt_url = payment_receipt_url;
      }

      // Actualizar el registro existente
      const { data: result, error } = await supabase
        .from('registrations')
        .update(updateData)
        .eq('id', existingRegistration.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return result;
    } else {
      // Si existe un registro con otro estado (pending o approved), lanzar error
      throw new Error('Este email ya tiene un registro activo');
    }
  }

  // Si no existe registro, crear uno nuevo
  // Preparar datos para inserción
  const insertData: any = {
    ...validated,
    status: 'pending' // Estado por defecto
  };

  // Agregar URL del comprobante si existe
  if (payment_receipt_url) {
    insertData.payment_receipt_url = payment_receipt_url;
  }

  // Insertar en Supabase
  const { data: result, error } = await supabase
    .from('registrations')
    .insert([insertData])
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

export async function getAllRegistrations(): Promise<Registration[]> {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function getRegistrationsByCategory(category: string): Promise<Registration[]> {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus
): Promise<Registration> {
  // Validar que el estado sea válido
  if (!['pending', 'approved', 'rejected'].includes(status)) {
    throw new Error('Estado inválido');
  }

  const { data, error } = await supabase
    .from('registrations')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getRegistrationsByStatus(status: RegistrationStatus): Promise<Registration[]> {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function getRegistrationsWithFilters(
  category?: string | null,
  status?: RegistrationStatus | null
): Promise<Registration[]> {
  let query = supabase
    .from('registrations')
    .select('*');

  // Aplicar filtro por categoría si existe
  if (category) {
    query = query.eq('category', category);
  }

  // Aplicar filtro por estado si existe
  if (status) {
    query = query.eq('status', status);
  }

  // Ordenar por fecha de creación (más recientes primero)
  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

