import { useEffect, useState } from 'react';
import type { RegistrationStatus } from '../../services/registration';
import Modal from '../ui/Modal';

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<RegistrationStatus | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionError, setRejectionError] = useState<string | null>(null);

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

  const handleStatusChangeClick = (newStatus: RegistrationStatus) => {
    console.log('[RegistrationActions] handleStatusChangeClick llamado:', { registrationId, newStatus, currentStatus: localStatus });
    
    if (newStatus === localStatus) {
      console.log('[RegistrationActions] El estado es el mismo, no se hace nada');
      return;
    }

    // Guardar el estado pendiente y mostrar modal de confirmación
    setPendingStatus(newStatus);
    setRejectionReason('');
    setRejectionError(null);
    setShowConfirmModal(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!pendingStatus) return;

    // Si es rechazo, validar que haya motivo
    if (pendingStatus === 'rejected' && !rejectionReason.trim()) {
      setRejectionError('El motivo de rechazo es obligatorio');
      return;
    }

    setLoading(true);
    setError(null);
    setRejectionError(null);
    setShowConfirmModal(false);

    const oldStatus = localStatus;
    const newStatus = pendingStatus;

    try {
      console.log('[RegistrationActions] Enviando petición a /api/registrations/update-status');
      
      const requestBody: any = {
        registrationId,
        status: newStatus,
      };

      // Agregar motivo de rechazo si es rechazo
      if (newStatus === 'rejected' && rejectionReason.trim()) {
        requestBody.rejectionReason = rejectionReason.trim();
      }

      const response = await fetch('/api/registrations/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
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

      // Limpiar estado pendiente
      setPendingStatus(null);
      setRejectionReason('');
    } catch (err: any) {
      console.error('[RegistrationActions] Error al actualizar estado:', err);
      setError(err.message || 'Error al actualizar el estado');
      // Reabrir el modal si hay error
      setPendingStatus(newStatus);
      setShowConfirmModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelStatusChange = () => {
    setShowConfirmModal(false);
    setPendingStatus(null);
    setRejectionReason('');
    setRejectionError(null);
  };

  const getConfirmTitle = () => {
    if (pendingStatus === 'approved') {
      return 'Confirmar Aprobación';
    } else if (pendingStatus === 'rejected') {
      return 'Confirmar Rechazo';
    }
    return 'Confirmar Cambio de Estado';
  };

  const getConfirmMessage = () => {
    if (pendingStatus === 'approved') {
      return '¿Estás seguro de que deseas aprobar esta inscripción? Se enviará un email de confirmación al participante.';
    } else if (pendingStatus === 'rejected') {
      return '¿Estás seguro de que deseas rechazar esta inscripción? Se enviará un email al participante con el motivo del rechazo.';
    }
    return '¿Estás seguro de que deseas cambiar el estado de esta inscripción?';
  };

  return (
    <>
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
                handleStatusChangeClick('approved');
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
                handleStatusChangeClick('rejected');
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
                handleStatusChangeClick('pending');
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

      {/* Modal de confirmación */}
      <Modal
        isOpen={showConfirmModal}
        onClose={handleCancelStatusChange}
        title={getConfirmTitle()}
      >
        <div className="space-y-4">
          <p className="text-base text-black">
            {getConfirmMessage()}
          </p>

          {pendingStatus === 'rejected' && (
            <div className="space-y-2">
              <label htmlFor="rejection-reason" className="block text-sm font-bold text-black uppercase">
                Motivo del rechazo <span className="text-error">*</span>
              </label>
              <textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(e) => {
                  setRejectionReason(e.target.value);
                  setRejectionError(null);
                }}
                placeholder="Ingresa el motivo del rechazo..."
                rows={4}
                className="w-full px-4 py-2 border-2 border-black rounded-md font-body text-base text-black focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent resize-none"
                required
              />
              {rejectionError && (
                <p className="text-sm text-error font-medium">{rejectionError}</p>
              )}
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4 border-t-2 border-black">
            <button
              onClick={handleCancelStatusChange}
              disabled={loading}
              className="px-6 py-2 border-2 border-black rounded-md bg-white-warm text-black font-heading text-sm font-bold uppercase hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmStatusChange}
              disabled={loading || (pendingStatus === 'rejected' && !rejectionReason.trim())}
              className={`px-6 py-2 border-2 border-black rounded-md font-heading text-sm font-bold uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                pendingStatus === 'rejected'
                  ? 'bg-error-light text-white-warm hover:bg-error'
                  : 'bg-success-light text-white-warm hover:bg-success'
              }`}
            >
              {loading ? 'Procesando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

