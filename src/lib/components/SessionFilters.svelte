<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { MoodLevel } from '$lib/services/sessions';
  import type { SpiralPhase } from '$lib/services/journey';
  
  // Props
  export let availableTags: string[] = [];
  export let activeFilters: {
    types: string[];
    spiralPhase?: string;
    moodLevel?: MoodLevel;
    tags: string[];
    searchText?: string;
  } = {
    types: ['reflection', 'hrv_session', 'balcony'],
    tags: []
  };
  
  // Local state
  let isExpanded = false;
  let searchInput = activeFilters.searchText || '';
  
  // Spiral phases
  const spiralPhases: SpiralPhase[] = [
    'Beige', 'Purple', 'Red', 'Blue', 'Orange', 'Green', 'Yellow', 'Turquoise'
  ];
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Toggle session type filter
  function toggleType(type: string) {
    if (activeFilters.types.includes(type)) {
      activeFilters.types = activeFilters.types.filter(t => t !== type);
    } else {
      activeFilters.types = [...activeFilters.types, type];
    }
    applyFilters();
  }
  
  // Set spiral phase filter
  function setSpiralPhase(phase: string | undefined) {
    activeFilters.spiralPhase = activeFilters.spiralPhase === phase ? undefined : phase;
    applyFilters();
  }
  
  // Set mood level filter
  function setMoodLevel(level: MoodLevel | undefined) {
    activeFilters.moodLevel = activeFilters.moodLevel === level ? undefined : level;
    applyFilters();
  }
  
  // Toggle tag filter
  function toggleTag(tag: string) {
    if (activeFilters.tags.includes(tag)) {
      activeFilters.tags = activeFilters.tags.filter(t => t !== tag);
    } else {
      activeFilters.tags = [...activeFilters.tags, tag];
    }
    applyFilters();
  }
  
  // Apply search text
  function applySearch() {
    activeFilters.searchText = searchInput.trim() || undefined;
    applyFilters();
  }
  
  // Reset all filters
  function resetFilters() {
    activeFilters = {
      types: ['reflection', 'hrv_session', 'balcony'],
      tags: []
    };
    searchInput = '';
    applyFilters();
  }
  
  // Apply filters and notify parent
  function applyFilters() {
    dispatch('filter', { filters: activeFilters });
  }
  
  // Toggle filter panel visibility
  function toggleFilters() {
    isExpanded = !isExpanded;
  }
</script>

<div class="filters-container">
  <div class="filters-header">
    <button class="filter-toggle" on:click={toggleFilters}>
      {isExpanded ? 'Hide Filters' : 'Show Filters'} 
      <span class="filter-icon">{isExpanded ? '▲' : '▼'}</span>
    </button>
    
    <!-- Active filter summary -->
    <div class="active-filters-summary">
      {#if activeFilters.types.length < 3}
        <span class="filter-badge">Types: {activeFilters.types.length}</span>
      {/if}
      
      {#if activeFilters.spiralPhase}
        <span class="filter-badge">Phase: {activeFilters.spiralPhase}</span>
      {/if}
      
      {#if activeFilters.moodLevel}
        <span class="filter-badge">Mood: {activeFilters.moodLevel}</span>
      {/if}
      
      {#if activeFilters.tags.length > 0}
        <span class="filter-badge">Tags: {activeFilters.tags.length}</span>
      {/if}
      
      {#if activeFilters.searchText}
        <span class="filter-badge">Search: "{activeFilters.searchText}"</span>
      {/if}
      
      {#if activeFilters.types.length < 3 || activeFilters.spiralPhase || activeFilters.moodLevel || activeFilters.tags.length > 0 || activeFilters.searchText}
        <button class="reset-button" on:click={resetFilters}>Reset</button>
      {/if}
    </div>
  </div>
  
  {#if isExpanded}
    <div class="filters-panel">
      <!-- Session Type Filter -->
      <div class="filter-section">
        <h3>Session Type</h3>
        <div class="filter-chips">
          <button 
            class="filter-chip {activeFilters.types.includes('reflection') ? 'active' : ''}"
            on:click={() => toggleType('reflection')}
          >
            🖊️ Reflections
          </button>
          <button 
            class="filter-chip {activeFilters.types.includes('hrv_session') ? 'active' : ''}"
            on:click={() => toggleType('hrv_session')}
          >
            📈 HRV Sessions
          </button>
          <button 
            class="filter-chip {activeFilters.types.includes('balcony') ? 'active' : ''}"
            on:click={() => toggleType('balcony')}
          >
            🧠 Balcony Insights
          </button>
        </div>
      </div>
      
      <!-- Spiral Phase Filter -->
      <div class="filter-section">
        <h3>Spiral Phase</h3>
        <div class="filter-chips">
          {#each spiralPhases as phase}
            <button 
              class="filter-chip {activeFilters.spiralPhase === phase ? 'active' : ''}"
              on:click={() => setSpiralPhase(phase)}
            >
              {phase}
            </button>
          {/each}
          {#if activeFilters.spiralPhase}
            <button 
              class="filter-chip clear"
              on:click={() => setSpiralPhase(undefined)}
            >
              Clear
            </button>
          {/if}
        </div>
      </div>
      
      <!-- Mood Level Filter -->
      <div class="filter-section">
        <h3>Mood Level</h3>
        <div class="filter-chips">
          <button 
            class="filter-chip {activeFilters.moodLevel === 'high' ? 'active' : ''}"
            on:click={() => setMoodLevel('high')}
          >
            😊 High
          </button>
          <button 
            class="filter-chip {activeFilters.moodLevel === 'neutral' ? 'active' : ''}"
            on:click={() => setMoodLevel('neutral')}
          >
            😐 Neutral
          </button>
          <button 
            class="filter-chip {activeFilters.moodLevel === 'low' ? 'active' : ''}"
            on:click={() => setMoodLevel('low')}
          >
            😔 Low
          </button>
          {#if activeFilters.moodLevel}
            <button 
              class="filter-chip clear"
              on:click={() => setMoodLevel(undefined)}
            >
              Clear
            </button>
          {/if}
        </div>
      </div>
      
      <!-- Tags Filter -->
      {#if availableTags.length > 0}
        <div class="filter-section">
          <h3>Tags</h3>
          <div class="filter-chips">
            {#each availableTags as tag}
              <button 
                class="filter-chip {activeFilters.tags.includes(tag) ? 'active' : ''}"
                on:click={() => toggleTag(tag)}
              >
                #{tag}
              </button>
            {/each}
            {#if activeFilters.tags.length > 0}
              <button 
                class="filter-chip clear"
                on:click={() => { activeFilters.tags = []; applyFilters(); }}
              >
                Clear All
              </button>
            {/if}
          </div>
        </div>
      {/if}
      
      <!-- Search Filter -->
      <div class="filter-section">
        <h3>Search</h3>
        <div class="search-input">
          <input 
            type="text" 
            placeholder="Search in reflections and insights..." 
            bind:value={searchInput}
            on:keydown={(e) => e.key === 'Enter' && applySearch()}
          />
          <button class="search-button" on:click={applySearch}>Search</button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .filters-container {
    margin-bottom: 1.5rem;
    background-color: var(--color-card-bg);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .filters-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: rgba(0, 0, 0, 0.02);
  }
  
  .filter-toggle {
    background: none;
    border: none;
    color: var(--color-primary);
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s;
  }
  
  .filter-toggle:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .filter-icon {
    font-size: 0.8rem;
  }
  
  .active-filters-summary {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }
  
  .filter-badge {
    background-color: rgba(77, 68, 179, 0.1);
    color: var(--color-primary);
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.7rem;
    font-weight: 500;
  }
  
  .reset-button {
    background: none;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.7rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .reset-button:hover {
    background-color: rgba(77, 68, 179, 0.1);
  }
  
  .filters-panel {
    padding: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .filter-section {
    margin-bottom: 1.25rem;
  }
  
  .filter-section:last-child {
    margin-bottom: 0;
  }
  
  .filter-section h3 {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: var(--color-text-secondary);
  }
  
  .filter-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .filter-chip {
    background-color: rgba(0, 0, 0, 0.05);
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 2rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .filter-chip:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .filter-chip.active {
    background-color: var(--color-primary);
    color: white;
  }
  
  .filter-chip.clear {
    background-color: rgba(255, 0, 0, 0.1);
    color: #e53935;
  }
  
  .filter-chip.clear:hover {
    background-color: rgba(255, 0, 0, 0.2);
  }
  
  .search-input {
    display: flex;
    gap: 0.5rem;
  }
  
  .search-input input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    font-size: 0.9rem;
  }
  
  .search-button {
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  .search-button:hover {
    opacity: 0.9;
  }
</style>
