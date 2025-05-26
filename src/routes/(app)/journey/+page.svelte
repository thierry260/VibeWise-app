<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth';
	import {
		getUserJourneyData,
		setUserIntention,
		analyzeUserPatterns,
		getSpiralPhaseColor,
		getSpiralPhaseDescription,
		type SpiralPhase,
		type Intention,
		type SpiralHistoryEntry,
		type PatternInsight
	} from '$lib/services/journey';
	import SpiralTimeline from '$lib/components/SpiralTimeline.svelte';
	import PatternInsights from '$lib/components/PatternInsights.svelte';

	// User data
	let userName = '';
	let loading = true;
	let error: Error | null = null;

	// Journey data
	let currentPhase: SpiralPhase = 'Green';
	let spiralHistory: SpiralHistoryEntry[] = [];
	let intention: Intention | undefined;
	let patterns: PatternInsight[] = [];

	// UI state
	let editingIntention = false;
	let intentionText = '';
	let intentionInputError = '';

	// Fetch journey data
	async function fetchJourneyData() {
		if (!$authStore.user) return;

		try {
			loading = true;
			error = null;

			// Get user journey data
			const journeyResult = await getUserJourneyData($authStore.user);
			if (journeyResult.success) {
				currentPhase = journeyResult.currentPhase || 'Green';
				spiralHistory = journeyResult.spiralHistory || [];
				intention = journeyResult.intention;

				if (intention) {
					intentionText = intention.intention;
				}
			} else {
				console.error('Failed to fetch journey data:', journeyResult.error);
				error = new Error('Failed to fetch journey data');
			}

			// Get user patterns
			const patternsResult = await analyzeUserPatterns($authStore.user);
			if (patternsResult.success) {
				patterns = patternsResult.patterns || [];
			} else {
				console.error('Failed to analyze patterns:', patternsResult.error);
			}
		} catch (err) {
			console.error('Error in fetchJourneyData:', err);
			error = err instanceof Error ? err : new Error('Unknown error');
		} finally {
			loading = false;
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
		}
	});
</script>

<div class="journey-container">
	<header class="journey-header"></header>

	{#if loading}
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<p>Loading your journey data...</p>
		</div>
	{:else if error}
		<div class="error-container">
			<p>Error loading journey data: {error.message}</p>
			<button on:click={fetchJourneyData}>Try Again</button>
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
					<p class="intention-text">"{intention.intention}"</p>
					<p class="intention-meta">Set on {formatDate(intention.set_at)}</p>
					<button class="edit-button" on:click={() => (editingIntention = true)}
						>Edit Intention</button
					>
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
						<p>Continue using VibeWise to build your spiral journey data.</p>
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
	}

	.journey-header {
		text-align: center;
		margin-bottom: 1rem;
	}

	.journey-header h1 {
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		font-weight: 700;
	}

	.journey-header p {
		color: var(--color-text-secondary, #666666);
		font-size: 1rem;
	}

	/* Loading and error states */
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

	.intention-text {
		font-size: 1.2rem;
		font-style: italic;
		margin-bottom: 0.5rem;
		line-height: 1.6;
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

	.save-button,
	.edit-button,
	.cancel-button {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.save-button,
	.edit-button {
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

	.spiral-visualization {
		padding: 1rem 0;
	}

	@media (min-width: 768px) {
		.journey-container {
			padding: 2rem;
		}

		.journey-header h1 {
			font-size: 2.2rem;
		}
	}
</style>
