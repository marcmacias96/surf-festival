import { useEffect, useState } from 'react';
import type { RegistrationStatus } from '../../services/registration';

interface RegistrationActionsProps {
  registrationId: string;
  currentStatus: RegistrationStatus;
  onStatusUpdate?: (id: string, newStatus: RegistrationStatus) => void;
}

export default function RegistrationActions({
  registrationId,
  currentStatus,
  onStatusUpdate
}: RegistrationActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localStatus, setLocalStatus] = useState<RegistrationStatus>(currentStatus);

  // Sincronizar el estado local cuando cambia el prop
  useEffect(() => {
    setLocalStatus(currentStatus);
  }, [currentStatus]);

  // Función para actualizar el badge de estado en la tabla
  const updateStatusBadge = (newStatus: RegistrationStatus) => {
    // Encontrar la fila de la tabla que contiene este componente
    const row = document.querySelector(`tr[data-registration-id="${registrationId}"]`);
    if (!row) return;

    // Encontrar la celda de estado (penúltima columna antes de Acciones)
    const statusCell = row.querySelector('td:nth-last-child(2)');
    if (!statusCell) return;

    // Crear el nuevo badge según el estado
    const statusConfig = {
      pending: {
        text: 'Pendiente',
        classes: 'inline-block px-3 py-1 rounded-md border-2 border-yellow bg-yellow text-black font-heading text-xs font-bold uppercase'
      },
      approved: {
        text: 'Aprobada',
        classes: 'inline-block px-3 py-1 rounded-md border-2 border-success bg-success-light text-white-warm font-heading text-xs font-bold uppercase'
      },
      rejected: {
        text: 'Rechazada',
        classes: 'inline-block px-3 py-1 rounded-md border-2 border-error bg-error-light text-white-warm font-heading text-xs font-bold uppercase'
      }
    };

    const config = statusConfig[newStatus];
    statusCell.innerHTML = `<span class="${config.classes}">${config.text}</span>`;
  };

  // Función para actualizar las estadísticas en la página
  const updateStats = (oldStatus: RegistrationStatus, newStatus: RegistrationStatus) => {
    // Disparar evento personalizado para que otros componentes puedan escuchar
    window.dispatchEvent(new CustomEvent('registration-status-updated', {
      detail: { registrationId, oldStatus, newStatus }
    }));
  };

  const handleStatusChange = async (newStatus: RegistrationStatus) => {
    console.log('[RegistrationActions] handleStatusChange llamado:', { registrationId, newStatus, currentStatus: localStatus });
    
    if (newStatus === localStatus) {
      console.log('[RegistrationActions] El estado es el mismo, no se hace nada');
      return;
    }

    setLoading(true);
    setError(null);

    const oldStatus = localStatus;

    try {
      console.log('[RegistrationActions] Enviando petición a /api/registrations/update-status');
      
      const response = await fetch('/api/registrations/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId,
          status: newStatus,
        }),
      });

      console.log('[RegistrationActions] Respuesta recibida:', response.status, response.statusText);

      const data = await response.json();
      console.log('[RegistrationActions] Datos de respuesta:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar el estado');
      }

      console.log('[RegistrationActions] Estado actualizado exitosamente');
      
      // Actualizar el estado local
      setLocalStatus(newStatus);
      
      // Actualizar el badge en la tabla
      updateStatusBadge(newStatus);
      
      // Actualizar estadísticas
      updateStats(oldStatus, newStatus);
      
      // Llamar al callback si existe
      if (typeof onStatusUpdate === 'function') {
        console.log('[RegistrationActions] Llamando callback onStatusUpdate');
        onStatusUpdate(registrationId, newStatus);
      }
    } catch (err: any) {
      console.error('[RegistrationActions] Error al actualizar estado:', err);
      setError(err.message || 'Error al actualizar el estado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-1">
      {error && (
        <div className="text-xs text-error font-medium mb-1">{error}</div>
      )}

      <div className="flex flex-row gap-1">
        {localStatus !== 'approved' && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('[RegistrationActions] Botón Validar clickeado');
              handleStatusChange('approved');
            }}
            disabled={loading}
            title="Validar"
            aria-label="Validar inscripción"
            className="w-7 h-7 flex items-center justify-center bg-success-light text-white-warm border border-black rounded hover:bg-success transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
          >
            {loading ? '...' : '✓'}
          </button>
        )}
        
        {localStatus !== 'rejected' && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('[RegistrationActions] Botón Rechazar clickeado');
              handleStatusChange('rejected');
            }}
            disabled={loading}
            title="Rechazar"
            aria-label="Rechazar inscripción"
            className="w-7 h-7 flex items-center justify-center bg-error-light text-white-warm border border-black rounded hover:bg-error transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
          >
            {loading ? '...' : '✗'}
          </button>
        )}

        {localStatus !== 'pending' && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('[RegistrationActions] Botón Pendiente clickeado');
              handleStatusChange('pending');
            }}
            disabled={loading}
            title="Marcar como pendiente"
            aria-label="Marcar inscripción como pendiente"
            className="w-7 h-7 flex items-center justify-center bg-yellow text-black border border-black rounded hover:bg-yellow/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
          >
            {loading ? '...' : '↻'}
          </button>
        )}
      </div>
    </div>
  );
}

