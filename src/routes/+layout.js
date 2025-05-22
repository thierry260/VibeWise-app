// This ensures SvelteKit knows this is a SPA (Single Page Application)
// Setting prerender to 'auto' instead of true to handle dynamic routes
export const prerender = 'auto';
export const ssr = false;
export const trailingSlash = 'never';
