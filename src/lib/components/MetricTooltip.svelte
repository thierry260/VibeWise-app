<script lang="ts">
  import { fade } from 'svelte/transition';
  
  export let title: string;
  export let explanation: string;
  export let hint: string = '';
  export let stateDescription: string;
  export let suggestion: string;
  export let isVisible: boolean = false;
  export let onClose: () => void;
  
  // Position the tooltip relative to the parent element
  let tooltipElement: HTMLElement;
  
  function handleClickOutside(event: MouseEvent) {
    if (tooltipElement && !tooltipElement.contains(event.target as Node)) {
      onClose();
    }
  }
  
  function handleTooltipClick(event: MouseEvent) {
    // Stop event propagation to prevent the parent's click handler from firing
    event.stopPropagation();
  }
</script>

<svelte:window on:click={handleClickOutside} />

{#if isVisible}
  <div 
    class="metric-tooltip" 
    bind:this={tooltipElement}
    transition:fade={{ duration: 150 }}
    on:click={handleTooltipClick}
    on:keydown={(e) => e.key === 'Escape' && onClose()}
    role="dialog"
    aria-modal="true"
    aria-labelledby="tooltip-title"
    tabindex="0"
  >
    <button class="close-button" on:click={onClose}>×</button>
    <h3>{title}</h3>
    <p class="explanation">{explanation}</p>
    {#if hint}
      <p class="hint">{hint}</p>
    {/if}
    <p class="state-description">{stateDescription}</p>
    <p class="suggestion">{suggestion}</p>
  </div>
{/if}

<style>
  .metric-tooltip {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    width: 280px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 1.25rem;
    z-index: 100;
    text-align: left;
  }
  
  .metric-tooltip::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    background-color: white;
    transform-origin: center;
    transform: translateX(-50%) rotate(45deg);
    z-index: -1;
  }
  
  .close-button {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--color-text-secondary);
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-primary);
  }
  
  p {
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    line-height: 1.4;
    color: var(--color-text-primary);
  }
  
  .explanation {
    font-weight: 500;
  }
  
  .hint {
    font-size: 0.8rem;
    color: var(--color-text-secondary);
    font-style: italic;
  }
  
  .state-description {
    margin-top: 0.5rem;
  }
  
  .suggestion {
    font-weight: 500;
    color: var(--color-primary);
    margin-bottom: 0;
  }
</style>
