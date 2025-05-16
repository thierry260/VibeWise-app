<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { signInWithGoogle, signInWithEmail, sendMagicLink } from '$lib/firebase';
	import { authStore } from '$lib/stores/auth';
	import { theme } from '$lib/stores/theme';
	import type { AuthError } from 'firebase/auth';

	let email = '';
	let password = '';
	let loading = false;
	let error = '';
	let success = '';
	let showPassword = false;
	let activeTab = 'email';

	onMount(() => {
		// Redirect if already logged in
		const unsubscribe = authStore.subscribe(($auth) => {
			if ($auth.user) {
				goto('/');
			}
		});

		return () => {
			unsubscribe();
		};
	});

	const handleEmailLogin = async () => {
		if (!email || !password) {
			error = 'Please enter both email and password';
			return;
		}

		try {
			loading = true;
			error = '';
			await signInWithEmail(email, password);
			goto('/');
		} catch (err) {
			console.error('Login error:', err);
			const authError = err as AuthError;
			error = authError.message || 'Failed to sign in. Please try again.';
		} finally {
			loading = false;
		}
	};

	const handleMagicLink = async () => {
		if (!email) {
			error = 'Please enter your email';
			return;
		}

		try {
			loading = true;
			error = '';
			await sendMagicLink(email, window.location.href);
			success = 'Check your email for the magic link to sign in!';
		} catch (err) {
			console.error('Magic link error:', err);
			const authError = err as AuthError;
			error = authError.message || 'Failed to send magic link. Please try again.';
		} finally {
			loading = false;
		}
	};

	const handleGoogleLogin = async () => {
		try {
			loading = true;
			error = '';
			await signInWithGoogle();
			goto('/');
		} catch (err) {
			console.error('Google sign in error:', err);
			const authError = err as AuthError;
			error = authError.message || 'Failed to sign in with Google. Please try again.';
		} finally {
			loading = false;
		}
	};
</script>

<div
	class="from-primary-50 to-primary-100 flex min-h-screen items-center justify-center p-4 transition-colors duration-200 dark:from-gray-900 dark:to-gray-800"
>
	<div
		class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-800"
	>
		<!-- Logo Header -->
		<div class="px-8 pb-6 pt-8 text-center">
			<div class="mb-6 flex justify-center">
				<img src="/vibewise-logo.svg" alt="VibeWise" class="h-16" />
			</div>
			<h1 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
			<p class="text-gray-600 dark:text-gray-300">Sign in to continue to your account</p>
		</div>

		<!-- Tabs -->
		<div class="px-8 pt-2">
			<div class="flex border-b border-gray-200 dark:border-gray-700">
				<button
					on:click={() => (activeTab = 'email')}
					class="flex-1 rounded-none border-b-2 px-1 py-3 text-center text-sm font-medium transition-colors duration-200 {activeTab ===
					'email'
						? 'border-primary-500 text-primary-600 dark:border-primary-400 dark:text-primary-300'
						: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}"
				>
					Email
				</button>
				<button
					on:click={() => (activeTab = 'magic')}
					class="flex-1 rounded-none border-b-2 px-1 py-3 text-center text-sm font-medium transition-colors duration-200 {activeTab ===
					'magic'
						? 'border-primary-500 text-primary-600 dark:border-primary-400 dark:text-primary-300'
						: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}"
				>
					Magic Link
				</button>
			</div>
		</div>

		<!-- Form Content -->
		<div class="px-8 py-6">
			{#if error}
				<div
					class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400"
				>
					{error}
				</div>
			{/if}
			{#if success}
				<div
					class="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400"
				>
					{success}
				</div>
			{/if}

			<!-- Email/Password Form -->
			{#if activeTab === 'email'}
				<form on:submit|preventDefault={handleEmailLogin} class="space-y-4">
					<div>
						<label
							for="email"
							class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Email address
						</label>
						<input
							id="email"
							type="email"
							autocomplete="email"
							bind:value={email}
							class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
							placeholder="you@example.com"
							required
						/>
					</div>
					<div>
						<div class="mb-1 flex items-center justify-between">
							<label
								for="password"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Password
							</label>
							<a
								href="/forgot-password"
								class="text-primary-600 hover:text-primary-500 dark:text-primary-400 text-sm"
							>
								Forgot password?
							</a>
						</div>
						<div class="relative">
							<input
								id="password"
								bind:value={password}
								type={showPassword ? 'text' : 'password'}
								autocomplete="current-password"
								class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
								placeholder="••••••••"
								required
							/>
							<button
								type="button"
								on:click={() => (showPassword = !showPassword)}
								class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
								aria-label={showPassword ? 'Hide password' : 'Show password'}
							>
								{#if showPassword}
									<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
										/>
									</svg>
								{:else}
									<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								{/if}
							</button>
						</div>
					</div>
					<button
						type="submit"
						disabled={loading}
						class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 flex w-full justify-center rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if loading}
							<svg
								class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
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
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Signing in...
						{:else}
							Sign in
						{/if}
					</button>
				</form>

				<!-- Magic Link Form -->
			{:else if activeTab === 'magic'}
				<form on:submit|preventDefault={handleMagicLink} class="space-y-4">
					<div>
						<label
							for="magic-email"
							class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Email address
						</label>
						<input
							id="magic-email"
							type="email"
							autocomplete="email"
							bind:value={email}
							class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
							placeholder="you@example.com"
							required
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 flex w-full justify-center rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if loading}
							<svg
								class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
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
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Sending magic link...
						{:else}
							Send Magic Link
						{/if}
					</button>
				</form>
			{/if}

			<!-- Divider -->
			<div class="relative my-6">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
						Or continue with
					</span>
				</div>
			</div>

			<!-- Social Login Buttons -->
			<div class="space-y-3">
				<button
					on:click={handleGoogleLogin}
					disabled={loading}
					class="focus:ring-primary-500 flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
				>
					<svg
						class="mr-2 h-5 w-5"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
							<path
								fill="#4285F4"
								d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.28426 53.749 C -8.52426 55.059 -9.22426 56.159 -10.3943 56.859 L -10.3943 60.329 L -6.34426 60.329 C -3.73426 57.939 -2.754 55.029 -2.754 51.509 L -3.264 51.509 Z"
							/>
							<path
								fill="#34A853"
								d="M -14.754 63.239 C -11.514 63.239 -8.80426 62.159 -6.70426 60.329 L -10.7543 56.859 C -11.8843 57.589 -13.3943 58.019 -14.754 58.019 C -17.8843 58.019 -20.5343 55.869 -21.4643 52.979 L -25.6343 52.979 L -25.6343 56.529 C -23.7143 60.439 -19.9243 63.239 -14.754 63.239 Z"
							/>
							<path
								fill="#FBBC05"
								d="M -21.4643 52.979 C -21.7343 52.189 -21.8843 51.339 -21.8843 50.439 C -21.8843 49.539 -21.7243 48.689 -21.4643 47.899 L -21.4643 44.339 L -25.6343 44.339 C -26.8943 46.779 -27.5043 49.509 -27.3643 52.979 L -21.4643 52.979 Z"
							/>
							<path
								fill="#EA4335"
								d="M -14.754 42.859 C -12.0243 42.859 -9.70426 43.799 -7.89426 45.619 L -3.52426 41.249 C -6.99426 37.939 -11.5343 36.639 -14.754 37.639 C -19.9243 37.639 -23.7143 40.439 -25.6343 44.339 L -21.4643 47.899 C -20.5343 45.009 -17.8843 42.859 -14.754 42.859 Z"
							/>
						</g>
					</svg>
					Continue with Google
				</button>
			</div>
		</div>

		<!-- Sign Up Link -->
		<div class="bg-gray-50 px-8 py-4 text-center dark:bg-gray-700/30">
			<p class="text-sm text-gray-600 dark:text-gray-300">
				Don't have an account?{' '}
				<a
					href="/signup"
					class="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
				>
					Sign up
				</a>
			</p>
		</div>
	</div>
</div>
