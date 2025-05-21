<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  
  let userName = '';
  let currentPhase = 'Beige'; // Placeholder, will be determined by user's data in Phase 4
  
  onMount(() => {
    if ($authStore.user) {
      userName = $authStore.user.displayName || 'there';
    }
  });
</script>

<div class="journey-container">
  <header class="journey-header">
    <h1>Your Spiral Journey</h1>
    <p>Track your growth through the Spiral Dynamics model</p>
  </header>
  
  <div class="current-phase">
    <h2>Current Phase: <span class="phase-name">{currentPhase}</span></h2>
    <div class="phase-description">
      <p>This is a placeholder for the Spiral Dynamics visualization that will be implemented in Phase 4.</p>
    </div>
  </div>
  
  <div class="journey-map">
    <div class="spiral-placeholder">
      <div class="spiral-message">
        <h3>Coming Soon</h3>
        <p>Your personal Spiral Dynamics journey visualization will appear here in Phase 4.</p>
        <p>Continue logging reflections and HRV sessions to build your data.</p>
      </div>
    </div>
  </div>
  
  <div class="journey-insights">
    <h2>Insights</h2>
    <div class="insights-placeholder">
      <p>Insights from your reflections and HRV sessions will be displayed here.</p>
      <p>These insights will help you understand your patterns and growth opportunities.</p>
    </div>
  </div>
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
  
  .current-phase {
    background-color: var(--color-bg-elevated);
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .current-phase h2 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  
  .phase-name {
    color: var(--color-primary);
    font-weight: 700;
  }
  
  .phase-description p {
    line-height: 1.6;
  }
  
  .journey-map {
    background-color: var(--color-bg-elevated);
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
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
  
  .insights-placeholder {
    padding: 1rem;
    border: 1px dashed var(--color-border);
    border-radius: 0.5rem;
    text-align: center;
    color: var(--color-text-secondary, #666666);
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
