import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { join } from 'path';
import { fileURLToPath } from 'url';

// For ES modules in Node.js
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const config: Config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    join(__dirname, 'node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}')
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        dark: '#0D2C46',
        light: '#FFF8EE',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    forms,
    typography,
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;