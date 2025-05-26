<script lang="ts">
  import { getSpiralPhaseColor, type PatternInsight } from '$lib/services/journey';

  // Props
  export let patterns: PatternInsight[] = [];
  
  // Group patterns by type
  $: tagPatterns = patterns.filter(p => p.type === 'tag_pattern');
  $: limitingBeliefs = patterns.filter(p => p.type === 'limiting_belief');
  $: truths = patterns.filter(p => p.type === 'truth');
  $: transitions = patterns.filter(p => p.type === 'phase_transition');
  
  // Check if we have any patterns
  $: hasPatterns = patterns.length > 0;
  
  // Get icon for pattern type
  function getPatternIcon(type: string): string {
    switch (type) {
      case 'tag_pattern': return '🏷️';
      case 'limiting_belief': return '🔒';
      case 'truth': return '💡';
      case 'phase_transition': return '🔄';
      default: return '✨';
    }
  }
</script>

{#if !hasPatterns}
  <div class="empty-state">
    <p>Continue logging reflections and balcony experiments to reveal your patterns.</p>
  </div>
{:else}
  <div class="patterns-container">
    {#if limitingBeliefs.length > 0}
      <div class="pattern-section">
        <h3>Limiting Beliefs</h3>
        <div class="pattern-list">
          {#each limitingBeliefs as belief}
            <div class="pattern-card">
              <div class="pattern-icon">🔒</div>
              <div class="pattern-content">
                <p>{belief.description}</p>
                {#if belief.count > 1}
                  <span class="pattern-count">Observed {belief.count} times</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    
    {#if truths.length > 0}
      <div class="pattern-section">
        <h3>Recurring Insights</h3>
        <div class="pattern-list">
          {#each truths as truth}
            <div class="pattern-card">
              <div class="pattern-icon">💡</div>
              <div class="pattern-content">
                <p>{truth.description}</p>
                {#if truth.count > 1}
                  <span class="pattern-count">Observed {truth.count} times</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    
    {#if tagPatterns.length > 0}
      <div class="pattern-section">
        <h3>Reflection Patterns</h3>
        <div class="pattern-list">
          {#each tagPatterns as pattern}
            <div class="pattern-card">
              <div class="pattern-icon">🏷️</div>
              <div class="pattern-content">
                <p>{pattern.description}</p>
                {#if pattern.related_phase}
                  <span 
                    class="phase-tag" 
                    style="background-color: {getSpiralPhaseColor(pattern.related_phase)}20; color: {getSpiralPhaseColor(pattern.related_phase)}"
                  >
                    {pattern.related_phase}
                  </span>
                {/if}
                {#if pattern.count > 1}
                  <span class="pattern-count">Observed {pattern.count} times</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    
    {#if transitions.length > 0}
      <div class="pattern-section">
        <h3>Phase Transitions</h3>
        <div class="pattern-list">
          {#each transitions as transition}
            <div class="pattern-card">
              <div class="pattern-icon">🔄</div>
              <div class="pattern-content">
                <p>{transition.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .empty-state {
    padding: 2rem;
    text-align: center;
    color: var(--color-text-secondary);
    font-style: italic;
  }
  
  .patterns-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .pattern-section h3 {
    font-size: 1.1rem;
    margin: 0 0 0.75rem 0;
    color: var(--color-text);
  }
  
  .pattern-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .pattern-card {
    display: flex;
    gap: 0.75rem;
    padding: 1rem;
    background-color: var(--color-bg);
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .pattern-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pattern-content {
    flex: 1;
  }
  
  .pattern-content p {
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
  }
  
  .pattern-count {
    font-size: 0.8rem;
    color: var(--color-text-secondary);
    display: inline-block;
    margin-right: 0.5rem;
  }
  
  .phase-tag {
    display: inline-block;
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  @media (min-width: 768px) {
    .pattern-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .pattern-card {
      height: 100%;
    }
  }
</style>
