import type { Variants } from 'framer-motion';

/* ============================================
   Framer Motion Animation Variants
   ============================================ */

// Fade animations
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    }
  }
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    }
  }
};

// Stagger animation para grids
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    }
  }
};

// Hover effects
export const hoverLift = {
  rest: { 
    y: 0, 
    boxShadow: '4px 4px 0px #1A1A1A' 
  },
  hover: {
    y: -8,
    boxShadow: '6px 6px 0px #1A1A1A',
    transition: { 
      duration: 0.2 
    }
  }
};

export const hoverScale = {
  rest: { 
    scale: 1 
  },
  hover: { 
    scale: 1.05, 
    transition: { 
      duration: 0.2 
    } 
  }
};

// Sprites decorativos
export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const rotateFloat = {
  rotate: [0, 5, -5, 0],
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// Parallax (para uso con useScroll)
export const parallaxVariants = (offset: number = 50) => ({
  y: offset
});

// Modal animations
export const modalBackdrop: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: -20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.68, -0.55, 0.265, 1.55] // bounce
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

// Check if user prefers reduced motion
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Helper para aplicar animaciones respetando prefers-reduced-motion
export const getAnimationVariants = (variants: Variants): Variants => {
  if (shouldReduceMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.1 }
      }
    };
  }
  return variants;
};

