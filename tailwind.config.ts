import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#4D44B3',
        secondary: '#BF469A',
        dark: '#0D2C46',
        light: '#FFF8EE',
      },
    },
  },
  plugins: [forms, typography],
};

export default config;