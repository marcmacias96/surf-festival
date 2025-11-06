import { useState, useEffect } from 'react';
import Registration from './Registration';

export default function RegistrationWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-registration-modal', handleOpen);
    return () => window.removeEventListener('open-registration-modal', handleOpen);
  }, []);

  return <Registration isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}

