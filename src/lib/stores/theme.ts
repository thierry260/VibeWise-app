import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

// Get initial theme from localStorage or system preference
const getInitialTheme = (): Theme => {
  if (!browser) return 'system';

  const savedTheme = localStorage.getItem('theme') as Theme | null;
  if (savedTheme) return savedTheme;

  return 'system';
};

// Create theme store
const createThemeStore = () => {
  const { subscribe, set } = writable<Theme>(getInitialTheme());

  // Apply theme class to document element
  const applyTheme = (theme: Theme) => {
    if (!browser) return;

    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
    }

    // Save to localStorage
    localStorage.setItem('theme', theme);
  };

  // Initialize theme
  if (browser) {
    applyTheme(getInitialTheme());

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const theme = getInitialTheme();
      if (theme === 'system') {
        applyTheme('system');
      }
    });
  }

  return {
    subscribe,
    set: (theme: Theme) => {
      set(theme);
      applyTheme(theme);
    },
  };
};

export const theme = createThemeStore();

export default theme;
