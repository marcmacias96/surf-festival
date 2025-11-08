import type { Registration, RegistrationStatus } from '../services/registration';

export interface AdminStats {
  totalRegistrations: number;
  statsByCategory: Record<string, number>;
  statsByStatus: Record<RegistrationStatus, number>;
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;
  approvedAndRejectedByCategory: Record<string, number>;
}

export interface CategoryLabels {
  [key: string]: string;
}

export const CATEGORIES = ['Open Hombres', 'Open Mujeres', 'Mujeres Intermedio', 'Mujeres Principiante', 'Niños'];

export const CATEGORY_LABELS: CategoryLabels = {
  'Open Hombres': 'Open H',
  'Open Mujeres': 'Open M',
  'Mujeres Intermedio': 'M. Inter',
  'Mujeres Principiante': 'M. Princ',
  'Niños': 'Niños'
};

/**
 * Calcula todas las estadísticas a partir de las registraciones
 */
export function calculateStats(registrations: Registration[]): AdminStats {
  const totalRegistrations = registrations.length;
  
  const statsByCategory = registrations.reduce((acc, reg) => {
    acc[reg.category] = (acc[reg.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statsByStatus = registrations.reduce((acc, reg) => {
    acc[reg.status] = (acc[reg.status] || 0) + 1;
    return acc;
  }, {} as Record<RegistrationStatus, number>);

  const approvedCount = statsByStatus.approved || 0;
  const rejectedCount = statsByStatus.rejected || 0;
  const pendingCount = statsByStatus.pending || 0;

  const approvedAndRejectedByCategory = registrations
    .filter(reg => reg.status === 'approved' || reg.status === 'rejected')
    .reduce((acc, reg) => {
      acc[reg.category] = (acc[reg.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return {
    totalRegistrations,
    statsByCategory,
    statsByStatus,
    approvedCount,
    rejectedCount,
    pendingCount,
    approvedAndRejectedByCategory
  };
}

/**
 * Calcula el balance total basado en inscripciones aprobadas
 */
export function calculateBalance(approvedCount: number, registrationPrice: number): number {
  return approvedCount * registrationPrice;
}

