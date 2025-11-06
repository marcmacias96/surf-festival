import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'default' | 'large';
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'default',
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-md font-heading font-bold uppercase tracking-wide transition-all inline-flex items-center justify-center gap-2 min-h-[44px]';
  
  const variantClasses = {
    primary: 'bg-yellow text-black border-[3px] border-black shadow-md hover:shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
    secondary: 'bg-white-warm text-black border-[3px] border-black shadow-md hover:shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-cream active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
    outline: 'bg-transparent text-black border-[3px] border-black hover:bg-black hover:text-white-warm'
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm min-h-[44px] shadow-sm',
    default: 'px-6 py-3 text-base min-h-[56px] shadow-md',
    large: 'px-8 py-4 text-lg min-h-[64px] shadow-lg'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  );
}

