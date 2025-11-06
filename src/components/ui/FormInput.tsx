import { useState } from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  success?: boolean;
}

export default function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  helperText,
  success = false
}: FormInputProps) {
  const [focused, setFocused] = useState(false);
  
  const inputId = `input-${name}`;
  const errorId = `error-${name}`;
  const helperId = `helper-${name}`;
  
  const baseInputClasses = 'w-full px-5 py-4 border-[3px] rounded-md font-body text-base bg-white-warm text-dark transition-all appearance-none';
  const focusClasses = focused ? 'border-purple shadow-[0_0_0_3px_rgba(74,58,112,0.2)]' : 'border-black';
  const errorClasses = error ? 'border-error shadow-[0_0_0_3px_rgba(198,40,40,0.2)]' : '';
  const successClasses = success && !error ? 'border-success shadow-[0_0_0_3px_rgba(46,125,50,0.2)]' : '';
  const shakeClasses = error ? 'animate-shake' : '';
  
  return (
    <div className="mb-6">
      <label 
        htmlFor={inputId} 
        className="block font-heading text-sm font-semibold uppercase tracking-wide text-black mb-2"
      >
        {label} 
        {required && <span className="text-error">*</span>}
      </label>
      
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={`${baseInputClasses} ${focusClasses} ${errorClasses} ${successClasses} ${shakeClasses} ${
          error ? 'pr-11' : success ? 'pr-11' : ''
        }`}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
      />
      
      {error && (
        <div 
          id={errorId}
          className="flex items-center gap-1.5 mt-2 text-sm text-error font-medium"
          role="alert"
        >
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}
      
      {helperText && !error && (
        <div 
          id={helperId}
          className="mt-2 text-sm text-gray"
        >
          {helperText}
        </div>
      )}
      
      {success && !error && (
        <div className="flex items-center gap-1.5 mt-2 text-sm text-success font-medium">
          <span>✓</span>
          <span>Válido</span>
        </div>
      )}
    </div>
  );
}

