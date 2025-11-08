import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeInUp } from '../../utils/animations';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  borderWidth?: '2' | '3' | '4';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  bgColor?: string;
}

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  shadow = 'lg',
  borderWidth = '3',
  padding = 'lg',
  rounded = 'xl',
  bgColor = 'bg-white-warm'
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
    xl: 'p-8'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  };

  const hoverShadowClasses = {
    sm: 'hover:shadow-md',
    md: 'hover:shadow-lg',
    lg: 'hover:shadow-xl',
    xl: 'hover:shadow-2xl',
    '2xl': 'hover:shadow-2xl'
  };

  const borderClasses = {
    '2': 'border-[2px]',
    '3': 'border-[3px]',
    '4': 'border-[4px]'
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  };

  return (
    <motion.div
      className={`
        ${bgColor} 
        ${borderClasses[borderWidth]} 
        border-black 
        ${roundedClasses[rounded]} 
        ${paddingClasses[padding]} 
        ${shadowClasses[shadow]} 
        transition-all 
        ${hover ? `${hoverShadowClasses[shadow]} hover:-translate-x-[2px] hover:-translate-y-[2px] cursor-pointer` : ''} 
        ${className}
      `}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
