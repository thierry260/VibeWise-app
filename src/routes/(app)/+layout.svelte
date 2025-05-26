<script lang="ts">
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/theme';
	import { showNavigation } from '$lib/stores/navigation';
	import BottomNavigation from '$lib/components/BottomNavigation.svelte';
	import OverflowMenu from '$lib/components/OverflowMenu.svelte';
	import { onMount } from 'svelte';

	let greeting = 'Goede morgen';
	// Set greeting based on time of day
	const setGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) greeting = 'Goede morgen';
		else if (hour < 18) greeting = 'Goede middag';
		else greeting = 'Goede avond';
	};

	onMount(() => {
		setGreeting();
	});
	// Routes that should hide navigation
	const hiddenRoutes = [
		'/login',
		'/register',
		'/onboarding',
		'/hrv-session/active', // When HRV session is in focus mode
		'/balcony'
	];

	// Check if current route should hide navigation
	$: currentPath = $page.url.pathname;
	$: hideNav = hiddenRoutes.some(
		(route) =>
			currentPath === route || (route.endsWith('/*') && currentPath.startsWith(route.slice(0, -2)))
	);
</script>

<div class="app-layout">
	<header class="app-header">
		<div class="logo">
			<img
				src="/vibewise-logo.svg"
				alt="VibeWise"
				class="logo-img"
				on:click={() => goto('/home')}
			/>
			<header class="ml-4">
				<h4 class="text-md font-bold text-gray-900 dark:text-white">
					{greeting}, {$authStore.user?.displayName?.split(' ')[0] || 'Thierry'}
				</h4>
				<p class="text-xs text-gray-600 dark:text-gray-400">
					{new Date().toLocaleDateString('nl-NL', {
						weekday: 'long',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			</header>
		</div>

		<div class="header-actions">
			<OverflowMenu />
		</div>
	</header>

	<main class="app-content" class:has-bottom-nav={$showNavigation && !hideNav}>
		<slot />
	</main>

	<BottomNavigation hideNavigation={!$showNavigation || hideNav} />
</div>

<style>
	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: var(--color-bg);
	}

	.app-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: var(--color-bg-elevated);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.logo {
		display: flex;
		align-items: center;
	}

	.logo-img {
		height: 2rem;
		cursor: pointer;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.app-content {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
		padding-bottom: calc(1rem + 4rem); /* Extra padding for bottom nav */
	}

	.app-content.has-bottom-nav {
		padding-bottom: calc(1rem + 4rem); /* Extra padding for bottom nav */
	}

	@media (min-width: 768px) {
		.app-content {
			padding: 2rem;
			padding-bottom: 2rem; /* Reset padding on desktop */
		}
	}
</style>
