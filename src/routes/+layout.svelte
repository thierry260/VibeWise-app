<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { authStore } from '$lib/stores/auth';
	import { theme } from '$lib/stores/theme';
	import { goto } from '$app/navigation';
	import '../app.css';

	// Handle authentication state changes
	$: if (browser) {
		const isLoginPage = $page.url.pathname === '/login';
		if (!$authStore.loading && !$authStore.user && !isLoginPage) {
			goto('/login');
		}
	}

	// Apply theme on mount and when it changes
	onMount(() => {
		const root = document.documentElement;
		const observer = new MutationObserver(() => {
			if (root.hasAttribute('data-theme')) {
				const currentTheme = root.getAttribute('data-theme');
				document.body.className = currentTheme || '';
			}
		});

		observer.observe(root, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		// Initial theme application
		const currentTheme = root.getAttribute('data-theme');
		if (currentTheme) {
			document.body.className = currentTheme;
		}

		return () => observer.disconnect();
	});
</script>

<slot />

<style>
	:global(html, body) {
		height: 100%;
		margin: 0;
		padding: 0;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
		background-color: var(--color-bg);
		color: var(--color-text);
		transition:
			background-color 0.2s,
			color 0.2s;
	}

	:global(#svelte) {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	:global(.light) {
		--color-bg: #f4f5fe;
		--color-bg-elevated: #ffffff;
		--color-text: #0d2c46;
		--color-primary: #4d44b3;
		--color-secondary: #bf469a;
		--color-border: #e2e8f0;
	}

	:global(.dark) {
		--color-bg: #0d2c46;
		--color-bg-elevated: #1a365d;
		--color-text: #f8fafc;
		--color-primary: #7c73e6;
		--color-secondary: #e66eb3;
		--color-border: #2d3748;
	}

	:global(a) {
		color: var(--color-primary);
		text-decoration: none;
	}

	:global(a:hover) {
		text-decoration: underline;
	}

	:global(button) {
		cursor: pointer;
		font-weight: 500;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		transition: all 0.2s;
	}

	:global(button.primary) {
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		color: white;
		border: none;
	}

	:global(button.secondary) {
		background: transparent;
		border: 1px solid var(--color-border);
		color: var(--color-text);
	}

	:global(button:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
