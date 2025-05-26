<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import {
		getReflectionById,
		createBalconyExperiment,
		updateBalconyExperiment,
		getBalconyForReflection,
		type Reflection,
		type BalconyExperiment
	} from '$lib/services/sessions';

	// Parent reflection data
	let parentReflection: Reflection | null = null;
	let parentReflectionId: string | null = null;
	let reflectionLoadError: string | null = null;
	let isLoading = true;

	// Existing balcony data
	let existingBalcony: (BalconyExperiment & { id: string }) | null = null;
	let isEditMode = false;

	// Form state
	let pattern = '';
	let truth = '';
	let delayMinutes = 0;

	// UI state
	let isSubmitting = false;
	let submitSuccess = false;
	let submitError: string | null = null;

	// Load parent reflection data and check for existing balcony insight
	onMount(async () => {
		// Get reflection ID from URL query parameter
		parentReflectionId = $page.url.searchParams.get('reflectionId');

		if (!parentReflectionId) {
			reflectionLoadError =
				'No reflection ID provided. Balcony experiments must be linked to a reflection.';
			isLoading = false;
			return;
		}

		if (!$authStore.user) {
			reflectionLoadError = 'You must be logged in to create a balcony experiment.';
			isLoading = false;
			return;
		}

		try {
			// Get the parent reflection
			const reflectionResult = await getReflectionById($authStore.user, parentReflectionId);

			if (reflectionResult.success && reflectionResult.reflection) {
				parentReflection = reflectionResult.reflection;

				// Check if there's an existing balcony insight for this reflection
				const balconyResult = await getBalconyForReflection($authStore.user, parentReflectionId);

				if (balconyResult.success && balconyResult.balcony) {
					// We found an existing balcony insight, prefill the form
					existingBalcony = balconyResult.balcony;
					isEditMode = true;

					// Prefill form fields
					pattern = existingBalcony.pattern;
					truth = existingBalcony.truth;
					delayMinutes = existingBalcony.delay_minutes;
				} else {
					// No existing balcony insight, calculate delay from now
					const reflectionTime = new Date(parentReflection.timestamp).getTime();
					const currentTime = new Date().getTime();
					delayMinutes = Math.floor((currentTime - reflectionTime) / (1000 * 60));
				}
			} else {
				reflectionLoadError = 'Failed to load reflection. It may have been deleted.';
			}
		} catch (error) {
			console.error('Error loading reflection:', error);
			reflectionLoadError = 'An error occurred while loading the reflection.';
		} finally {
			isLoading = false;
		}
	});

	// Format delay time in a human-readable format
	function formatDelayTime(minutes: number): string {
		if (minutes < 60) {
			return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
		}

		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;

		if (remainingMinutes === 0) {
			return `${hours} hour${hours !== 1 ? 's' : ''}`;
		}

		return `${hours} hour${hours !== 1 ? 's' : ''} and ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
	}

	// Submit or update balcony experiment
	async function submitBalconyExperiment() {
		if (!$authStore.user || !parentReflectionId || !parentReflection) return;

		if (!pattern.trim()) {
			submitError = 'Please enter a limiting belief or pattern';
			return;
		}

		if (!truth.trim()) {
			submitError = 'Please enter your honest truth or insight';
			return;
		}

		isSubmitting = true;
		submitError = null;

		try {
			let result;

			if (isEditMode && existingBalcony) {
				// Update existing balcony experiment
				const balconyData = {
					pattern: pattern.trim(),
					truth: truth.trim(),
					delay_minutes: delayMinutes
				};

				result = await updateBalconyExperiment($authStore.user, existingBalcony.id, balconyData);
			} else {
				// Create new balcony experiment
				const balconyData = {
					timestamp: new Date().toISOString(),
					parent_reflection_id: parentReflectionId,
					pattern: pattern.trim(),
					truth: truth.trim(),
					delay_minutes: delayMinutes
				};

				result = await createBalconyExperiment($authStore.user, balconyData);
			}

			if (result.success) {
				submitSuccess = true;

				// Navigate back to history page after successful submission
				setTimeout(() => {
					goto('/history');
				}, 2000);
			} else {
				submitError = `Failed to ${isEditMode ? 'update' : 'save'} balcony experiment. Please try again.`;
			}
		} catch (error) {
			console.error('Error submitting balcony experiment:', error);
			submitError = 'An unexpected error occurred. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	// Go back to history
	function goBack() {
		goto('/history');
	}
</script>

<div class="header">
	<button class="back-button" on:click={goBack}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M19 12H5M12 19l-7-7 7-7" />
		</svg>
		Back
	</button>
</div>

<div class="balcony-container">
	{#if isLoading}
		<div class="loading">Loading reflection data...</div>
	{:else if reflectionLoadError}
		<div class="error-card">
			<h2>Error</h2>
			<p>{reflectionLoadError}</p>
			<button on:click={() => goto('/home')}>Return Home</button>
		</div>
	{:else if parentReflection}
		<div class="original-reflection">
			<h2>Original Reflection</h2>
			<div class="reflection-card">
				<div class="reflection-header">
					<span class="timestamp">{new Date(parentReflection.timestamp).toLocaleString()}</span>
					<span class="mood-tag">{parentReflection.mood.join(', ')}</span>
				</div>
				<p class="reflection-text">{parentReflection.text}</p>
				{#if parentReflection.tags && parentReflection.tags.length > 0}
					<div class="tags">
						{#each parentReflection.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				{/if}
			</div>

			<div class="time-difference">
				<span>You gained this insight after {formatDelayTime(delayMinutes)}.</span>
			</div>
		</div>

		<div class="form-section">
			<h2>What pattern or limiting belief did you notice?</h2>
			<textarea
				bind:value={pattern}
				placeholder="Describe the pattern or limiting belief you observed in yourself..."
				rows="3"
			></textarea>
		</div>

		<div class="form-section">
			<h2>What insight or truth did you discover when you zoomed out?</h2>
			<textarea
				bind:value={truth}
				placeholder="Share the honest truth or insight you gained with perspective..."
				rows="3"
			></textarea>
		</div>

		{#if submitError}
			<div class="error-message">{submitError}</div>
		{/if}

		<button
			class="submit-button"
			disabled={isSubmitting || submitSuccess}
			on:click={submitBalconyExperiment}
		>
			{#if isSubmitting}
				{isEditMode ? 'Updating...' : 'Saving...'}
			{:else if submitSuccess}
				{isEditMode ? 'Updated!' : 'Saved!'}
			{:else}
				{isEditMode ? 'Update Balcony Insight' : 'Save Balcony Insight'}
			{/if}
		</button>
	{/if}
</div>

<style>
	.balcony-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem;
	}

	h1 {
		font-size: 1.8rem;
		margin-bottom: 1.5rem;
		color: var(--color-primary);
	}

	.loading {
		text-align: center;
		padding: 2rem;
		color: var(--color-text-secondary);
	}

	.error-card {
		background-color: var(--color-card-bg);
		border-radius: 12px;
		padding: 1.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		text-align: center;
	}

	.error-card h2 {
		color: #e53935;
		margin-bottom: 0.5rem;
	}

	.error-card button {
		background-color: var(--color-primary);
		color: white;
		border: none;
		border-radius: 20px;
		padding: 0.5rem 1.5rem;
		margin-top: 1rem;
		cursor: pointer;
	}

	.original-reflection {
		margin-bottom: 2rem;
	}

	.reflection-card {
		background-color: var(--color-card-bg);
		border-radius: 12px;
		padding: 1.5rem;
		margin-bottom: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.reflection-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.75rem;
		font-size: 0.9rem;
	}

	.timestamp {
		color: var(--color-text-secondary);
	}

	.mood-tag {
		background-color: var(--color-primary);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
	}

	.reflection-text {
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		background-color: var(--color-bg-secondary);
		border-radius: 20px;
		padding: 0.25rem 0.75rem;
		font-size: 0.8rem;
		color: var(--color-text-secondary);
	}

	.time-difference {
		font-style: italic;
		color: var(--color-text-secondary);
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.form-section {
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 1.2rem;
		margin-bottom: 0.75rem;
		color: var(--color-text-secondary);
	}

	textarea {
		width: 100%;
		padding: 1rem;
		border-radius: 12px;
		border: 1px solid var(--color-border);
		background-color: var(--color-card-bg);
		font-size: 1rem;
		resize: vertical;
	}

	.error-message {
		color: #e53935;
		margin-bottom: 1rem;
		padding: 0.75rem;
		background-color: rgba(229, 57, 53, 0.1);
		border-radius: 8px;
	}

	.submit-button {
		width: 100%;
		background: linear-gradient(135deg, #4d44b3, #bf469a);
		color: white;
		border: none;
		border-radius: 12px;
		padding: 1rem;
		font-size: 1.1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.submit-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.submit-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
</style>
