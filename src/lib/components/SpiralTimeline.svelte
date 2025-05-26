<script lang="ts">
  import { onMount } from 'svelte';
  import { getSpiralPhaseColor, type SpiralPhase, type SpiralHistoryEntry } from '$lib/services/journey';

  // Props
  export let spiralHistory: SpiralHistoryEntry[] = [];
  export let currentPhase: SpiralPhase;
  export let layout: 'vertical' | 'radial' = 'vertical';

  // Reactive state
  $: sortedHistory = [...spiralHistory].sort((a, b) => 
    new Date(a.entered_at).getTime() - new Date(b.entered_at).getTime()
  );

  // Format date for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Calculate time in phase
  function getTimeInPhase(entryDate: string, nextEntryDate?: string): string {
    const start = new Date(entryDate);
    const end = nextEntryDate ? new Date(nextEntryDate) : new Date();
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return "Less than a day";
    if (diffDays === 1) return "1 day";
    if (diffDays < 30) return `${diffDays} days`;
    
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return "1 month";
    if (diffMonths < 12) return `${diffMonths} months`;
    
    const diffYears = Math.floor(diffDays / 365);
    if (diffYears === 1) return "1 year";
    return `${diffYears} years`;
  }

  // Determine if we should use vertical or radial layout
  let useVerticalLayout = true;
  
  onMount(() => {
    // Check window width to determine layout
    const handleResize = () => {
      useVerticalLayout = window.innerWidth < 768 || layout === 'vertical';
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

{#if sortedHistory.length === 0}
  <div class="empty-state">
    <p>No spiral history available yet. Continue using the app to build your journey data.</p>
  </div>
{:else if useVerticalLayout}
  <!-- Vertical Timeline Layout -->
  <div class="vertical-timeline">
    {#each sortedHistory as entry, i}
      <div class="timeline-entry" class:current={entry.phase === currentPhase}>
        <div class="timeline-dot" style="background-color: {getSpiralPhaseColor(entry.phase)}"></div>
        <div class="timeline-connector" style="background-color: {getSpiralPhaseColor(entry.phase)}" class:last={i === sortedHistory.length - 1}></div>
        <div class="timeline-content">
          <h3 style="color: {getSpiralPhaseColor(entry.phase)}">{entry.phase}</h3>
          <p class="timeline-date">Entered on {formatDate(entry.entered_at)}</p>
          <p class="timeline-duration">
            {getTimeInPhase(entry.entered_at, sortedHistory[i+1]?.entered_at)}
            {#if entry.phase === currentPhase}
              <span class="current-badge">Current</span>
            {/if}
          </p>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <!-- Radial Layout -->
  <div class="radial-timeline">
    <div class="radial-center">
      <div class="current-phase-dot" style="background-color: {getSpiralPhaseColor(currentPhase)}">
        <span>{currentPhase}</span>
      </div>
    </div>
    
    {#each sortedHistory as entry, i}
      {@const angle = (i * (360 / sortedHistory.length)) * (Math.PI / 180)}
      {@const radius = 120}
      {@const x = radius * Math.cos(angle)}
      {@const y = radius * Math.sin(angle)}
      
      <div 
        class="radial-entry" 
        class:current={entry.phase === currentPhase}
        style="transform: translate(calc(50% + {x}px), calc(50% + {y}px))"
      >
        <div class="radial-dot" style="background-color: {getSpiralPhaseColor(entry.phase)}"></div>
        <div class="radial-content" style={angle > Math.PI ? "right: 0" : "left: 0"}>
          <h3 style="color: {getSpiralPhaseColor(entry.phase)}">{entry.phase}</h3>
          <p>{formatDate(entry.entered_at)}</p>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  /* Empty state */
  .empty-state {
    padding: 2rem;
    text-align: center;
    color: var(--color-text-secondary);
    font-style: italic;
  }
  
  /* Vertical Timeline */
  .vertical-timeline {
    position: relative;
    padding: 1rem 0;
  }
  
  .timeline-entry {
    position: relative;
    padding-left: 2.5rem;
    margin-bottom: 2rem;
  }
  
  .timeline-entry.current {
    padding-bottom: 0.5rem;
  }
  
  .timeline-dot {
    position: absolute;
    left: 0;
    top: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    z-index: 2;
  }
  
  .timeline-connector {
    position: absolute;
    left: 0.45rem;
    top: 1rem;
    width: 0.1rem;
    height: calc(100% + 1rem);
    background-color: var(--color-border);
    z-index: 1;
  }
  
  .timeline-connector.last {
    display: none;
  }
  
  .timeline-content {
    padding: 0 0 0 1rem;
  }
  
  .timeline-content h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }
  
  .timeline-date {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    margin: 0 0 0.25rem 0;
  }
  
  .timeline-duration {
    font-size: 0.9rem;
    font-weight: 500;
    margin: 0;
  }
  
  .current-badge {
    display: inline-block;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    color: white;
    font-size: 0.7rem;
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
    margin-left: 0.5rem;
    vertical-align: middle;
  }
  
  /* Radial Timeline */
  .radial-timeline {
    position: relative;
    height: 300px;
    margin: 1rem 0;
  }
  
  .radial-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  
  .current-phase-dot {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  .radial-entry {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .radial-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .radial-content {
    position: absolute;
    width: 100px;
    top: -1rem;
    background-color: var(--color-bg-elevated);
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
    z-index: 3;
  }
  
  .radial-entry:hover .radial-content {
    opacity: 1;
  }
  
  .radial-content h3 {
    margin: 0 0 0.25rem 0;
    font-size: 0.9rem;
  }
  
  .radial-content p {
    margin: 0;
    font-size: 0.8rem;
    color: var(--color-text-secondary);
  }
  
  /* Responsive adjustments */
  @media (min-width: 768px) {
    .timeline-entry {
      padding-left: 3rem;
    }
  }
</style>
