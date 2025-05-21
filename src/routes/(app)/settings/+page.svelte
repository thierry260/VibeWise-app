<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';
	import { signOut } from '$lib/firebase';
	import { theme } from '$lib/stores/theme';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import notificationService, {
		areNotificationsSupported,
		checkNotificationPermission,
		requestNotificationPermission,
		sendTestNotification
	} from '$lib/services/notifications';
	
	let userId = '';
	let permissionStatus = 'default';
	let testButtonLoading = false;
	let testMessageVisible = false;
	let testMessage = '';
	let testStatus = '';
	let testError = '';
	let notificationsSupported = true;
	let isNativePlatform = false;
	let isWebPlatform = false;

	// Set up theme toggle
	const toggleTheme = () => {
		theme.set($theme === 'dark' ? 'light' : 'dark');
	};

	onMount(() => {
		// Get user ID and check notification permission
		const unsubscribe = authStore.subscribe(($auth) => {
			userId = $auth.user?.uid || '';
		});

		// Check if notifications are supported and get permission status
		const initNotifications = async () => {
			if (!browser) return;
			
			// Detect platform
			isWebPlatform = notificationService.isPlatformWeb();
			isNativePlatform = notificationService.isPlatformNative();
			console.log('Platform detection - isWeb:', isWebPlatform, 'isNative:', isNativePlatform);
			
			// Check if notifications are supported
			notificationsSupported = areNotificationsSupported();
			console.log('Notifications supported:', notificationsSupported);
			
			// Get current permission status
			if (notificationsSupported) {
				permissionStatus = await checkNotificationPermission();
				console.log('Permission status:', permissionStatus);
			}
			
			// Initialize notifications for native platform
			if (isNativePlatform) {
				await notificationService.initializeNotifications();
			}
		};
		
		// Execute the initialization
		initNotifications();

		return () => {
			unsubscribe();
		};
	});

	// Handle sign out
	const handleSignOut = async () => {
		await signOut();
		goto('/login');
	};

	// Request notification permission
	const requestPermission = async () => {
		try {
			if (isWebPlatform) {
				// For web, use the dedicated permission page
				goto('/notification-permission');
			} else if (isNativePlatform) {
				// For native, request directly
				permissionStatus = await requestNotificationPermission();
			}
		} catch (error) {
			console.error('Error requesting permission:', error);
		}
	};

	// Test notification
	const testDivineTiming = async () => {
		try {
			testButtonLoading = true;
			testStatus = 'Preparing notification test...';
			testError = '';
			
			// Log platform information for debugging
			console.log('Running notification test from settings page');
			console.log('Platform detection - isWeb:', isWebPlatform, 'isNative:', isNativePlatform);
			
			// Get a random message for the test notification
			const divineMessages = [
				'Take a breath and notice how you feel right now.',
				'What emotion is present for you in this moment?',
				'Notice the energy flowing through your body.',
				'Find the still point within you, even if just for a moment.',
				'Where is your mind right now? Bring it back to your body.',
				'Breathe in awareness, breathe out tension.',
				'What is one thing you can appreciate in this moment?'
			];
			const randomIndex = Math.floor(Math.random() * divineMessages.length);
			const message = divineMessages[randomIndex];
			testMessage = message;
			
			// Update status
			testStatus = 'Sending notification...';
			
			// Send test notification using our service that handles both platforms
			const result = await sendTestNotification({ title: 'Divine Timing', body: message });
			
			if (result.success) {
				console.log('Notification sent successfully');
				testStatus = 'Notification sent successfully!';
				testMessageVisible = true;
				
				// Hide success message after 5 seconds
				setTimeout(() => {
					testMessageVisible = false;
					testStatus = '';
				}, 5000);
			} else {
				testStatus = 'Failed to send notification';
				testError = result.error?.toString() || 'Unknown error';
			}
			
			testButtonLoading = false;
		} catch (error) {
			console.error('Error sending test notification:', error);
			testButtonLoading = false;
			testStatus = 'Error encountered';
			testError = error instanceof Error ? error.message : 'Unknown error occurred';
		}
	};
</script>

{#if $authStore.loading}
  <div class="loading-state">Loading settings...</div>
{:else if !$authStore.user}
  <div class="unauth-state">You are not logged in. <a href="/login">Go to login</a>.</div>
{:else}
  <div class="settings-page mx-auto max-w-2xl space-y-8 p-4">
    <h1 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
    <!-- App Theme Section -->
    <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
      <div class="flex items-center justify-between">
        <span class="text-gray-700 dark:text-gray-300">Dark Mode</span>
        <button
          on:click={toggleTheme}
          class="ml-4 rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          {#if $theme === 'dark'}
            <span class="text-xl">☀️</span>
          {:else}
            <span class="text-xl">🌙</span>
          {/if}
        </button>
      </div>
    </div>
    <!-- Divine Timing Section -->
    <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Divine Timing</h2>
      {#if notificationsSupported}
        {#if permissionStatus === 'granted'}
          <div class="mb-4 flex items-center space-x-2">
            <div class="h-3 w-3 rounded-full bg-green-500"></div>
            <span class="text-sm text-gray-700 dark:text-gray-300">Notifications enabled</span>
          </div>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            You will receive Divine Timing reminders throughout your day to help you stay present and mindful.
          </p>
          <button
            on:click={testDivineTiming}
            disabled={testButtonLoading}
            class="bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 focus:ring-primary-500 mb-2 inline-flex items-center rounded-lg px-4 py-2 font-medium text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {#if testButtonLoading}
              <svg
                class="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {testStatus || 'Sending...'}
            {:else}
              Test Notification
            {/if}
          </button>
          <!-- Test Status and Results -->
          {#if testMessageVisible}
            <div class="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <div class="flex items-center">
                <div class="mr-3 h-4 w-4 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-green-800 dark:text-green-200">Notification sent!</p>
                  <p class="mt-1 text-xs text-green-700 dark:text-green-300">"{testMessage}"</p>
                </div>
              </div>
            </div>
          {/if}
          <!-- Error Message -->
          {#if testError}
            <div class="mt-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
              <div class="flex items-center">
                <div class="mr-3 h-4 w-4 text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-red-800 dark:text-red-200">Error sending notification</p>
                  <p class="mt-1 text-xs text-red-700 dark:text-red-300">{testError}</p>
                </div>
              </div>
            </div>
          {/if}
        {:else}
          <div class="mb-4 flex items-center space-x-2">
            <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
            <span class="text-sm text-gray-700 dark:text-gray-300">Notifications not enabled</span>
          </div>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Enable notifications to receive Divine Timing reminders throughout your day.
          </p>
          <button
            on:click={requestPermission}
            class="bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 focus:ring-primary-500 inline-block rounded-lg px-4 py-2 font-medium text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Enable Notifications
          </button>
        {/if}
      {:else if isNativePlatform}
        <!-- Native platform but notifications not initialized yet -->
        <div class="mb-4 flex items-center space-x-2">
          <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
          <span class="text-sm text-gray-700 dark:text-gray-300">Notifications not enabled</span>
        </div>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Enable notifications to receive Divine Timing reminders throughout your day.
        </p>
        <button
          on:click={requestPermission}
          class="bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 focus:ring-primary-500 inline-block rounded-lg px-4 py-2 font-medium text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Enable Notifications
        </button>
      {:else}
        <!-- Fallback UI when notifications are not supported -->
        <div
          class="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-700/30 dark:bg-yellow-900/20 dark:text-yellow-500"
        >
          <p>
            Notifications are not supported in this environment. Please try using a different browser or device.
          </p>
        </div>
      {/if}
    </div>

    <!-- Account Section -->
    <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Account</h2>
      
      {#if $authStore.user}
        <div class="mb-6 flex items-center space-x-4">
          {#if $authStore.user.photoURL}
            <img 
              src={$authStore.user.photoURL} 
              alt="Profile" 
              class="h-12 w-12 rounded-full"
            />
          {:else}
            <div class="bg-primary-100 text-primary-700 flex h-12 w-12 items-center justify-center rounded-full font-bold dark:bg-primary-900/30 dark:text-primary-300">
              {$authStore.user.displayName?.[0] || $authStore.user.email?.[0] || 'U'}
            </div>
          {/if}
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              {$authStore.user.displayName || 'User'}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {$authStore.user.email}
            </div>
          </div>
        </div>
      {/if}

      <button
        on:click={handleSignOut}
        class="w-full rounded-lg border border-red-300 bg-white py-2 font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-700 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-900/20"
      >
        Sign Out
      </button>
    </div>
  </div>
{/if}

<style>
  .loading-state,
  .unauth-state {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    color: rgb(75, 85, 99);
  }
  
  :global(.dark) .loading-state,
  :global(.dark) .unauth-state {
    color: rgb(156, 163, 175);
  }
</style>
