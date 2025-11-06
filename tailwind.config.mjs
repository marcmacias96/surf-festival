/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Colores Primarios (usando variables CSS)
        yellow: 'var(--color-primary-yellow)',
        'yellow-light': 'var(--sunset-yellow)',
        orange: 'var(--color-primary-orange)',
        'orange-light': 'var(--sunset-orange)',
        pink: 'var(--color-primary-pink)',
        'pink-light': 'var(--tropical-pink)',

        // Colores Neutros
        'white-warm': 'var(--color-neutral-white)',
        cream: 'var(--color-neutral-cream)',
        black: 'var(--color-neutral-black)',
        dark: 'var(--color-neutral-dark)',
        gray: {
          DEFAULT: 'var(--color-neutral-gray)',
          light: 'var(--color-neutral-light)',
        },

        // Acentos
        purple: {
          DEFAULT: 'var(--color-accent-purple)',
          light: 'var(--color-accent-purple-light)',
        },

        // Estados Funcionales
        success: {
          DEFAULT: 'var(--color-success)',
          light: 'var(--color-success-light)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          light: 'var(--color-warning-light)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          light: 'var(--color-error-light)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          light: 'var(--color-info-light)',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Anton', 'Oswald', 'sans-serif'],
        heading: ['Roboto Condensed', 'Archivo Narrow', 'Arial Narrow', 'sans-serif'],
        body: ['Roboto', 'Open Sans', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'h1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2': ['3.5rem', { lineHeight: '1.1' }],
        'h3': ['2.5rem', { lineHeight: '1.375' }],
        'h4': ['2rem', { lineHeight: '1.375' }],
        'h5': ['1.5rem', { lineHeight: '1.375' }],
        'h6': ['1.25rem', { lineHeight: '1.5' }],
        'body': ['1rem', { lineHeight: '1.5' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'tiny': ['0.75rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
        '6xl': '160px',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'sunset-md': 'var(--shadow-sunset-md)',
        'pink-md': 'var(--shadow-pink-md)',
        'soft': 'var(--shadow-soft)',
        'soft-lg': 'var(--shadow-soft-lg)',
      },
      zIndex: {
        'dropdown': '100',
        'sticky': '200',
        'fixed': '300',
        'overlay': '400',
        'modal': '500',
        'popover': '600',
        'tooltip': '700',
        'notification': '800',
        'skip-link': '1000',
      },
      transitionDuration: {
        'instant': '100ms',
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
        'slower': '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'sharp': 'cubic-bezier(0.4, 0.0, 0.6, 1)',
      },
      screens: {
        'mobile': '375px',
        'mobile-lg': '480px',
        'tablet': '768px',
        'tablet-lg': '1024px',
        'desktop': '1280px',
        'desktop-lg': '1440px',
        'wide': '1920px',
      },
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, #FFD700 0%, #FF8C42 50%, #FF4D8C 100%)',
        'gradient-sunset-reverse': 'linear-gradient(135deg, #FF4D8C 0%, #FF8C42 50%, #FFD700 100%)',
        'gradient-tropical': 'linear-gradient(180deg, rgba(255, 215, 0, 0.8) 0%, rgba(255, 140, 66, 0.8) 50%, rgba(255, 77, 140, 0.8) 100%)',
        'gradient-subtle': 'linear-gradient(to bottom, #FFF8E7 0%, #FEFDF8 100%)',
        'gradient-shadow': 'linear-gradient(135deg, #FF8C42 0%, #FF4D8C 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float-delayed 4s ease-in-out infinite',
        'rotate-float': 'rotate-float 5s ease-in-out infinite',
        'fade-in': 'fadeIn 350ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'fade-in-up': 'fadeInUp 350ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-in-left': 'slideInLeft 350ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-in-right': 'slideInRight 350ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'shake': 'shake 0.4s',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'rotate-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          'from': {
            opacity: '0',
            transform: 'translateX(-40px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(40px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-8px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(8px)' },
        },
        spin: {
          'to': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};

