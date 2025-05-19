<script lang="ts">
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth';
	import { signOut } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/theme';

	const navItems = [
		{ name: 'Home', path: '/', icon: '🏠' },
		{ name: 'Reflect', path: '/reflect', icon: '📝' },
		{ name: 'Journey', path: '/journey', icon: '🌱' },
		{ name: 'Library', path: '/library', icon: '📚' },
		{ name: 'More', path: '/more', icon: '⋯' }
	];

	const handleSignOut = async () => {
		await signOut();
		goto('/login');
	};

	const toggleTheme = () => {
		theme.set($theme === 'dark' ? 'light' : 'dark');
	};
</script>

<div class="app-layout">
	<header class="app-header">
		<div class="logo">
			<img src="/vibewise-logo.svg" alt="VibeWise" class="logo-img" on:click={() => goto('/')} />
		</div>
		<div class="header-actions">
			<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
				{$theme === 'dark' ? '☀️' : '🌙'}
			</button>
			{#if $authStore.user?.photoURL}
				<img
					src={$authStore.user.photoURL}
					alt="Profile"
					class="avatar"
					on:click={() => goto('/profile')}
				/>
			{/if}
		</div>
	</header>

	<main class="app-content">
		<slot />
	</main>

	<nav class="bottom-nav">
		{#each navItems as item}
			<a href={item.path} class:active={$page.url.pathname === item.path} aria-label={item.name}>
				<span class="icon">{item.icon}</span>
				<span class="label">{item.name}</span>
			</a>
		{/each}
	</nav>
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

	.theme-toggle {
		background: none;
		border: none;
		font-size: 1.25rem;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		cursor: pointer;
	}

	.app-content {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
	}

	.bottom-nav {
		display: flex;
		justify-content: space-around;
		padding: 0.75rem 0;
		background-color: var(--color-bg-elevated);
		box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
		position: sticky;
		bottom: 0;
		z-index: 10;
	}

	.bottom-nav a {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		color: var(--color-text);
		opacity: 0.7;
		transition: opacity 0.2s;
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
	}

	.bottom-nav a:hover {
		opacity: 1;
	}

	.bottom-nav a.active {
		opacity: 1;
		color: var(--color-primary);
	}

	.bottom-nav .icon {
		font-size: 1.25rem;
		margin-bottom: 0.25rem;
	}

	.bottom-nav .label {
		font-size: 0.75rem;
		font-weight: 500;
	}

	@media (min-width: 768px) {
		.app-layout {
			flex-direction: row;
		}

		.bottom-nav {
			flex-direction: column;
			width: 5rem;
			height: 100vh;
			position: fixed;
			left: 0;
			top: 0;
			padding: 1rem 0;
			box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
		}

		.app-content {
			margin-left: 5rem;
			padding: 2rem;
		}

		.app-header {
			padding-left: 7rem;
		}
	}
</style>
