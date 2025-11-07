import { supabase } from './supabase';

const BUCKET_NAME = 'payment-receipts';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf'
];

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Valida que el archivo cumpla con los requisitos
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  // Validar tamaño
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `El archivo es demasiado grande. Tamaño máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`
    };
  }

  // Validar tipo MIME
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Tipo de archivo no permitido. Solo se aceptan: PDF, JPG, JPEG, PNG'
    };
  }

  return { valid: true };
}

/**
 * Genera un nombre único para el archivo
 */
function generateFileName(registrationId: string, originalFileName: string): string {
  const timestamp = Date.now();
  const extension = originalFileName.split('.').pop();
  const sanitizedName = originalFileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .substring(0, 50);
  
  return `${registrationId}/${timestamp}-${sanitizedName}`;
}

/**
 * Sube un comprobante de pago a Supabase Storage
 * @param file - Archivo a subir
 * @param registrationId - ID del registro (se genera antes de crear el registro)
 * @returns URL pública del archivo subido
 */
export async function uploadPaymentReceipt(
  file: File,
  registrationId: string
): Promise<UploadResult> {
  // Validar archivo
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Generar nombre único
  const fileName = generateFileName(registrationId, file.name);
  const filePath = `${fileName}`;

  // Subir archivo a Supabase Storage
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false // No sobrescribir archivos existentes
    });

  if (error) {
    throw new Error(`Error al subir el archivo: ${error.message}`);
  }

  // Obtener URL pública del archivo
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  if (!urlData?.publicUrl) {
    throw new Error('Error al obtener la URL pública del archivo');
  }

  return {
    url: urlData.publicUrl,
    path: filePath
  };
}

/**
 * Elimina un comprobante de pago de Supabase Storage
 * @param filePath - Ruta del archivo en Storage
 */
export async function deletePaymentReceipt(filePath: string): Promise<void> {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    throw new Error(`Error al eliminar el archivo: ${error.message}`);
  }
}

/**
 * Obtiene la URL pública de un comprobante de pago
 * @param filePath - Ruta del archivo en Storage
 * @returns URL pública del archivo
 */
export function getPaymentReceiptUrl(filePath: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return data?.publicUrl || '';
}

