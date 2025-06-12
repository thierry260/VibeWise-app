<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { afterNavigate } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import { journeyStore } from '$lib/stores/journey';
	import { getUserJourneyData, setUserIntention, analyzeUserPatterns, getSpiralPhaseColor, getSpiralPhaseDescription, type SpiralPhase, type Intention, type SpiralHistoryEntry, type PatternInsight } from '$lib/services/journey';
	import SpiralTimeline from '$lib/components/SpiralTimeline.svelte';
	import PatternInsights from '$lib/components/PatternInsights.svelte';
	import Button from '$lib/components/Button.svelte';
	import Pencil from '$lib/components/icons/Pencil.svelte';

	// User data
	let userName = '';

	// UI state
	let editingIntention = false;
	let intentionText = '';
	let intentionInputError = '';

	// Reactive bindings to journey store
	$: ({ currentPhase, spiralHistory, intention, patterns, loading, error } = $journeyStore);
	
	// Update intention text when intention changes
	$: if (intention && !editingIntention) {
		intentionText = intention.intention || '';
	}

	// Fetch journey data with proper guards
	async function fetchJourneyData(force = false) {
		// Guard: Check if user is authenticated
		if (!$authStore.user || $authStore.loading) {
			console.log('Auth not ready yet, waiting...');
			return;
		}

		// Guard: Check if we already have data and don't need to force refresh
		if (!force && $journeyStore.lastFetched && spiralHistory.length > 0) {
			console.log('Using cached journey data');
			return;
		}

		try {
			// Set loading state in store
			journeyStore.setLoading(true);
			journeyStore.setError(null);

			// Get user journey data
			const journeyResult = await getUserJourneyData($authStore.user);
			if (journeyResult.success) {
				// Update journey store with results
				journeyStore.setJourneyData(
					journeyResult.currentPhase || 'Green',
					journeyResult.spiralHistory || [],
					journeyResult.intention
				);
				
				// Update local intention text if needed
				if (journeyResult.intention) {
					intentionText = journeyResult.intention.intention;
				}
			} else {
				console.error('Failed to fetch journey data:', journeyResult.error);
				journeyStore.setError(new Error('Failed to fetch journey data'));
			}

			// Get user patterns
			const patternsResult = await analyzeUserPatterns($authStore.user);
			if (patternsResult.success && patternsResult.patterns) {
				journeyStore.setPatterns(patternsResult.patterns);
			} else {
				console.error('Failed to analyze patterns:', patternsResult.error);
			}
		} catch (err) {
			console.error('Error in fetchJourneyData:', err);
			journeyStore.setError(err instanceof Error ? err : new Error('Unknown error'));
		} finally {
			journeyStore.setLoading(false);
		}
	}

	// Save user intention
	async function saveIntention() {
		if (!$authStore.user) return;
		if (!intentionText.trim()) {
			intentionInputError = 'Please enter an intention';
			return;
		}

		try {
			const result = await setUserIntention($authStore.user, currentPhase, intentionText.trim());
			if (result.success) {
				intention = {
					phase: currentPhase,
					intention: intentionText.trim(),
					set_at: new Date().toISOString()
				};
				editingIntention = false;
				intentionInputError = '';
			} else {
				console.error('Failed to save intention:', result.error);
				intentionInputError = 'Failed to save intention';
			}
		} catch (err) {
			console.error('Error in saveIntention:', err);
			intentionInputError = 'An error occurred';
		}
	}

	// Format date for display
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	// Initialize on mount
	onMount(() => {
		if ($authStore.user) {
			userName = $authStore.user.displayName || 'there';
			fetchJourneyData();
		} else {
			// Set up a listener for auth state changes
			const unsubscribe = authStore.subscribe(authState => {
				if (authState.user && !authState.loading) {
					userName = authState.user.displayName || 'there';
					fetchJourneyData();
					unsubscribe();
				}
			});
		}
	});
	
	// Refetch data after navigation
	afterNavigate(() => {
		// Check if we have a user and if the data is stale (older than 5 minutes)
		const isDataStale = $journeyStore.lastFetched ? 
			(Date.now() - $journeyStore.lastFetched) > 5 * 60 * 1000 : true;
		
		if ($authStore.user && !$authStore.loading && (isDataStale || spiralHistory.length === 0)) {
			console.log('Refetching journey data after navigation');
			fetchJourneyData(true);
		}
	});
</script>

<div class="journey-container">
	<header class="journey-header"></header>

	{#if $authStore.loading}
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<p>Authenticating...</p>
		</div>
	{:else if loading}
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<p>Loading your journey data...</p>
		</div>
	{:else if error}
		<div class="error-container">
			<p>Error loading journey data: {error.message}</p>
			<button on:click={() => fetchJourneyData(true)}>Try Again</button>
		</div>
	{:else}
		<!-- Current Phase Section -->
		<div class="current-phase" style="border-left: 4px solid {getSpiralPhaseColor(currentPhase)}">
			<h2>
				Current Phase: <span class="phase-name" style="color: {getSpiralPhaseColor(currentPhase)}"
					>{currentPhase}</span
				>
			</h2>
			<div class="phase-description">
				<p>{getSpiralPhaseDescription(currentPhase)}</p>
			</div>
			<p class="color-gray-100 text-xs">Track your growth through the Spiral Dynamics model</p>
		</div>

		<!-- Intention Setting Section -->
		<div class="intention-section">
			<h2>Your Intention</h2>
			{#if intention && !editingIntention}
				<div class="intention-display">
					<div class="intention-header">
						<p class="intention-text">"{intention.intention}"</p>
						<Button 
							variant="ghost" 
							size="icon" 
							icon={Pencil} 
							ariaLabel="Edit Intention"
							on:click={() => editingIntention = true}
						/>
					</div>
					<p class="intention-meta">Set on {formatDate(intention.set_at)}</p>
				</div>
			{:else}
				<div class="intention-form">
					<p class="intention-prompt">
						What is your conscious intention during this {currentPhase} phase?
					</p>
					<textarea
						bind:value={intentionText}
						placeholder="e.g., Practice compassionate listening"
						rows="3"
						class={intentionInputError ? 'error' : ''}
					></textarea>
					{#if intentionInputError}
						<p class="error-text">{intentionInputError}</p>
					{/if}
					<div class="button-group">
						{#if intention}
							<button
								class="cancel-button"
								on:click={() => {
									editingIntention = false;
									intentionText = intention?.intention || '';
									intentionInputError = '';
								}}>Cancel</button
							>
						{/if}
						<button class="save-button" on:click={saveIntention}>Save Intention</button>
					</div>
				</div>
			{/if}
		</div>

		<!-- Spiral Visualization Section -->
		<div class="journey-map">
			<h2>Your Spiral Timeline</h2>
			{#if spiralHistory.length === 0}
				<div class="spiral-placeholder">
					<div class="spiral-message">
						<h3>No History Yet</h3>
						<p>Your spiral journey will be tracked here as you continue to use the app.</p>
						<p>
							Your current phase is <span style="color: {getSpiralPhaseColor(currentPhase)}"
								>{currentPhase}</span
							>.
						</p>
					</div>
				</div>
			{:else}
				<div class="spiral-visualization">
					<SpiralTimeline {spiralHistory} {currentPhase} layout="vertical" />
				</div>
			{/if}
		</div>

		<!-- Pattern Recognition Section -->
		<div class="journey-insights">
			<h2>Insights & Patterns</h2>
			<div class="insights-content">
				<PatternInsights {patterns} />
			</div>
		</div>

		<!-- Connected Sessions Section -->
		<div class="connected-sessions">
			<h2>Connected Sessions</h2>
			<div class="connected-sessions-content">
				<button class="view-sessions-button" on:click={() => goto(`/history?spiralPhase=${currentPhase}`)}>
					View All Sessions in {currentPhase} Phase
				</button>
				<p class="connected-sessions-note">
					See reflections, balcony experiments, and HRV sessions related to your current phase
				</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.journey-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem;
		padding-bottom: 3rem;
	}

	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem;
		text-align: center;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 3px solid rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		border-top-color: var(--color-primary);
		animation: spin 1s ease-in-out infinite;
		margin-bottom: 1rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.error-container {
		padding: 2rem;
		text-align: center;
		background-color: rgba(255, 0, 0, 0.05);
		border-radius: 1rem;
	}

	.error-container button {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background-color: var(--color-primary);
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	/* Current phase section */
	.current-phase {
		background-color: var(--color-bg-elevated);
		padding: 1.5rem 1.5rem 1.5rem 2rem;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		border-left: 4px solid var(--color-primary);
	}

	.current-phase h2 {
		font-size: 1.4rem;
		margin-bottom: 1rem;
	}

	.phase-name {
		font-weight: 700;
	}

	.phase-description p {
		line-height: 1.6;
	}

	/* Intention section */
	.intention-section {
		background-color: var(--color-bg-elevated);
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.intention-section h2 {
		font-size: 1.4rem;
		margin-bottom: 1rem;
	}

	.intention-display {
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: rgba(0, 0, 0, 0.03);
	}

	.intention-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.intention-text {
		font-size: 1.2rem;
		font-style: italic;
		margin-bottom: 0.5rem;
		line-height: 1.6;
		flex: 1;
	}

	.intention-meta {
		font-size: 0.9rem;
		color: var(--color-text-secondary);
		margin-bottom: 1rem;
	}

	.intention-prompt {
		margin-bottom: 0.75rem;
		font-weight: 500;
	}

	.intention-form textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		font-family: inherit;
		font-size: 1rem;
		resize: vertical;
		background-color: var(--color-bg);
		color: var(--color-text);
	}

	.intention-form textarea.error {
		border-color: #e74c3c;
	}

	.error-text {
		color: #e74c3c;
		font-size: 0.9rem;
		margin-top: 0.5rem;
	}

	.button-group {
		display: flex;
		gap: 0.75rem;
		margin-top: 1rem;
		justify-content: flex-end;
	}

	.save-button, .cancel-button {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.save-button {
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		color: white;
		border: none;
	}

	.cancel-button {
		background-color: transparent;
		border: 1px solid var(--color-border);
		color: var(--color-text);
	}

	/* Journey map section */
	.journey-map {
		background-color: var(--color-bg-elevated);
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.journey-map h2 {
		font-size: 1.4rem;
		margin-bottom: 1rem;
	}

	.spiral-placeholder {
		width: 100%;
		height: 250px;
		background: linear-gradient(135deg, rgba(77, 68, 179, 0.1), rgba(191, 70, 154, 0.1));
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.spiral-message {
		max-width: 80%;
		padding: 1.5rem;
	}

	.spiral-message h3 {
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
		color: var(--color-primary);
	}

	/* Insights section */
	.journey-insights {
		background-color: var(--color-bg-elevated);
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.journey-insights h2 {
		font-size: 1.4rem;
		margin-bottom: 1rem;
	}

	.insights-content {
		padding: 0.5rem;
	}

	/* Connected Sessions section */
	.connected-sessions {
		background-color: var(--color-bg-elevated);
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.connected-sessions h2 {
		font-size: 1.4rem;
		margin-bottom: 1rem;
	}

	.connected-sessions-content {
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.view-sessions-button {
		padding: 0.75rem 1.5rem;
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-weight: 500;
		cursor: pointer;
		transition: opacity 0.2s;
		width: 100%;
		max-width: 400px;
	}

	.view-sessions-button:hover {
		opacity: 0.9;
	}

	.connected-sessions-note {
		font-size: 0.9rem;
		color: var(--color-text-secondary);
		text-align: center;
	}

	.spiral-visualization {
		padding: 1rem 0;
	}

	@media (min-width: 768px) {
		.journey-container {
			padding: 2rem;
		}
	}
</style>
