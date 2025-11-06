import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'default',
  className = '' 
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center gap-1.5 px-4 py-2 border-2 border-black rounded-full font-heading text-sm font-semibold uppercase tracking-wide shadow-sm whitespace-nowrap';
  
  const variantClasses = {
    default: 'bg-white-warm text-black',
    primary: 'bg-yellow text-black',
    secondary: 'bg-black text-white-warm border-none',
    success: 'bg-success-light text-white-warm border-success',
    error: 'bg-error-light text-white-warm border-error'
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

