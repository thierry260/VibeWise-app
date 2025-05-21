<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let status = 'Requesting notification permission...';
	let error = '';
	let loading = true;

	onMount(async () => {
		if (!browser) return;
		
		try {
			// Request notification permission with a slight delay to ensure UI renders
			setTimeout(async () => {
				// Request permission directly using the Web Notifications API
				if ('Notification' in window) {
					const permission = await Notification.requestPermission();
					
					if (permission === 'granted') {
						status = 'Permission granted!';
						// Redirect back to settings after a short delay
						setTimeout(() => {
							goto('/settings');
						}, 1500);
					} else {
						status = 'Permission denied';
						error = 'You need to enable notifications in your browser settings to receive Divine Timing reminders.';
						loading = false;
					}
				} else {
					status = 'Notifications not supported';
					error = 'Your browser does not support notifications. Please try using a different browser.';
					loading = false;
				}
			}, 500);
		} catch (e) {
			console.error('Error requesting notification permission:', e);
			status = 'Error requesting permission';
			error = e instanceof Error ? e.message : 'Unknown error occurred';
			loading = false;
		}
	});
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
		<h1 class="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">Notification Permission</h1>
		
		<div class="mb-6 flex justify-center">
			{#if loading}
				<div class="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600"></div>
			{:else if error}
				<div class="text-red-500">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
			{:else}
				<div class="text-green-500">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
			{/if}
		</div>
		
		<p class="mb-4 text-center text-lg font-medium text-gray-700 dark:text-gray-300">{status}</p>
		
		{#if error}
			<p class="mb-6 text-center text-sm text-red-600 dark:text-red-400">{error}</p>
			<div class="flex justify-center">
				<button 
					on:click={() => goto('/settings')}
					class="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
				>
					Back to Settings
				</button>
			</div>
		{/if}
	</div>
</div>
