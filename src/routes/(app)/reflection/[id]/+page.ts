import { browser } from '$app/environment';

// This tells SvelteKit not to prerender this page
export const prerender = false;

// This tells SvelteKit to load this page on the client side
export const ssr = false;

// This ensures the page is only loaded when the user is authenticated
export function load() {
  if (browser) {
    return {};
  }
  
  // This will never be called during SSR since ssr is false
  return {};
}
