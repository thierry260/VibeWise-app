<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import { getSessionById, type HRVSession } from '$lib/services/sessions';
	import { getVibeScoreInterpretation } from '$lib/utils/vibeScore';
	import MetricTooltip from '$lib/components/MetricTooltip.svelte';
	import { fade } from 'svelte/transition';
	import uPlot from 'uplot';
	import 'uplot/dist/uPlot.min.css';

	// Session data
	let session: (HRVSession & { id: string }) | null = null;
	let isLoading = true;
	let loadError: string | null = null;

	// Chart reference
	let chartEl: HTMLElement;
	let chart: uPlot | null = null;
	
	// Tooltip state
	let activeTooltip: 'heartRate' | 'balance' | 'vibeScore' | 'time' | null = null;
	
	// Tooltip content
	const tooltipContent = {
		heartRate: {
			title: 'Heart Rate',
			explanation: 'Your heart rate is the number of times your heart beats per minute.',
			hint: 'A lower resting heart rate often indicates better cardiovascular fitness.',
			stateDescription: 'Your heart rate changes throughout the day based on activity, emotions, and rest.',
			suggestion: 'Deep, slow breathing can help lower your heart rate when it is elevated.'
		},
		balance: {
			title: 'Balance (RMSSD)',
			explanation: 'Balance measures the variation between heartbeats, indicating how your nervous system is responding.',
			hint: 'Higher values typically suggest better recovery and resilience.',
			stateDescription: 'This metric reflects the balance between your sympathetic (action) and parasympathetic (rest) systems.',
			suggestion: 'Regular relaxation practices can help improve your balance over time.'
		},
		vibeScore: {
			title: 'Vibe Score',
			explanation: 'Your Vibe Score combines multiple HRV metrics into one easy-to-understand number.',
			hint: 'Higher scores indicate a more balanced physiological state.',
			stateDescription: 'This score reflects your overall physiological balance at the time of measurement.',
			suggestion: 'Regular sessions can help you understand what activities improve your score.'
		},
		time: {
			title: 'Session Duration',
			explanation: 'The total time you spent in this HRV measurement session.',
			hint: 'Even short sessions can provide valuable insights.',
			stateDescription: 'Longer sessions may reveal patterns in how your body responds over time.',
			suggestion: 'Aim for at least 5 minutes for the most reliable readings.'
		}
	};
	
	// Toggle tooltip visibility
	function toggleTooltip(tooltipType: 'heartRate' | 'balance' | 'vibeScore' | 'time') {
		if (activeTooltip === tooltipType) {
			activeTooltip = null;
		} else {
			activeTooltip = tooltipType;
		}
	}

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

			<div class="metrics-grid">
				<!-- Heart Rate Metric -->
				<button class="metric-tile" on:click={() => toggleTooltip('heartRate')} aria-label="Heart Rate Information">
					<h3>Heart Rate</h3>
					<p class="value">{session.avg_hr} <span class="unit">BPM</span></p>
					<MetricTooltip 
						isVisible={activeTooltip === 'heartRate'}
						onClose={() => activeTooltip = null}
						title={tooltipContent.heartRate.title}
						explanation={tooltipContent.heartRate.explanation}
						hint={tooltipContent.heartRate.hint}
						stateDescription={tooltipContent.heartRate.stateDescription}
						suggestion={tooltipContent.heartRate.suggestion}
					/>
				</button>

				<!-- Balance Metric -->
				<button class="metric-tile" on:click={() => toggleTooltip('balance')} aria-label="Balance Information">
					<h3>Balance</h3>
					<p class="value">{session.avg_rmssd.toFixed(1)} <span class="unit">ms</span></p>
					<MetricTooltip 
						isVisible={activeTooltip === 'balance'}
						onClose={() => activeTooltip = null}
						title={tooltipContent.balance.title}
						explanation={tooltipContent.balance.explanation}
						hint={tooltipContent.balance.hint}
						stateDescription={tooltipContent.balance.stateDescription}
						suggestion={tooltipContent.balance.suggestion}
					/>
				</button>

				<!-- Time Metric -->
				<button class="metric-tile" on:click={() => toggleTooltip('time')} aria-label="Session Time Information">
					<h3>Duration</h3>
					<p class="value">{formatDuration(session.duration_seconds)}</p>
					<MetricTooltip 
						isVisible={activeTooltip === 'time'}
						onClose={() => activeTooltip = null}
						title={tooltipContent.time.title}
						explanation={tooltipContent.time.explanation}
						hint={tooltipContent.time.hint}
						stateDescription={tooltipContent.time.stateDescription}
						suggestion={tooltipContent.time.suggestion}
					/>
				</button>

				<!-- Vibe Score Metric -->
				<button class="metric-tile vibe-tile" on:click={() => toggleTooltip('vibeScore')} aria-label="Vibe Score Information">
					<h3>Vibe Score</h3>
					<p class="value">{session.vibe_score}</p>
					<div class="vibe-interpretation">
						{#if !session.vibe_score}
							<div class="interpretation-text">No score available</div>
						{:else}
							{@const interpretation = getVibeScoreInterpretation(session.vibe_score)}
							<div class="interpretation-emoji">{interpretation.emoji}</div>
							<div class="interpretation-text">{interpretation.label}</div>
						{/if}
					</div>
					<MetricTooltip 
						isVisible={activeTooltip === 'vibeScore'}
						onClose={() => activeTooltip = null}
						title={tooltipContent.vibeScore.title}
						explanation={tooltipContent.vibeScore.explanation}
						hint={tooltipContent.vibeScore.hint}
						stateDescription={tooltipContent.vibeScore.stateDescription}
						suggestion={tooltipContent.vibeScore.suggestion}
					/>
				</button>
			</div>

			<div class="chart-section">
				<h2>Session Data</h2>
				<div class="chart-container" bind:this={chartEl}></div>
				<!-- Unified One-Line Legend -->
				<div class="unified-legend">
					<div class="legend-item">
						<div class="legend-dot hr-dot"></div>
						<span class="legend-label">Heart Rate</span>
					</div>
					<div class="legend-item">
						<div class="legend-dot rmssd-dot"></div>
						<span class="legend-label">Balance</span>
					</div>
					<div class="legend-item">
						<div class="legend-dot vibe-dot"></div>
						<span class="legend-label">Vibe Score</span>
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
		overflow-x: hidden; /* Prevent horizontal scrolling */
		width: 100%;
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

	/* Metrics Grid */
	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: 1fr;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.metric-tile {
		background-color: white;
		padding: 1.25rem 1rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: none;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
		position: relative;
	}

	.metric-tile:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.metric-tile h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
		color: var(--color-text-secondary);
		font-weight: 500;
	}

	.metric-tile .value {
		font-size: 1.75rem;
		font-weight: 600;
		margin: 0;
		color: var(--color-text);
	}

	.vibe-tile {
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(99, 102, 241, 0.1));
	}

	.unit {
		font-size: 0.9rem;
		font-weight: normal;
		color: var(--color-text-secondary);
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

	/* Unified Legend */
	.unified-legend {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0.75rem 0.5rem;
		margin-top: 0.75rem;
		margin-bottom: 1.5rem;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(4px);
		white-space: nowrap;
		overflow-x: auto;
		width: 100%;
		gap: 0.5rem;
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
		.metrics-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
