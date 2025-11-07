import { useState, useRef } from 'react';

interface FileInputProps {
  label: string;
  name: string;
  accept?: string;
  maxSize?: number; // en bytes
  onChange: (file: File | null) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export default function FileInput({
  label,
  name,
  accept = 'image/*,.pdf',
  maxSize = 5 * 1024 * 1024, // 5MB por defecto
  onChange,
  error,
  helperText,
  required = false
}: FileInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      // Validar tamaño
      if (file.size > maxSize) {
        onChange(null);
        return;
      }

      setSelectedFile(file);
      onChange(file);

      // Crear preview para imágenes
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setSelectedFile(null);
      setPreview(null);
      onChange(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block font-heading text-sm font-semibold uppercase tracking-wide text-black mb-2"
      >
        {label}
        {required && <span className="text-error">*</span>}
        {!required && <span className="text-gray text-xs font-normal normal-case ml-2">(Opcional)</span>}
      </label>

      {!selectedFile ? (
        <div
          className={`border-[3px] border-dashed rounded-md p-6 md:p-8 text-center transition-all cursor-pointer ${
            dragActive
              ? 'border-yellow bg-yellow/10'
              : error
              ? 'border-error bg-error-light/10'
              : 'border-black bg-white-warm hover:bg-cream'
          } ${error ? 'shadow-[0_0_0_3px_rgba(198,40,40,0.2)]' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            id={name}
            name={name}
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `error-${name}` : undefined}
          />
          <div className="text-4xl mb-3">📎</div>
          <p className="font-body text-sm md:text-base text-dark mb-1">
            Arrastra un archivo aquí o haz clic para seleccionar
          </p>
          <p className="font-body text-xs text-gray">
            PDF, JPG, PNG (máx. {formatFileSize(maxSize)})
          </p>
        </div>
      ) : (
        <div className="border-[3px] border-black rounded-md p-4 bg-white-warm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded border-2 border-black flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 bg-yellow border-2 border-black rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📄</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm md:text-base text-black font-medium truncate">
                  {selectedFile.name}
                </p>
                <p className="font-body text-xs text-gray">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-error-light text-white-warm border-2 border-black rounded-md font-heading text-xs font-bold uppercase tracking-wide hover:bg-error transition-colors flex-shrink-0"
              aria-label="Eliminar archivo"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}

      {helperText && !error && (
        <p className="mt-2 text-xs font-body text-gray">{helperText}</p>
      )}

      {error && (
        <div
          id={`error-${name}`}
          className="flex items-center gap-1.5 mt-2 text-sm text-error font-medium"
          role="alert"
        >
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

