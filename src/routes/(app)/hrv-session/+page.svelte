<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import { divineToolChooserStore, isDivineTimingEnabled } from '$lib/stores/divineTools';
	import DivineToolChooser from '$lib/components/DivineToolChooser.svelte';
	import { createHRVSession } from '$lib/services/sessions';
	import { fade } from 'svelte/transition';
	import {
		bleConnectionStatus,
		hrvData,
		sessionTimer,
		isBluetoothSupported,
		startScan,
		disconnect,
		resetHRVData,
		startSessionTimer,
		stopSessionTimer,
		getSessionSummary
	} from '$lib/services/ble';
	import { getVibeScoreInterpretation } from '$lib/utils/vibeScore';
	import uPlot from 'uplot';
	import 'uplot/dist/uPlot.min.css';

	// Chart reference
	let chartEl: HTMLElement;
	let chart: uPlot | null = null;

	// Breathing guide state
	let breathPhase = 'inhale'; // 'inhale' or 'exhale'
	let breathProgress = 0; // 0-100
	let breathingInterval: ReturnType<typeof setInterval> | null = null;

	// Session state
	let sessionActive = false;
	let showSummary = false;
	let sessionSummary: ReturnType<typeof getSessionSummary> | null = null;

	// UI state
	let scanError: string | null = null;
	let saveError: string | null = null;
	let isSaving = false;
	let saveSuccess = false;

	// Chart legend values
	let legendValues = {
		hr: '-',
		rmssd: '-',
		vibe: '-'
	};

	// Vibe score interpretation
	let vibeInterpretation = getVibeScoreInterpretation(0);

	// Update vibe interpretation when the score changes
	$: vibeInterpretation = getVibeScoreInterpretation($hrvData.vibeScore);

	// Initialize chart
	function initChart() {
		if (!chartEl) {
			console.error('Chart element not found');
			return null;
		}

		console.log('Initializing chart with element:', chartEl);

		// Define proper types for uPlot options
		const opts: uPlot.Options = {
			width: chartEl.clientWidth,
			height: 240,
			padding: [20, 0, 0, 0], // [top, right, bottom, left]
			cursor: {
				show: true,
				points: {
					show: false
				},
				drag: {
					setScale: false
				},
				focus: {
					prox: 30
				},
				dataIdx: (u, seriesIdx, closestIdx) => {
					// Update legend values when cursor moves
					if (closestIdx !== null) {
						const data = u.data;
						legendValues = {
							hr: data[1][closestIdx] !== null ? (data[1][closestIdx] as number).toFixed(0) + ' bpm' : '-',
							rmssd: data[2][closestIdx] !== null ? (data[2][closestIdx] as number).toFixed(1) + ' ms' : '-',
							vibe: data[3][closestIdx] !== null ? (data[3][closestIdx] as number).toFixed(0) : '-'
						};
					}
					return closestIdx;
				}
			},
			legend: {
				show: false // Disable default legend
			},
			series: [
				{}, // x-axis
				{
					scale: 'hr',
					label: 'Heart Rate',
					value: (u: uPlot, v: number | null) => (v == null ? '-' : v.toFixed(0) + ' bpm'),
					stroke: 'rgba(229, 57, 53, 0.8)',  // #E53935 with opacity
					width: 2,
					points: {
						show: false
					},
					spanGaps: true
				},
				{
					scale: 'rmssd',
					label: 'Balance',
					value: (u: uPlot, v: number | null) => (v == null ? '-' : v.toFixed(1) + ' ms'),
					stroke: 'rgba(77, 68, 179, 0.8)',  // #4D44B3 with opacity
					width: 2,
					points: {
						show: false
					},
					spanGaps: true
				},
				{
					scale: 'vibe',
					label: 'Vibe Score',
					value: (u: uPlot, v: number | null) => (v == null ? '-' : v.toFixed(0)),
					stroke: 'rgba(191, 70, 154, 0.8)',  // #BF469A with opacity
					width: 2,
					points: {
						show: false
					},
					spanGaps: true
				}
			],
			scales: {
				x: {
					time: true,
					auto: false,
					range: (u, min, max) => {
						// Show last 2 minutes of data
						const now = Date.now() / 1000;
						return [now - 120, now];
					}
				},
				hr: {
					auto: true,
					range: [40, 180] as [number, number]
				},
				rmssd: {
					auto: true,
					range: [0, 100] as [number, number]
				},
				vibe: {
					auto: true,
					range: [0, 100] as [number, number]
				}
			},
			axes: [
				// No axes shown for minimalist design
			]
		};

		try {
			console.log('Creating uPlot instance with options:', opts);
			chart = new uPlot(opts, [[], [], [], []], chartEl);
			console.log('Chart created successfully:', chart);

			// Update legend with latest values when data changes
			if (chart && chart.hooks && chart.hooks.setData) {
				chart.hooks.setData.push(() => {
					if (chart) {
						const idx = chart.data[0].length - 1;
						if (idx >= 0) {
							legendValues = {
								hr: chart.data[1][idx] !== null ? (chart.data[1][idx]?.toString() || '-') + ' bpm' : '-',
								rmssd: chart.data[2][idx] !== null ? (chart.data[2][idx]?.toString() || '-') + ' ms' : '-',
								vibe: chart.data[3][idx] !== null ? (chart.data[3][idx]?.toString() || '-') : '-'
							};
						}
					}
				});
			}

		} catch (error) {
			console.error('Error creating chart:', error);
			return null;
		}

		// Handle window resize
		const resizeObserver = new ResizeObserver((entries) => {
			if (chart && entries[0]) {
				chart.setSize({ width: entries[0].contentRect.width, height: 240 });
			}
		});

		resizeObserver.observe(chartEl);

		return () => {
			if (chart) {
				chart.destroy();
				chart = null;
			}
			resizeObserver.disconnect();
		};
	}

	// Update chart with new data
	function updateChart() {
		if (!chart) {
			console.warn('Cannot update chart: chart instance is null');
			// Try to initialize the chart if it's not available
			if (chartEl && !chart) {
				console.log('Attempting to reinitialize chart...');
				initChart();
				if (!chart) return;
			} else {
				return;
			}
		}

		const data = $hrvData.chartData;
		if (data.length === 0) {
			console.log('No chart data available yet');
			return;
		}

		console.log('Updating chart with data points:', data.length);

		const timestamps = data.map((d) => new Date(d.timestamp).getTime() / 1000);
		const heartRates = data.map((d) => d.hr);
		const rmssdValues = data.map((d) => d.rmssd);
		const vibeScores = data.map((d) => d.vibe);

		try {
			chart.setData([timestamps, heartRates, rmssdValues, vibeScores]);
			console.log('Chart updated successfully');
		} catch (error) {
			console.error('Error updating chart:', error);
		}
	}

	// Start breathing guide animation
	function startBreathingGuide() {
		// 4 seconds in, 6 seconds out (6 breaths per minute)
		const inhaleTime = 4000; // 4 seconds
		const exhaleTime = 6000; // 6 seconds
		const updateInterval = 16; // 16ms update interval for smoother animation

		let currentPhase = 'inhale';
		let progress = 0;
		let lastUpdate = Date.now();

		breathingInterval = setInterval(() => {
			const now = Date.now();
			const elapsed = now - lastUpdate;
			lastUpdate = now;

			if (currentPhase === 'inhale') {
				progress += (elapsed / inhaleTime) * 100;
				if (progress >= 100) {
					progress = 0;
					currentPhase = 'exhale';
				}
			} else {
				// exhale
				progress += (elapsed / exhaleTime) * 100;
				if (progress >= 100) {
					progress = 0;
					currentPhase = 'inhale';
				}
			}

			breathPhase = currentPhase;
			breathProgress = progress;
		}, updateInterval);
	}

	// Stop breathing guide animation
	function stopBreathingGuide() {
		if (breathingInterval) {
			clearInterval(breathingInterval);
			breathingInterval = null;
		}
	}

	// Start HRV session
	async function startSession() {
		scanError = null;

		if (!isBluetoothSupported()) {
			scanError =
				'Bluetooth is not supported on this device. Please use a device with Bluetooth support.';
			return;
		}

		try {
			const result = await startScan();

			if (result.success) {
				// Start session timer
				// Note: For Capacitor, the timer is started in the connectToCapacitorDevice function
				if (!$sessionTimer.isRunning) {
					startSessionTimer();
				}

				// Start breathing guide
				startBreathingGuide();

				// Reset HRV data
				resetHRVData();

				// Set session active
				sessionActive = true;
			} else {
				scanError = result.error?.message || 'Failed to connect to device.';
			}
		} catch (error) {
			console.error('Error starting session:', error);
			scanError = error instanceof Error ? error.message : 'An unknown error occurred.';
		}
	}

	// Save HRV session
	async function saveSession() {
		if (!$authStore.user || !sessionSummary) return;

		isSaving = true;
		saveError = null;

		try {
			const hrvSessionData = {
				timestamp: new Date().toISOString(),
				start: sessionSummary.startTime,
				end: sessionSummary.endTime,
				duration_seconds: sessionSummary.durationSeconds,
				avg_hr: sessionSummary.avgHR,
				avg_rmssd: sessionSummary.avgRMSSD,
				vibe_score: sessionSummary.avgVibe,
				vibe_interpretation: sessionSummary.vibeInterpretation,
				chart_data: sessionSummary.chartData,
				rr_intervals: sessionSummary.rrIntervals
			};

			const result = await createHRVSession($authStore.user, hrvSessionData);

			if (result.success) {
				saveSuccess = true;

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
				} else {
					// If divine timing is disabled, navigate to history after a delay
					setTimeout(() => {
						goto('/history');
					}, 2000);
				}
			} else {
				saveError = 'Failed to save HRV session. Please try again.';
			}
		} catch (error) {
			console.error('Error saving HRV session:', error);
			saveError = 'An unexpected error occurred. Please try again.';
		} finally {
			isSaving = false;
		}
	}

	// Stop HRV session
	function stopSession() {
		// Stop session timer
		stopSessionTimer();

		// Stop breathing guide
		stopBreathingGuide();

		// Get session summary
		sessionSummary = getSessionSummary();

		// Show summary modal
		showSummary = true;

		// Keep session active until user decides to save or discard
	}

	// Discard HRV session
	function discardSession() {
		// Reset all state
		resetHRVData();
		sessionActive = false;
		showSummary = false;
		sessionSummary = null;

		// Disconnect from device
		disconnect();

		// Navigate back to home
		goto('/home');
	}

	// Format time duration
	function formatDuration(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	// Subscribe to HRV data changes
	$: {
		if ($hrvData.chartData.length > 0) {
			console.log('HRV data updated, chart data points:', $hrvData.chartData.length);
			updateChart();
		}
	}

	// Initialize on mount
	onMount(() => {
		const cleanupChart = initChart();

		return () => {
			cleanupChart?.();
			stopBreathingGuide();
			disconnect();
		};
	});

	// Clean up on destroy
	onDestroy(() => {
		if (breathingInterval) {
			clearInterval(breathingInterval);
		}

		disconnect();
	});
</script>

<div class="hrv-session-container">
	<h1>HRV Session</h1>

	{#if !sessionActive}
		<div class="start-session">
			<p class="instructions">
				Connect your Polar H10 heart rate monitor to begin tracking your heart rate variability
				(HRV). This will help calculate your Vibe Score and track your physiological balance.
			</p>

			{#if scanError}
				<div class="error-message">{scanError}</div>
			{/if}

			<button class="start-button" on:click={startSession}> Connect to Polar H10 </button>

			{#if !isBluetoothSupported()}
				<div class="compatibility-warning">
					<p>Bluetooth is not supported on this device.</p>
					<p>Please use a device with Bluetooth support or the mobile app.</p>
				</div>
			{/if}
		</div>
	{:else}
		<div class="session-active">
			<div class="status-bar">
				<div class="connection-status">
					<span class="status-indicator" class:connected={$bleConnectionStatus.connected}></span>
					<span>
						{$bleConnectionStatus.connected
							? `Connected to ${$bleConnectionStatus.deviceName}`
							: 'Disconnected'}
					</span>
				</div>

				<div class="session-timer">
					{formatDuration($sessionTimer.elapsedSeconds)}
				</div>
			</div>

			<div class="session-container">
				<div class="metrics-container">
					<div class="metric">
						<h3>Heart Rate</h3>
						<p class="value">{$hrvData.heartRate} <span class="unit">BPM</span></p>
					</div>
					<div class="metric">
						<h3>Balance</h3>
						<p class="value">{$hrvData.rmssd.toFixed(1)} <span class="unit">ms</span></p>
					</div>
					<div class="metric">
						<h3>Vibe Score</h3>
						<p class="value">{$hrvData.vibeScore}</p>
					</div>
				</div>

				<div class="timer-container">
					<p class="timer">{formatDuration($sessionTimer.elapsedSeconds)}</p>
				</div>

				<div class="chart-section">
					<h3 class="mb-2 text-xl font-semibold">Real-time HRV Data</h3>
					<div class="chart-container" bind:this={chartEl}></div>
					
					<!-- Custom Legend -->
					<div class="custom-legend">
						<div class="legend-item">
							<div class="legend-dot hr-dot"></div>
							<span class="legend-label">Heart Rate</span>
							<span class="legend-value" class:has-value={legendValues.hr !== '-'} in:fade={{duration: 150}}>{legendValues.hr}</span>
						</div>
						<div class="legend-item">
							<div class="legend-dot rmssd-dot"></div>
							<span class="legend-label">Balance</span>
							<span class="legend-value" class:has-value={legendValues.rmssd !== '-'} in:fade={{duration: 150}}>{legendValues.rmssd}</span>
						</div>
						<div class="legend-item">
							<div class="legend-dot vibe-dot"></div>
							<span class="legend-label">Vibe Score</span>
							<span class="legend-value" class:has-value={legendValues.vibe !== '-'} in:fade={{duration: 150}}>{legendValues.vibe}</span>
						</div>
					</div>

					<!-- Vibe Score Display -->
					<div class="vibe-score-container">
						<div class="vibe-score-circle" style="--progress: {$hrvData.vibeScore}%">
							<div class="vibe-score-value">{$hrvData.vibeScore}</div>
							<div class="vibe-score-label">Vibe Score</div>
						</div>
						<div class="vibe-score-interpretation">
							<div class="interpretation-emoji">{vibeInterpretation.emoji}</div>
							<div class="interpretation-text">{vibeInterpretation.label}</div>
						</div>
					</div>
				</div>

				<div class="breathing-guide-section">
					<h3 class="mb-3 text-xl font-semibold">Breathing Guide</h3>
					<p class="mb-3 text-sm text-gray-500">Follow the rhythm</p>
					<div class="breathing-guide-container">
						<div class="breathing-pulse-ring"></div>
						<div
							class="breathing-circle"
							class:inhale={breathPhase === 'inhale'}
							class:exhale={breathPhase === 'exhale'}
							style="transform: scale({breathPhase === 'inhale'
								? 0.4 + (breathProgress / 100) * 0.6
								: 1 - (breathProgress / 100) * 0.8})"
						>
							<div class="breathing-text">
								{breathPhase === 'inhale' ? 'In' : 'Out'}
							</div>
							<div class="breathing-timer">
								{breathPhase === 'inhale' ? '4s' : '6s'}
							</div>
						</div>
						<div class="breathing-ripple"></div>
					</div>
				</div>

				<div class="button-container">
					<button class="stop-button" on:click={stopSession}>Stop Session</button>
				</div>
			</div>
		</div>
	{/if}

	{#if showSummary && sessionSummary}
		<div class="modal-overlay">
			<div class="summary-modal">
				<h2>Session Summary</h2>

				<div class="summary-stats">
					<div class="summary-stat">
						<span class="stat-label">Duration</span>
						<span class="stat-value">{formatDuration(sessionSummary.durationSeconds)}</span>
					</div>

					<div class="summary-stat">
						<span class="stat-label">Avg Heart Rate</span>
						<span class="stat-value">{sessionSummary.avgHR} bpm</span>
					</div>

					<div class="summary-stat">
						<span class="stat-label">Avg Balance (RMSSD)</span>
						<span class="stat-value">{sessionSummary.avgRMSSD.toFixed(1)} ms</span>
					</div>

					<div class="summary-stat">
						<span class="stat-label">Vibe Score</span>
						<span class="stat-value">{sessionSummary.avgVibe}</span>
					</div>
				</div>

				{#if saveError}
					<div class="error-message">{saveError}</div>
				{/if}

				<div class="summary-actions">
					<button class="save-button" disabled={isSaving || saveSuccess} on:click={saveSession}>
						{#if isSaving}
							Saving...
						{:else if saveSuccess}
							Saved!
						{:else}
							Save Session
						{/if}
					</button>

					<button
						class="discard-button"
						disabled={isSaving || saveSuccess}
						on:click={discardSession}
					>
						Discard Session
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- Divine ToolChooser component -->
<DivineToolChooser onClose={() => goto('/history')} />

<style>
	.hrv-session-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem;
	}

	h1 {
		font-size: 1.8rem;
		margin-bottom: 1.5rem;
		color: var(--color-primary);
	}

	.start-session {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 2rem;
		background-color: var(--color-card-bg);
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.instructions {
		margin-bottom: 2rem;
		line-height: 1.6;
		color: var(--color-text-secondary);
	}

	.start-button {
		background: linear-gradient(135deg, #4d44b3, #bf469a);
		color: white;
		border: none;
		border-radius: 24px;
		padding: 1rem 2rem;
		font-size: 1.1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.start-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.compatibility-warning {
		margin-top: 2rem;
		padding: 1rem;
		background-color: rgba(229, 57, 53, 0.1);
		border-radius: 8px;
		color: #e53935;
		font-size: 0.9rem;
	}

	.session-active {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background-color: var(--color-card-bg);
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.connection-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.status-indicator {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #e53935;
	}

	.status-indicator.connected {
		background-color: #4caf50;
	}

	.session-timer {
		font-weight: 500;
		font-size: 1.1rem;
	}

	.metrics-container {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.metric {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		background-color: var(--color-card-bg);
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.metric h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	.metric .value {
		font-size: 1.8rem;
		font-weight: 600;
	}

	.metric .unit {
		font-size: 0.9rem;
		color: var(--color-text-secondary);
	}

	.timer-container {
		margin-top: 1rem;
		padding: 1rem;
		background-color: var(--color-card-bg);
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.timer {
		font-size: 1.8rem;
		font-weight: 600;
	}

	.chart-section {
		margin-top: 2rem;
	}

	.chart-container {
		width: 100%;
		height: 240px;
		background-color: var(--color-card-bg);
		border-radius: 8px;
		padding: 1rem 0.5rem;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
	}

	.custom-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 0.5rem;
		margin-bottom: 1.5rem;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(4px);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
	}

	/* Vibe Score Display Styles */
	.vibe-score-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		margin-top: 1.5rem;
		padding: 1.5rem;
		background-color: var(--color-card-bg);
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.vibe-score-circle {
		position: relative;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: conic-gradient(
			var(--color-primary) 0%, 
			var(--color-primary) var(--progress), 
			#e5e7eb var(--progress), 
			#e5e7eb 100%
		);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4px 6px rgba(77, 68, 179, 0.1);
	}

	.vibe-score-circle::before {
		content: '';
		position: absolute;
		top: 10px;
		left: 10px;
		right: 10px;
		bottom: 10px;
		border-radius: 50%;
		background-color: white;
	}

	.vibe-score-value {
		position: relative;
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--color-primary);
		line-height: 1;
	}

	.vibe-score-label {
		position: relative;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		margin-top: 0.25rem;
	}

	.vibe-score-interpretation {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.interpretation-emoji {
		font-size: 2.5rem;
		line-height: 1;
	}

	.interpretation-text {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
		text-align: center;
	}

	.legend-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.hr-dot {
		background-color: #E53935;
	}

	.rmssd-dot {
		background-color: #4D44B3;
	}

	.vibe-dot {
		background-color: #BF469A;
	}

	.legend-label {
		color: #666;
		font-weight: 500;
	}

	.legend-value {
		color: #333;
		font-weight: 600;
		min-width: 3.5rem;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.legend-value.has-value {
		opacity: 1;
	}

	.breathing-guide-section {
		margin-top: 2rem;
		margin-bottom: 2rem;
		padding: 1.5rem;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
	}

	.breathing-guide-container {
		position: relative;
		width: 140px;
		height: 140px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.breathing-circle {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: transform 0.1s linear;
		z-index: 3;
	}

	.breathing-circle.inhale {
		border: 2px solid rgba(77, 68, 179, 0.6);
		background-color: rgba(77, 68, 179, 0.05);
		box-shadow: 0 0 8px rgba(77, 68, 179, 0.2);
	}

	.breathing-circle.exhale {
		border: 2px solid rgba(191, 70, 154, 0.6);
		background-color: rgba(191, 70, 154, 0.05);
		box-shadow: 0 0 8px rgba(191, 70, 154, 0.2);
	}

	.breathing-text {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.breathing-timer {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	.breathing-circle.inhale .breathing-text,
	.breathing-circle.inhale .breathing-timer {
		color: #4d44b3;
	}

	.breathing-circle.exhale .breathing-text,
	.breathing-circle.exhale .breathing-timer {
		color: #bf469a;
	}

	.breathing-ripple {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: transparent;
		border: 1px solid rgba(77, 68, 179, 0.2);
		z-index: 1;
		animation: ripple 10s infinite ease-out;
	}

	.breathing-pulse-ring {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 1px dashed rgba(191, 70, 154, 0.15);
		z-index: 0;
	}

	@keyframes ripple {
		0% {
			transform: scale(0.6);
			opacity: 0.1;
			border-color: rgba(77, 68, 179, 0.1);
		}
		50% {
			transform: scale(1.4);
			opacity: 0.2;
			border-color: rgba(191, 70, 154, 0.1);
		}
		100% {
			transform: scale(0.6);
			opacity: 0.1;
			border-color: rgba(77, 68, 179, 0.1);
		}
	}

	.button-container {
		margin-top: 2rem;
	}

	.button-container {
		width: 100%;
		margin-top: 1.5rem;
		margin-bottom: 1rem;
	}

	.stop-button {
		width: 100%;
		background: linear-gradient(135deg, #e53935, #d32f2f);
		color: white;
		border: none;
		border-radius: 8px;
		padding: 0.875rem;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: opacity 0.2s ease;
		box-shadow: none;
	}

	.stop-button:hover {
		opacity: 0.9;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.summary-modal {
		width: 90%;
		max-width: 500px;
		background-color: var(--color-bg);
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	}

	.summary-modal h2 {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
		text-align: center;
		color: var(--color-primary);
	}

	.summary-stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.summary-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		background-color: var(--color-card-bg);
		border-radius: 8px;
	}

	.stat-label {
		font-size: 0.9rem;
		color: var(--color-text-secondary);
		margin-bottom: 0.5rem;
	}

	.stat-value {
		font-size: 1.3rem;
		font-weight: 600;
	}

	.summary-actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.save-button {
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

	.save-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.discard-button {
		background: none;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 1rem;
		font-size: 1.1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.discard-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.error-message {
		color: #e53935;
		margin-bottom: 1rem;
		padding: 0.75rem;
		background-color: rgba(229, 57, 53, 0.1);
		border-radius: 8px;
	}
</style>
