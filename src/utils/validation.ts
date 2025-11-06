import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(255, 'Nombre muy largo'),
  email: z.string().email('Email inválido').max(255, 'Email muy largo'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Teléfono inválido. Debe tener entre 10 y 15 dígitos'),
  category: z.enum([
    'Open Hombres',
    'Open Mujeres',
    'Mujeres Intermedio',
    'Mujeres Principiante',
    'Niños'
  ], {
    errorMap: () => ({ message: 'Debes seleccionar una categoría válida' })
  }),
  age: z.number().min(8, 'Edad mínima: 8 años').max(100, 'Edad inválida')
});

export type RegistrationData = z.infer<typeof registrationSchema>;

