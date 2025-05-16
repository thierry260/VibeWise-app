import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  optimizeDeps: {
    include: ['@fullcalendar/common', '@codemirror/state', '@codemirror/view'],
  },
  server: {
    fs: {
      // Allow serving files from one level up from the package root
      allow: ['..'],
    },
  },
});
