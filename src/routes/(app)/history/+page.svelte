<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import { getRecentSessions, type Session } from '$lib/services/sessions';

  let sessions: Session[] = [];
  let isLoading = true;
  let loadError: string | null = null;

  onMount(async () => {
    if (!$authStore.user) return;
    
    try {
      const result = await getRecentSessions($authStore.user, 10);
      
      if (result.success && result.sessions) {
        sessions = result.sessions;
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
  
  <div class="coming-soon-banner">
    <p>Full history view will be available in Phase 4</p>
    <p class="subtitle">This is a placeholder for the upcoming Session History feature</p>
  </div>
  
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
        <div class="session-card">
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
              </div>
            {:else if session.type === 'hrv_session'}
              <div class="session-content">
                <p class="hrv-stats">
                  <span>Avg HR: {session.avg_hr} bpm</span>
                  <span>Vibe Score: {session.vibe_score}</span>
                </p>
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
  
  .coming-soon-banner {
    background: linear-gradient(135deg, #4D44B3, #BF469A);
    color: white;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .coming-soon-banner p {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;
  }
  
  .coming-soon-banner .subtitle {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 0.5rem;
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
</style>
