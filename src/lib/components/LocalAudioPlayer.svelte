<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { getAudioFromLocalStorage, isLocalStoragePath } from '$lib/services/localStorage';
  
  export let audioPath: string;
  export let showLabel = true;
  
  let audioElement: HTMLAudioElement;
  let isLoading = false;
  let isPlaying = false;
  let blobUrl = '';
  let error: string | null = null;
  let duration = 0;
  let currentTime = 0;
  let progress = 0;
  let isMetadataLoaded = false;
  
  // Load audio from local storage
  async function loadAudio() {
    if (!audioPath) return;
    
    try {
      isLoading = true;
      error = null;
      console.log('Loading audio from path:', audioPath);
      
      // Always use getAudioFromLocalStorage for consistent handling
      // This will handle both IndexedDB and Filesystem paths
      const result = await getAudioFromLocalStorage(audioPath);
      
      if (result.success && result.url) {
        console.log('Successfully loaded audio, using blob URL for playback');
        blobUrl = result.url;
      } else {
        console.error('Failed to load audio:', result.error);
        error = `Failed to load audio: ${result.error || 'Unknown error'}`;
      }
    } catch (err) {
      console.error('Error loading audio:', err);
      error = `Error loading audio: ${err instanceof Error ? err.message : String(err)}`;
    } finally {
      isLoading = false;
    }
  }
  
  // Toggle play/pause
  function togglePlay() {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(err => {
        console.error('Error playing audio:', err);
        error = 'Error playing audio';
      });
    }
  }
  
  // Format time in MM:SS
  function formatTime(seconds: number): string {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  // Handle seeking when user clicks on the progress bar
  function seek(event: MouseEvent) {
    if (!audioElement || !isMetadataLoaded || !isFinite(duration)) return;
    
    const progressBar = event.currentTarget as HTMLDivElement;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (event.clientX - rect.left) / rect.width;
    
    // Set the current time based on click position
    audioElement.currentTime = clickPosition * audioElement.duration;
  }
  
  // Update isPlaying state based on audio element events
  function setupAudioEvents() {
    if (!audioElement) return;
    
    audioElement.addEventListener('play', () => {
      isPlaying = true;
    });
    
    audioElement.addEventListener('pause', () => {
      isPlaying = false;
    });
    
    audioElement.addEventListener('ended', () => {
      isPlaying = false;
    });
    
    audioElement.addEventListener('loadedmetadata', () => {
      console.log('Audio metadata loaded, duration:', audioElement.duration);
      duration = isFinite(audioElement.duration) ? audioElement.duration : 0;
      isMetadataLoaded = true;
    });
    
    audioElement.addEventListener('durationchange', () => {
      console.log('Duration changed:', audioElement.duration);
      duration = isFinite(audioElement.duration) ? audioElement.duration : 0;
    });
    
    audioElement.addEventListener('timeupdate', () => {
      currentTime = audioElement.currentTime;
      if (isFinite(duration) && duration > 0) {
        progress = (currentTime / duration) * 100;
      } else {
        progress = 0;
      }
    });
  }
  
  onMount(async () => {
    await loadAudio();
    setupAudioEvents();
  });
  
  onDestroy(() => {
    // Clean up blob URL to prevent memory leaks
    if (blobUrl && blobUrl.startsWith('blob:')) {
      URL.revokeObjectURL(blobUrl);
    }
  });
</script>

<div class="audio-player">
  {#if isLoading}
    <div class="loading-container">
      <div class="loading-ripple">
        <div></div>
        <div></div>
      </div>
      <span>Loading your recording...</span>
    </div>
  {:else if error}
    <div class="error-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>{error}</span>
    </div>
  {:else if blobUrl}
    <div class="zen-player">
      <div class="zen-player-inner">
        <button 
          class="zen-play-button" 
          on:click={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <div class="zen-button-inner">
            {#if isPlaying}
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                <rect x="14" y="4" width="4" height="16" rx="1"></rect>
              </svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M6 4l15 8-15 8V4z"></path>
              </svg>
            {/if}
          </div>
        </button>
        
        <div class="zen-controls">
          <div class="zen-time">{formatTime(currentTime)}</div>
          
          <div 
            class="zen-progress-container" 
            on:click={seek} 
            on:keydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePlay();
              } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                if (audioElement && isFinite(audioElement.duration)) {
                  const newTime = e.key === 'ArrowRight' ? 
                    Math.min(audioElement.duration, audioElement.currentTime + audioElement.duration * 0.1) : 
                    Math.max(0, audioElement.currentTime - audioElement.duration * 0.1);
                  audioElement.currentTime = newTime;
                }
              }
            }} 
            role="slider" 
            aria-label="Audio progress" 
            aria-valuemin="0" 
            aria-valuemax="100" 
            aria-valuenow={progress} 
            tabindex="0"
          >
            <div class="zen-progress-track">
              <div class="zen-progress-fill" style="width: {progress}%"></div>
            </div>
            
            {#if isPlaying}
              <div class="zen-wave-visualizer">
                <div class="zen-wave"></div>
                <div class="zen-wave"></div>
                <div class="zen-wave"></div>
                <div class="zen-wave"></div>
                <div class="zen-wave"></div>
              </div>
            {/if}
          </div>
          
          <div class="zen-time">{formatTime(duration)}</div>
        </div>
        
        {#if showLabel}
          <div class="zen-storage-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Local</span>
          </div>
        {/if}
      </div>
      
      <audio 
        bind:this={audioElement} 
        src={blobUrl} 
        preload="auto"
        class="audio-element"
        on:error={(e) => {
          console.error('Audio element error:', e);
          error = 'Unable to play this recording';
        }}
      ></audio>
    </div>
  {:else}
    <div class="no-audio-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="1" y1="1" x2="23" y2="23"></line>
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
      </svg>
      <span>No audio recording available</span>
    </div>
  {/if}
</div>

<style>
  .audio-player {
    width: 100%;
    margin: 1.5rem 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  /* Loading animation */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    color: #6b7280;
    font-size: 0.875rem;
    text-align: center;
  }
  
  .loading-ripple {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
    margin-bottom: 0.75rem;
  }
  
  .loading-ripple div {
    position: absolute;
    border: 3px solid #8B5CF6;
    opacity: 1;
    border-radius: 50%;
    animation: loading-ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  
  .loading-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  
  /* Error state */
  .error-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border-radius: 0.75rem;
    font-size: 0.875rem;
  }
  
  /* Main player */
  .zen-player {
    position: relative;
    overflow: hidden;
  }
  
  .zen-player-inner {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
  }
  
  .zen-player-inner:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
  
  /* Play button */
  .zen-play-button {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    background: linear-gradient(135deg, #8B5CF6, #6366F1);
    box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3);
    transition: all 0.2s ease;
    flex-shrink: 0;
  }
  
  .zen-play-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(139, 92, 246, 0.4);
  }
  
  .zen-play-button:active {
    transform: scale(0.95);
  }
  
  .zen-button-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: white;
  }
  
  /* Controls */
  .zen-controls {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .zen-time {
    font-size: 0.875rem;
    color: #6b7280;
    min-width: 2.5rem;
    text-align: center;
  }
  
  .zen-progress-container {
    flex: 1;
    position: relative;
    cursor: pointer;
    padding: 0.75rem 0;
  }
  
  .zen-progress-track {
    height: 0.35rem;
    background-color: #e5e7eb;
    border-radius: 1rem;
    overflow: hidden;
  }
  
  .zen-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #8B5CF6, #6366F1);
    border-radius: 1rem;
    transition: width 0.1s linear;
  }
  
  /* Wave visualizer */
  .zen-wave-visualizer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    pointer-events: none;
  }
  
  .zen-wave {
    width: 0.15rem;
    height: 0.15rem;
    background-color: rgba(139, 92, 246, 0.7);
    border-radius: 50%;
    animation: zen-wave 1.2s ease-in-out infinite alternate;
  }
  
  .zen-wave:nth-child(1) { animation-delay: -0.4s; }
  .zen-wave:nth-child(2) { animation-delay: -0.2s; }
  .zen-wave:nth-child(3) { animation-delay: 0s; }
  .zen-wave:nth-child(4) { animation-delay: -0.3s; }
  .zen-wave:nth-child(5) { animation-delay: -0.1s; }
  
  /* Storage label */
  .zen-storage-label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background-color: rgba(139, 92, 246, 0.1);
    color: #8B5CF6;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  /* No audio state */
  .no-audio-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1.5rem;
    background-color: #f9fafb;
    border-radius: 1rem;
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  /* Hide audio element */
  .audio-element {
    display: none;
  }
  
  /* Animations */
  @keyframes loading-ripple {
    0% {
      top: 28px;
      left: 28px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 58px;
      height: 58px;
      opacity: 0;
    }
  }
  
  @keyframes zen-wave {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(2.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
