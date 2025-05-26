<script lang="ts">
  import { page } from '$app/stores';
  import { Home, History, Sparkles, Compass, BookOpen } from 'lucide-svelte';
  
  // Navigation items as specified in the requirements
  const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'History', path: '/history', icon: History },
    { name: 'Sessions', path: '/sessions', icon: Sparkles },
    { name: 'Journey', path: '/journey', icon: Compass },
    { name: 'Library', path: '/library', icon: BookOpen }
  ];
  
  // Routes where navigation should be hidden
  export let hideNavigation = false;
  
  // Check if current route should hide navigation
  $: currentPath = $page.url.pathname;
</script>

{#if !hideNavigation}
  <nav class="bottom-nav">
    {#each navItems as item}
      <a 
        href={item.path} 
        class:active={currentPath === item.path || currentPath.startsWith(item.path + '/')} 
        aria-label={item.name}
      >
        <div class="nav-item-content">
          <span class="icon">
            <svelte:component this={item.icon} size={20} strokeWidth={1.5} />
          </span>
          <span class="label">{item.name}</span>
          {#if currentPath === item.path || currentPath.startsWith(item.path + '/')}
            <div class="active-indicator"></div>
          {/if}
        </div>
      </a>
    {/each}
  </nav>
{/if}

<style>
  .bottom-nav {
    display: flex;
    justify-content: space-around;
    padding: 0.5rem 0;
    background-color: var(--color-bg-elevated, #ffffff);
    box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.05);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .bottom-nav a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--color-text-secondary, #666666);
    flex: 1;
    padding: 0.5rem 0;
    position: relative;
    transition: all 0.2s ease;
  }
  
  .nav-item-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  
  .bottom-nav a:hover {
    color: var(--color-text, #333333);
  }
  
  .bottom-nav a.active {
    color: var(--color-primary, #4D44B3);
  }
  
  .icon {
    font-size: 1.4rem;
    margin-bottom: 0.25rem;
    position: relative;
    z-index: 2;
  }
  
  .label {
    font-size: 0.75rem;
    font-weight: 500;
    position: relative;
    z-index: 2;
  }
  
  .active-indicator {
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 1.5rem;
    height: 0.25rem;
    border-radius: 1rem;
    background: linear-gradient(90deg, #4D44B3, #BF469A);
  }
  
  /* Adjust for larger screens */
  @media (min-width: 768px) {
    .bottom-nav {
      padding: 0.75rem 0;
    }
    
    .icon {
      font-size: 1.5rem;
    }
    
    .label {
      font-size: 0.8rem;
    }
  }
</style>
