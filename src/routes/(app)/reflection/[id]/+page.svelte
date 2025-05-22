<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { getReflectionById } from '$lib/services/sessions';
  import LocalAudioPlayer from '$lib/components/LocalAudioPlayer.svelte';
  
  // Get the reflection ID from the URL
  const reflectionId = $page.params.id;
  
  // State
  let isLoading = true;
  let loadError: string | null = null;
  let reflection: any = null;
  
  // Load reflection data
  onMount(async () => {
    if (!$authStore.user) return;
    
    try {
      const result = await getReflectionById($authStore.user, reflectionId);
      
      if (result.success && result.reflection) {
        reflection = result.reflection;
      } else {
        loadError = 'Failed to load reflection details.';
      }
    } catch (error) {
      console.error('Error loading reflection:', error);
      loadError = 'An unexpected error occurred while loading reflection details.';
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Go back to history
  function goBack() {
    goto('/history');
  }
  
  // Go to balcony page
  function goToBalcony() {
    goto(`/balcony?reflectionId=${reflectionId}`);
  }
</script>

<div class="reflection-detail-container">
  <button class="back-button" on:click={goBack}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
    Back
  </button>
  
  {#if isLoading}
    <div class="loading">Loading reflection details...</div>
  {:else if loadError}
    <div class="error-message">{loadError}</div>
  {:else if reflection}
    <div class="reflection-card">
      <div class="reflection-header">
        <h1>Reflection</h1>
        <div class="reflection-date">{formatDate(reflection.timestamp)}</div>
      </div>
      
      <div class="mood-tags">
        {#if reflection.mood && reflection.mood.length > 0}
          <div class="mood-section">
            <h2>Mood</h2>
            <div class="mood-list">
              {#each reflection.mood as mood}
                <span class="mood-tag">{mood}</span>
              {/each}
            </div>
          </div>
        {/if}
        
        {#if reflection.tags && reflection.tags.length > 0}
          <div class="tags-section">
            <h2>Tags</h2>
            <div class="tags-list">
              {#each reflection.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </div>
        {/if}
      </div>
      
      {#if reflection.text}
        <div class="reflection-text">
          <h2>Reflection</h2>
          <p>{reflection.text}</p>
        </div>
      {/if}
      
      {#if reflection.audio_url}
        <div class="audio-section">
          <h2>Voice Recording</h2>
          <LocalAudioPlayer audioPath={reflection.audio_url} />
          
          {#if reflection.voice_insight}
            <div class="voice-insight">
              <h3>Voice Analysis</h3>
              <div class="insight-content">
                <div class="tone">
                  <span class="label">Detected Tone:</span>
                  <span class="value">{reflection.voice_insight.tone}</span>
                </div>
                <div class="confidence">
                  <span class="label">Confidence:</span>
                  <span class="value">{(reflection.voice_insight.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/if}
      
      <div class="action-buttons">
        <button class="balcony-button" on:click={goToBalcony}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          Add Balcony Insight
        </button>
      </div>
    </div>
  {:else}
    <div class="not-found">Reflection not found.</div>
  {/if}
</div>

<style>
  .reflection-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .back-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: var(--color-primary);
    font-weight: 500;
    padding: 0.5rem;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  .back-button:hover {
    opacity: 0.8;
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
  
  .not-found {
    text-align: center;
    padding: 3rem 1rem;
    background-color: var(--color-card-bg);
    border-radius: 12px;
    color: var(--color-text-secondary);
  }
  
  .reflection-card {
    background-color: var(--color-card-bg);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .reflection-header {
    margin-bottom: 1.5rem;
  }
  
  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: var(--color-primary);
  }
  
  .reflection-date {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
  }
  
  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: var(--color-text);
  }
  
  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }
  
  .mood-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .mood-section, .tags-section {
    flex: 1;
    min-width: 200px;
  }
  
  .mood-list, .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .mood-tag, .tag {
    padding: 0.35rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.9rem;
  }
  
  .mood-tag {
    background-color: rgba(77, 68, 179, 0.1);
    color: var(--color-primary);
  }
  
  .tag {
    background-color: var(--color-bg-secondary);
    color: var(--color-text-secondary);
  }
  
  .reflection-text {
    margin-bottom: 1.5rem;
  }
  
  .reflection-text p {
    line-height: 1.6;
    white-space: pre-line;
  }
  
  .audio-section {
    margin-bottom: 1.5rem;
  }
  
  .voice-insight {
    margin-top: 1rem;
    padding: 1rem;
    background-color: var(--color-bg-secondary);
    border-radius: 8px;
  }
  
  .insight-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .tone, .confidence {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .label {
    font-size: 0.8rem;
    color: var(--color-text-secondary);
  }
  
  .value {
    font-weight: 500;
  }
  
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }
  
  .balcony-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  .balcony-button:hover {
    opacity: 0.9;
  }
</style>
