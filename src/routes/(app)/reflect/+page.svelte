<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import { divineToolChooserStore, isDivineTimingEnabled } from '$lib/stores/divineTools';
	import DivineToolChooser from '$lib/components/DivineToolChooser.svelte';
	import {
		createReflection,
		uploadAudioRecording,
		analyzeVoiceTone,
		type MoodLevel
	} from '$lib/services/sessions';

	// Emotion groups based on Abraham-Hicks scale
	const emotionGroups = {
		high: [
			'Joy',
			'Appreciation',
			'Empowerment',
			'Freedom',
			'Love',
			'Passion',
			'Enthusiasm',
			'Eagerness',
			'Happiness',
			'Positive Expectation',
			'Belief',
			'Optimism',
			'Hopefulness',
			'Contentment'
		],
		neutral: [
			'Boredom',
			'Pessimism',
			'Frustration',
			'Irritation',
			'Impatience',
			'Overwhelm',
			'Disappointment',
			'Doubt',
			'Worry'
		],
		low: [
			'Blame',
			'Discouragement',
			'Anger',
			'Revenge',
			'Hatred',
			'Rage',
			'Jealousy',
			'Insecurity',
			'Guilt',
			'Unworthiness',
			'Fear',
			'Grief',
			'Depression',
			'Despair',
			'Powerlessness'
		]
	};

	// Predefined tags
	const predefinedTags = [
		'Work',
		'Family',
		'Friends',
		'Health',
		'Relationship',
		'Personal Growth',
		'Finances',
		'Creativity',
		'Spirituality'
	];

	// Form state
	let selectedMoods: string[] = [];
	let moodLevel: MoodLevel = 'neutral';
	let reflectionText = '';
	let selectedTags: string[] = [];
	let customTag = '';
	let timestamp = new Date();
	let useCurrentTime = true;

	// Audio recording state
	let isRecording = false;
	let audioRecorder: MediaRecorder | null = null;
	let audioChunks: BlobPart[] = [];
	let audioBlob: Blob | null = null;
	let audioUrl: string | null = null;
	let recordingDuration = 0;
	let recordingInterval: ReturnType<typeof setInterval> | null = null;
	let mediaStream: MediaStream | null = null;
	let voiceInsight: { tone: string; confidence: number } | null = null;
	let isAnalyzingVoice = false;

	// UI state
	let isSubmitting = false;
	let submitSuccess = false;
	let submitError: string | null = null;
	let activeGroup: 'high' | 'neutral' | 'low' = 'neutral';

	// Handle mood selection
	function toggleMood(mood: string) {
		const index = selectedMoods.indexOf(mood);
		if (index === -1) {
			selectedMoods = [...selectedMoods, mood];
		} else {
			selectedMoods = selectedMoods.filter((m) => m !== mood);
		}
	}

	// Handle tag selection
	function toggleTag(tag: string) {
		const index = selectedTags.indexOf(tag);
		if (index === -1) {
			selectedTags = [...selectedTags, tag];
		} else {
			selectedTags = selectedTags.filter((t) => t !== tag);
		}
	}

	// Add custom tag
	function addCustomTag() {
		if (customTag && !selectedTags.includes(customTag)) {
			selectedTags = [...selectedTags, customTag];
			customTag = '';
		}
	}

	// Handle timestamp toggle
	function toggleTimestamp() {
		useCurrentTime = !useCurrentTime;
		if (useCurrentTime) {
			timestamp = new Date();
		}
	}

	// Helper function to safely check if we're on a mobile platform
	function isMobilePlatform(): boolean {
		try {
			return (
				typeof window !== 'undefined' &&
				'Capacitor' in window &&
				typeof (window as any).Capacitor?.getPlatform === 'function' &&
				(window as any).Capacitor.getPlatform() !== 'web'
			);
		} catch (e) {
			console.log('Error checking platform:', e);
			return false;
		}
	}

	// Helper function to request microphone permission on mobile
	async function requestMicrophonePermission(): Promise<boolean> {
		try {
			// Only proceed if we're on a mobile platform
			if (!isMobilePlatform()) return true;

			console.log('Checking microphone permission on mobile');

			// Safely access Capacitor APIs with proper type casting
			const capacitor = (window as any).Capacitor;

			if (capacitor.getPlatform() === 'android') {
				// Check if Permissions plugin is available
				if (capacitor.Plugins?.Permissions) {
					// Check current permission status
					const permStatus = await capacitor.Plugins.Permissions.query({
						name: 'microphone'
					});

					if (permStatus.state !== 'granted') {
						console.log('Requesting microphone permission...');
						const requestResult = await capacitor.Plugins.Permissions.request({
							name: 'microphone'
						});

						if (requestResult.state !== 'granted') {
							alert('Microphone permission is required for voice recording');
							return false;
						}
					}

					console.log('Microphone permission granted');
					return true;
				}
			}

			// If we're on iOS or permissions API isn't available, try direct access
			return true;
		} catch (err) {
			console.error('Error requesting microphone permission:', err);
			alert(
				'Unable to access microphone. Please enable microphone permissions in your device settings.'
			);
			return false;
		}
	}

	// Start audio recording
	async function startRecording() {
		try {
			// First request permissions if needed
			const hasPermission = await requestMicrophonePermission();
			if (!hasPermission) {
				throw new Error('Microphone permission denied');
			}

			// Store the stream to stop tracks later
			mediaStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false
			});

			// Try different MIME types that work well on Android
			const mimeTypes = [
				'audio/webm;codecs=opus',
				'audio/webm',
				'audio/mp4',
				'audio/ogg;codecs=opus'
			];

			// Find a supported MIME type
			let options = {};
			for (const mimeType of mimeTypes) {
				if (MediaRecorder.isTypeSupported(mimeType)) {
					options = { mimeType };
					console.log(`Using supported MIME type: ${mimeType}`);
					break;
				}
			}

			// Create the recorder with the best available options
			audioRecorder = new MediaRecorder(mediaStream, options);
			audioChunks = [];

			// Handle data as it becomes available
			audioRecorder.addEventListener('dataavailable', (event) => {
				if (event.data && event.data.size > 0) {
					audioChunks.push(event.data);
				}
			});

			// Handle recording stop
			audioRecorder.addEventListener('stop', () => {
				if (audioChunks.length > 0) {
					const mimeType = audioRecorder?.mimeType || 'audio/webm';
					audioBlob = new Blob(audioChunks, { type: mimeType });
					audioUrl = URL.createObjectURL(audioBlob);
					console.log(`Recording completed: ${audioChunks.length} chunks, type: ${mimeType}`);
				} else {
					console.error('No audio data was recorded');
				}

				// Clean up
				isRecording = false;
				if (recordingInterval) {
					clearInterval(recordingInterval);
					recordingInterval = null;
				}

				// Stop all tracks to properly release the microphone
				if (mediaStream) {
					mediaStream.getTracks().forEach((track) => track.stop());
				}
			});

			// Start recording with timeslice to get data during recording
			audioRecorder.start(1000);
			console.log('Recording started');

			// Update UI state
			isRecording = true;
			recordingDuration = 0;

			// Update recording duration every second
			recordingInterval = setInterval(() => {
				recordingDuration += 1;
			}, 1000);
		} catch (error) {
			console.error('Error starting recording:', error);
			isRecording = false;
		}
	}

	// Stop audio recording
	function stopRecording() {
		if (audioRecorder && isRecording) {
			try {
				audioRecorder.stop();
				// The 'stop' event handler will handle cleanup and state updates
				console.log('Recording stopped');
			} catch (error) {
				console.error('Error stopping recording:', error);

				// Manual cleanup in case of error
				isRecording = false;
				if (recordingInterval) {
					clearInterval(recordingInterval);
					recordingInterval = null;
				}

				// Release microphone
				if (mediaStream) {
					mediaStream.getTracks().forEach((track) => track.stop());
				}
			}
		}
	}

	// Format recording duration
	function formatDuration(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	// Analyze voice tone
	async function analyzeVoice() {
		if (!audioBlob) return;

		isAnalyzingVoice = true;
		try {
			// Pass the audio blob directly to the analyzer
			// This works with our local-only storage approach
			const result = await analyzeVoiceTone(audioBlob);
			if (result.success && result.tone && result.confidence) {
				voiceInsight = {
					tone: result.tone,
					confidence: result.confidence
				};
			}
		} catch (error) {
			console.error('Error analyzing voice:', error);
		} finally {
			isAnalyzingVoice = false;
		}
	}

	// Submit reflection
	async function submitReflection() {
		if (!$authStore.user) return;

		if (selectedMoods.length === 0) {
			submitError = 'Please select at least one mood';
			return;
		}

		if (!reflectionText.trim()) {
			submitError = 'Please enter a reflection';
			return;
		}

		isSubmitting = true;
		submitError = null;

		try {
			// Determine mood level based on selected moods
			let determinedMoodLevel: MoodLevel = 'neutral';

			for (const mood of selectedMoods) {
				if (emotionGroups.high.includes(mood)) {
					determinedMoodLevel = 'high';
					break;
				} else if (emotionGroups.low.includes(mood)) {
					determinedMoodLevel = 'low';
					break;
				}
			}

			// Store audio locally if recorded
			let audioUploadUrl = '';
			let audioStorage: 'local' | 'cloud' = 'local';
			if (audioBlob) {
				const uploadResult = await uploadAudioRecording($authStore.user, audioBlob);
				if (uploadResult.success && uploadResult.url) {
					audioUploadUrl = uploadResult.url;
					// Ensure audioStorage is properly typed
					audioStorage = uploadResult.storage === 'cloud' ? 'cloud' : 'local';

					// If we haven't analyzed the voice yet, do it now
					if (!voiceInsight) {
						await analyzeVoice();
					}
				}
			}

			// Create reflection
			const reflectionData = {
				timestamp: timestamp.toISOString(),
				mood: selectedMoods,
				mood_level: determinedMoodLevel,
				text: reflectionText,
				tags: selectedTags,
				...(audioUploadUrl && {
					audio_url: audioUploadUrl,
					audio_storage: audioStorage
				}),
				...(voiceInsight && { voice_insight: voiceInsight })
			};

			const result = await createReflection($authStore.user, reflectionData);

			if (result.success) {
				submitSuccess = true;

				// Check if divine timing is enabled for this user
				const divineTimingEnabled = await isDivineTimingEnabled($authStore.user);

				if (divineTimingEnabled) {
					// Show a random divine tool
					const selectedTool = divineToolChooserStore.showRandomTool();

					// Log that the tool was shown
					if (selectedTool) {
						await divineToolChooserStore.logToolInteraction(
							$authStore.user,
							selectedTool.id,
							'shown'
						);
					}

					// Reset form but don't navigate away (Divine ToolChooser will handle navigation)
					setTimeout(() => {
						selectedMoods = [];
						reflectionText = '';
						selectedTags = [];
						customTag = '';
						audioBlob = null;
						audioUrl = null;
						voiceInsight = null;
						submitSuccess = false;
					}, 2000);
				} else {
					// If divine timing is disabled, reset form and navigate to history
					setTimeout(() => {
						selectedMoods = [];
						reflectionText = '';
						selectedTags = [];
						customTag = '';
						audioBlob = null;
						audioUrl = null;
						voiceInsight = null;
						submitSuccess = false;

						// Navigate to history
						goto('/history');
					}, 2000);
				}
			} else {
				submitError = 'Failed to save reflection. Please try again.';
			}
		} catch (error) {
			console.error('Error submitting reflection:', error);
			submitError = 'An unexpected error occurred. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	// Clean up on component unmount
	onMount(() => {
		return () => {
			if (audioUrl) {
				URL.revokeObjectURL(audioUrl);
			}
			if (recordingInterval) {
				clearInterval(recordingInterval);
			}
		};
	});
</script>

<div class="reflect-container">
	<h1>New Reflection</h1>

	<div class="form-section">
		<h2>How are you feeling?</h2>

		<div class="mood-selector">
			<div class="mood-tabs">
				<button class:active={activeGroup === 'high'} on:click={() => (activeGroup = 'high')}>
					High Vibes
				</button>
				<button class:active={activeGroup === 'neutral'} on:click={() => (activeGroup = 'neutral')}>
					Neutral
				</button>
				<button class:active={activeGroup === 'low'} on:click={() => (activeGroup = 'low')}>
					Low Vibes
				</button>
			</div>

			<div class="mood-options">
				{#each emotionGroups[activeGroup] as mood}
					<button
						class="mood-chip"
						class:selected={selectedMoods.includes(mood)}
						on:click={() => toggleMood(mood)}
					>
						{mood}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="form-section">
		<h2>Describe your moment</h2>
		<textarea
			bind:value={reflectionText}
			placeholder="What's happening in this moment? How do you feel?"
			rows="4"
		></textarea>
	</div>

	<div class="form-section">
		<h2>Tags</h2>
		<div class="tags-container">
			{#each predefinedTags as tag}
				<button
					class="tag-chip"
					class:selected={selectedTags.includes(tag)}
					on:click={() => toggleTag(tag)}
				>
					{tag}
				</button>
			{/each}
		</div>

		<div class="custom-tag">
			<input
				type="text"
				bind:value={customTag}
				placeholder="Add custom tag"
				on:keydown={(e) => e.key === 'Enter' && addCustomTag()}
			/>
			<button on:click={addCustomTag}>Add</button>
		</div>
	</div>

	<div class="form-section">
		<h2>When did this happen?</h2>
		<div class="timestamp-selector">
			<label>
				<input type="radio" checked={useCurrentTime} on:change={toggleTimestamp} />
				Now
			</label>
			<label>
				<input type="radio" checked={!useCurrentTime} on:change={toggleTimestamp} />
				Choose time
			</label>

			{#if !useCurrentTime}
				<input type="datetime-local" bind:value={timestamp} />
			{/if}
		</div>
	</div>

	<div class="form-section">
		<h2>Voice Log (Optional)</h2>
		<div class="voice-recorder">
			{#if !isRecording && !audioUrl}
				<button class="record-button" on:click={startRecording}> Start Recording </button>
			{:else if isRecording}
				<div class="recording-indicator">
					<span class="recording-pulse"></span>
					Recording... {formatDuration(recordingDuration)}
				</div>
				<button class="stop-button" on:click={stopRecording}> Stop Recording </button>
			{:else if audioUrl}
				<div class="audio-player">
					<audio controls src={audioUrl}></audio>
					<button
						class="delete-button"
						on:click={() => {
							audioUrl = null;
							audioBlob = null;
							voiceInsight = null;
						}}
					>
						Delete Recording
					</button>
					{#if !voiceInsight && !isAnalyzingVoice}
						<button class="analyze-button" on:click={analyzeVoice}> Analyze Voice Tone </button>
					{:else if isAnalyzingVoice}
						<div class="analyzing">Analyzing voice tone...</div>
					{:else if voiceInsight}
						<div class="voice-insight">
							<span>Detected tone: <strong>{voiceInsight.tone}</strong></span>
							<span>Confidence: {Math.round(voiceInsight.confidence * 100)}%</span>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	{#if submitError}
		<div class="error-message">{submitError}</div>
	{/if}

	<button
		class="submit-button"
		disabled={isSubmitting || submitSuccess}
		on:click={submitReflection}
	>
		{#if isSubmitting}
			Saving...
		{:else if submitSuccess}
			Saved!
		{:else}
			Log Reflection
		{/if}
	</button>
</div>

<!-- Divine ToolChooser component -->
<DivineToolChooser onClose={() => goto('/history')} />

<style>
	.reflect-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem;
	}

	h1 {
		font-size: 1.8rem;
		margin-bottom: 1.5rem;
		color: var(--color-primary);
	}

	.form-section {
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 1.2rem;
		margin-bottom: 0.75rem;
		color: var(--color-text-secondary);
	}

	.mood-selector {
		background-color: var(--color-card-bg);
		border-radius: 12px;
		padding: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.mood-tabs {
		display: flex;
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.mood-tabs button {
		flex: 1;
		background: none;
		border: none;
		padding: 0.5rem;
		font-size: 0.9rem;
		cursor: pointer;
		color: var(--color-text-secondary);
		transition: all 0.2s ease;
	}

	.mood-tabs button.active {
		color: var(--color-primary);
		border-bottom: 2px solid var(--color-primary);
	}

	.mood-options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.mood-chip,
	.tag-chip {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 20px;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.mood-chip.selected,
	.tag-chip.selected {
		background-color: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
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

	.tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.custom-tag {
		display: flex;
		gap: 0.5rem;
	}

	.custom-tag input {
		flex: 1;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		border: 1px solid var(--color-border);
		background-color: var(--color-card-bg);
	}

	.custom-tag button {
		background-color: var(--color-primary);
		color: white;
		border: none;
		border-radius: 20px;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}

	.timestamp-selector {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
	}

	.timestamp-selector label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.timestamp-selector input[type='datetime-local'] {
		padding: 0.5rem;
		border-radius: 8px;
		border: 1px solid var(--color-border);
		background-color: var(--color-card-bg);
	}

	.voice-recorder {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.record-button,
	.stop-button {
		background-color: var(--color-primary);
		color: white;
		border: none;
		border-radius: 24px;
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.stop-button {
		background-color: #e53935;
	}

	.recording-indicator {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #e53935;
		font-weight: 500;
	}

	.recording-pulse {
		width: 12px;
		height: 12px;
		background-color: #e53935;
		border-radius: 50%;
		animation: pulse 1.5s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.95);
			opacity: 1;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.8;
		}
		100% {
			transform: scale(0.95);
			opacity: 1;
		}
	}

	.audio-player {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.audio-player audio {
		width: 100%;
	}

	.delete-button,
	.analyze-button {
		background: none;
		border: 1px solid var(--color-border);
		border-radius: 20px;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		cursor: pointer;
	}

	.analyze-button {
		background-color: var(--color-primary);
		color: white;
		border: none;
	}

	.voice-insight {
		background-color: var(--color-bg-secondary);
		border-radius: 8px;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
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
