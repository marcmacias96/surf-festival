import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { modalBackdrop, modalContent } from '../../utils/animations';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-[400]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalBackdrop}
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="bg-white-warm border-[3px] border-black rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col pointer-events-auto"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {title && (
                <div className="px-8 py-6 border-b-[3px] border-black flex items-center justify-between flex-shrink-0">
                  <h2 className="font-display text-2xl uppercase text-purple m-0">
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 border-[3px] border-black rounded-md bg-transparent cursor-pointer flex items-center justify-center hover:bg-black hover:text-white-warm transition-all"
                    aria-label="Cerrar modal"
                  >
                    <span className="text-2xl leading-none">×</span>
                  </button>
                </div>
              )}
              
              {/* Body */}
              <div className="px-8 py-6 overflow-y-auto flex-1">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

