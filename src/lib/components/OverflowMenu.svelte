<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';
  import { authStore } from '$lib/stores/auth';
  import { signOut } from '$lib/firebase';
  import { goto } from '$app/navigation';
  import { theme } from '$lib/stores/theme';
  
  // Menu state
  let isOpen = false;
  let menuRef: HTMLElement;
  
  // Toggle menu open/closed
  function toggleMenu() {
    isOpen = !isOpen;
  }
  
  // Close menu when clicking outside
  function handleClickOutside(event: MouseEvent) {
    if (menuRef && !menuRef.contains(event.target as Node) && isOpen) {
      isOpen = false;
    }
  }
  
  // Toggle theme
  function toggleTheme() {
    theme.set($theme === 'dark' ? 'light' : 'dark');
    isOpen = false;
  }
  
  // Handle sign out
  async function handleSignOut() {
    await signOut();
    goto('/login');
  }
  
  // Handle test divine timing (developer only)
  function testDivineTiming() {
    // This would trigger a test notification
    alert('Divine Timing test notification triggered!');
    isOpen = false;
  }
  
  // Navigate to settings
  function goToSettings() {
    goto('/settings');
    isOpen = false;
  }
  
  // Set up and clean up click listener
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class="overflow-menu" bind:this={menuRef}>
  <button class="menu-toggle" on:click={toggleMenu} aria-label="More options">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  </button>
  
  {#if isOpen}
    <div class="menu-dropdown" transition:slide={{ duration: 200 }}>
      <button class="menu-item" on:click={goToSettings}>
        <span class="menu-icon">⚙️</span>
        <span>Settings</span>
      </button>
      
      <button class="menu-item" on:click={toggleTheme}>
        <span class="menu-icon">{$theme === 'dark' ? '☀️' : '🌙'}</span>
        <span>{$theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
      
      <button class="menu-item developer" on:click={testDivineTiming}>
        <span class="menu-icon">🔔</span>
        <span>Test Divine Timing</span>
      </button>
      
      <button class="menu-item logout" on:click={handleSignOut}>
        <span class="menu-icon">🚪</span>
        <span>Logout</span>
      </button>
    </div>
  {/if}
</div>

<style>
  .overflow-menu {
    position: relative;
  }
  
  .menu-toggle {
    background: none;
    border: none;
    color: var(--color-text, #333333);
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }
  
  .menu-toggle:hover {
    background-color: var(--color-bg-secondary, #f5f5f5);
  }
  
  .menu-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--color-bg-elevated, #ffffff);
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-width: 200px;
    z-index: 1000;
    overflow: hidden;
    margin-top: 0.5rem;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;
    color: var(--color-text, #333333);
  }
  
  .menu-item:hover {
    background-color: var(--color-bg-secondary, #f5f5f5);
  }
  
  .menu-icon {
    margin-right: 0.75rem;
    font-size: 1.1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
  }
  
  .developer {
    color: var(--color-primary, #4D44B3);
    font-size: 0.9rem;
  }
  
  .logout {
    color: #E53935;
    border-top: 1px solid var(--color-border, #eeeeee);
    margin-top: 0.25rem;
    padding-top: 0.75rem;
  }
</style>
