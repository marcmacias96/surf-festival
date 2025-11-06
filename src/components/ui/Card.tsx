import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeInUp } from '../../utils/animations';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      className={`bg-white-warm border-[3px] border-black rounded-xl p-6 shadow-lg transition-all ${hover ? 'hover:shadow-xl hover:-translate-x-[2px] hover:-translate-y-[2px] cursor-pointer' : ''} ${className}`}
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

