<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { getRecentSessions, getBalconyForReflection, type Session } from '$lib/services/sessions';

  let sessions: Array<Session & { id: string }> = [];
  let isLoading = true;
  let loadError: string | null = null;
  let balconyCache: Record<string, boolean> = {}; // Cache to track which reflections have balcony insights

  onMount(async () => {
    if (!$authStore.user) return;
    
    try {
      const result = await getRecentSessions($authStore.user, 20);
      
      if (result.success && result.sessions) {
        sessions = result.sessions;
        
        // Check for balcony insights for each reflection
        await checkForBalconyInsights();
      } else {
        loadError = 'Failed to load recent sessions.';
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
      loadError = 'An unexpected error occurred while loading sessions.';
    } finally {
      isLoading = false;
    }
  });
  
  // Check which reflections have associated balcony insights
  async function checkForBalconyInsights() {
    if (!$authStore.user) return;
    
    // Get all reflection IDs
    const reflectionIds = sessions
      .filter(session => session.type === 'reflection')
      .map(session => session.id);
    
    // Check each reflection for a balcony insight
    for (const reflectionId of reflectionIds) {
      try {
        const result = await getBalconyForReflection($authStore.user, reflectionId);
        balconyCache[reflectionId] = result.success;
      } catch (error) {
        console.error(`Error checking balcony for reflection ${reflectionId}:`, error);
        balconyCache[reflectionId] = false;
      }
    }
  }
  
  // Navigate to session detail
  function viewSessionDetail(session: Session & { id: string }) {
    if (session.type === 'reflection') {
      goto(`/reflection/${session.id}`);
    } else if (session.type === 'hrv_session') {
      goto(`/hrv-detail/${session.id}`);
    } else if (session.type === 'balcony') {
      // For balcony insights, navigate to the balcony page with the parent reflection ID
      goto(`/balcony?reflectionId=${session.parent_reflection_id}`);
    }
  }
  
  // Navigate to add balcony insight
  function addBalconyInsight(reflectionId: string) {
    goto(`/balcony?reflectionId=${reflectionId}`);
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

  // Get icon for session type
  function getSessionIcon(type: string): string {
    switch (type) {
      case 'reflection':
        return '🖊️';
      case 'hrv_session':
        return '📈';
      case 'balcony':
        return '🧠';
      default:
        return '📝';
    }
  }

  // Get display name for session type
  function getSessionTypeName(type: string): string {
    switch (type) {
      case 'reflection':
        return 'Reflection';
      case 'hrv_session':
        return 'HRV Session';
      case 'balcony':
        return 'Balcony Experiment';
      default:
        return 'Session';
    }
  }
</script>

<div class="history-container">
  <h1>Session History</h1>
  
  {#if isLoading}
    <div class="loading">Loading your sessions...</div>
  {:else if loadError}
    <div class="error-message">{loadError}</div>
  {:else if sessions.length === 0}
    <div class="empty-state">
      <p>You haven't created any sessions yet.</p>
      <p>Start by creating a reflection or HRV session!</p>
    </div>
  {:else}
    <div class="sessions-list">
      {#each sessions as session}
        <div class="session-card" 
          on:click={() => viewSessionDetail(session)} 
          on:keydown={(e) => e.key === 'Enter' && viewSessionDetail(session)}
          tabindex="0"
          role="button"
          aria-label={`View ${getSessionTypeName(session.type)} details`}>
          <div class="session-icon">{getSessionIcon(session.type)}</div>
          <div class="session-details">
            <div class="session-header">
              <span class="session-type">{getSessionTypeName(session.type)}</span>
              <span class="session-time">{formatTime(session.timestamp)}</span>
            </div>
            <div class="session-date">{formatDate(session.timestamp)}</div>
            
            {#if session.type === 'reflection'}
              <div class="session-content">
                <p class="mood">{session.mood.join(', ')}</p>
                <p class="text-preview">{session.text.substring(0, 100)}{session.text.length > 100 ? '...' : ''}</p>
                
                <!-- Add balcony insight button if no balcony exists for this reflection -->
                {#if balconyCache[session.id] === false}
                  <button 
                    class="add-balcony-button"
                    on:click|stopPropagation={() => addBalconyInsight(session.id)}
                  >
                    Add Balcony Insight
                  </button>
                {:else if balconyCache[session.id] === true}
                  <div class="has-balcony">
                    <span class="balcony-badge">Has Balcony Insight</span>
                    <button 
                      class="view-balcony-button"
                      on:click|stopPropagation={() => addBalconyInsight(session.id)}
                    >
                      View/Edit
                    </button>
                  </div>
                {/if}
              </div>
            {:else if session.type === 'hrv_session'}
              <div class="session-content">
                <p class="hrv-stats">
                  <span>Avg HR: {session.avg_hr} bpm</span>
                  <span>Vibe Score: {session.vibe_score}</span>
                </p>
              </div>
            {:else if session.type === 'balcony'}
              <div class="session-content">
                <p class="balcony-pattern">Pattern: {session.pattern.substring(0, 100)}{session.pattern.length > 100 ? '...' : ''}</p>
                <p class="balcony-truth">Truth: {session.truth.substring(0, 100)}{session.truth.length > 100 ? '...' : ''}</p>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .history-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--color-primary);
  }
  

  
  .loading {
    text-align: center;
    padding: 2rem;
    color: var(--color-text-secondary);
  }
  
  .error-message {
    color: #E53935;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background-color: rgba(229, 57, 53, 0.1);
    border-radius: 8px;
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    background-color: var(--color-card-bg);
    border-radius: 12px;
    color: var(--color-text-secondary);
  }
  
  .sessions-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .session-card {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--color-card-bg);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .session-icon {
    font-size: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg-secondary);
    border-radius: 50%;
  }
  
  .session-details {
    flex: 1;
  }
  
  .session-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }
  
  .session-type {
    font-weight: 500;
    color: var(--color-primary);
  }
  
  .session-time {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
  }
  
  .session-date {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .session-content {
    margin-top: 0.5rem;
  }
  
  .mood {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .text-preview {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  .hrv-stats {
    display: flex;
    gap: 1rem;
    color: var(--color-text-secondary);
  }
  
  .session-card {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .session-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .add-balcony-button, .view-balcony-button {
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  .add-balcony-button:hover, .view-balcony-button:hover {
    opacity: 0.9;
  }
  
  .view-balcony-button {
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
  }
  
  .has-balcony {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  
  .balcony-badge {
    background-color: rgba(77, 68, 179, 0.1);
    color: var(--color-primary);
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.7rem;
    font-weight: 500;
  }
  
  .balcony-pattern, .balcony-truth {
    font-size: 0.9rem;
    margin: 0.25rem 0;
    color: var(--color-text-secondary);
  }
  
  .balcony-pattern::before {
    content: '🔍 ';
  }
  
  .balcony-truth::before {
    content: '💡 ';
  }
</style>
