<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import { getSessionById, type HRVSession } from '$lib/services/sessions';
	import { getVibeScoreInterpretation } from '$lib/utils/vibeScore';
	import uPlot from 'uplot';
	import 'uplot/dist/uPlot.min.css';

	// Session data
	let session: (HRVSession & { id: string }) | null = null;
	let isLoading = true;
	let loadError: string | null = null;

	// Chart reference
	let chartEl: HTMLElement;
	let chart: uPlot | null = null;

	onMount(async () => {
		if (!$authStore.user) {
			goto('/login');
			return;
		}

		// Get session ID from query parameter
		const sessionId = $page.url.searchParams.get('id');

		if (!sessionId) {
			loadError = 'No session ID provided.';
			isLoading = false;
			return;
		}

		try {
			const result = await getSessionById($authStore.user, sessionId);

			if (result.success && result.session && result.session.type === 'hrv_session') {
				session = result.session as HRVSession & { id: string };

				// Initialize chart once we have data
				setTimeout(() => {
					if (chartEl && session) {
						initChart();
					}
				}, 100);
			} else {
				loadError = 'Failed to load HRV session or session not found.';
			}
		} catch (error) {
			console.error('Error loading HRV session:', error);
			loadError = 'An unexpected error occurred while loading the session.';
		} finally {
			isLoading = false;
		}
	});

	// Initialize chart with historical data
	function initChart() {
		if (!chartEl || !session) {
			console.error('Chart element or session data not found');
			return;
		}

		// Prepare chart data
		const timestamps: number[] = [];
		const heartRates: (number | null)[] = [];
		const rmssdValues: (number | null)[] = [];
		const vibeScores: (number | null)[] = [];

		// Convert chart data from session
		session.chart_data.forEach((point) => {
			const timestamp = new Date(point.timestamp).getTime() / 1000;
			timestamps.push(timestamp);
			heartRates.push(point.hr);
			rmssdValues.push(point.rmssd);
			vibeScores.push(point.vibe);
		});

		// Define chart options
		const opts: uPlot.Options = {
			width: chartEl.clientWidth,
			height: 300,
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
					stroke: 'rgba(229, 57, 53, 0.8)', // #E53935 with opacity
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
					stroke: 'rgba(77, 68, 179, 0.8)', // #4D44B3 with opacity
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
					stroke: 'rgba(191, 70, 154, 0.8)', // #BF469A with opacity
					width: 2,
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
				{}, // x-axis
				{}
			]
		};

		try {
			chart = new uPlot(opts, [timestamps, heartRates, rmssdValues, vibeScores], chartEl);

			// Handle resize
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
		} catch (error) {
			console.error('Error creating chart:', error);
		}
	}

	// Format date for display
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	// Format time for display
	function formatTime(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	// Format duration
	function formatDuration(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	// Go back to history
	function goBack() {
		goto('/history');
	}
</script>

<div class="hrv-detail-container">
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
		<h1>HRV Session Details</h1>
	</div>

	{#if isLoading}
		<div class="loading">Loading session details...</div>
	{:else if loadError}
		<div class="error-message">{loadError}</div>
	{:else if session}
		<div class="session-info">
			<div class="session-header">
				<div class="session-date">{formatDate(session.timestamp)}</div>
				<div class="session-time">{formatTime(session.timestamp)}</div>
			</div>

			<div class="stats-grid">
				<div class="stat-card">
					<div class="stat-label">Duration</div>
					<div class="stat-value">{formatDuration(session.duration_seconds)}</div>
				</div>
				<div class="stat-card">
					<div class="stat-label">Avg Heart Rate</div>
					<div class="stat-value">{session.avg_hr.toFixed(0)} <span class="unit">bpm</span></div>
				</div>
				<div class="stat-card">
					<div class="stat-label">Avg Balance</div>
					<div class="stat-value">{session.avg_rmssd.toFixed(1)} <span class="unit">ms</span></div>
				</div>
				<div class="vibe-score-card">
					<div class="stat-label">Vibe Score</div>
					<div class="stat-value">{session.vibe_score.toFixed(0)}</div>
					<div class="vibe-interpretation">
						{#if session.vibe_interpretation}
							<div class="interpretation-emoji">{session.vibe_interpretation.emoji}</div>
							<div class="interpretation-text">{session.vibe_interpretation.label}</div>
						{:else}
							{@const interpretation = getVibeScoreInterpretation(session.vibe_score)}
							<div class="interpretation-emoji">{interpretation.emoji}</div>
							<div class="interpretation-text">{interpretation.label}</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="chart-section">
				<h2>Session Data</h2>
				<div class="chart-container" bind:this={chartEl}></div>
				<div class="chart-legend">
					<div class="legend-item">
						<div class="legend-dot hr-dot"></div>
						<div class="legend-label">Heart Rate</div>
					</div>
					<div class="legend-item">
						<div class="legend-dot rmssd-dot"></div>
						<div class="legend-label">Balance</div>
					</div>
					<div class="legend-item">
						<div class="legend-dot vibe-dot"></div>
						<div class="legend-label">Vibe Score</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="error-message">Session not found</div>
	{/if}
</div>

<style>
	.hrv-detail-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem;
	}

	.header {
		display: flex;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.back-button {
		display: flex;
		align-items: center;
		background: none;
		border: none;
		color: var(--color-primary);
		font-size: 1rem;
		cursor: pointer;
		padding: 0.5rem 0;
		margin-right: 1rem;
	}

	.back-button svg {
		margin-right: 0.5rem;
	}

	h1 {
		font-size: 1.8rem;
		color: var(--color-primary);
		margin: 0;
	}

	h2 {
		font-size: 1.4rem;
		color: var(--color-primary);
		margin: 1.5rem 0 1rem;
	}

	.loading {
		text-align: center;
		padding: 2rem;
		color: var(--color-text-secondary);
	}

	.error-message {
		color: #e53935;
		margin-bottom: 1rem;
		padding: 0.75rem;
		background-color: rgba(229, 57, 53, 0.1);
		border-radius: 8px;
	}

	.session-info {
		background-color: var(--color-card-bg);
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.session-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.session-date {
		font-size: 1.2rem;
		font-weight: 500;
	}

	.session-time {
		color: var(--color-text-secondary);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.stat-card {
		background-color: white;
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.vibe-score-card {
		grid-column: span 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.5rem;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(99, 102, 241, 0.1));
	}

	.vibe-interpretation {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.75rem;
	}

	.interpretation-emoji {
		font-size: 1.5rem;
	}

	.interpretation-text {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary, #4D44B3);
	}

	.stat-label {
		font-size: 0.9rem;
		color: var(--color-text-secondary);
		margin-bottom: 0.5rem;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.unit {
		font-size: 0.9rem;
		font-weight: normal;
		color: var(--color-text-secondary);
	}

	.chart-section {
		margin-top: 1.5rem;
	}

	.chart-container {
		width: 100%;
		height: 300px;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 8px;
		padding: 1rem 0.5rem;
		margin-bottom: 1rem;
	}

	.chart-legend {
		display: flex;
		justify-content: center;
		gap: 2rem;
		padding: 0.75rem;
		margin-top: 0.5rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
	}

	.legend-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.hr-dot {
		background-color: #e53935;
	}

	.rmssd-dot {
		background-color: #4d44b3;
	}

	.vibe-dot {
		background-color: #bf469a;
	}

	.legend-label {
		color: var(--color-text-secondary);
		font-weight: 500;
	}

	@media (max-width: 600px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
