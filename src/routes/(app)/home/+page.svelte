<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Card.svelte';
	import ActionTile from '$lib/components/ActionTile.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Sparkles, Heart, Settings, History, Calendar, Info } from 'lucide-svelte';

	let streakDays = 0;
	let vibeScore = 0;
	let spiralPhase = 'Beige';
	let intention = '';

	onMount(() => {
		// This would normally come from the database
		// Placeholder data for now
		streakDays = 3;
		vibeScore = 78;
		spiralPhase = 'Green';
		intention = 'Be present and mindful throughout the day';
	});

	// Function to navigate to the selected page
	function navigateTo(path: string) {
		goto(path);
	}
</script>

<div class="home-page">
	<!-- Streak Counter -->
	<div class="streak-counter mb-6">
		<div
			class="flex items-center rounded-lg bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] p-4 dark:from-purple-900/30 dark:to-indigo-900/30"
		>
			<div class="bg- mr-4 flex h-12 w-12 items-center justify-center rounded-full text-white">
				<Calendar size={24} strokeWidth={1.5} />
			</div>
			<div>
				<h2 class="text-lg font-semibold text-gray-200 dark:text-white">
					{streakDays} dagen streak
				</h2>
				<p class="text-sm text-gray-400 dark:text-gray-400">
					Ga zo door! Consistentie is een momentumschaker.
				</p>
			</div>
		</div>
	</div>

	<!-- Status Card -->
	<Card title="Jouw status" prominent={true}>
		<div class="grid grid-cols-2 gap-4">
			<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
				<h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Vibe Score</h4>
				<div class="mt-1 flex items-baseline">
					<p class="text-2xl font-semibold text-gray-900 dark:text-white">{vibeScore}</p>
					<p class="ml-2 text-sm font-medium text-green-600 dark:text-green-400">/ 100</p>
				</div>
			</div>
			<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
				<h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Spiral fase</h4>
				<p class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{spiralPhase}</p>
			</div>
		</div>
	</Card>

	<!-- Intention Display -->
	{#if intention}
		<Card className="mb-6 bg-gray-50 dark:bg-gray-700">
			<h3 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Jouw intentie</h3>
			<p class="text-lg font-medium text-gray-900 dark:text-white">"{intention}"</p>
		</Card>
	{/if}

	<!-- Quick Actions -->
	<div class="mb-6">
		<h3 class="mb-3 text-lg font-medium text-gray-900 dark:text-white">Acties</h3>
		<div class="grid grid-cols-2 gap-3">
			<ActionTile
				title="Nieuwe reflectie"
				icon={Sparkles}
				color="primary"
				onClick={() => navigateTo('/reflect')}
			/>

			<ActionTile
				title="HRV sessie"
				icon={Heart}
				color="secondary"
				onClick={() => navigateTo('/hrv')}
			/>

			<ActionTile
				title="Instellingen"
				icon={Settings}
				color="neutral"
				onClick={() => navigateTo('/settings')}
			/>

			<ActionTile
				title="Historie"
				icon={History}
				color="neutral"
				onClick={() => navigateTo('/history')}
			/>
		</div>
	</div>

	<!-- Activity Feed -->
	<div class="mb-6">
		<h3 class="mb-3 text-lg font-medium text-gray-900 dark:text-white">Recente activiteit</h3>
		<Card>
			<div class="text-center text-gray-500 dark:text-gray-400">
				<Info size={32} class="mx-auto mb-3 opacity-50" />
				<p>Je activiteit zal hier verschijnen zodra je de app gebruikt.</p>
				<p class="mt-2 text-sm">Probeer een HRV sessie te starten om te beginnen!</p>
			</div>
		</Card>
	</div>
</div>
