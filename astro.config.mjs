// @ts-check
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Cambiar por URL real cuando esté disponible
  site: 'https://sanmateolongfest.com',

  // Habilitar modo servidor para endpoints de API
  output: 'server',
  
  // Configurar adapter para Node.js
  adapter: node({
    mode: 'standalone',
  }),

  integrations: [
    tailwind({
      applyBaseStyles: false, // Usaremos nuestros propios estilos base
    }),
    react(),
    sitemap(),
  ],

  build: {
    inlineStylesheets: 'auto',
  },
});