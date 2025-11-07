import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import FormInput from '../ui/FormInput';
import FileInput from '../ui/FileInput';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { createRegistration, checkEmailExists } from '../../services/registration';
import { uploadPaymentReceipt } from '../../services/storage';
import { registrationSchema } from '../../utils/validation';
import { z } from 'zod';

interface RegistrationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Registration({ isOpen, onClose }: RegistrationProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    age: ''
  });

  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', phone: '', category: '', age: '' });
      setPaymentReceipt(null);
      setErrors({});
      setSuccess(false);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validar con Zod
      const validated = registrationSchema.parse({
        ...formData,
        age: parseInt(formData.age)
      });

      // Verificar si el email ya existe
      const emailExists = await checkEmailExists(validated.email);
      if (emailExists) {
        setErrors({ email: 'Este email ya está registrado' });
        setLoading(false);
        return;
      }

      // Generar ID temporal para el registro (para usar en el nombre del archivo)
      const tempId = crypto.randomUUID();
      let paymentReceiptUrl: string | undefined;

      // Subir comprobante de pago si existe
      if (paymentReceipt) {
        try {
          setUploading(true);
          const uploadResult = await uploadPaymentReceipt(paymentReceipt, tempId);
          paymentReceiptUrl = uploadResult.url;
        } catch (uploadError: any) {
          setErrors({ 
            paymentReceipt: uploadError.message || 'Error al subir el comprobante de pago' 
          });
          setLoading(false);
          setUploading(false);
          return;
        } finally {
          setUploading(false);
        }
      }

      // Crear registro con URL del comprobante si existe
      await createRegistration({
        ...validated,
        payment_receipt_url: paymentReceiptUrl
      });

      // Éxito
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', email: '', phone: '', category: '', age: '' });
        setPaymentReceipt(null);
      }, 2000);

    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Errores de validación Zod
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ general: error.message || 'Error al procesar la inscripción. Intenta de nuevo.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Inscríbete al Festival">
      {success ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="font-display text-3xl text-success mb-2">
            ¡Inscripción Exitosa!
          </h3>
          <p className="font-body text-dark">
            Te esperamos en el festival
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Nombre Completo"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Juan Pérez"
            required
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="juan@example.com"
            required
          />

          <FormInput
            label="Teléfono"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="+593 99 999 9999"
            required
            helperText="Incluye código de país (ej: +593)"
          />

          <div className="mb-6">
            <label htmlFor="category" className="block font-heading text-sm font-semibold uppercase tracking-wide text-black mb-2">
              Categoría <span className="text-error">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-5 py-4 border-[3px] rounded-md font-body text-base bg-white-warm text-dark transition-all appearance-none ${
                errors.category ? 'border-error shadow-[0_0_0_3px_rgba(198,40,40,0.2)]' : 'border-black'
              } focus:outline-none focus:border-purple focus:shadow-[0_0_0_3px_rgba(74,58,112,0.2)]`}
              required
              aria-required="true"
              aria-invalid={!!errors.category}
              aria-describedby={errors.category ? 'error-category' : undefined}
            >
              <option value="">Selecciona una categoría</option>
              <option value="Open Hombres">Open Hombres (18+ años)</option>
              <option value="Open Mujeres">Open Mujeres (18+ años)</option>
              <option value="Mujeres Intermedio">Mujeres Intermedio (16+ años)</option>
              <option value="Mujeres Principiante">Mujeres Principiante (14+ años)</option>
              <option value="Niños">Niños (8-13 años)</option>
            </select>
            {errors.category && (
              <div 
                id="error-category"
                className="flex items-center gap-1.5 mt-2 text-sm text-error font-medium"
                role="alert"
              >
                <span>⚠️</span>
                <span>{errors.category}</span>
              </div>
            )}
          </div>

          <FormInput
            label="Edad"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            error={errors.age}
            placeholder="25"
            required
            helperText="Debe coincidir con los requisitos de la categoría seleccionada"
          />

          <Card className="mb-6" hover={false}>
            <div className="space-y-3">
              <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-black mb-4">
                💳 Información para Transferencia
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-dark">Banco:</span>
                  <span className="text-dark text-right">Banco Guayaquil</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-dark">Tipo de Cuenta:</span>
                  <span className="text-dark text-right">CTA Ahorros</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-dark">Número de Cuenta:</span>
                  <span className="text-dark text-right font-mono">35920191</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-dark">Titular:</span>
                  <span className="text-dark text-right">Franco Bonilla Angelo Fernando</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-dark">Cédula:</span>
                  <span className="text-dark text-right font-mono">131507090-2</span>
                </div>
                <div className="pt-3 mt-3 border-t-2 border-black">
                  <p className="text-xs text-gray font-medium">
                    💡 Realiza la transferencia por <strong>$10</strong> y sube el comprobante a continuación
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <FileInput
            label="Comprobante de Pago"
            name="paymentReceipt"
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5 * 1024 * 1024} // 5MB
            onChange={setPaymentReceipt}
            error={errors.paymentReceipt}
            helperText="Sube una foto o PDF de tu comprobante de pago (opcional)"
          />

          {errors.general && (
            <div className="mb-6 p-4 bg-error-light/20 border-2 border-error rounded-md text-error">
              <p className="font-medium">{errors.general}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading || uploading} 
              className="flex-1"
            >
              {uploading ? 'Subiendo comprobante...' : loading ? 'Procesando...' : 'Inscribirme'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={loading}
              className="flex-1 sm:flex-none"
            >
              Cancelar
            </Button>
          </div>

          <p className="text-sm font-body text-center mt-6 text-gray">
            Costo: $10 por categoría
          </p>
        </form>
      )}
    </Modal>
  );
}

