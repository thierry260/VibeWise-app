<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { createHRVSession } from '$lib/services/sessions';
  import { 
    bleConnectionStatus, 
    hrvData, 
    sessionTimer,
    isWebBluetoothSupported,
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
    if (!chartEl) return;
    
    // Define proper types for uPlot scales
    type CustomScales = {
      [key: string]: {
        auto: boolean;
        range: [number, number]; // Use tuple instead of array
      };
    };
    
    const opts: uPlot.Options = {
      width: chartEl.clientWidth,
      height: 300,
      series: [
        {
          label: "Time",
          value: "{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}",
        },
        {
          label: "Heart Rate",
          scale: "hr",
          value: (u: uPlot, v: number) => v.toFixed(0) + " bpm",
          stroke: "#E53935",
          width: 2,
        },
        {
          label: "Balance (RMSSD)",
          scale: "rmssd",
          value: (u: uPlot, v: number) => v.toFixed(1) + " ms",
          stroke: "#4D44B3",
          width: 2,
        },
        {
          label: "Vibe Score",
          scale: "vibe",
          value: (u: uPlot, v: number) => v.toFixed(0),
          stroke: "#BF469A",
          width: 2,
        }
      ],
      scales: {
        x: {}, // Default x scale
        hr: {
          auto: false,
          range: [40, 160] as [number, number],
        },
        rmssd: {
          auto: false,
          range: [0, 100] as [number, number],
        },
        vibe: {
          auto: false,
          range: [0, 100] as [number, number],
        },
      } as uPlot.Scales,
      axes: [
        {
          label: "Time",
          labelSize: 20,
          grid: {show: false},
        },
        {
          scale: "hr",
          label: "Heart Rate",
          labelSize: 20,
          size: 50,
          stroke: "#E53935",
          grid: {show: true},
        },
        {
          scale: "rmssd",
          label: "Balance",
          labelSize: 20,
          size: 50,
          stroke: "#4D44B3",
          side: 1,
          grid: {show: false},
        },
        {
          scale: "vibe",
          label: "Vibe",
          labelSize: 20,
          size: 50,
          stroke: "#BF469A",
          side: 1,
          grid: {show: false},
        }
      ],
    };
    
    chart = new uPlot(opts, [[], [], [], []], chartEl);
    
    // Handle window resize
    const resizeObserver = new ResizeObserver(entries => {
      if (chart && entries[0]) {
        chart.setSize({width: entries[0].contentRect.width, height: 300});
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
    if (!chart) return;
    
    const data = $hrvData.chartData;
    if (data.length === 0) return;
    
    const timestamps = data.map(d => new Date(d.timestamp).getTime() / 1000);
    const heartRates = data.map(d => d.hr);
    const rmssdValues = data.map(d => d.rmssd);
    const vibeScores = data.map(d => d.vibe);
    
    chart.setData([timestamps, heartRates, rmssdValues, vibeScores]);
  }
  
  // Start breathing guide animation
  function startBreathingGuide() {
    // 6 breaths per minute = 10 seconds per breath cycle
    // 4 seconds inhale, 6 seconds exhale
    const inhaleTime = 4000; // 4 seconds
    const exhaleTime = 6000; // 6 seconds
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
    
    if (!isWebBluetoothSupported()) {
      scanError = 'Web Bluetooth is not supported in this browser. Please use the mobile app or a supported browser like Chrome.';
      return;
    }
    
    try {
      const result = await startScan();
      
      if (result.success) {
        // Start session timer
        startSessionTimer();
        
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
  $: if (chart && $hrvData.chartData.length > 0) {
    updateChart();
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
        Connect your Polar H10 heart rate monitor to begin tracking your heart rate variability (HRV).
        This will help calculate your Vibe Score and track your physiological balance.
      </p>
      
      {#if scanError}
        <div class="error-message">{scanError}</div>
      {/if}
      
      <button class="start-button" on:click={startSession}>
        Connect to Polar H10
      </button>
      
      {#if !isWebBluetoothSupported()}
        <div class="compatibility-warning">
          <p>Web Bluetooth is not supported in this browser.</p>
          <p>Please use the mobile app or a supported browser like Chrome.</p>
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
      
      <div class="metrics-summary">
        <div class="metric">
          <span class="metric-value">{$hrvData.heartRate}</span>
          <span class="metric-label">Heart Rate</span>
        </div>
        
        <div class="metric">
          <span class="metric-value">{$hrvData.rmssd.toFixed(1)}</span>
          <span class="metric-label">Balance</span>
        </div>
        
        <div class="metric">
          <span class="metric-value">{$hrvData.vibeScore}</span>
          <span class="metric-label">Vibe Score</span>
        </div>
      </div>
      
      <div class="chart-container" bind:this={chartEl}></div>
      
      <div class="breathing-guide">
        <h3>Breathing Guide</h3>
        <div class="breath-animation">
          <div 
            class="breath-circle" 
            style="transform: scale({breathPhase === 'inhale' 
              ? 0.8 + (breathProgress / 100) * 0.4 
              : 1.2 - (breathProgress / 100) * 0.4});"
          ></div>
          <div class="breath-text">{breathPhase === 'inhale' ? 'Inhale' : 'Exhale'}</div>
        </div>
      </div>
      
      <button class="stop-button" on:click={stopSession}>
        Stop Session
      </button>
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
          <button 
            class="save-button" 
            disabled={isSaving || saveSuccess} 
            on:click={saveSession}
          >
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
    background: linear-gradient(135deg, #4D44B3, #BF469A);
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
    color: #E53935;
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
    background-color: #E53935;
  }
  
  .status-indicator.connected {
    background-color: #4CAF50;
  }
  
  .session-timer {
    font-weight: 500;
    font-size: 1.1rem;
  }
  
  .metrics-summary {
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
  
  .metric-value {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .metric:nth-child(1) .metric-value {
    color: #E53935;
  }
  
  .metric:nth-child(2) .metric-value {
    color: #4D44B3;
  }
  
  .metric:nth-child(3) .metric-value {
    color: #BF469A;
  }
  
  .metric-label {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }
  
  .chart-container {
    width: 100%;
    height: 300px;
    background-color: var(--color-card-bg);
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .breathing-guide {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    background-color: var(--color-card-bg);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .breathing-guide h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: var(--color-text-secondary);
  }
  
  .breath-animation {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .breath-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4D44B3, #BF469A);
    transition: transform 0.1s ease;
  }
  
  .breath-text {
    font-size: 1.1rem;
    font-weight: 500;
  }
  
  .stop-button {
    background-color: #E53935;
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
    background: linear-gradient(135deg, #4D44B3, #BF469A);
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
    color: #E53935;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background-color: rgba(229, 57, 53, 0.1);
    border-radius: 8px;
  }
</style>
