import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		// Ensure the build output goes to the 'build' directory
		outDir: 'build'
	},
	// Improve performance during development
	server: {
		fs: {
			// Allow serving files from one level up from the package root
			allow: ['..']
		}
	}
});
