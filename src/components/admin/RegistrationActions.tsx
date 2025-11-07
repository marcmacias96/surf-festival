import { useState } from 'react';
import { updateRegistrationStatus } from '../../services/registration';
import type { RegistrationStatus } from '../../services/registration';

interface RegistrationActionsProps {
  registrationId: string;
  currentStatus: RegistrationStatus;
  onStatusUpdate: (id: string, newStatus: RegistrationStatus) => void;
}

export default function RegistrationActions({
  registrationId,
  currentStatus,
  onStatusUpdate
}: RegistrationActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: RegistrationStatus) => {
    if (newStatus === currentStatus) return;

    setLoading(true);
    setError(null);

    try {
      await updateRegistrationStatus(registrationId, newStatus);
      onStatusUpdate(registrationId, newStatus);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el estado');
      console.error('Error updating status:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {error && (
        <div className="text-xs text-error font-medium mb-2">{error}</div>
      )}

      <div className="flex flex-col gap-2">
        {currentStatus !== 'approved' && (
          <button
            onClick={() => handleStatusChange('approved')}
            disabled={loading}
            className="px-3 py-1.5 bg-success-light text-white-warm border-2 border-black rounded-md font-heading text-xs font-bold uppercase tracking-wide hover:bg-success transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? '...' : '✓ Validar'}
          </button>
        )}
        
        {currentStatus !== 'rejected' && (
          <button
            onClick={() => handleStatusChange('rejected')}
            disabled={loading}
            className="px-3 py-1.5 bg-error-light text-white-warm border-2 border-black rounded-md font-heading text-xs font-bold uppercase tracking-wide hover:bg-error transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? '...' : '✗ Rechazar'}
          </button>
        )}

        {currentStatus !== 'pending' && (
          <button
            onClick={() => handleStatusChange('pending')}
            disabled={loading}
            className="px-3 py-1.5 bg-yellow text-black border-2 border-black rounded-md font-heading text-xs font-bold uppercase tracking-wide hover:bg-yellow/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? '...' : '↻ Pendiente'}
          </button>
        )}
      </div>
    </div>
  );
}

