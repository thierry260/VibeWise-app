<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';

	let greeting = 'Good morning';
	let streakDays = 0;
	let vibeScore = 0;
	let spiralPhase = 'Beige';
	let intention = '';

	// Set greeting based on time of day
	const setGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) greeting = 'Good morning';
		else if (hour < 18) greeting = 'Good afternoon';
		else greeting = 'Good evening';
	};

	onMount(() => {
		setGreeting();

		// This would normally come from the database
		// Placeholder data for now
		streakDays = 3;
		vibeScore = 78;
		spiralPhase = 'Green';
		intention = 'Be present and mindful throughout the day';
	});
</script>

<div class="home-page p-4">
	<header class="mb-6">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">
			{greeting}, {$authStore.user?.displayName?.split(' ')[0] || 'Friend'}
		</h1>
		<p class="text-sm text-gray-600 dark:text-gray-400">
			{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
		</p>
	</header>

	<!-- Streak Counter -->
	<div
		class="mb-6 flex items-center rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 p-4 dark:from-purple-900/30 dark:to-indigo-900/30"
	>
		<div
			class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
				/>
			</svg>
		</div>
		<div>
			<h2 class="text-lg font-semibold text-gray-900 dark:text-white">
				{streakDays} Day Streak
			</h2>
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Keep going! Your consistency is building momentum.
			</p>
		</div>
	</div>

	<!-- Status Card -->
	<div class="mb-6 overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
		<div class="border-b border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6">
			<h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Your Status</h3>
		</div>
		<div class="px-4 py-5 sm:p-6">
			<div class="grid grid-cols-2 gap-4">
				<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Vibe Score</h4>
					<div class="mt-1 flex items-baseline">
						<p class="text-2xl font-semibold text-gray-900 dark:text-white">{vibeScore}</p>
						<p class="ml-2 text-sm font-medium text-green-600 dark:text-green-400">/ 100</p>
					</div>
				</div>
				<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Spiral Phase</h4>
					<p class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{spiralPhase}</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Intention Display -->
	{#if intention}
		<div
			class="mb-6 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 p-4 dark:from-primary-900/20 dark:to-secondary-900/20"
		>
			<h3 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Today's Intention</h3>
			<p class="text-lg font-medium text-gray-900 dark:text-white">"{intention}"</p>
		</div>
	{/if}

	<!-- Quick Actions -->
	<div class="mb-6">
		<h3 class="mb-3 text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h3>
		<div class="grid grid-cols-2 gap-3">
			<a
				href="/hrv-session"
				class="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-md transition-all hover:shadow-lg dark:bg-gray-800 dark:hover:bg-gray-700"
			>
				<div
					class="mb-2 rounded-full bg-primary-100 p-2 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</div>
				<span class="text-sm font-medium text-gray-900 dark:text-white">Start HRV Session</span>
			</a>
			<a
				href="/settings"
				class="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-md transition-all hover:shadow-lg dark:bg-gray-800 dark:hover:bg-gray-700"
			>
				<div
					class="mb-2 rounded-full bg-secondary-100 p-2 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</div>
				<span class="text-sm font-medium text-gray-900 dark:text-white">Settings</span>
			</a>
		</div>
	</div>

	<!-- Activity Feed -->
	<div>
		<h3 class="mb-3 text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
		<div class="rounded-lg bg-white shadow-md dark:bg-gray-800">
			<div class="p-4 text-center text-gray-500 dark:text-gray-400">
				<p>Your activity will appear here once you start using the app.</p>
				<p class="mt-2 text-sm">Try starting an HRV session to get started!</p>
			</div>
		</div>
	</div>
</div>
