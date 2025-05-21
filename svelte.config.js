import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Use static adapter with custom output directory
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: false
		}),
		alias: {
			'$lib': './src/lib'
		},
		// Enable SPA mode for Capacitor
		appDir: 'app',
		paths: {
			base: ''
		}
	}
};

export default config;
