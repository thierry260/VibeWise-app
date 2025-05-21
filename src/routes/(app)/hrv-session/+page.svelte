<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import { createHRVSession } from '$lib/services/sessions';
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
			height: 300,
			padding: [0, 0, 0, 0], // [top, right, bottom, left]
			cursor: {
				show: true,
				points: {
					show: true,
					size: 5
				},
				drag: {
					setScale: false
				},
				focus: {
					prox: 30
				}
			},
			legend: {
				show: false
			},
			series: [
				{}, // x-axis
				{
					scale: 'hr',
					label: 'Heart Rate',
					value: (u: uPlot, v: number | null) => (v == null ? '-' : v.toFixed(0) + ' bpm'),
					stroke: '#E53935',
					width: 3,
					points: {
						show: false
					},
					spanGaps: true
				},
				{
					scale: 'rmssd',
					label: 'Balance',
					value: (u: uPlot, v: number | null) => (v == null ? '-' : v.toFixed(1) + ' ms'),
					stroke: '#4D44B3',
					width: 3,
					points: {
						show: false
					},
					spanGaps: true
				},
				{
					scale: 'vibe',
					label: 'Vibe Score',
					value: (u: uPlot, v: number | null) => (v == null ? '-' : v.toFixed(0)),
					stroke: '#BF469A',
					width: 3,
					points: {
						show: false
					},
					spanGaps: true
				}
			],
			scales: {
				x: {
					time: true
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
				{
					scale: 'x',
					label: 'Time',
					labelSize: 20,
					grid: { show: false },
					ticks: { show: true },
					values: (u: uPlot, vals: number[]) =>
						vals.map((v) => new Date(v * 1000).toLocaleTimeString())
				}
			]
		};

		try {
			console.log('Creating uPlot instance with options:', opts);
			chart = new uPlot(opts, [[], [], [], []], chartEl);
			console.log('Chart created successfully:', chart);
		} catch (error) {
			console.error('Error creating chart:', error);
			return null;
		}

		// Handle window resize
		const resizeObserver = new ResizeObserver((entries) => {
			if (chart && entries[0]) {
				chart.setSize({ width: entries[0].contentRect.width, height: 300 });
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
		// 5 seconds in, 5 seconds out (6 breaths per minute as requested)
		const inhaleTime = 4000; // 5 seconds
		const exhaleTime = 6000; // 5 seconds
		const updateInterval = 50; // 50ms update interval

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
				chart_data: sessionSummary.chartData,
				rr_intervals: sessionSummary.rrIntervals
			};

			const result = await createHRVSession($authStore.user, hrvSessionData);

			if (result.success) {
				saveSuccess = true;

				// Navigate back to home after successful save
				setTimeout(() => {
					goto('/home');
				}, 2000);
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
				</div>

				<div class="breathing-guide-section">
					<h3 class="mb-4 text-xl font-semibold">Breathing Guide</h3>
					<p class="mb-4 text-sm text-gray-600">Follow the circle</p>
					<div class="breathing-guide-container">
						<div
							class="breathing-circle"
							class:inhale={breathPhase === 'inhale'}
							class:exhale={breathPhase === 'exhale'}
							style="transform: scale({breathPhase === 'inhale'
								? 1 + (breathProgress / 100) * 0.5
								: 1.5 - (breathProgress / 100) * 0.5})"
						>
							<div class="breathing-text">
								{breathPhase === 'inhale' ? 'In' : 'Out'}
							</div>
							<div class="breathing-timer">
								{breathPhase === 'inhale' ? '5s in' : '5s out'}
							</div>
						</div>
						<div class="breathing-wave"></div>
					</div>
				</div>

				<div class="button-container">
					<button class="stop-button" on:click={stopSession}> Stop Session </button>
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
		height: 300px;
		background-color: var(--color-card-bg);
		border-radius: 8px;
		padding: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.breathing-guide-section {
		margin-top: 3rem;
		margin-bottom: 3rem;
		padding: 2rem;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.breathing-guide-container {
		position: relative;
		width: 200px;
		height: 200px;
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
		transition:
			transform 0.2s ease-in-out,
			background-color 0.5s ease,
			border-color 0.5s ease;
		z-index: 2;
	}

	.breathing-circle.inhale {
		border: 3px solid #4d44b3;
		background-color: rgba(77, 68, 179, 0.1);
		box-shadow: 0 0 15px rgba(77, 68, 179, 0.3);
	}

	.breathing-circle.exhale {
		border: 3px solid #bf469a;
		background-color: rgba(191, 70, 154, 0.1);
		box-shadow: 0 0 15px rgba(191, 70, 154, 0.3);
	}

	.breathing-text {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.breathing-timer {
		font-size: 0.875rem;
		opacity: 0.8;
	}

	.breathing-circle.inhale .breathing-text,
	.breathing-circle.inhale .breathing-timer {
		color: #4d44b3;
	}

	.breathing-circle.exhale .breathing-text,
	.breathing-circle.exhale .breathing-timer {
		color: #bf469a;
	}

	.breathing-wave {
		position: absolute;
		width: 300px;
		height: 300px;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			transparent 50%,
			rgba(77, 68, 179, 0.05) 51%,
			rgba(191, 70, 154, 0.05) 100%
		);
		z-index: 1;
		animation: pulse 10s infinite linear;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.5);
			opacity: 0.2;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.5;
		}
		100% {
			transform: scale(0.5);
			opacity: 0.2;
		}
	}

	.button-container {
		margin-top: 2rem;
	}

	.stop-button {
		background-color: #e53935;
		color: white;
		border: none;
		border-radius: 12px;
		padding: 1rem;
		font-size: 1.1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.stop-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
